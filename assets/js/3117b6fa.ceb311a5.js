"use strict";(self.webpackChunkgnosis=self.webpackChunkgnosis||[]).push([[9342],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>h});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),c=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},u="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),u=c(n),m=r,h=u["".concat(l,".").concat(m)]||u[m]||p[m]||i;return n?a.createElement(h,o(o({ref:t},d),{},{components:n})):a.createElement(h,o({ref:t},d))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:r,o[1]=s;for(var c=2;c<i;c++)o[c]=n[c];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},6516:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>s,default:()=>p,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var a=n(7462),r=(n(7294),n(3905)),i=n(3161);const o={title:"Viper: A High-Performance I/O Framework for Transferring Deep Neural Network Models"},s=void 0,l={type:"mdx",permalink:"/research/projects/viper",source:"@site/src/pages/research/projects/viper.mdx",title:"Viper: A High-Performance I/O Framework for Transferring Deep Neural Network Models",description:"Within a DL workflow, the scientific AI application and the inference serving system typically communicate",frontMatter:{title:"Viper: A High-Performance I/O Framework for Transferring Deep Neural Network Models"}},c=[{value:"Background",id:"background",level:2},{value:"Motivation",id:"motivation",level:2},{value:"Approach",id:"approach",level:2},{value:"Evaluation Results",id:"evaluation-results",level:2},{value:"Members",id:"members",level:2}],d={toc:c},u="wrapper";function p(e){let{components:t,...o}=e;return(0,r.kt)(u,(0,a.Z)({},d,o,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("img",{src:n(8500).Z,width:"200"})),(0,r.kt)("h1",{id:"viper-a-high-performance-io-framework-for-transferring-deep-neural-network-models"},"Viper: A High-Performance I/O Framework for Transferring Deep Neural Network Models"),(0,r.kt)(i.Z,{projectId:"viper",mdxType:"ProjectBadges"}),(0,r.kt)("p",null,"Within a DL workflow, the scientific AI application and the inference serving system typically communicate\nthe DNN models through a model repository (e.g., PFS). However, this method may result in high model update\nlatency due to I/O bottlenecks of PFS and high model discovery latency due to the fixed-interval pull-based\nmodel detection mechanism. Moreover, both continuous learning and the scenario that consumer has a limited\ntime window for inferencing increases the model update frequency between producers and consumers. Model update\nfrequency affects both training and inference performance. Viper is a high-performance I/O framework aiming\nto accelerate the model exchange, and to find an optimal model update schedule to achieve high inference\nperformance while keeping low training cost."),(0,r.kt)("h2",{id:"background"},"Background"),(0,r.kt)("p",null,"In the traditional deep learning (DL) workflow:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Producer (Scientific AI Application) typically trains a DNN model offline with a fixed set of input data and then persists the trained model to a model repository for future use"),(0,r.kt)("li",{parentName:"ul"},"Consumer (Inference Serving System) loads the pre-trained DNN model from the model repository and offers online inference queries for end-user applications ")),(0,r.kt)("p",null,"However, this offline training is not an ideal choice in two scenarios:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Scenario 1: ")," Modern scientific DL workflows often operate in dynamic environments where new data is constantly changing and accumulating over time.",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"To adapt to data changes, continuous learning is utilized to continuously (re)-train a DNN model by using some online techniques."),(0,r.kt)("li",{parentName:"ul"},"Continuous learning implies the continuous deployment of the DNN model to keep the model up-to-date"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Scenario 2: ")," The consumer may have a limited time window for inferences, it may need to start inferencing after the warmup phase in model training on the producer side",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Producer continues training the model while the consumer conducts inferences"),(0,r.kt)("li",{parentName:"ul"},"This requires the intermediate DNN models to be consistently delivered from the producer to the consumer during training to achieve high inference performance")))),(0,r.kt)("center",null,(0,r.kt)("p",null,(0,r.kt)("img",{src:n(5522).Z,width:"600"}))),(0,r.kt)("p",null,"Both scenarios ",(0,r.kt)("strong",{parentName:"p"},"increase the model update frequency")," between producers and consumers."),(0,r.kt)("h2",{id:"motivation"},"Motivation"),(0,r.kt)("center",null,(0,r.kt)("p",null,(0,r.kt)("img",{src:n(3201).Z,width:"600"}))),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Model update frequency ",(0,r.kt)("strong",{parentName:"li"},"affects both training and inference performance"),", since a model update operation involves both model checkpointing and model data delivery.E.g.,",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Frequent model updates can enhance inference performance but may slow down training"),(0,r.kt)("li",{parentName:"ul"},"Infrequent model updates may pose less overhead on training but may degrade the overall inference model accuracy"))),(0,r.kt)("li",{parentName:"ol"},"Currently, Scientific AI Applications and Inference Serving Systems communicate through a model repository (e.g., PFS), as depicted in Figure (a). This communication method may result in:",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"High model update latency")," due to the I/O bottlenecks caused by concurrent, uncoordinated, small I/O accesses to PFS"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"High model discovery High model discovery latency on consumers")," due to the static fixed-interval pull-based (e.g., polling) detection mechanism ")))),(0,r.kt)("p",null,"Thus, there is a need to 1) ",(0,r.kt)("strong",{parentName:"p"},"balance the trade-off")," between training and inference performance; 2) ",(0,r.kt)("strong",{parentName:"p"},"accelerate model data discovery and delivery")," between producers and consumers (Figure b)."),(0,r.kt)("h2",{id:"approach"},"Approach"),(0,r.kt)("center",null,(0,r.kt)("p",null,(0,r.kt)("img",{src:n(7180).Z,width:"600"}))),(0,r.kt)("p",null,"Viper is a high-performance I/O framework to accelerate DNN models exchange between\nproducers and consumers. It aims to:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("strong",{parentName:"li"},"Balance the trade-off between training runtime and inference performance"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Viper builds an ",(0,r.kt)("strong",{parentName:"li"},"intelligent inference performance predictor")," to achieve this object",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Can ",(0,r.kt)("strong",{parentName:"li"},"decide an optimal model checkpoint schedule")," between producers and consumers"),(0,r.kt)("li",{parentName:"ul"},"Supporting two different algorithms for finding the optimal checkpoint schedule"))))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("strong",{parentName:"li"},"Accelerate model data transfer"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Viper creates a ",(0,r.kt)("strong",{parentName:"li"},"novel cache-aware data transfer engine")," to speedup model update between producers and consumers",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Creating a direct data exchange channel for model delivery and utilizes. E.g., the direct GPU-to-GPU or RAM-to-RAM data transfer strategy"),(0,r.kt)("li",{parentName:"ul"},"Utilizing a lightweight ublish-subscribe notification mechanism to promptly inform the consumer of the model changes.")))))),(0,r.kt)("center",null,(0,r.kt)("p",null,(0,r.kt)("img",{src:n(7723).Z,width:"400"}))),(0,r.kt)("h2",{id:"evaluation-results"},"Evaluation Results"),(0,r.kt)("center",null,(0,r.kt)("h3",null,"End-to-end Model Update Latency"),(0,r.kt)("div",{style:{display:"flex",justifyContent:"start"}},(0,r.kt)("div",null,(0,r.kt)("img",{src:n(8565).Z,width:"300"})),(0,r.kt)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"}},(0,r.kt)("ul",{style:{textAlign:"left"}},(0,r.kt)("li",null,"The Y-axis shows the end-to-end CANDLE-NT3 model update latency in seconds"),(0,r.kt)("li",null,"Viper improves model update latency by"),(0,r.kt)("ul",{style:{textAlign:"left"}},(0,r.kt)("li",null,(0,r.kt)("strong",null,"~10x")," via GPU-to-GPU model transfer strategy"),(0,r.kt)("li",null,(0,r.kt)("strong",null,"~3.5x")," via RAM-to-RAM model transfer strategy"))))),(0,r.kt)("h3",null,"Benefits of Low-latency Model Update Strategy"),(0,r.kt)("div",{style:{display:"flex",justifyContent:"space-between"}},(0,r.kt)("div",null,(0,r.kt)("img",{src:n(7350).Z,width:"400"})),(0,r.kt)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"}},(0,r.kt)("ul",{style:{textAlign:"left"}},(0,r.kt)("li",null,"Application: CANDLE-NT3 model of 4.6GB size"),(0,r.kt)("li",null,"The left Y-axis shows cumulative inference loss over 50000 inference requests"),(0,r.kt)("li",null,"The right Y-axis shows training overhead added by model checkpointing"),(0,r.kt)("li",null,"GPU-to-GPU and RAM-to-RAM model transfer strategies exhibit"),(0,r.kt)("ul",{style:{textAlign:"left"}},(0,r.kt)("li",null,"lower cumulative inference loss"),(0,r.kt)("li",null,"less training overhead time")))))),(0,r.kt)("h2",{id:"members"},"Members"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Jie Ye, Illinois Institute of Technology"),(0,r.kt)("li",{parentName:"ul"},"Jaime Cernuda, Illinois Institute of Technology"),(0,r.kt)("li",{parentName:"ul"},"Bogdan Nicolae, Argonne National Laboratory"),(0,r.kt)("li",{parentName:"ul"},"Anthony Kougkas, Illinois Institute of Technology"),(0,r.kt)("li",{parentName:"ul"},"Xian-He Sun, Illinois Institute of Technology")))}p.isMDXComponent=!0},3161:(e,t,n)=>{n.d(t,{Z:()=>o});var a=n(7294),r=n(6010),i=n(866);function o(e){let{addMargin:t=!0,projectId:n}=e;const{isOpenSource:o=!1,isOurs:s=!1}=(0,i.R)(n);return o||s?a.createElement("div",{className:(0,r.Z)(t&&"margin-bottom--md"),style:{lineHeight:1}},s&&a.createElement("span",{className:"badge badge--primary margin-horiz--xs"},"GRC-LED"),o&&a.createElement("span",{className:"badge badge--secondary margin-horiz--xs"},"OPEN SOURCE")):null}},866:(e,t,n)=>{n.d(t,{R:()=>i,Z:()=>r});const a=[{id:"coeus",name:"Coeus",title:"Coeus: Accelerating Scientific Insights Using Enriched Metadata",shortDescription:"In collaboration with Sandia and Oak Ridge National Laboratories, coeus investigate the use of an active storage system to calculate derived quantities and support complex queries on scientific data (simulation and observational) as well as optimizing data placement across the storage hierarchy, with awareness of the resource limitations, to better support the scientific discovery process.",link:"/research/projects/coeus",isFeatured:!0,isOurs:!0,researchStatus:"r&d",status:"active",type:"funded"},{id:"chronolog",name:"ChronoLog",title:"ChronoLog: A High-Performance Storage Infrastructure for Activity and Log Workloads",shortDescription:"HPC applications generate more data than storage systems can handle, and it is becoming increasingly important to store activity (log) data generated by people and applications. ChronoLog is a hierarchical, distributed log store that leverages physical time to achieve log ordering and reduce contention while utilizing storage tiers to elastically scale the log capacity.",link:"/research/projects/chronolog",isFeatured:!0,isOpenSource:!0,isOurs:!0,researchStatus:"testing",status:"active",type:"funded"},{id:"iris",name:"IRIS",title:"IRIS: I/O Redirection Via Integrated Storage",shortDescription:"Various storage solutions exist and require specialized APIs and data models in order to use, which binds developers, applications, and entire computing facilities to using certain interfaces. Each storage system is designed and optimized for certain applications but does not perform well for others. IRIS is a unified storage access system that bridges the semantic gap between filesystems and object stores.",link:"/research/projects/iris",isFeatured:!1,isOpenSource:!0,isOurs:!0,researchStatus:"testing",status:"active",type:"funded"},{id:"hermes",name:"Hermes",title:"Hermes: Extending the HDF Library to Support Intelligent I/O Buffering for Deep Memory and Storage Hierarchy System",shortDescription:"To reduce the I/O bottleneck, complex storage hierarchies have been introduced. However, managing this complexity should not be left to application developers. Hermes is a middeware library that automatically manages buffering in heterogeneous storage environments.",link:"/research/projects/hermes",isFeatured:!0,isOpenSource:!0,isOurs:!0,researchStatus:"ready",status:"active",type:"funded"},{id:"labios",name:"Labios",title:"LABIOS: A Distributed Label-Based I/O System",shortDescription:"HPC and Big Data environments have diverged over the years, resulting in diverging and even conflicting I/O requirements. Labios aims to address the challenges vital to HPC + Big Data Convergence",link:"/research/projects/labios",isFeatured:!1,isOurs:!0,researchStatus:"r&d",status:"active",type:"funded"},{id:"dtio",name:"DTIO",title:"DTIO: A Data Task I/O Runtime",shortDescription:"In partnership with Argonne National Laboratory, DTIO investigates the use of a task framework for unifying complex I/O stacks and providing features such as resilience, fault-tolerance, and task replay.",link:"/research/projects/dtio",isFeatured:!1,isOurs:!0,researchStatus:"testing",status:"active",type:"funded"},{id:"viper",name:"Viper",title:"Viper: A High-Performance I/O Framework for Transferring Deep Neural Network Models",shortDescription:"Within a DL workflow, exchanging DNN models through PFS may result in  high model update latency and discovery latency. Moreover, model update frequency affects both training and inference performance. Viper is an I/O framework aiming to accelerate model discovery and delivery, and to find an optimal model checkpoint schedule to balance the trade-off.",link:"/research/projects/viper",isFeatured:!1,isOurs:!0,researchStatus:"r&d",status:"active",type:"funded"},{id:"dayu",name:"DaYu",title:"DaYu: Optimizing Workflow Performance by Elucidating Semantic Data Flow",shortDescription:"Nowadays, distributed scientific workflows encounter challenges in data movement through storage systems. DaYu, by capturing the mapping of data objects to I/O operations, can uncover new insights for optimizing workflow data movement.",link:"/research/projects/dayu",isFeatured:!1,isOpenSource:!0,isOurs:!0,researchStatus:"testing",status:"active",type:"funded"},{id:"wisio",name:"WisIO",title:"WisIO: Automated I/O Bottleneck Detection via Multi-Perspective Views for HPC Workloads",shortDescription:"Explore WisIO, an automated I/O bottleneck detection tool with multi-perspective views for I/O trace data analysis. Overcoming large-scale I/O challenges, WisIO utilizes distributed computing and an extensible rule engine for tailored solutions. Elevate your I/O analysis in HPC environments with WisIO.",link:"/research/projects/wisio",isFeatured:!1,isOpenSource:!1,isOurs:!0,researchStatus:"r&d",status:"active",type:"student"}],r=a;function i(e){return a.find((t=>t.id===e))}},7350:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/benefits_low_latency_strategy-f5f6fc2cb955c936c1e9b6fc8cbe4193.png"},7723:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/data_transfer-bd621a0c8a42b3401593200c131b1c32.png"},8565:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/end_to_end_latency-b64732777ddcba119a7224e8cc98fb17.png"},7180:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/high_level_design-33c6a561fda3dd9c72e992691933f5dd.png"},8500:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/logo-95bd4156d3a78ae2165cd6b0cd2d41b8.png"},5522:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/scenario2-3f2e0ace5443aaec287e4fd1dd06be5c.png"},3201:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/viper_motivation-59af44a57af0d841b49966ce02f4c5b6.png"}}]);