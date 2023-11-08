"use strict";(self.webpackChunkgnosis=self.webpackChunkgnosis||[]).push([[6687],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>d});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=n.createContext({}),c=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=c(e.components);return n.createElement(s.Provider,{value:t},e.children)},u="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=c(r),m=o,d=u["".concat(s,".").concat(m)]||u[m]||f[m]||a;return r?n.createElement(d,i(i({ref:t},p),{},{components:r})):n.createElement(d,i({ref:t},p))}));function d(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[u]="string"==typeof e?e:o,i[1]=l;for(var c=2;c<a;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},3193:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>f,frontMatter:()=>a,metadata:()=>l,toc:()=>c});var n=r(7462),o=(r(7294),r(3905));const a={},i="Doxygen",l={unversionedId:"hermes/doxygen",id:"hermes/doxygen",title:"Doxygen",description:"The Doxygen portion of the Hermes documentation can be built as follows:",source:"@site/docs/03-hermes/10-doxygen.md",sourceDirName:"03-hermes",slug:"/hermes/doxygen",permalink:"/docs/hermes/doxygen",draft:!1,tags:[],version:"current",sidebarPosition:10,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Debugging",permalink:"/docs/hermes/debugging"},next:{title:"Frequently Asked Questions",permalink:"/docs/hermes/faq"}},s={},c=[],p={toc:c},u="wrapper";function f(e){let{components:t,...r}=e;return(0,o.kt)(u,(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"doxygen"},"Doxygen"),(0,o.kt)("p",null,"The ",(0,o.kt)("a",{parentName:"p",href:"https://www.doxygen.nl/index.html"},"Doxygen")," portion of the Hermes documentation can be built as follows:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"cmake -D <Other Hermes CMake build options> -DHERMES_ENABLE_DOXYGEN=ON ../\nmake dox\n")),(0,o.kt)("p",null,"The HTML version of the documentation will be placed into the ",(0,o.kt)("inlineCode",{parentName:"p"},"_build/html")," subfolder of the build directory."),(0,o.kt)("p",null,"An online version for the latest release is available at ",(0,o.kt)("a",{parentName:"p",href:"https://hdfgroup.github.io/hermes/html/"},"https://hdfgroup.github.io/hermes/html/"),"."),(0,o.kt)("p",null,"The official version for the stable release is available at ",(0,o.kt)("a",{parentName:"p",href:"https://docs.hdfgroup.org/hermes/"},"https://docs.hdfgroup.org/hermes/"),"."))}f.isMDXComponent=!0}}]);