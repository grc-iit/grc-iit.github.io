"use strict";(self.webpackChunkgnosis=self.webpackChunkgnosis||[]).push([[5243],{3905:(e,t,n)=>{n.d(t,{Zo:()=>b,kt:()=>d});var o=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=o.createContext({}),c=function(e){var t=o.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},b=function(e){var t=c(e.components);return o.createElement(l.Provider,{value:t},e.children)},g="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},u=o.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,l=e.parentName,b=s(e,["components","mdxType","originalType","parentName"]),g=c(n),u=a,d=g["".concat(l,".").concat(u)]||g[u]||p[u]||r;return n?o.createElement(d,i(i({ref:t},b),{},{components:n})):o.createElement(d,i({ref:t},b))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,i=new Array(r);i[0]=u;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[g]="string"==typeof e?e:a,i[1]=s;for(var c=2;c<r;c++)i[c]=n[c];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}u.displayName="MDXCreateElement"},8070:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>p,frontMatter:()=>r,metadata:()=>s,toc:()=>c});var o=n(7462),a=(n(7294),n(3905));const r={},i="Tagging",s={unversionedId:"hermes/components/tagging",id:"hermes/components/tagging",title:"Tagging",description:"Tags enable users to semantically define associations between blobs and provide",source:"@site/docs/03-hermes/06-components/11-tagging.md",sourceDirName:"03-hermes/06-components",slug:"/hermes/components/tagging",permalink:"/docs/hermes/components/tagging",draft:!1,tags:[],version:"current",sidebarPosition:11,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Examples",permalink:"/docs/hermes/components/examples"},next:{title:"Topology",permalink:"/docs/hermes/components/topology"}},l={},c=[{value:"The tagging API",id:"the-tagging-api",level:2}],b={toc:c},g="wrapper";function p(e){let{components:t,...n}=e;return(0,a.kt)(g,(0,o.Z)({},b,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"tagging"},"Tagging"),(0,a.kt)("p",null,"Tags enable users to semantically define associations between blobs and provide\nan intuitive way of locating blobs which are related. Tags can be used\ninternally by Hermes to provide enhanced data placement decisions based on the\nlogical grouping of data. Operations (known as Traits) can be associated with\ntags to define a set of operations to perform based."),(0,a.kt)("h2",{id:"the-tagging-api"},"The tagging API"),(0,a.kt)("p",null,"The tag API supports the ability to tag and untag a blob. There are two general\nuse cases of tags: locating related blobs, and defining a set of operations to\nperform on a blob. In the below example, we show how to use tags to locate\nblobs. We discuss the use of tagging for operating on blobs through the use of\nTraits."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-cpp"},'int main() {\n  size_t blob_size = KILOBYTES(4);\n  hermes::api::Context ctx;\n  BlobId blob_id[2];\n\n  auto bkt1 = HERMES->GetBucket("hello1");\n  auto bkt2 = HERMES->GetBucket("hello2");\n\n  Blob blob(blob_size);\n  bkt1->Put("1", blob, blob_id[0], ctx);\n  bkt2->Put("2", blob, blob_id[1], ctx);\n\n  TagId tag = HERMES->CreateTag("equivalent");\n  bkt1->TagBlob(blob_id[0], tag);\n  bkt2->TagBlob(blob_id[1], tag);\n  std::vector<BlobId> tags = HERMES->GroupBy(tag);\n  REQUIRE(tags.size() == 2);\n}\n')),(0,a.kt)("p",null,'In this example, we create two buckets and one blob (of size 4KB) in each\nbucket. Both blobs have the same value. We create the tag "equivalent" to\nindicate that blobs with this tag are all equal. Note, the name of the tag is\nonly relevant to the user, and has no internal meaning to Hermes itself. Hermes\ndoes not know the blobs are equivalent.'),(0,a.kt)("p",null,'Next, we tag the two blobs, which are in separate buckets, with the "equivalent"\ntag. We then group all blobs which have the tag. We verify that the number of\nblobs apart of this tag is two and then return.'))}p.isMDXComponent=!0}}]);