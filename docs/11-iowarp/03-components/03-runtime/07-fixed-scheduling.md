# Statically Scheduling Tasks and Concurrency

The section gives the overview of how to send tasks to containers in a pool.
We go over an end-to-end flow of a block device pool and how tasks are sent
to containers in that pool. We demonstrate "static scheduling", where the
client is responsible for sending the task to a particular container. We 
discuss "dynamic scheduling" in a future section, where the location of
the task is determined by an algorithm defined by the module developer.

## Creating a Pool

```cpp
int main() {
  chi::bdev::Client client;
  client.Create(
      HSHM_MCTX,
      chi::DomainQuery::GetDirectHash(chi::SubDomain::kGlobalContainers, 0),
      chi::DomainQuery::GetGlobalBcast(), "tempdir",
      "fs::///tmp/chi_test_bdev.bin", GIGABYTES(1));
}
```

Here we create the block device pool.
* ``chi::DomainQuery::GetDirectHash(chi::SubDomain::kGlobalContainers, 0)``: The admin container
where the creation task is sent to. In this case, container 0. 
* ``chi::DomainQuery::GetGlobalBcast()``: The set of nodes that can address the container. This
is the set of all nodes. 
* ``"tempdir"``: The name of the block device in iowarp. 
* ``"fs::///tmp/chi_test_bdev.bin"``: The name of the block device on the system. Just a file in 
a filesystem.
* ``GIGABYTES(1)``: The maximum size of the file.

This command creates a pool where containers can be migrated to any node in the entire system.
Use ``GetGlobalBcast`` for now -- smaller domains for ``Create`` are not currently supported.
This will spawn a ``CreateTask`` that gets sent to the iowarp runtime for processing.

## Creating a Container

Below is a snippet from the ``Create`` function that gets invoked within the runtime.
The Pool Creation task will call the ``Create`` function of the module. The creation is
responsible for initiating parameters to the container. The most important parameter
we discuss are Lanes.

```cpp
  /** Construct bdev */
  void Create(CreateTask *task, RunContext &rctx) {
    CreateTaskParams params = task->GetParams();
    std::string url = params.path_.str();
    size_t dev_size = params.size_;
    url_.Parse(url);
    url_.path_ = hshm::Formatter::format("{}.{}", url_.path_, container_id_);
    alloc_.Init(1, dev_size);
    CreateLaneGroup(kMdGroup, 1, QUEUE_LOW_LATENCY);
    CreateLaneGroup(kDataGroup, 32, QUEUE_HIGH_LATENCY);
```

Lanes store a set of tasks to execute to process in sequence.
They are simply FIFO queues. The number of lanes can be thought of as the
maximum concurrency of a Container. Lanes will be dynamically
mapped to worker threads based on load.

Lanes get divided into different groups to logically separate tasks
that affect either different data structures or have very different performance
characteristics. Below is an example for a block device code, where we create 
two groups:
* kMdGroup: where metadata-related tasks (e.g., block allocations) go
* kDataGroup: where data I/O operations go

Lane groups are set with a certain priority. Lanes 
support two priorities: QUEUE_LOW_LATENCY and QUEUE_HIGH_LATENCY.
This affects how the lanes are mapped and scheduled to workers. Generally,
low-latency lanes are sent to workers dedicated to a core.

Additionally, each group has parameter for concurreny (number of lanes).
In this example, only one lane for metadata. This is because the data structure
for block allocation does not support concurrent access. However, the data
object gets 32 lanes, implying a maximum concurreny of 32 threads performing
I/O.

## Block Dev API Review

Below is a snippet of the APIs the block device exposes:
```cpp
/** Allocate a section of the block device */
  HSHM_INLINE_CROSS_FUN
  std::vector<Block> Allocate(const hipc::MemContext &mctx,
                              const DomainQuery &dom_query, size_t size);

  /** Free a section of the block device */
  HSHM_INLINE_CROSS_FUN
  void Free(const hipc::MemContext &mctx, const DomainQuery &dom_query,
            const Block &block);

  /** Write to the block device */
  HSHM_INLINE_CROSS_FUN
  void Write(const hipc::MemContext &mctx, const DomainQuery &dom_query,
             const hipc::Pointer &data, Block block);

  /** Read from the block device */
  HSHM_INLINE_CROSS_FUN
  void Read(const hipc::MemContext &mctx, const DomainQuery &dom_query,
            const hipc::Pointer &data, Block &block);
```

We will discuss how a task for Allocate is mapped to the runtime.

## Spawn an Allocate task

```cpp
int main() {
  chi::bdev::Client client;
  // ...
  std::vector<chi::Block> blocks =
        client.Allocate(HSHM_MCTX,
                        chi::DomainQuery::GetDirectHash(
                            chi::SubDomain::kGlobalContainers, 1),
                        MEGABYTES(1));
}
```

This is an example where we allocate 1MB of data from bdev container 1.

## Routing Tasks to Lanes

When a task is mapped to a container, it must then be assigned to a lane.
Many algorithms are possible -- it is up to the developer to implement an
algorithm of choice. Below is the example:
```cpp
Lane *MapTaskToLane(const Task *task) override {
    switch (task->method_) {
      case Method::kRead:
      case Method::kWrite: {
        return GetLeastLoadedLane(
            kDataGroup, task->prio_,
            [](Load &lhs, Load &rhs) { return lhs.cpu_load_ < rhs.cpu_load_; });
      }
      default: {
        return GetLaneByHash(kMdGroup, task->prio_, 0);
      }
    }
  }
```

In this example, the read and write tasks are mapped to the kDataGroup lanes.
The least-loaded lane will be chosen for the mapping.
