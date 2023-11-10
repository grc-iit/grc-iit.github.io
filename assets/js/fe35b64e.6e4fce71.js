"use strict";(self.webpackChunkgnosis=self.webpackChunkgnosis||[]).push([[4101],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=a.createContext({}),c=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},h="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),h=c(n),d=i,m=h["".concat(l,".").concat(d)]||h[d]||p[d]||r;return n?a.createElement(m,o(o({ref:t},u),{},{components:n})):a.createElement(m,o({ref:t},u))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,o=new Array(r);o[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[h]="string"==typeof e?e:i,o[1]=s;for(var c=2;c<r;c++)o[c]=n[c];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},3870:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>p,frontMatter:()=>r,metadata:()=>s,toc:()=>c});var a=n(7462),i=(n(7294),n(3905));const r={},o="Configuration",s={unversionedId:"hermes/configuration",id:"hermes/configuration",title:"Configuration",description:"Before deploying an application, you need to configure Hermes. Hermes has two types of configurations: server configuration and client configuration. They",source:"@site/docs/03-hermes/04-configuration.md",sourceDirName:"03-hermes",slug:"/hermes/configuration",permalink:"/docs/hermes/configuration",draft:!1,tags:[],version:"current",sidebarPosition:4,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Building Hermes",permalink:"/docs/hermes/getting-started"},next:{title:"Programming",permalink:"/docs/hermes/programming"}},l={},c=[{value:"Server Configuration",id:"server-configuration",level:2},{value:"Defining Storage Targets",id:"defining-storage-targets",level:3},{value:"Device Names",id:"device-names",level:3},{value:"<code>mount_point</code>",id:"mount_point",level:3},{value:"<code>capacity</code>",id:"capacity",level:3},{value:"<code>block_size</code>",id:"block_size",level:3},{value:"<code>slab_sizes</code>",id:"slab_sizes",level:3},{value:"<code>bandwidth</code>, <code>latency</code>",id:"bandwidth-latency",level:3},{value:"<code>is_shared_device</code>",id:"is_shared_device",level:3},{value:"<code>borg_capacity_thresh</code>",id:"borg_capacity_thresh",level:3},{value:"Buffer Organizer (BORG)",id:"buffer-organizer-borg",level:2},{value:"Prefetcher",id:"prefetcher",level:2},{value:"Traits",id:"traits",level:2},{value:"Shared Memory",id:"shared-memory",level:2},{value:"System View State",id:"system-view-state",level:2},{value:"Bounding Memory Utilization",id:"bounding-memory-utilization",level:2},{value:"Using RAM as a buffering device",id:"using-ram-as-a-buffering-device",level:3},{value:"Hashtables for storing blobs + buckets",id:"hashtables-for-storing-blobs--buckets",level:3},{value:"Bounding Non-Buffering Tasks",id:"bounding-non-buffering-tasks",level:3},{value:"Calculating Total Amount of Memory",id:"calculating-total-amount-of-memory",level:3},{value:"Client Configuration",id:"client-configuration",level:2},{value:"Path Inclusion / Exclusion",id:"path-inclusion--exclusion",level:3},{value:"Adapter Mode",id:"adapter-mode",level:3},{value:"File Page Size",id:"file-page-size",level:3},{value:"Flushing Mode",id:"flushing-mode",level:3},{value:"Adapter Config",id:"adapter-config",level:3},{value:"Provided Configurations",id:"provided-configurations",level:2},{value:"How To Avoid Repeating the Default Configurations",id:"how-to-avoid-repeating-the-default-configurations",level:2}],u={toc:c},h="wrapper";function p(e){let{components:t,...n}=e;return(0,i.kt)(h,(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"configuration"},"Configuration"),(0,i.kt)("p",null,"Before deploying an application, you need to configure Hermes. Hermes has two types of configurations: server configuration and client configuration. They\nare represented as YAML files. We will describe the contents of these YAML\nfiles here."),(0,i.kt)("h2",{id:"server-configuration"},"Server Configuration"),(0,i.kt)("p",null,"The server configuration is primarily used to initialize the daemon.\nClients also parse the server config to get the basic information needed\nto connect to the Hermes daemons."),(0,i.kt)("p",null,"Technically, the server configuration\nis optional. However, the default configuration is more for just setting\nthings up. You do have to configure things like mount points manually\nat this time."),(0,i.kt)("p",null,"The default server configuration can be found\n",(0,i.kt)("a",{parentName:"p",href:"https://github.com/HDFGroup/hermes/blob/master/config/hermes_server_default.yaml"},"here"),"."),(0,i.kt)("h3",{id:"defining-storage-targets"},"Defining Storage Targets"),(0,i.kt)("p",null,'The most important property in the configuration is defining where Hermes\nbuffers data. This is done under the "devices" entry.\nIn the default configuration, we have the following:'),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},'devices:\n  ram:\n    mount_point: ""\n    capacity: 50MB\n    block_size: 4KB\n    slab_sizes: [ 4KB, 16KB, 64KB, 1MB ]\n    bandwidth: 6000MBps\n    latency: 15us\n    is_shared_device: false\n    borg_capacity_thresh: [0.0, 1.0]\n\n  nvme:\n    mount_point: "./"\n    capacity: 100MB\n    block_size: 4KB\n    slab_sizes: [ 4KB, 16KB, 64KB, 1MB ]\n    bandwidth: 1GBps\n    latency: 600us\n    is_shared_device: false\n    borg_capacity_thresh: [ 0.0, 1.0 ]\n\n   ssd:\n     mount_point: "./"\n     capacity: 100MB\n     block_size: 4KB\n     slab_sizes: [ 4KB, 16KB, 64KB, 1MB ]\n     bandwidth: 500MBps\n     latency: 1200us\n     is_shared_device: false\n     borg_capacity_thresh: [ 0.0, 1.0 ]\n\n   pfs:\n     mount_point: "./"\n     capacity: 100MB\n     block_size: 64KB\n     slab_sizes: [ 4KB, 16KB, 64KB, 1MB ]\n     bandwidth: 100MBps\n     latency: 200ms\n     is_shared_device: true\n     borg_capacity_thresh: [ 0.0, 1.0 ]\n')),(0,i.kt)("h3",{id:"device-names"},"Device Names"),(0,i.kt)("p",null,"In the above configuration, we have four unique devices: ram, nvme, ssd,\nand pfs. These names are for the ease of the user, and have no meaning\nto Hermes. In other words, these names can be anything. The following\nconfiguration would be effectively equivalent to the one above:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},'devices:\n  dev1:\n    mount_point: ""\n    capacity: 50MB\n    ...\n\n  dev2:\n    mount_point: "./"\n    capacity: 100MB\n    ...\n\n   dev3:\n     mount_point: "./"\n     capacity: 100MB\n     ...\n\n   dev4:\n     mount_point: "./"\n     capacity: 100MB\n     ...\n')),(0,i.kt)("h3",{id:"mount_point"},(0,i.kt)("inlineCode",{parentName:"h3"},"mount_point")),(0,i.kt)("p",null,"The mount point parameter is used to indicate which directory Hermes\nshould place data in, if the device has a filesystem."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},'ram:\n  mount_point: ""\n\nnvme:\n  mount_point: "./"\n')),(0,i.kt)("p",null,'In the default config, for example, we look at ram and nvme. nvme is mounted\nin the current working directory. Hermes will create a file called\n"./slab_nvme". It will create equivalent files for hdd, ssd, and pfs.'),(0,i.kt)("p",null,'For ram, we set the mount point to "". This indicates that the device\nhas no mount point.'),(0,i.kt)("h3",{id:"capacity"},(0,i.kt)("inlineCode",{parentName:"h3"},"capacity")),(0,i.kt)("p",null,'This variable implies the amount of capacity to use for buffering.\nThis parameter is a "size variable", which supports various suffixes:'),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"capacity: 100    # 100 bytes\ncapacity: 100k   # 100 KB\ncapacity: 100kb  # 100 KB\ncapacity: 100KB  # 100 KB\ncapacity: 100m   # 100 MB\ncapacity: 100mb  # 100 MB\ncapacity: 100MB  # 100 MB\ncapacity: 100g   # 100 GB\ncapacity: 100gb  # 100 GB\ncapacity: 100GB  # 100 GB\ncapacity: 100T   # 100 TB\ncapacity: 100tb  # 100 TB\ncapacity: 100TB  # 100 TB\n")),(0,i.kt)("p",null,"There cannot be spaces between the number and the suffix. For example,"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"capacity: 100 tb #NOT VALID\n")),(0,i.kt)("h3",{id:"block_size"},(0,i.kt)("inlineCode",{parentName:"h3"},"block_size")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"block_size: 64KB\n")),(0,i.kt)("p",null,"This is the amount of I/O that the physical block device supports.\nRAM, for example, generally sees data in units of 4KB because this is\nthe page size of the system. HDDs, NVMes, and SSDs generally have block\nsizes of 4KB as well. Generally, this parameter doesn't need to be changed."),(0,i.kt)("h3",{id:"slab_sizes"},(0,i.kt)("inlineCode",{parentName:"h3"},"slab_sizes")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"slab_sizes: [4KB, 16KB, 64KB, 1MB]\n")),(0,i.kt)("p",null,"This parameter is important to performance and resource utilization. The slab sizes dictates the I/O patterns produced in Hermes. When Hermes wants to\nwrite a 16MB blob, how does this blob actually get mapped to storage?\nIt gets fragmented into buffers, where the size of a buffer is equivalent\nto the best-fitting slab size."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"A 16MB blob will be placed as 16 1MB buffers."),(0,i.kt)("li",{parentName:"ul"},"A 6KB blob will be placed as 2 4KB buffers"),(0,i.kt)("li",{parentName:"ul"},"A 33KB blob will be placed as a single 64KB buffer")),(0,i.kt)("p",null,"You should decide the buffer sizes based on the characteristics of your\nprogram. If unsure, the default slab sizes generally have worked well\nin the workloads we've tried. However, if you're finding Hermes runs\nout of space, this parameter may be the culprit."),(0,i.kt)("h3",{id:"bandwidth-latency"},(0,i.kt)("inlineCode",{parentName:"h3"},"bandwidth"),", ",(0,i.kt)("inlineCode",{parentName:"h3"},"latency")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"bandwidth: 1GBps\nlatency: 600us\n")),(0,i.kt)("p",null,"These are properties of the storage device which are used by data placement\nalgorithms to decide where to buffer data."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Acceptable suffixes for bandwidth (case doesn't matter):"),(0,i.kt)("li",{parentName:"ul"},"Acceptable suffixes for latency (case doesn't matter): s, ms, us, ns.")),(0,i.kt)("h3",{id:"is_shared_device"},(0,i.kt)("inlineCode",{parentName:"h3"},"is_shared_device")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"is_shared_device: true\n")),(0,i.kt)("p",null,"This indicates whether or not the device provides a shared view of\ndata across nodes. For example, a PFS is a shared device, whereas\na single hard drive is not a shared device. This parameter is not\nreally used at this time, but you do need to define it."),(0,i.kt)("h3",{id:"borg_capacity_thresh"},(0,i.kt)("inlineCode",{parentName:"h3"},"borg_capacity_thresh")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"borg_capacity_thresh: [0.0, 1.0]\n")),(0,i.kt)("p",null,"This parameter is used to trigger the buffer organizer (BORG). When a\ndevice is either really low on capacity (or high on capacity) BORG\nwill be triggered to shuffle content around."),(0,i.kt)("p",null,"The first entry indicates how much space is too little space. In this\ncase if capacity falls below 0% (i.e., never), BORG will be triggered."),(0,i.kt)("p",null,"The second entry indicates how mcuh space is too much space. In this\ncase if capacity grows beyone 100% (i.e., never), BORG will be triggered."),(0,i.kt)("p",null,"In other words, this example, shows how to disable BORG."),(0,i.kt)("h2",{id:"buffer-organizer-borg"},"Buffer Organizer (BORG)"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"buffer_organizer:\n  num_threads: 1\n  flush_period: 1024\n  blob_reorg_period: 1024\n  recency_min: 0\n  recency_max: 60\n  freq_max: 15\n  freq_min: 0\n")),(0,i.kt)("p",null,'The BORG contains threads for reorganizing buffers in Hermes. The number\nof threads is indicated by "num_threads". The amount of time (in ms) to\nre-scan for blobs to reorganize is given by "flush_period".'),(0,i.kt)("p",null,"receny_max is the amount of time (in seconds) when the score of a blob\nbecomes 0. recency_min is the amount of time for the blob to have a score\nof 1."),(0,i.kt)("p",null,"freq_max is the minimum number of times a blob needs to be accessed in the\nflushing period for the score to be equal to one. freq_min is the maximum number of times a blob can be accessed before its score becomes larger than 0."),(0,i.kt)("p",null,"The buffer organizer is only triggered when there are space constraints\nthat need to be met at this time. If you want the BORG extremely active,\nchange the borg_capacity_thresh variable."),(0,i.kt)("h2",{id:"prefetcher"},"Prefetcher"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},'prefetch:\n  enabled: false\n  apriori_schema_path: ""\n  epoch_ms: 50\n  is_mpi: false\n')),(0,i.kt)("p",null,"These parameters dictate properties of the prefetcher."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"enabled"),": whether to turn prefetcher on"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"apriori_schema_path"),": internally used by apriori prefetcher"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"epoch_ms"),": how often to call the prefetcher thread"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"is_mpi"),": whether the program is an MPI program so that clients\nsend their ranks to the daemon during prefetching.")),(0,i.kt)("p",null,"For now, prefetching is only available to the native API, not the adapters."),(0,i.kt)("h2",{id:"traits"},"Traits"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},'traits:\n  - "hermes_posix_io_client"\n  - "hermes_stdio_io_client"\n  - "hermes_mpiio_io_client"\n  - "hermes_example_trait"\n  - "hermes_prefetcher_trait"\n')),(0,i.kt)("p",null,"The traits category lists the set of traits that Hermes searches for\nin the LD_LIBRARY_PATH and HERMES_TRAIT_PATH environment variables.\nIt will search each directory specified in those environment variables\nfor shared objects matching these names. For example, libhermes_posix_io_client.so will be searched for."),(0,i.kt)("p",null,"Unless you are adding custom traits, this can be left as default."),(0,i.kt)("h2",{id:"shared-memory"},"Shared Memory"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},'shmem_name: "/hermes_shm_"\n')),(0,i.kt)("p",null,"This is the name of the shared memory segment hermes will create. In order\nto make this unique across users (since shared memory can be used to\nshare memory across users), we append the name of the user to this key."),(0,i.kt)("p",null,"This generally can be left as the default value."),(0,i.kt)("h2",{id:"system-view-state"},"System View State"),(0,i.kt)("p",null,"This parameter is unused for now, so no need to set it."),(0,i.kt)("h2",{id:"bounding-memory-utilization"},"Bounding Memory Utilization"),(0,i.kt)("p",null,'When running Hermes in a limited environment, ensuring that Hermes is not over-utilizing memory is necessary. It is possible to receive "Bus Error" messages due to the OS complaining that too many pages have been allocated. We find that this happens in Docker containers frequently since they have more limited memory constraints by default.'),(0,i.kt)("p",null,"There are a few parameters which cause Hermes to utilize memory."),(0,i.kt)("h3",{id:"using-ram-as-a-buffering-device"},"Using RAM as a buffering device"),(0,i.kt)("p",null,"Hermes can be configured to use RAM as a buffering device."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},'devices:\n  ram:\n    mount_point: ""\n    capacity: 1g\n')),(0,i.kt)("p",null,"In this case, Hermes will reserve up to 1GB of space to use for buffering."),(0,i.kt)("h3",{id:"hashtables-for-storing-blobs--buckets"},"Hashtables for storing blobs + buckets"),(0,i.kt)("p",null,"Hermes will reserve space for hashtables for blobs, buckets, and traits.\nThese parameters can be configured as follows:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"mdm:\n  # This represents the number of blobs and buckets before collisions start\n  # to happen in the unordered_map tables.\n  est_blob_count: 100000\n  est_bucket_count: 100000\n  est_num_traits: 256\n")),(0,i.kt)("p",null,"You can set these to lower values if memory is over-utilized.\nThese values should be set to roughly the number of blobs and buckets the program creates to avoid collisions in the hashtables."),(0,i.kt)("h3",{id:"bounding-non-buffering-tasks"},"Bounding Non-Buffering Tasks"),(0,i.kt)("p",null,"You can set a maximum boundary on the amount of memory to use for non-buffering tasks, such as reserving space for the blob + bucket hashtables."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"# Define the maximum amount of memory Hermes can use for non-buffering tasks.\n# This includes metadata management and memory allocations.\n# This memory will not be preallocated, so if you don't know, 0 indicates\n# any amount of memory\nmax_memory: 0g\n")),(0,i.kt)("p",null,"0g indicates infinity. Non-zero values can be set to put a boundary here."),(0,i.kt)("h3",{id:"calculating-total-amount-of-memory"},"Calculating Total Amount of Memory"),(0,i.kt)("p",null,"The total amount of memory Hermes can use before an hshm::Error or Bus Error is thrown can be calculated as follows:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"RAM used for Buffering (3.1.7.1) + RAM used for Non-Buffering (3.1.7.3)\n")),(0,i.kt)("h2",{id:"client-configuration"},"Client Configuration"),(0,i.kt)("p",null,"The default client configuration can be found\n",(0,i.kt)("a",{parentName:"p",href:"https://github.com/HDFGroup/hermes/blob/master/config/hermes_client_default.yaml"},"here"),"."),(0,i.kt)("p",null,"The client configuration currently only contains parameters used by\nadapters."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},'stop_daemon: false\npath_inclusions: ["/tmp/test_hermes"]\npath_exclusions: ["/"]\nfile_page_size: 1024KB\nbase_adapter_mode: kDefault\nflushing_mode: kAsync\nfile_adapter_configs:\n  - path: "/"\n    page_size: 1MB\n    mode: kDefault\n')),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"stop_daemon"),": stop the daemon when adapters exit. Generally, leave\nthis false and stop the daemon using finalize_daemon script. Will likely\nbe removed in the near future."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"file_page_size"),": The page size used to fragment files into blobs in\nHermes.")),(0,i.kt)("h3",{id:"path-inclusion--exclusion"},"Path Inclusion / Exclusion"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},'path_inclusions: ["/tmp/test_hermes"]\npath_exclusions: ["/"]\n')),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"path_inclusions"),": Which paths to buffer? In this case, everything which\nis a child of /tmp/test_hermes."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"path_exclusions"),": Which paths to ignore? In this case, everything which\nis a child of the root directory. Technically everything on the system.")),(0,i.kt)("p",null,'We prioritize paths in inclusions and exclusions depending on how\nspecific the path is. In other words, we sort the paths by the length\nof the path. For example, in this case, /tmp/test_hermes will be included\nsince it has a longer path than "/". Everything other than /tmp/test_hermes\nwill be excluded.'),(0,i.kt)("h3",{id:"adapter-mode"},"Adapter Mode"),(0,i.kt)("p",null,"The adapter mode determines how Hermes buffers adapter data by default.\nThere are three adapter modes:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"kDefault: Hermes will buffer data and then flush to the PFS eventually"),(0,i.kt)("li",{parentName:"ol"},"kScratch: Hermes will buffer data, but never flush"),(0,i.kt)("li",{parentName:"ol"},"kBypass: Hermes will never buffer data, and always flush to the PFS")),(0,i.kt)("p",null,"kDefault is the real use case of Hermes, the other two are for benchmarking\nand testing purposes."),(0,i.kt)("p",null,"This parameter can also be set by an environment variable. The\nenvironment variable is prioritized."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"HERMES_ADAPTER_MODE=kDefault \\\n./myhermesapp\n")),(0,i.kt)("h3",{id:"file-page-size"},"File Page Size"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"file_page_size: 1024KB\n")),(0,i.kt)("p",null,"This parameter dictates how adapters convert files into blobs.\nBy default, files are divided into 1024KB (1MB) blobs. Setting\nthis parameter appropriately can have impacts on\nwrite and read amplification and metadata overhead."),(0,i.kt)("p",null,"For workloads which perform 4KB reads to a large file, each read\nwill be amplified to 1MB unless the page size is reset."),(0,i.kt)("p",null,"For the same workload, setting a file page size equal to 4KB may\nresult in a significant increase in metadata being stored in the\nmetadata manager."),(0,i.kt)("p",null,"In other words, this parameter is worth tuning."),(0,i.kt)("p",null,"This parameter can also be set using an environment variable. The\nenvironment variable is prioritized."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"HERMES_PAGE_SIZE=1024KB \\\n./myhermesapp\n")),(0,i.kt)("h3",{id:"flushing-mode"},"Flushing Mode"),(0,i.kt)("p",null,"The flushing mode indicates how Hermes should flush data to the PFS.\nCurrently there are two modes provided:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"kAsync: Flush data asynchronously in a background thread"),(0,i.kt)("li",{parentName:"ol"},"kSync: Flush data synchronously")),(0,i.kt)("p",null,"kAsync is recommended. kSync is used only in unit tests since it has\nlow performance."),(0,i.kt)("h3",{id:"adapter-config"},"Adapter Config"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},'file_adapter_configs:\n  - path: "/"\n    page_size: 1MB\n    mode: kDefault\n')),(0,i.kt)("p",null,"Contains file-specific overrides to the default adapter variables defined\nabove. You can modify the adapter mode (3.2.2) and file page size for each"),(0,i.kt)("h2",{id:"provided-configurations"},"Provided Configurations"),(0,i.kt)("p",null,"We also provide Hermes configurations we use with a few systems to which you\nmight have access:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/HDFGroup/hermes/blob/master/test/data/ares.yaml"},"Ares (IIT)")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/HDFGroup/hermes/tree/master/test/data"},"Frontera (TACC)")," (Coming soon.)")),(0,i.kt)("p",null,"Bear in mind that a suitable Hermes configuration also depends on\napplications' I/O workload and not just the configuration of the\nunderlying machine."),(0,i.kt)("h2",{id:"how-to-avoid-repeating-the-default-configurations"},"How To Avoid Repeating the Default Configurations"),(0,i.kt)("p",null,"Many parameters in Hermes can be left as default. Any parameters which\nyou would like to leave as default can be removed from your configuration\nfile completely. Hermes will fill in missing values based on the values\nin our default configurations."))}p.isMDXComponent=!0}}]);