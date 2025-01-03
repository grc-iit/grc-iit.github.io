"use strict";(self.webpackChunkgrc=self.webpackChunkgrc||[]).push([[7108],{8948:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>h,frontMatter:()=>n,metadata:()=>c,toc:()=>d});var a=i(5893),s=i(1151),r=i(5194);const n={title:"DTIO: A Data Task I/O Runtime"},o="DTIO: A Data Task I/O Runtime",c={type:"mdx",permalink:"/research/projects/dtio",source:"@site/src/pages/research/projects/dtio.mdx",title:"DTIO: A Data Task I/O Runtime",description:"In partnership with Argonne National Laboratory, DTIO investigates the use of a task framework for unifying complex I/O stacks and providing features such as resilience, fault-tolerance, and task replay.",frontMatter:{title:"DTIO: A Data Task I/O Runtime"},unlisted:!1},l={},d=[{value:"Introduction",id:"introduction",level:2},{value:"Methodology",id:"methodology",level:2},{value:"Relaxing POSIX consistency to improve scalability",id:"relaxing-posix-consistency-to-improve-scalability",level:2},{value:"Scheduling constraints to improve resource utilization",id:"scheduling-constraints-to-improve-resource-utilization",level:2},{value:"Task provenance to improve fault tolerance",id:"task-provenance-to-improve-fault-tolerance",level:2}];function u(e){const t={h1:"h1",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...(0,s.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("p",{children:(0,a.jsx)("img",{src:i(7561).Z,width:"140"})}),"\n",(0,a.jsx)(t.h1,{id:"dtio-a-data-task-io-runtime",children:"DTIO: A Data Task I/O Runtime"}),"\n",(0,a.jsx)(r.Z,{projectId:"dtio"}),"\n",(0,a.jsx)(t.p,{children:"In partnership with Argonne National Laboratory, DTIO investigates the use of a task framework for unifying complex I/O stacks and providing features such as resilience, fault-tolerance, and task replay."}),"\n",(0,a.jsx)(t.h2,{id:"introduction",children:"Introduction"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:"POSIX I/O has problems with scalability due to its strict internal metadata tracking, which requires RAW guarantees"}),"\n",(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.strong,{children:"Insight"}),": A task-based infrastructure gives several advantages over a batch-based infrastructure, which can also apply to I/O tasks"]}),"\n",(0,a.jsx)(t.li,{children:"Improved scalability via relaxation of POSIX consistency, which allows tasks to execute faster even if it disobeys strict ordering"}),"\n",(0,a.jsx)(t.li,{children:"Improved resource utilization via constraint-based task scheduling, which allows tasks to consider load on an executor"}),"\n",(0,a.jsx)(t.li,{children:"Improved fault-tolerance via task provenance, which allows replay of tasks in the event of a fault"}),"\n",(0,a.jsx)(t.li,{children:"In addition, we aim to leverage hierarchical storage and computational storage techniques to provide an infrastructure that unifies and extends the current I/O stacks"}),"\n"]}),"\n",(0,a.jsx)(t.h2,{id:"methodology",children:"Methodology"}),"\n",(0,a.jsx)("center",{children:(0,a.jsx)("img",{src:i(9880).Z,width:"600",alt:"dtio architecture",title:"",class:""})}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:"DTIO Client creates the task and places on a worker, and DTIO servers execute the tasks"}),"\n",(0,a.jsx)(t.li,{children:"Composition is generally expected to be done alongside the application (client-side)"}),"\n",(0,a.jsx)(t.li,{children:"For scheduling, centralized deployments can collate information from different apps, while multiprocess deployments scale better"}),"\n",(0,a.jsx)(t.li,{children:"For workers, dedicated execution resources are the best choice"}),"\n"]}),"\n",(0,a.jsx)(t.h2,{id:"relaxing-posix-consistency-to-improve-scalability",children:"Relaxing POSIX consistency to improve scalability"}),"\n",(0,a.jsx)("center",{children:(0,a.jsx)("img",{src:i(9958).Z,width:"600",alt:"POSIX scalability",title:"",class:""})}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:"POSIX metadata and consistency guarantees cause performance drops for IOR at scale."}),"\n",(0,a.jsx)(t.li,{children:"Relaxation of POSIX consistency in a task system can come in a few ways."}),"\n",(0,a.jsx)(t.li,{children:"Delay when creating tasks, scheduling tasks, or executing tasks."}),"\n",(0,a.jsx)(t.li,{children:"These ideas are often represented naturally with task queues, as queued tasks need not be dequeued immediately."}),"\n"]}),"\n",(0,a.jsx)(t.h2,{id:"scheduling-constraints-to-improve-resource-utilization",children:"Scheduling constraints to improve resource utilization"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:"To achieve improved resource utilization, tasks can be scheduled to workers depending on load."}),"\n",(0,a.jsx)(t.li,{children:"Task Status can be unscheduled, scheduled, or completed."}),"\n",(0,a.jsx)(t.li,{children:"A simple constraint: schedule a task to the executor which is currently running the fewest tasks."}),"\n",(0,a.jsx)(t.li,{children:"More complex constraint: track the I/O size of tasks to each executor and schedule to the executor with the lowest I/O load."}),"\n"]}),"\n",(0,a.jsx)(t.h2,{id:"task-provenance-to-improve-fault-tolerance",children:"Task provenance to improve fault tolerance"}),"\n",(0,a.jsx)("center",{children:(0,a.jsx)("img",{src:i(8973).Z,width:"600",alt:"Tasks as a record of control flow, with task replays visualized for write kernel and fault recovery",title:"",class:""})}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:"Tasks are a record of control flow, and therefore it is possible to use tasks in the event of a fault to restore the state of storage."}),"\n",(0,a.jsx)(t.li,{children:"Best to store tasks in a separate database and maintain their status."}),"\n",(0,a.jsx)(t.li,{children:"If a separate database is not desirable, workers can provide a record of task execution, though this necessitates a method of determining which worker has which task."}),"\n",(0,a.jsx)(t.li,{children:"Statuses, alongside task timestamps, can permit task replay in the event of a fault."}),"\n",(0,a.jsx)(t.li,{children:"Fault recovery may not need to replay writes, supposing they've already been persisted to disks."}),"\n",(0,a.jsx)(t.li,{children:"Task replay also has other usecases outside of fault tolerance, such as generating I/O kernels or responsibility identification (blaming)."}),"\n"]})]})}function h(e={}){const{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(u,{...e})}):u(e)}},5194:(e,t,i)=>{i.d(t,{Z:()=>o});i(7294);var a=i(512),s=i(866);const r={badgeDarker:"badgeDarker_Lm_2"};var n=i(5893);function o(e){let{addMargin:t=!0,projectId:i}=e;const{isOpenSource:o=!1,isOurs:c=!1,type:l}=(0,s.R)(i),d="funded"===l;return d||o||c?(0,n.jsxs)("div",{className:(0,a.Z)(t&&"margin-bottom--md"),style:{lineHeight:1},children:[c&&(0,n.jsx)("span",{className:"badge badge--primary margin-horiz--xs",children:"GRC-LED"}),d&&(0,n.jsx)("span",{className:"badge badge--success margin-horiz--xs",children:"FUNDED"}),o&&(0,n.jsx)("span",{className:(0,a.Z)("badge badge--secondary margin-horiz--xs",r.badgeDarker),children:"OPEN SOURCE"})]}):null}},866:(e,t,i)=>{i.d(t,{R:()=>r,Z:()=>s});const a=[{id:"iowarp",name:"IOWarp",title:"IOWarp: Advanced Data Management for Scientific Workflows",shortDescription:"IOWarp is a comprehensive data management platform designed to address the unique challenges in scientific workflows that integrate simulation, analytics, and Artificial Intelligence (AI). IOWarp builds on existing storage infrastructures, optimizing data flow and providing a scalable, adaptable platform for managing diverse data needs in modern scientific workflows, particularly those augmented by AI.",link:"/research/projects/iowarp",isFeatured:!0,isOpenSource:!0,isOurs:!0,researchStatus:"r&d",status:"active",type:"funded"},{id:"chronolog",name:"ChronoLog",title:"ChronoLog: A High-Performance Storage Infrastructure for Activity and Log Workloads",shortDescription:"HPC applications generate more data than storage systems can handle, and it is becoming increasingly important to store activity (log) data generated by people and applications. ChronoLog is a hierarchical, distributed log store that leverages physical time to achieve log ordering and reduce contention while utilizing storage tiers to elastically scale the log capacity.",link:"/research/projects/chronolog",isFeatured:!0,isOpenSource:!0,isOurs:!0,researchStatus:"testing",status:"active",type:"funded"},{id:"coeus",name:"Coeus",title:"Coeus: Accelerating Scientific Insights Using Enriched Metadata",shortDescription:"In collaboration with Sandia and Oak Ridge National Laboratories, coeus investigate the use of an active storage system to calculate derived quantities and support complex queries on scientific data (simulation and observational) as well as optimizing data placement across the storage hierarchy, with awareness of the resource limitations, to better support the scientific discovery process.",link:"/research/projects/coeus",isFeatured:!0,isOurs:!0,researchStatus:"r&d",status:"active",type:"funded"},{id:"dayu",name:"DaYu",title:"DaYu: Optimizing Distributed Scientific Workflows by Decoding Dataflow Semantics and Dynamics",shortDescription:"Nowadays, distributed scientific workflows encounter challenges in data movement through storage systems. DaYu, by capturing the mapping of data objects to I/O operations, can uncover new insights for optimizing workflow data movement.",link:"/research/projects/dayu",isFeatured:!1,isOpenSource:!0,isOurs:!0,researchStatus:"ready",status:"active",type:"funded"},{id:"dtio",name:"DTIO",title:"DTIO: A Data Task I/O Runtime",shortDescription:"In partnership with Argonne National Laboratory, DTIO investigates the use of a task framework for unifying complex I/O stacks and providing features such as resilience, fault-tolerance, and task replay.",link:"/research/projects/dtio",isFeatured:!1,isOurs:!0,researchStatus:"testing",status:"active",type:"funded"},{id:"hermes",name:"Hermes",title:"Hermes: Extending the HDF Library to Support Intelligent I/O Buffering for Deep Memory and Storage Hierarchy System",shortDescription:"To reduce the I/O bottleneck, complex storage hierarchies have been introduced. However, managing this complexity should not be left to application developers. Hermes is a middeware library that automatically manages buffering in heterogeneous storage environments.",link:"/research/projects/hermes",isFeatured:!0,isOpenSource:!0,isOurs:!0,researchStatus:"ready",status:"active",type:"funded"},{id:"iris",name:"IRIS",title:"IRIS: I/O Redirection Via Integrated Storage",shortDescription:"Various storage solutions exist and require specialized APIs and data models in order to use, which binds developers, applications, and entire computing facilities to using certain interfaces. Each storage system is designed and optimized for certain applications but does not perform well for others. IRIS is a unified storage access system that bridges the semantic gap between filesystems and object stores.",link:"/research/projects/iris",isFeatured:!1,isOpenSource:!0,isOurs:!0,researchStatus:"testing",status:"active",type:"funded"},{id:"labios",name:"Labios",title:"LABIOS: A Distributed Label-Based I/O System",shortDescription:"HPC and Big Data environments have diverged over the years, resulting in diverging and even conflicting I/O requirements. Labios aims to address the challenges vital to HPC + Big Data Convergence",link:"/research/projects/labios",isFeatured:!1,isOurs:!0,researchStatus:"r&d",status:"active",type:"funded"},{id:"optmem",name:"OptMem",title:"Optimization of Memory Architectures: A Foundation Approach",shortDescription:"This project establishes a foundational framework for memory performance modeling and optimization in modern architectures, utilizing simulation and real-system analysis to advance architecture designs for data-intensive applications.",link:"/research/projects/optmem",isFeatured:!1,isOpenSource:!1,isOurs:!0,researchStatus:"ready",status:"active",type:"funded"},{id:"storehub",name:"StoreHub",title:"StoreHub",shortDescription:"StoreHub is a collaborative platform designed to advance data storage research by providing a specialized infrastructure that meets the unique needs of researchers. It brings together experts handling large amounts of data, focusing on I/O performance, and developing innovative storage solutions, making it a vital resource for the community.",link:"/research/projects/storehub",isFeatured:!1,isOpenSource:!1,isOurs:!0,researchStatus:"r&d",status:"active",type:"funded"},{id:"unimcc",name:"UniMCC",title:"UniMCC: Towards A Unified Memory-centric Computing System with Cross-layer Support",shortDescription:"UniMCC addresses memory bottlenecks in data-centric applications with a full-stack, cross-layer system that integrates architecture, SW/HW interfaces, code generation, runtime support, and performance optimization to maximize memory-centric computing's potential.",link:"/research/projects/unimcc",isFeatured:!1,isOpenSource:!1,isOurs:!0,researchStatus:"r&d",status:"active",type:"funded"},{id:"viper",name:"Viper",title:"Viper: A High-Performance I/O Framework for Transferring Deep Neural Network Models",shortDescription:"Within a DL workflow, exchanging DNN models through PFS may result in  high model update latency and discovery latency. Moreover, model update frequency affects both training and inference performance. Viper is an I/O framework aiming to accelerate model discovery and delivery, and to find an optimal model checkpoint schedule to balance the trade-off.",link:"/research/projects/viper",isFeatured:!1,isOurs:!0,researchStatus:"r&d",status:"active",type:"funded"},{id:"wisio",name:"WisIO",title:"WisIO: Automated I/O Bottleneck Detection via Multi-Perspective Views for HPC Workloads",shortDescription:"Explore WisIO, an automated I/O bottleneck detection tool with multi-perspective views for I/O trace data analysis. Overcoming large-scale I/O challenges, WisIO utilizes distributed computing and an extensible rule engine for tailored solutions. Elevate your I/O analysis in HPC environments with WisIO.",link:"/research/projects/wisio",isFeatured:!1,isOpenSource:!1,isOurs:!0,researchStatus:"r&d",status:"active",type:"student"}],s=a;function r(e){return a.find((t=>t.id===e))}},9880:(e,t,i)=>{i.d(t,{Z:()=>a});const a=i.p+"assets/images/dtio-arch-460cf96e637bc6f22268e02f6c172a74.png"},7561:(e,t,i)=>{i.d(t,{Z:()=>a});const a=i.p+"assets/images/logo-9e75d71cd7192feeb44267194a9459f7.png"},9958:(e,t,i)=>{i.d(t,{Z:()=>a});const a=i.p+"assets/images/posix-scalability-d984b8e3aa6829e17418344f404b1977.png"},8973:(e,t,i)=>{i.d(t,{Z:()=>a});const a=i.p+"assets/images/queue-visualization-e59b05701120b112df204b77a842b8ab.png"},1151:(e,t,i)=>{i.d(t,{Z:()=>o,a:()=>n});var a=i(7294);const s={},r=a.createContext(s);function n(e){const t=a.useContext(r);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:n(e.components),a.createElement(r.Provider,{value:t},e.children)}}}]);