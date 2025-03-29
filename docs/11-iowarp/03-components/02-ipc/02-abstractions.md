# Memory Abstractions

The main purpose of hermes-shm is to provide data structures and allocators for managing memory.
This can be both private memory and shared memory. This section details the primary
abstractions used to provide memory management in this library.

## Memory Backend

A memory backend is a region of contiguous memory. Allocators such as ``malloc`` initially reserve
a large segment of memory to avoid frequent system calls for memory allocation. These memory backends
can be for either private or shared memory. 

There are several backends currently supported (``hermes_shm/memory/backend/*``):
1. ``ArrayBackend``: takes as input a pointer to memory that was already allocated.
Works only for private memory.
2. ``MallocBackend``: calls ``malloc`` to allocate a segment of memory
3. ``PosixMmapBackend``: Uses ``mmap`` or its equivalent for Windows
to map a segment of private memory. Similar to ``MallocBackend``.
4. ``PosixShmMmap``: Uses ``mmap`` or its equivalent for Windows to
map a segment of shared memory.
5. ``CudaShmMmap``: Uses ``mmap`` + cudaHostRegister to allocate memory 
shared across processes and GPU.
6. ``RocmShmMmap``: Uses ``mmap`` + hipHostRegister to allocate memory
shared across processes and GPU.

## Allocator

A memory allocator is used to manage a memory backend. Its objective is
to minimize the number of pages faulted into memory while maintaining
high performance.

Currently, the following are supported (``hermes_shm/memory/allocator/*``):
1. ``MallocAllocator``: Uses malloc internally for allocating. Ignores the
provided backend completely.
2. ``ScalablePageAllocator``: Allocates pages using a single table shared
across processes. The table caches different sizes of pages. A lock is
used to ensure access to the table is synchronized.
3. ``ThreadLocalAllocator``: Caches different size of pages, but in thread-local
storage, removing the lock from ScalablePageAllocator. This is currently
the recommended allocator to use for shared memory.

The core API that the allocator supports is shown below:
```cpp
template <typename CoreAllocT>
class BaseAllocator : public CoreAllocT {
/**
   * Create the shared-memory allocator with \a id unique allocator id over
   * the particular slot of a memory backend.
   *
   * The shm_init function is required, but cannot be marked virtual as
   * each allocator has its own arguments to this method. Though each
   * allocator must have "id" as its first argument.
   * */
  template <typename... Args>
  HSHM_CROSS_FUN void shm_init(AllocatorId id, Args... args);

  /**
   * Deserialize allocator from a buffer.
   * */
  HSHM_CROSS_FUN
  void shm_deserialize(char *buffer, size_t buffer_size);

  /**====================================
   * Core Allocator API
   * ===================================*/
 public:
  /**
   * Allocate a region of memory of \a size size
   * */
  HSHM_CROSS_FUN
  OffsetPointer AllocateOffset(const MemContext &ctx, size_t size);

  /**
   * Allocate a region of memory of \a size size
   * and \a alignment alignment. Assumes that
   * alignment is not 0.
   * */
  HSHM_CROSS_FUN
  OffsetPointer AlignedAllocateOffset(const MemContext &ctx, size_t size,
                                      size_t alignment);

  /**
   * Reallocate \a pointer to \a new_size new size.
   * Assumes that p is not kNulFullPtr.
   *
   * @return true if p was modified.
   * */
  HSHM_CROSS_FUN
  OffsetPointer ReallocateOffsetNoNullCheck(const MemContext &ctx,
                                            OffsetPointer p, size_t new_size);

  /**
   * Free the memory pointed to by \a ptr Pointer
   * */
  HSHM_CROSS_FUN
  void FreeOffsetNoNullCheck(const MemContext &ctx, OffsetPointer p);

  /**
   * Create a thread-local storage segment. This storage
   * is unique even across processes.
   * */
  HSHM_CROSS_FUN
  void CreateTls(MemContext &ctx) { CoreAllocT::CreateTls(ctx); }

  /**
   * Free a thread-local storage segment.
   * */
  HSHM_CROSS_FUN
  void FreeTls(const MemContext &ctx) { CoreAllocT::FreeTls(ctx); }
};
```

### Memory Context

The memory context object is used to store hints on memory allocation.
The main hint that this object supports currently is Thread ID.

In most cases, the memory context will be ``HSHM_DEFAULT_MEM_CTX``,
which stores a null thread id. This indicates to a memory allocator
that it should scan thread-local storage for the current thread id.

## Memory Manager

The memory manager is where allocators and backends are stored. This
class is accessed using a singleton macro ``HSHM_MEMORY_MANAGER``.
Use this class to create allocators and backends.

Below is an example of how one would create a memory allocator for a single process.
```cpp
#include "hermes_shm/hermes_shm.h"

int main() {
  std::string shm_url = "test_allocators";
  auto mem_mngr = HSHM_MEMORY_MANAGER;
  hshm::AllocatorId alloc_id(0, 0);
  
  // Create a 1GB backend with id 0
  mem_mngr->CreateBackend<PosixShmMmap>(
      hipc::MemoryBackendId::Get(0), hshm::Unit<size_t>::Gigabytes(1), shm_url);

  // Create an allocator over backend 0
  mem_mngr->CreateAllocator<AllocT>(hipc::MemoryBackendId::Get(0), alloc_id, 0);

  // Unregister allocator
  mem_mngr->UnregisterAllocator(alloc_id);

  // Destroy backend
  mem_mngr->DestroyBackend(hipc::MemoryBackendId::Get(0));
}
```

## Thread Model

Many memory allocators rely on a specific thread-model to achieve scalability
using thread-local storage. Different thread models have different APIs and
implementations for this. For that reason, we implement a factory of different
thread models to handle this circumstance. This is a compile-time factory.

The following thread models are currently supported (``hermes_shm/thread/thread_model/*``):
1. ``Pthreads``: Threads for Linux / Mac.
2. ``Windows``: Threads for Windows.
3. ``Argobots``: The user-level thread library for Mochi framework.
4. ``Cuda``: CUDA threads on GPU.
5. ``Rocm``: ROCm threads on GPU.

The basic API for the thread model is as follows:
```cpp
  /** Yield the current thread for a period of time */
  HSHM_CROSS_FUN
  void SleepForUs(size_t us);

  /** Yield thread time slice */
  HSHM_CROSS_FUN
  void Yield();

  /** Create thread-local storage */
  template <typename TLS>
  HSHM_CROSS_FUN bool CreateTls(ThreadLocalKey &key, TLS *data);

  /** Get thread-local storage */
  template <typename TLS>
  HSHM_CROSS_FUN TLS *GetTls(const ThreadLocalKey &key);

  /** Create thread-local storage */
  template <typename TLS>
  HSHM_CROSS_FUN bool SetTls(ThreadLocalKey &key, TLS *data);

  /** Get the TID of the current thread */
  HSHM_CROSS_FUN
  ThreadId GetTid();
```

The thread model for the application is stored in a singleton that
can be accessed using the macro ``HSHM_THREAD_MODEL``.

Below is an example of accessing the singleton:
```cpp
#include <hermes_shm/hermes_shm.h>

int main() {
  HERMES_THREAD_MODEL->GetTid();
}
```

