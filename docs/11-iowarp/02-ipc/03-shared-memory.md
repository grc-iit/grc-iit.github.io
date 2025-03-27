# Shared Memory Allocators

This section gives an example of how to use allocators in shared memory.
We use MPI as a way to spawn multiple processes. The objective of this
tutorial is to show how shared memory allocators are setup.

## Test Function
```cpp
template <typename AllocT>
AllocT *TestAllocatorMpi() {
  int rank;
  MPI_Comm_rank(MPI_COMM_WORLD, &rank);
  if (rank == 0) {
    PretestRank0<AllocT>();
  }
  MPI_Barrier(MPI_COMM_WORLD);
  if (rank != 0) {
    PretestRankN();
  }
  return HSHM_MEMORY_MANAGER->GetAllocator<AllocT>(alloc_id);
}
```

This is the main function that will be called. 
PretestRank0 will be called only on rank 0.
PretestRankN is called on every other rank.

## Create Shared Memory
```cpp
template <typename AllocT>
void PretestRank0() {
  std::string shm_url = "test_allocators";
  AllocatorId alloc_id(1, 0);
  auto mem_mngr = HSHM_MEMORY_MANAGER;
  mem_mngr->CreateBackend<PosixShmMmap>(hipc::MemoryBackendId::Get(0),
                                        hshm::Unit<size_t>::Megabytes(100),
                                        shm_url);
  mem_mngr->CreateAllocator<AllocT>(hipc::MemoryBackendId::Get(0), alloc_id, 0);
}
```

This function creates the shared memory segment. It first creates a 100MB
shared-memory backend and then attaches an allocator to that backend.

## Connect to shared memory
```cpp
void PretestRankN() {
  std::string shm_url = "test_allocators";
  AllocatorId alloc_id(1, 0);
  auto mem_mngr = HSHM_MEMORY_MANAGER;
  mem_mngr->AttachBackend(MemoryBackendType::kPosixShmMmap, shm_url);
}
```

This function will attach to the allocator. AttachBackend will read the
header of the backend to see which allocator is on it. It will then
automatically register that allocator in the ``HSHM_MEMORY_MANAGER``.