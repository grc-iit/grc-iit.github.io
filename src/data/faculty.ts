import { Member } from "../types";

export default [
  {
    name: "Dr. Xian-He Sun",
    title: "Distinguished Professor",
    bio: "Dr. Xian-He Sun is the Director of the Gnosis Research Center and an IEEE fellow. He is a University Distinguished Professor and the Ron Hochsprung Endowed Chair of Computer Science at Illinois Institute of Technology. His current research interests include parallel and distributed processing, memory and I/O systems, software system for Big Data applications, and performance evaluation and optimization.",
    image: require("@site/static/img/faculty/sun.jpg").default,
    links: {
      email: "sun@iit.edu",
      scholar: "https://scholar.google.com/citations?user=9h3JX7MAAAAJ&hl=en",
      website: "http://www.cs.iit.edu/~scs/sun",
    },
  },
  {
    name: "Dr. Anthony Kougkas",
    title: "Assistant Research Professor",
    email: "akougkas@iit.edu",
    website: "",
    bio: "Dr. Anthony Kougkas is the Deputy Director of the Gnosis Research Center at the Illinois Institute of Technology. With a Ph.D. in Computer Science, he is committed to solving data management and I/O challenges in extreme-scale distributed applications. His research has led to advancements in multi-tiered storage systems, data prefetching, replication, compression, and in-transit/in-situ techniques, resulting in performance improvements for HPC, Cloud, and AI workloads.",
    image: require("@site/static/img/faculty/kougkas.jpg").default,
    links: {
      email: "akougkas@iit.edu",
      linkedin: "https://www.linkedin.com/in/anthonykougkas/",
      scholar: "https://scholar.google.com/citations?user=hiNO0EEAAAAJ&hl=en",
      website: "https://akougkas.com/",
    },
  },
] as Member[];
