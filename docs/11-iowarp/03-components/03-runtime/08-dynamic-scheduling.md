# Dynamic Scheduling

Continuing from the previous example, we now describe Dynamic Scheduling.
In this case, users do not provide the exact container they want the task
to be mapped to. Instead, the pool provides a scheduling algorithm that
determines where the task should go.

## Spawn an Allocate task

```cpp
int main() {
  chi::bdev::Client client;
  // ...
  std::vector<chi::Block> blocks =
        client.Allocate(HSHM_MCTX,
                        chi::DomainQuery::GetDynamic(),
                        MEGABYTES(1));
}
```

This is an example where we allocate 1MB of data from the pool dynamically.

## The Monitor Callback

Each task has a Monitor function associated with it. Below is an example
of how it is can be used for dynamic scheduling callbacks.

```cpp
  template <typename TaskT>
  void IoRoute(TaskT *task) {
    // Concretize the domain to map the task
    task->dom_query_ = chi::DomainQuery::GetDirectHash(
        chi::SubDomainId::kGlobalContainers, 0);
    task->SetDirect();
    task->UnsetRouted();
  }


  void MonitorWrite(MonitorModeId mode, WriteTask *task, RunContext &rctx) {
    switch (mode) {
      case MonitorMode::kSchedule: {
        IoRoute<WriteTask>(task);
        return;
      }
    }
  }
```

This function simply converts the task's domain to always route to container 0.
Better algorithms can be made. For every task that should support dynamic scheduling,
a code snippet like this should be added to their Monitor function. For example,
for Reads, you should update MonitorRead.