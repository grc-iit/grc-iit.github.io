# Long-Running Tasks

Long-running (i.e., periodic) tasks are periodically scheduled on an interval.
This can be used for things like monitoring and batching requests.

Below is an example of PollStatsTask, which gets periodically scheduled.
```cpp
struct PollStatsTask : public Task, TaskFlags<TF_SRL_SYM> {
  OUT BdevStats stats_;

  /** SHM default constructor */
  HSHM_INLINE_CROSS_FUN
  explicit PollStatsTask(const hipc::CtxAllocator<CHI_ALLOC_T> &alloc)
      : Task(alloc) {}

  /** Emplace constructor */
  HSHM_INLINE_CROSS_FUN
  explicit PollStatsTask(const hipc::CtxAllocator<CHI_ALLOC_T> &alloc,
                         const TaskNode &task_node, const PoolId &pool_id,
                         const DomainQuery &dom_query, u32 period_ms)
      : Task(alloc) {
    // Initialize task
    task_node_ = task_node;
    pool_ = pool_id;
    method_ = Method::kPollStats;
    if (period_ms) {
      task_flags_.SetBits(TASK_PERIODIC);
      prio_ = TaskPrioOpt::kHighLatency;
    } else {
      task_flags_.SetBits(0);
      prio_ = TaskPrioOpt::kLowLatency;
    }
    dom_query_ = dom_query;

    SetPeriodMs(period_ms);
    HILOG(kInfo, "PollStatsTask: period_ms={}", period_ms);
  } 
};
```

There are two things that make a task scheduled periodically.
1. ``task_flags_.SetBits(TASK_PERIODIC)``: This will mark the task as periodically scheduled. There is now a
``TASK_LONG_RUNNING`` flag which is an alias to ``TASK_PERIODIC``.
1. ``SetPeriodMs(period_ms)``: This sets the minimum amount of time to elapse before rescheduling this task.

There are several different timing functions:
1. ``SetPeriodNs``
1. ``SetPeriodUs``
1. ``SetPeriodMs``
1. ``SetPeriodSec``
1. ``SetPeriodMin``
