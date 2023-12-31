"use strict";(self.webpackChunkgnosis=self.webpackChunkgnosis||[]).push([[6238],{3905:(e,t,a)=>{a.d(t,{Zo:()=>c,kt:()=>k});var n=a(7294);function s(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function r(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){s(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,s=function(e,t){if(null==e)return{};var a,n,s={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(s[a]=e[a]);return s}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(s[a]=e[a])}return s}var l=n.createContext({}),d=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):r(r({},t),e)),a},c=function(e){var t=d(e.components);return n.createElement(l.Provider,{value:t},e.children)},p="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,s=e.mdxType,i=e.originalType,l=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),p=d(a),m=s,k=p["".concat(l,".").concat(m)]||p[m]||u[m]||i;return a?n.createElement(k,r(r({ref:t},c),{},{components:a})):n.createElement(k,r({ref:t},c))}));function k(e,t){var a=arguments,s=t&&t.mdxType;if("string"==typeof e||s){var i=a.length,r=new Array(i);r[0]=m;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o[p]="string"==typeof e?e:s,r[1]=o;for(var d=2;d<i;d++)r[d]=a[d];return n.createElement.apply(null,r)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},3896:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>r,default:()=>u,frontMatter:()=>i,metadata:()=>o,toc:()=>d});var n=a(7462),s=(a(7294),a(3905));const i={},r="Runtime",o={unversionedId:"hermes/components/runtime",id:"hermes/components/runtime",title:"Runtime",description:"Hermes is built as a plugin to the Hermes Runtime, a distributed task processing framework",source:"@site/docs/03-hermes/06-components/07-runtime.md",sourceDirName:"03-hermes/06-components",slug:"/hermes/components/runtime",permalink:"/docs/hermes/components/runtime",draft:!1,tags:[],version:"current",sidebarPosition:7,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Data Staging",permalink:"/docs/hermes/components/data-staging"},next:{title:"Distributed Metadata",permalink:"/docs/hermes/components/distributed-metadata"}},l={},d=[{value:"Task Repos and Task Libraries",id:"task-repos-and-task-libraries",level:2},{value:"Bootstrapping a Task Library",id:"bootstrapping-a-task-library",level:2},{value:"Overview of Bootstrapped Code",id:"overview-of-bootstrapped-code",level:3},{value:"CreateTask",id:"createtask",level:3},{value:"Task Struct",id:"task-struct",level:4},{value:"Task Client",id:"task-client",level:4},{value:"Task Server",id:"task-server",level:4},{value:"DestructTask",id:"destructtask",level:3},{value:"Overview of Task Submission and Queueing",id:"overview-of-task-submission-and-queueing",level:2},{value:"Creating Custom Tasks",id:"creating-custom-tasks",level:2},{value:"Modify <code>compress_methods.yaml</code>",id:"modify-compress_methodsyaml",level:3},{value:"Modify <code>compress_tasks.h</code>",id:"modify-compress_tasksh",level:3},{value:"The <code>TaskFlags</code> base class",id:"the-taskflags-base-class",level:4},{value:"Task Constructor",id:"task-constructor",level:4},{value:"Modify <code>compress.cc</code>",id:"modify-compresscc",level:3},{value:"Modify <code>compress.h</code>",id:"modify-compressh",level:3},{value:"Task Methods",id:"task-methods",level:3},{value:"Registering a Task Library",id:"registering-a-task-library",level:2},{value:"Task Grouping, Worker Polling, and Deadlock Prevention",id:"task-grouping-worker-polling-and-deadlock-prevention",level:2},{value:"Building a Replicatable Task",id:"building-a-replicatable-task",level:2},{value:"Building a Data-Intensive, RDMA-Capable Task",id:"building-a-data-intensive-rdma-capable-task",level:2}],c={toc:d},p="wrapper";function u(e){let{components:t,...a}=e;return(0,s.kt)(p,(0,n.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"runtime"},"Runtime"),(0,s.kt)("p",null,"Hermes is built as a plugin to the Hermes Runtime, a distributed task processing framework\ncapable of scheduling, replicating, distributing, processing, monitoring, and\nload balancing arbitrary tasks. Tasks define various properties which provide\ncontrol over scheduling decisions, memory management, and concurrency.\nThis section will discuss the design of the Hermes Runtime and how to develop\ncustom tasks."),(0,s.kt)("h2",{id:"task-repos-and-task-libraries"},"Task Repos and Task Libraries"),(0,s.kt)("p",null,"The Hermes Runtime is used for executing arbitrary tasks. Developers can create\nnew tasks and release them using a decentralized package management design,\nsimilar to spack. This is accomplished through ",(0,s.kt)("strong",{parentName:"p"},"task repos"),"."),(0,s.kt)("p",null,"A task repo is a directory which contains a set of ",(0,s.kt)("strong",{parentName:"p"},"task libraries"),". A\ntask library (or lib) provides the functionality to submit and execute tasks.\nTask libs follow the single responsibility principle. Multiple task libs should\nbe created to separate unrelated or loosely related functionality."),(0,s.kt)("p",null,'For example, the Hermes Runtime has a task repo named "tasks_required" located under the hrun directory of the Hermes repo.'),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},"tasks_required\n\u251c\u2500\u2500 CMakeLists.txt\n\u251c\u2500\u2500 hrun_admin\n\u2502\xa0\xa0 \u251c\u2500\u2500 CMakeLists.txt\n\u2502\xa0\xa0 \u251c\u2500\u2500 include\n\u2502\xa0\xa0 \u2514\u2500\u2500 src\n\u251c\u2500\u2500 proc_queue\n\u2502\xa0\xa0 \u251c\u2500\u2500 CMakeLists.txt\n\u2502\xa0\xa0 \u251c\u2500\u2500 include\n\u2502\xa0\xa0 \u2514\u2500\u2500 src\n\u251c\u2500\u2500 remote_queue\n\u2502\xa0\xa0 \u251c\u2500\u2500 CMakeLists.txt\n\u2502\xa0\xa0 \u251c\u2500\u2500 include\n\u2502\xa0\xa0 \u2514\u2500\u2500 src\n\u251c\u2500\u2500 small_message\n\u2502\xa0\xa0 \u251c\u2500\u2500 CMakeLists.txt\n\u2502\xa0\xa0 \u251c\u2500\u2500 include\n\u2502\xa0\xa0 \u2514\u2500\u2500 src\n\u251c\u2500\u2500 TASK_NAME\n\u2502\xa0\xa0 \u251c\u2500\u2500 CMakeLists.txt\n\u2502\xa0\xa0 \u251c\u2500\u2500 include\n\u2502\xa0\xa0 \u2514\u2500\u2500 src\n\u251c\u2500\u2500 worch_proc_round_robin\n\u2502\xa0\xa0 \u251c\u2500\u2500 CMakeLists.txt\n\u2502\xa0\xa0 \u251c\u2500\u2500 include\n\u2502\xa0\xa0 \u2514\u2500\u2500 src\n\u2514\u2500\u2500 worch_queue_round_robin\n    \u251c\u2500\u2500 CMakeLists.txt\n    \u251c\u2500\u2500 include\n    \u2514\u2500\u2500 src\n")),(0,s.kt)("p",null,"The tasks_required directory contains tasks which are required for the Hermes Runtime to function. These tasks are non-negotiable and will always be registered automatically by the runtime."),(0,s.kt)("h2",{id:"bootstrapping-a-task-library"},"Bootstrapping a Task Library"),(0,s.kt)("p",null,"A Task Library implements the following concepts:"),(0,s.kt)("ol",null,(0,s.kt)("li",{parentName:"ol"},(0,s.kt)("strong",{parentName:"li"},"Task"),": A struct containing the parameters to execute"),(0,s.kt)("li",{parentName:"ol"},(0,s.kt)("strong",{parentName:"li"},"Task Server"),": A class responsible for executing tasks. This is\nreleased as a shared object."),(0,s.kt)("li",{parentName:"ol"},(0,s.kt)("strong",{parentName:"li"},"Task Client"),": A class responsible for submitting tasks to the hermes runtime. This is released as a header file, which is included by the client program.")),(0,s.kt)("p",null,'To easily bootstrap a task lib, Hermes provides a python-based code generator called make_task. This script assumes a Linux system at this time (Windows has a different pathing system). Let\'s say you want to create a new task lib named "compress" for creating a factory of compression libraries. The task lib is located in the task repo ${HOME}/my_task_repo.'),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"codegen/make_task ${HOME}/my_task_repo/compress\n")),(0,s.kt)("p",null,"This will create a task lib with the following directory structure:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"compress\n\u251c\u2500\u2500 CMakeLists.txt\n\u251c\u2500\u2500 include\n\u2502\xa0\xa0 \u2514\u2500\u2500 compress\n\u2502\xa0\xa0     \u251c\u2500\u2500 compress.h\n\u2502\xa0\xa0     \u251c\u2500\u2500 compress_lib_exec.h\n\u2502\xa0\xa0     \u251c\u2500\u2500 compress_methods.h\n\u2502\xa0\xa0     \u251c\u2500\u2500 compress_methods.yaml\n\u2502\xa0\xa0     \u2514\u2500\u2500 compress_tasks.h\n\u2514\u2500\u2500 src\n    \u251c\u2500\u2500 CMakeLists.txt\n    \u2514\u2500\u2500 compress.cc\n")),(0,s.kt)("p",null,"The main files to edit:"),(0,s.kt)("ol",null,(0,s.kt)("li",{parentName:"ol"},(0,s.kt)("inlineCode",{parentName:"li"},"include/compress/compress.h"),":\nThis is the ",(0,s.kt)("strong",{parentName:"li"},"Task Client"),". User applications (e.g., VPIC, WRF) include this file and use it to submit tasks to the Hermes Runtime."),(0,s.kt)("li",{parentName:"ol"},(0,s.kt)("inlineCode",{parentName:"li"},"include/compress/compress_methods.yaml"),":\nDefines the name of all methods that will be implemented in the ",(0,s.kt)("strong",{parentName:"li"},"Task Server"),". This file will be converted into an enumeration."),(0,s.kt)("li",{parentName:"ol"},(0,s.kt)("inlineCode",{parentName:"li"},"include/compress/compress_tasks.h"),":\nDefines the ",(0,s.kt)("strong",{parentName:"li"},"Tasks")," that can be constructed. Tasks are implemented as structs that are compatible with shared memory.\nTasks will only implement methods to serialize and copy the task. The actual function of the task is implemented\nin the Task Server."),(0,s.kt)("li",{parentName:"ol"},(0,s.kt)("inlineCode",{parentName:"li"},"src/compress/compress.cc"),":\nThis is the ",(0,s.kt)("strong",{parentName:"li"},"Task Server"),". This file will be compiled into a shared object that can be dynamically loaded by the runtime. The task server must include handlers which take as input a task struct and then run a function over it.")),(0,s.kt)("p",null,"Files that are automatically generated:"),(0,s.kt)("ol",null,(0,s.kt)("li",{parentName:"ol"},(0,s.kt)("inlineCode",{parentName:"li"},"include/compress/compress_lib_exec.h"),":\nThis is included in ",(0,s.kt)("inlineCode",{parentName:"li"},"compress.cc")," automatically.\nThis is an internal file not meant to be included anywhere else.\nThis file produces code to route tasks to functions in compress.cc."),(0,s.kt)("li",{parentName:"ol"},(0,s.kt)("inlineCode",{parentName:"li"},"include/compress/compress_methods.h"),":\nThis defines an enumeration containing all methods defined\nin compress_methods.yaml. It is included automatically by ",(0,s.kt)("inlineCode",{parentName:"li"},"compress_tasks.h"))),(0,s.kt)("h3",{id:"overview-of-bootstrapped-code"},"Overview of Bootstrapped Code"),(0,s.kt)("p",null,"The bootstrap method will create a task library with the following methods: Create, Destruct, and Custom. Create and Destruct are required\nby all Task Libraries and should not be removed. Custom is optional and provides an overview of the methods available to you for creating custom tasks. The code generated can be compiled immediately by adding it as a subdirectory to the root CMake of the task repo."),(0,s.kt)("h3",{id:"createtask"},"CreateTask"),(0,s.kt)("p",null,"CreateTask is responsible for initially registering a task state in the Hermes Runtime. This is analgous to class constructors."),(0,s.kt)("h4",{id:"task-struct"},"Task Struct"),(0,s.kt)("p",null,"In ",(0,s.kt)("inlineCode",{parentName:"p"},"include/compress/compress_tasks.h")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-cpp"},'using hrun::Admin::CreateTaskStateTask;\nstruct ConstructTask : public CreateTaskStateTask {\n  /** SHM default constructor */\n  HSHM_ALWAYS_INLINE explicit\n  ConstructTask(hipc::Allocator *alloc)\n  : CreateTaskStateTask(alloc) {}\n\n  /** Emplace constructor */\n  HSHM_ALWAYS_INLINE explicit\n  ConstructTask(hipc::Allocator *alloc,\n                const TaskNode &task_node,\n                const DomainId &domain_id,\n                const std::string &state_name,\n                const TaskStateId &id,\n                const std::vector<PriorityInfo> &queue_info)\n      : CreateTaskStateTask(alloc, task_node, domain_id, state_name,\n                            "compress", id, queue_info) {\n    // Custom params\n  }\n\n  HSHM_ALWAYS_INLINE\n  ~ConstructTask() {\n    // Custom params\n  }\n};\n')),(0,s.kt)("p",null,"This file defines the task struct that will be communicated between clients and the runtime. This task must always include a minimum of the above parameters. The order of parameters\nshould not be changed. Any additional parameters should be appended after queue_info."),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"alloc"),": The shared-memory allocator the task was allocated with"),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"task_node"),': Tasks can spawn subtasks. This ability we refer to as Task Graphs. TaskNode stores the root of the Task Graph and the depth of this task in the Task Graph. For "Root" tasks, the TaskNode will be the unique ID of the task with a depth of 0.'),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"domain_id"),": Tasks can be scheduled or replicated over a domain of nodes. A domain is analogous to an MPI communicator. However, domains theoretically support dynamic node registration, unlike MPI."),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"state_name"),": This is a semantic, unique, user-defined name to give the state. The state can be queried using this name in the future."),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"state_id"),": This is a unique integer ID to give the state. This is an optional parameter that can be equal to null. When null, the state id is allocated automatically by the runtime and returned as the ",(0,s.kt)("inlineCode",{parentName:"li"},"id_")," parameter in the base class CreateTaskStateTask."),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"queue_info"),": Provides control over the queue to spawn to interact with this state. Each task state")),(0,s.kt)("h4",{id:"task-client"},"Task Client"),(0,s.kt)("p",null,"In ",(0,s.kt)("inlineCode",{parentName:"p"},"include/compress/compress.h"),":"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-cpp"},"/** Async create a task state */\nHSHM_ALWAYS_INLINE\nLPointer<ConstructTask> AsyncCreate(const TaskNode &task_node,\n                                    const DomainId &domain_id,\n                                    const std::string &state_name) {\n  id_ = TaskStateId::GetNull();\n  QueueManagerInfo &qm = HRUN_CLIENT->server_config_.queue_manager_;\n  std::vector<PriorityInfo> queue_info = {\n      {1, 1, qm.queue_depth_, 0},\n      {1, 1, qm.queue_depth_, QUEUE_LONG_RUNNING},\n      {qm.max_lanes_, qm.max_lanes_, qm.queue_depth_, QUEUE_LOW_LATENCY}\n  };\n  return HRUN_ADMIN->AsyncCreateTaskState<ConstructTask>(\n      task_node, domain_id, state_name, id_, queue_info);\n}\nHRUN_TASK_NODE_ROOT(AsyncCreate)\ntemplate<typename ...Args>\nHSHM_ALWAYS_INLINE\nvoid CreateRoot(Args&& ...args) {\n  LPointer<ConstructTask> task =\n      AsyncCreateRoot(std::forward<Args>(args)...);\n  task->Wait();\n  id_ = task->id_;\n  queue_id_ = QueueId(id_);\n  HRUN_CLIENT->DelTask(task);\n}\n")),(0,s.kt)("p",null,"This code is called in client programs, such as VPIC, HACC, etc. ",(0,s.kt)("inlineCode",{parentName:"p"},"CreateRoot")," calls ",(0,s.kt)("inlineCode",{parentName:"p"},"AsyncCreateRoot"),", which will allocate, construct, and enqueue the CreateTask. ",(0,s.kt)("inlineCode",{parentName:"p"},"HRUN_TASK_NODE_ROOT"),' is a macro that creates the\nAsyncCreateRoot method. The "Root" suffix implies that the method\nis going to spawn a task that represents the root of a Task Graph.\nThis distinction is needed for avoiding potential deadlocks and\nconsistency problems.'),(0,s.kt)("h4",{id:"task-server"},"Task Server"),(0,s.kt)("p",null,"In ",(0,s.kt)("inlineCode",{parentName:"p"},"src/compress.cc"),":"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-cpp"},"void Construct(ConstructTask *task, RunContext &rctx) {\n  task->SetModuleComplete();\n}\n")),(0,s.kt)("p",null,"This is the method that the ConstructTask will be routed to."),(0,s.kt)("h3",{id:"destructtask"},"DestructTask"),(0,s.kt)("p",null,"The destruct task is responsible for releasing the Task State when the runtime is shutting down or when the user intentionally frees it. The DestructTask defined in ",(0,s.kt)("inlineCode",{parentName:"p"},"compress_tasks.h")," should never be modified, and is the same across all tasks. It should not take additional parameters since the runtime shutdown process will fail."),(0,s.kt)("h2",{id:"overview-of-task-submission-and-queueing"},"Overview of Task Submission and Queueing"),(0,s.kt)("p",null,"Communication with the Hermes Runtime is accomplished through queueing.\nThe data structure is termed MultiQueue. The MultiQueue is a shared-memory, lock-free, concurrent priority queue. For each Task State,\nan associated MultiQueue will be created. MultiQueues are defined\nby a vector of PriorityInfo structs."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-cpp"},"struct PriorityInfo {\n  u32 max_lanes_;       /**< Maximum number of lanes in the queue */\n  u32 num_lanes_;       /**< Current number of lanes in use */\n  u32 depth_;           /**< The maximum depth of individual lanes */\n  bitfield32_t flags_;  /**< Scheduling hints for the queue */\n};\n")),(0,s.kt)("p",null,"A lane is a multiple-producer, single-consumer lock-free shared memory\nqueue. Each lane is scheduled on workers independently. A lane represents\nthe unit of concurrency in the Hermes Runtime."),(0,s.kt)("p",null,"In ",(0,s.kt)("inlineCode",{parentName:"p"},"include/compress/compress.h"),":"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-cpp"},"/** Async create a task state */\nHSHM_ALWAYS_INLINE\nLPointer<ConstructTask> AsyncCreate(const TaskNode &task_node,\n                                    const DomainId &domain_id,\n                                    const std::string &state_name) {\n  id_ = TaskStateId::GetNull();\n  QueueManagerInfo &qm = HRUN_CLIENT->server_config_.queue_manager_;\n  std::vector<PriorityInfo> queue_info = {\n      {1, 1, qm.queue_depth_, 0},\n      {1, 1, qm.queue_depth_, QUEUE_LONG_RUNNING},\n      {qm.max_lanes_, qm.max_lanes_, qm.queue_depth_, QUEUE_LOW_LATENCY}\n  };\n  return HRUN_ADMIN->AsyncCreateTaskState<ConstructTask>(\n      task_node, domain_id, state_name, id_, queue_info);\n}\n")),(0,s.kt)("p",null,"This will create a MultiQueue with three priorities. Each element of\nthe vector is a Priority. Priority 0 will contain a single lane with\nthe user-configured default queue depth. Priority 1 will also\nbe a single lane, but with QUEUE_LONG_RUNNING flag. Tasks in these\nlanes will be scheduled on diferent workers for QUEUE_LOW_LATENCY\nlanes for performance reasons."),(0,s.kt)("h2",{id:"creating-custom-tasks"},"Creating Custom Tasks"),(0,s.kt)("p",null,"Now that the task library has been bootstrapped, this section will go over how to add new tasks."),(0,s.kt)("h3",{id:"modify-compress_methodsyaml"},"Modify ",(0,s.kt)("inlineCode",{parentName:"h3"},"compress_methods.yaml")),(0,s.kt)("p",null,"Initially, the file contains:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-yaml"},"kCustom: 0\n")),(0,s.kt)("p",null,"For compression, let's say we want to have two methods: Compress and\nDecompress. We would modify this file to contain the following:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-yaml"},"kCompress: 0\nkDecompress: 1\n")),(0,s.kt)("p",null,"We then need to refresh the methods in this repo. This will autogenerate\ncode needed by the runtime to route tasks to these functions. This\nis accomplished through the refresh_methods code generator:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"codegen/refresh_methods ${HOME}/my_task_repo\n")),(0,s.kt)("p",null,"This will refresh all methods in the my_task_repo. This should be\na very fast operation, so it just does it for all tasks in the\ndirectory to avoid specifying a specific task library."),(0,s.kt)("h3",{id:"modify-compress_tasksh"},"Modify ",(0,s.kt)("inlineCode",{parentName:"h3"},"compress_tasks.h")),(0,s.kt)("p",null,"Let's add the following task for representing the compression method."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-cpp"},"struct CompressTask : public Task, TaskFlags<TF_SRL_SYM> {\n  IN int compress_method_;\n  IN hipc::ShmArchive<hipc::string> data_;\n\n  /** SHM default constructor */\n  HSHM_ALWAYS_INLINE explicit\n  CompressTask(hipc::Allocator *alloc) : Task(alloc) {}\n\n  /** Emplace constructor */\n  HSHM_ALWAYS_INLINE explicit\n  CompressTask(hipc::Allocator *alloc,\n             const TaskNode &task_node,\n             const DomainId &domain_id,\n             const TaskStateId &state_id,\n             int compress_method,\n             const std::string &data) : Task(alloc) {\n    // Initialize task\n    task_node_ = task_node;\n    lane_hash_ = 0;\n    prio_ = TaskPrio::kLowLatency;\n    task_state_ = state_id;\n    method_ = Method::kCustom;\n    task_flags_.SetBits(TASK_UNORDERED | TASK_LANE_ANY);\n    domain_id_ = domain_id;\n\n    // Custom params\n    compress_method_ = compress_method;\n    HSHM_MAKE_AR(data_, alloc, data);\n  }\n\n  /** (De)serialize message call */\n  template<typename Ar>\n  void SerializeStart(Ar &ar) {\n    task_serialize<Ar>(ar);\n    ar(compress_method_, data_);\n  }\n\n  /** (De)serialize message return */\n  template<typename Ar>\n  void SerializeEnd(u32 replica, Ar &ar) {\n  }\n\n  /** Create group */\n  HSHM_ALWAYS_INLINE\n  u32 GetGroup(hshm::charbuf &group) {\n    return TASK_UNORDERED;\n  }\n};\n")),(0,s.kt)("h4",{id:"the-taskflags-base-class"},"The ",(0,s.kt)("inlineCode",{parentName:"h4"},"TaskFlags")," base class"),(0,s.kt)("p",null,"The CompressTask inherits from TaskFlags, which defines compile-time\nproperties of the task -- particularly the class methods."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-cpp"},"struct CompressTask : public Task, TaskFlags<TF_SRL_SYM> {\n// };\n")),(0,s.kt)("p",null,"Here, the TaskFlags has the parameter TF_SRL_SYM. This constant implies\nthe task supports serialization methods. These methods will be called\ninternally when a task gets dispersed to remote nodes."),(0,s.kt)("p",null,"SerializeStart is called when a task is being shipped to a remote\nnode for execution. SerializeEnd is called when returning from\nthe remote node. In this way, the task can store both the input\nand output of the operation performed. This avoids having a separate\ncompletion queue."),(0,s.kt)("p",null,"There are a few kinds of tasks:"),(0,s.kt)("ol",null,(0,s.kt)("li",{parentName:"ol"},"TF_LOCAL: tasks that execute only on the local node. They cannot\nbe shipped to remote nodes and they cannot be replicated."),(0,s.kt)("li",{parentName:"ol"},"TF_SRL_SYM: tasks that execute potentially on a remote node. They\ncannot be replicated. Must implement SerializeStart and SerializeEnd."),(0,s.kt)("li",{parentName:"ol"},"TF_SRL_SYM | TF_REPLICA: tasks that can be shipped to a remote node\nand support replication. Must implement ReplicateStart, ReplicateEnd, Dup, DupEnd."),(0,s.kt)("li",{parentName:"ol"},"TF_SRL_ASYM_START: task has asymmetric serialization and deserialization methods for input variables (SaveStart, LoadStart instead of SerializeStart)"),(0,s.kt)("li",{parentName:"ol"},"TF_SRL_ASYM_END: task has asymmetric serialization and deserialization methods for output variables (SaveEnd, LoadEnd instead of SerializeEnd)")),(0,s.kt)("p",null,"TODO: explain what each candidate method does"),(0,s.kt)("h4",{id:"task-constructor"},"Task Constructor"),(0,s.kt)("p",null,"We will provide a brief overview of an example implementaion of CompressTask. DecompressTask looks similar, so we don't repeat."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-cpp"},"/** Emplace constructor */\nHSHM_ALWAYS_INLINE explicit\nCompressTask(hipc::Allocator *alloc,\n           const TaskNode &task_node,\n           const DomainId &domain_id,\n           const TaskStateId &state_id,\n           int compress_method,\n           const std::string &data) : Task(alloc) {\n  // Initialize task\n  task_node_ = task_node;\n  lane_hash_ = 0;\n  prio_ = TaskPrio::kLowLatency;\n  task_state_ = state_id;\n  method_ = Method::kCustom;\n  task_flags_.SetBits(TASK_UNORDERED | TASK_LANE_ANY);\n  domain_id_ = domain_id;\n\n  // Custom params\n  compress_method_ = compress_method;\n  HSHM_MAKE_AR(data_, alloc, data);\n}\n")),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"lane_hash_"),": The lane of the MultiQueue a request is keyed to if\nTASK_LANE_ANY is not set under the task flags. This gives concurrency control. Tasks in\nthe same lane will be executed sequentially if necessary."),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"prio_"),": The priority of the task. KLowLatency is priority 2."),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"method_"),": The method the task will be routed to by the runtime"),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"task_flags_"),": Various flags that can improve performance")),(0,s.kt)("h3",{id:"modify-compresscc"},"Modify ",(0,s.kt)("inlineCode",{parentName:"h3"},"compress.cc")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-cpp"},"void Compress(CompressTask *task, RunContext &rctx) {\n  task->SetModuleComplete();\n}\n\nvoid Decompress(DecompressTask *task, RunContext &rctx) {\n  task->SetModuleComplete();\n}\n")),(0,s.kt)("p",null,"Create the callback functions in the task server.\ntask->SetModuleComplete() indicates that the task is completely finished.\nLong-running tasks should not use this function."),(0,s.kt)("h3",{id:"modify-compressh"},"Modify ",(0,s.kt)("inlineCode",{parentName:"h3"},"compress.h")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-cpp"},"HSHM_ALWAYS_INLINE\nvoid AsyncCompressConstruct(CompressTask *task,\n                          const TaskNode &task_node,\n                          const DomainId &domain_id,\n                          int compress_method,\n                          const std::string &data) {\n  HRUN_CLIENT->ConstructTask<CompressTask>>(\n      task, task_node, domain_id, id_, compress_method, data);\n}\nHSHM_ALWAYS_INLINE\nvoid CompressRoot(const DomainId &domain_id,\n                  int compress_method,\n                  const std::string &data) {\n  LPointer<hrunpq::TypedPushTask<CompressTask>> task = AsyncCompressRoot(domain_id);\n  task.ptr_->Wait();\n}\nHRUN_TASK_NODE_PUSH_ROOT(Compress);\n")),(0,s.kt)("p",null,"CompressRoot will be called by clients directly.\nHRUN_TASK_NODE_PUSH_ROOT will create various helper methods that\neventually call AsyncCompressConstruct. LPointer is a struct that\ncontains a shared-memory pointer to a task and its corresponding\nprivate-memory pointer."),(0,s.kt)("p",null,"hrunpq::TypedPushTask represents a task that is stored inside of the\n",(0,s.kt)("strong",{parentName:"p"},"process queue"),". The process queue is a single-priority queue that\nconnects clients to the Hermes runtime. Tasks in this queue are keyed\nto lanes based on standard thread ID. This ensures that all tasks\noriginating from the same thread are in the same lane. This helps\ngive consistency guarantees for I/O operations."),(0,s.kt)("h3",{id:"task-methods"},"Task Methods"),(0,s.kt)("p",null,"The task methods will be discussed in sections 6, 7, and 8."),(0,s.kt)("h2",{id:"registering-a-task-library"},"Registering a Task Library"),(0,s.kt)("p",null,"After creating a new task library, it must be registered with\nthe Hermes Runtime. This can be done either programmatically or\nthrough configuration."),(0,s.kt)("p",null,"Through configuration, you must edit the Hermes runtime configuration.\nAn example configuration is stored in ",(0,s.kt)("inlineCode",{parentName:"p"},"${HERMES_ROOT}/config/hermes_server_default.yaml"),"."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-yaml"},'task_registry:\n  [\n    "hermes_mdm",\n    "hermes_blob_mdm",\n    "hermes_bucket_mdm",\n    "hermes_data_op",\n    "data_stager",\n    "posix_bdev",\n    "ram_bdev",\n    "compress",\n  ]\n')),(0,s.kt)("p",null,"This can be passed to the Hermes runtime using the HERMES_CONF environment\nvariable."),(0,s.kt)("h2",{id:"task-grouping-worker-polling-and-deadlock-prevention"},"Task Grouping, Worker Polling, and Deadlock Prevention"),(0,s.kt)("p",null,"This section will provide more insight on how queues are polled\nand processed in the Hermes Runtime to provide fine-grained control\nover scheduling and concurrency."),(0,s.kt)("p",null,"Tasks must all implement a function called ",(0,s.kt)("inlineCode",{parentName:"p"},"GetGroup"),". Task groups are used to enable look-ahead capabilities with safety. A ",(0,s.kt)("strong",{parentName:"p"},"Task Group")," represents a collection of tasks that modify the same metadata structure and need to be sequentially executed. For example, the Bucket ID is\nused as the group for calling the bucket methods GetSize and UpdateSize.\nThis ensures that GetSize and UpdateSize will be executed in sequence when\nmade to the same bucket. Certain operations do not require any synchronization (e.g., stateless methods) and can return a group of TASK_UNORDERED."),(0,s.kt)("p",null,"A ",(0,s.kt)("strong",{parentName:"p"},"Task Node")," represents the location of a task in the overall\ntask graph. There is no Task Graph data structure, it's a concept.\nWhen a task spawns a subtask, it can be conceptually be considered\nas a task graph. Tasks apart of the same task graph will be executed\nsimultaneously --regardless of group -- to prevent deadlocks in the\ncase where two tasks from the same graph are keyed to the same queue and lane."),(0,s.kt)("h2",{id:"building-a-replicatable-task"},"Building a Replicatable Task"),(0,s.kt)("p",null,"To make a task support replication, set the TF_REPLICA flag. This\nwill indicate that a task implements the replication methods."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-cpp"},"struct CompressTask : public Task, TaskFlags<TF_SRL_SYM | TF_REPLICA> {\n  IN compress_type_;\n  IN hipc::ShmArchive<hipc::string> data_;\n  OUT hipc::ShmArchive<hipc::vector<size_t>> sizes_;\n  OUT size_t final_size_;\n\n  /** (De)serialize message call */\n  template<typename Ar>\n  void SerializeStart(Ar &ar) {\n    task_serialize<Ar>(ar);\n    ar(compress_type_, data_);\n  }\n\n  /** (De)serialize message return */\n  template<typename Ar>\n  void SerializeEnd(u32 replica, Ar &ar) {\n    ar(sizes_, final_size_);\n  }\n\n  /** Duplicate message */\n  void Dup(hipc::Allocator *alloc, CustomTask &other) {\n    task_dup(other);\n    compress_type_ = other.compress_type_;\n    HSHM_MAKE_AR(data_, alloc, other.data_);\n  }\n\n  /** Process duplicate message output */\n  void DupEnd(u32 replica, CustomTask &dup_task) {\n    (*sizes_)[repclica] = other.size_;\n  }\n\n  /** Begin replication */\n  void ReplicateStart(u32 count) {\n    size_->resize(count);\n  }\n\n  /** Finalize replication */\n  void ReplicateEnd() {\n    size_t final_size_ = std::numeric_limits<size_t>::min();\n    for (size_t &size : sizes_) {\n      if (final_size_ > size) {\n        final_size_ = size;\n      }\n    }\n  }\n};\n")),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"SerializeStart"),": Will serialize and deserialize the ",(0,s.kt)("em",{parentName:"li"},"input")," parameters of the task. So anything labeled IN or INOUT."),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"SerializeEnd"),": Will serialize and deserialize the ",(0,s.kt)("em",{parentName:"li"},"output"),"\nparameters of the task. So anything labeled OUT or INOUT."),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"Dup"),": Analogous to a copy constructor. Will make a local\ncopy of this task (no serialization involved)."),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"DupEnd"),": Will store the output of a replica in the original\ntask the duplicates were spawned from."),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"ReplicateStart"),": Used to allocate data structures in the task\nto account for the replication"),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"ReplicateEnd"),": Called after all replicas have returned. Can\naggregate replica otuput.")),(0,s.kt)("h2",{id:"building-a-data-intensive-rdma-capable-task"},"Building a Data-Intensive, RDMA-Capable Task"),(0,s.kt)("p",null,"TODO: Make example based on PutBlob and GetBlob."))}u.isMDXComponent=!0}}]);