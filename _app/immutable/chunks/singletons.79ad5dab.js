import{w as u}from"./index.a6262eea.js";var _;const g=((_=globalThis.__sveltekit_doydw8)==null?void 0:_.base)??"";var h;const v=((h=globalThis.__sveltekit_doydw8)==null?void 0:h.assets)??g,k="1682536070878",A="sveltekit:snapshot",R="sveltekit:scroll",T="sveltekit:index",f={tap:1,hover:2,viewport:3,eager:4,off:-1};function I(e){let t=e.baseURI;if(!t){const n=e.getElementsByTagName("base");t=n.length?n[0].href:e.URL}return t}function S(){return{x:pageXOffset,y:pageYOffset}}function i(e,t){return e.getAttribute(`data-sveltekit-${t}`)}const d={...f,"":f.hover};function b(e){let t=e.assignedSlot??e.parentNode;return(t==null?void 0:t.nodeType)===11&&(t=t.host),t}function x(e,t){for(;e&&e!==t;){if(e.nodeName.toUpperCase()==="A"&&e.hasAttribute("href"))return e;e=b(e)}}function O(e,t){let n;try{n=new URL(e instanceof SVGAElement?e.href.baseVal:e.href,document.baseURI)}catch{}const l=e instanceof SVGAElement?e.target.baseVal:e.target,a=!n||!!l||E(n,t)||(e.getAttribute("rel")||"").split(/\s+/).includes("external")||e.hasAttribute("download");return{url:n,external:a,target:l}}function U(e){let t=null,n=null,l=null,a=null,r=null,o=null,s=e;for(;s&&s!==document.documentElement;)l===null&&(l=i(s,"preload-code")),a===null&&(a=i(s,"preload-data")),t===null&&(t=i(s,"keepfocus")),n===null&&(n=i(s,"noscroll")),r===null&&(r=i(s,"reload")),o===null&&(o=i(s,"replacestate")),s=b(s);return{preload_code:d[l??"off"],preload_data:d[a??"off"],keep_focus:t==="off"?!1:t===""?!0:null,noscroll:n==="off"?!1:n===""?!0:null,reload:r==="off"?!1:r===""?!0:null,replace_state:o==="off"?!1:o===""?!0:null}}function p(e){const t=u(e);let n=!0;function l(){n=!0,t.update(o=>o)}function a(o){n=!1,t.set(o)}function r(o){let s;return t.subscribe(c=>{(s===void 0||n&&c!==s)&&o(s=c)})}return{notify:l,set:a,subscribe:r}}function w(){const{set:e,subscribe:t}=u(!1);let n;async function l(){clearTimeout(n);const a=await fetch(`${v}/_app/version.json`,{headers:{pragma:"no-cache","cache-control":"no-cache"}});if(a.ok){const o=(await a.json()).version!==k;return o&&(e(!0),clearTimeout(n)),o}else throw new Error(`Version check failed: ${a.status}`)}return{subscribe:t,check:l}}function E(e,t){return e.origin!==location.origin||!e.pathname.startsWith(t)}let m;function L(e){m=e.client}const N={url:p({}),page:p({}),navigating:u(null),updated:w()};export{T as I,f as P,R as S,A as a,O as b,U as c,S as d,g as e,x as f,I as g,L as h,E as i,m as j,N as s};
