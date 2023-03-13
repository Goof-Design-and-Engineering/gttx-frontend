import{S as at,i as nt,s as rt,a as ot,e as M,c as it,b as K,g as de,t as G,d as pe,f as H,h as J,j as st,o as Ae,k as lt,l as ct,m as ft,n as ve,p as q,q as ut,r as dt,u as pt,v as Y,w as X,x as Te,y as Z,z as Q,A as ce}from"./chunks/index-effa2c47.js";import{S as et,I as C,g as Ke,f as ze,a as Ee,b as fe,s as B,i as We,c as ue,P as Ye,d as ht,e as mt,h as _t}from"./chunks/singletons-8688bc0f.js";import{_ as D}from"./chunks/preload-helper-41c905a7.js";function gt(n,e){return n==="/"||e==="ignore"?n:e==="never"?n.endsWith("/")?n.slice(0,-1):n:e==="always"&&!n.endsWith("/")?n+"/":n}function wt(n){return n.split("%25").map(decodeURI).join("%25")}function yt(n){for(const e in n)n[e]=decodeURIComponent(n[e]);return n}const bt=["href","pathname","search","searchParams","toString","toJSON"];function vt(n,e){const a=new URL(n);for(const l of bt){let i=a[l];Object.defineProperty(a,l,{get(){return e(),i},enumerable:!0,configurable:!0})}return Et(a),a}function Et(n){Object.defineProperty(n,"hash",{get(){throw new Error("Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead")}})}const kt="/__data.json";function Rt(n){return n.replace(/\/$/,"")+kt}function Lt(n){let e=5381;if(typeof n=="string"){let a=n.length;for(;a;)e=e*33^n.charCodeAt(--a)}else if(ArrayBuffer.isView(n)){const a=new Uint8Array(n.buffer,n.byteOffset,n.byteLength);let l=a.length;for(;l;)e=e*33^a[--l]}else throw new TypeError("value must be a string or TypedArray");return(e>>>0).toString(36)}const he=window.fetch;window.fetch=(n,e)=>((n instanceof Request?n.method:(e==null?void 0:e.method)||"GET")!=="GET"&&ae.delete(De(n)),he(n,e));const ae=new Map;function It(n,e){const a=De(n,e),l=document.querySelector(a);if(l!=null&&l.textContent){const{body:i,...m}=JSON.parse(l.textContent),t=l.getAttribute("data-ttl");return t&&ae.set(a,{body:i,init:m,ttl:1e3*Number(t)}),Promise.resolve(new Response(i,m))}return he(n,e)}function At(n,e,a){if(ae.size>0){const l=De(n,a),i=ae.get(l);if(i){if(performance.now()<i.ttl&&["default","force-cache","only-if-cached",void 0].includes(a==null?void 0:a.cache))return new Response(i.body,i.init);ae.delete(l)}}return he(e,a)}function De(n,e){let l=`script[data-sveltekit-fetched][data-url=${JSON.stringify(n instanceof Request?n.url:n)}]`;return e!=null&&e.body&&(typeof e.body=="string"||ArrayBuffer.isView(e.body))&&(l+=`[data-hash="${Lt(e.body)}"]`),l}const St=/^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;function Ot(n){const e=[];return{pattern:n==="/"?/^\/$/:new RegExp(`^${Tt(n).map(l=>{const i=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(l);if(i)return e.push({name:i[1],matcher:i[2],optional:!1,rest:!0,chained:!0}),"(?:/(.*))?";const m=/^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(l);if(m)return e.push({name:m[1],matcher:m[2],optional:!0,rest:!1,chained:!0}),"(?:/([^/]+))?";if(!l)return;const t=l.split(/\[(.+?)\](?!\])/);return"/"+t.map((h,_)=>{if(_%2){if(h.startsWith("x+"))return ke(String.fromCharCode(parseInt(h.slice(2),16)));if(h.startsWith("u+"))return ke(String.fromCharCode(...h.slice(2).split("-").map(P=>parseInt(P,16))));const w=St.exec(h);if(!w)throw new Error(`Invalid param: ${h}. Params and matcher names can only have underscores and alphanumeric characters.`);const[,v,L,$,j]=w;return e.push({name:$,matcher:j,optional:!!v,rest:!!L,chained:L?_===1&&t[0]==="":!1}),L?"(.*?)":v?"([^/]*)?":"([^/]+?)"}return ke(h)}).join("")}).join("")}/?$`),params:e}}function Pt(n){return!/^\([^)]+\)$/.test(n)}function Tt(n){return n.slice(1).split("/").filter(Pt)}function Dt(n,e,a){const l={},i=n.slice(1);let m="";for(let t=0;t<e.length;t+=1){const f=e[t];let h=i[t];if(f.chained&&f.rest&&m&&(h=h?m+"/"+h:m),m="",h===void 0)f.rest&&(l[f.name]="");else{if(f.matcher&&!a[f.matcher](h)){if(f.optional&&f.chained){let _=i.indexOf(void 0,t);if(_===-1){const w=e[t+1];if(w!=null&&w.rest&&w.chained)m=h;else return}for(;_>=t;)i[_]=i[_-1],_-=1;continue}return}l[f.name]=h}}if(!m)return l}function ke(n){return n.normalize().replace(/[[\]]/g,"\\$&").replace(/%/g,"%25").replace(/\//g,"%2[Ff]").replace(/\?/g,"%3[Ff]").replace(/#/g,"%23").replace(/[.*+?^${}()|\\]/g,"\\$&")}function Nt(n,e,a,l){const i=new Set(e);return Object.entries(a).map(([f,[h,_,w]])=>{const{pattern:v,params:L}=Ot(f),$={id:f,exec:j=>{const P=v.exec(j);if(P)return Dt(P,L,l)},errors:[1,...w||[]].map(j=>n[j]),layouts:[0,..._||[]].map(t),leaf:m(h)};return $.errors.length=$.layouts.length=Math.max($.errors.length,$.layouts.length),$});function m(f){const h=f<0;return h&&(f=~f),[h,n[f]]}function t(f){return f===void 0?f:[i.has(f),n[f]]}}function Ut(n){let e,a,l;var i=n[0][0];function m(t){return{props:{data:t[2],form:t[1]}}}return i&&(e=Y(i,m(n))),{c(){e&&X(e.$$.fragment),a=M()},l(t){e&&Te(e.$$.fragment,t),a=M()},m(t,f){e&&Z(e,t,f),K(t,a,f),l=!0},p(t,f){const h={};if(f&4&&(h.data=t[2]),f&2&&(h.form=t[1]),i!==(i=t[0][0])){if(e){de();const _=e;G(_.$$.fragment,1,0,()=>{Q(_,1)}),pe()}i?(e=Y(i,m(t)),X(e.$$.fragment),H(e.$$.fragment,1),Z(e,a.parentNode,a)):e=null}else i&&e.$set(h)},i(t){l||(e&&H(e.$$.fragment,t),l=!0)},o(t){e&&G(e.$$.fragment,t),l=!1},d(t){t&&J(a),e&&Q(e,t)}}}function $t(n){let e,a,l;var i=n[0][0];function m(t){return{props:{data:t[2],$$slots:{default:[jt]},$$scope:{ctx:t}}}}return i&&(e=Y(i,m(n))),{c(){e&&X(e.$$.fragment),a=M()},l(t){e&&Te(e.$$.fragment,t),a=M()},m(t,f){e&&Z(e,t,f),K(t,a,f),l=!0},p(t,f){const h={};if(f&4&&(h.data=t[2]),f&523&&(h.$$scope={dirty:f,ctx:t}),i!==(i=t[0][0])){if(e){de();const _=e;G(_.$$.fragment,1,0,()=>{Q(_,1)}),pe()}i?(e=Y(i,m(t)),X(e.$$.fragment),H(e.$$.fragment,1),Z(e,a.parentNode,a)):e=null}else i&&e.$set(h)},i(t){l||(e&&H(e.$$.fragment,t),l=!0)},o(t){e&&G(e.$$.fragment,t),l=!1},d(t){t&&J(a),e&&Q(e,t)}}}function jt(n){let e,a,l;var i=n[0][1];function m(t){return{props:{data:t[3],form:t[1]}}}return i&&(e=Y(i,m(n))),{c(){e&&X(e.$$.fragment),a=M()},l(t){e&&Te(e.$$.fragment,t),a=M()},m(t,f){e&&Z(e,t,f),K(t,a,f),l=!0},p(t,f){const h={};if(f&8&&(h.data=t[3]),f&2&&(h.form=t[1]),i!==(i=t[0][1])){if(e){de();const _=e;G(_.$$.fragment,1,0,()=>{Q(_,1)}),pe()}i?(e=Y(i,m(t)),X(e.$$.fragment),H(e.$$.fragment,1),Z(e,a.parentNode,a)):e=null}else i&&e.$set(h)},i(t){l||(e&&H(e.$$.fragment,t),l=!0)},o(t){e&&G(e.$$.fragment,t),l=!1},d(t){t&&J(a),e&&Q(e,t)}}}function Xe(n){let e,a=n[5]&&Ze(n);return{c(){e=lt("div"),a&&a.c(),this.h()},l(l){e=ct(l,"DIV",{id:!0,"aria-live":!0,"aria-atomic":!0,style:!0});var i=ft(e);a&&a.l(i),i.forEach(J),this.h()},h(){ve(e,"id","svelte-announcer"),ve(e,"aria-live","assertive"),ve(e,"aria-atomic","true"),q(e,"position","absolute"),q(e,"left","0"),q(e,"top","0"),q(e,"clip","rect(0 0 0 0)"),q(e,"clip-path","inset(50%)"),q(e,"overflow","hidden"),q(e,"white-space","nowrap"),q(e,"width","1px"),q(e,"height","1px")},m(l,i){K(l,e,i),a&&a.m(e,null)},p(l,i){l[5]?a?a.p(l,i):(a=Ze(l),a.c(),a.m(e,null)):a&&(a.d(1),a=null)},d(l){l&&J(e),a&&a.d()}}}function Ze(n){let e;return{c(){e=ut(n[6])},l(a){e=dt(a,n[6])},m(a,l){K(a,e,l)},p(a,l){l&64&&pt(e,a[6])},d(a){a&&J(e)}}}function Vt(n){let e,a,l,i,m;const t=[$t,Ut],f=[];function h(w,v){return w[0][1]?0:1}e=h(n),a=f[e]=t[e](n);let _=n[4]&&Xe(n);return{c(){a.c(),l=ot(),_&&_.c(),i=M()},l(w){a.l(w),l=it(w),_&&_.l(w),i=M()},m(w,v){f[e].m(w,v),K(w,l,v),_&&_.m(w,v),K(w,i,v),m=!0},p(w,[v]){let L=e;e=h(w),e===L?f[e].p(w,v):(de(),G(f[L],1,1,()=>{f[L]=null}),pe(),a=f[e],a?a.p(w,v):(a=f[e]=t[e](w),a.c()),H(a,1),a.m(l.parentNode,l)),w[4]?_?_.p(w,v):(_=Xe(w),_.c(),_.m(i.parentNode,i)):_&&(_.d(1),_=null)},i(w){m||(H(a),m=!0)},o(w){G(a),m=!1},d(w){f[e].d(w),w&&J(l),_&&_.d(w),w&&J(i)}}}function qt(n,e,a){let{stores:l}=e,{page:i}=e,{components:m}=e,{form:t}=e,{data_0:f=null}=e,{data_1:h=null}=e;st(l.page.notify);let _=!1,w=!1,v=null;return Ae(()=>{const L=l.page.subscribe(()=>{_&&(a(5,w=!0),a(6,v=document.title||"untitled page"))});return a(4,_=!0),L}),n.$$set=L=>{"stores"in L&&a(7,l=L.stores),"page"in L&&a(8,i=L.page),"components"in L&&a(0,m=L.components),"form"in L&&a(1,t=L.form),"data_0"in L&&a(2,f=L.data_0),"data_1"in L&&a(3,h=L.data_1)},n.$$.update=()=>{n.$$.dirty&384&&l.page.set(i)},[m,t,f,h,_,w,v,l,i]}class Ct extends at{constructor(e){super(),nt(this,e,qt,Vt,rt,{stores:7,page:8,components:0,form:1,data_0:2,data_1:3})}}const Ft={},me=[()=>D(()=>import("./chunks/0-da65815c.js"),["./chunks/0-da65815c.js","./chunks/_layout-da46b06b.js","./components/pages/_layout.svelte-eb36b3f3.js","./chunks/index-effa2c47.js","./chunks/pocketbase-6b8fcb7c.js","./chunks/index-60d8a1c8.js"],import.meta.url),()=>D(()=>import("./chunks/1-9aa395f0.js"),["./chunks/1-9aa395f0.js","./components/pages/_error.svelte-a598decb.js","./chunks/index-effa2c47.js"],import.meta.url),()=>D(()=>import("./chunks/2-7925e43c.js"),["./chunks/2-7925e43c.js","./components/pages/_page.svelte-d4bc783d.js","./chunks/index-effa2c47.js"],import.meta.url),()=>D(()=>import("./chunks/3-84c5fdd1.js"),["./chunks/3-84c5fdd1.js","./components/pages/(gameflow)/invite/_page.svelte-f3373bc8.js","./chunks/index-effa2c47.js"],import.meta.url),()=>D(()=>import("./chunks/4-6eb83d3b.js"),["./chunks/4-6eb83d3b.js","./components/pages/(gameflow)/start/_page.svelte-f3373bc8.js","./chunks/index-effa2c47.js"],import.meta.url),()=>D(()=>import("./chunks/5-2956d6aa.js"),["./chunks/5-2956d6aa.js","./components/pages/(roles)/f/_page.svelte-be2ac045.js","./chunks/index-effa2c47.js","./chunks/pocketbase-6b8fcb7c.js","./chunks/index-60d8a1c8.js","./assets/_page-06886043.css","./assets/bootstrap-icons-a448e25b.css"],import.meta.url),()=>D(()=>import("./chunks/6-ec1cd54d.js"),["./chunks/6-ec1cd54d.js","./components/pages/(roles)/o/_page.svelte-15be8c4f.js","./chunks/index-effa2c47.js","./chunks/pocketbase-6b8fcb7c.js","./chunks/index-60d8a1c8.js","./chunks/navigation-b2d51cf1.js","./chunks/singletons-8688bc0f.js"],import.meta.url),()=>D(()=>import("./chunks/7-178ecee0.js"),["./chunks/7-178ecee0.js","./components/pages/(roles)/o/dashboard/_page.svelte-4a3b3039.js","./chunks/preload-helper-41c905a7.js","./chunks/index-effa2c47.js","./chunks/y-websocket-00d63cb4.js","./chunks/pocketbase-6b8fcb7c.js","./chunks/index-60d8a1c8.js","./assets/_page-1650413b.css"],import.meta.url),()=>D(()=>import("./chunks/8-ca103eb2.js"),["./chunks/8-ca103eb2.js","./components/pages/(roles)/p/_page.svelte-15be8c4f.js","./chunks/index-effa2c47.js","./chunks/pocketbase-6b8fcb7c.js","./chunks/index-60d8a1c8.js","./chunks/navigation-b2d51cf1.js","./chunks/singletons-8688bc0f.js"],import.meta.url),()=>D(()=>import("./chunks/9-a1daa3b7.js"),["./chunks/9-a1daa3b7.js","./components/pages/(roles)/p/dashboard/_page.svelte-4a3b3039.js","./chunks/preload-helper-41c905a7.js","./chunks/index-effa2c47.js","./chunks/y-websocket-00d63cb4.js","./chunks/pocketbase-6b8fcb7c.js","./chunks/index-60d8a1c8.js","./assets/_page-1650413b.css"],import.meta.url),()=>D(()=>import("./chunks/10-08a293c9.js"),["./chunks/10-08a293c9.js","./components/pages/(www)/about/_page.svelte-809072ee.js","./chunks/index-effa2c47.js"],import.meta.url),()=>D(()=>import("./chunks/11-2286116c.js"),["./chunks/11-2286116c.js","./components/pages/(www)/account/_page.svelte-35901023.js","./chunks/index-effa2c47.js","./chunks/main-991480f9.js","./chunks/index-60d8a1c8.js","./chunks/pocketbase-6b8fcb7c.js","./chunks/navigation-b2d51cf1.js","./chunks/singletons-8688bc0f.js","./assets/bootstrap-icons-a448e25b.css"],import.meta.url),()=>D(()=>import("./chunks/12-0f1e7ed4.js"),["./chunks/12-0f1e7ed4.js","./components/pages/(www)/createorg/_page.svelte-13b4781b.js","./chunks/index-effa2c47.js"],import.meta.url),()=>D(()=>import("./chunks/13-a23e12a4.js"),["./chunks/13-a23e12a4.js","./components/pages/(www)/login/_page.svelte-382ad311.js","./chunks/index-effa2c47.js","./chunks/main-991480f9.js","./chunks/index-60d8a1c8.js","./chunks/pocketbase-6b8fcb7c.js","./chunks/validators-98527b51.js","./chunks/navigation-b2d51cf1.js","./chunks/singletons-8688bc0f.js","./assets/bootstrap-icons-a448e25b.css"],import.meta.url),()=>D(()=>import("./chunks/14-ac95ff35.js"),["./chunks/14-ac95ff35.js","./components/pages/(www)/register/_page.svelte-42aa498b.js","./chunks/index-effa2c47.js","./chunks/main-991480f9.js","./chunks/index-60d8a1c8.js","./chunks/pocketbase-6b8fcb7c.js","./chunks/validators-98527b51.js","./chunks/navigation-b2d51cf1.js","./chunks/singletons-8688bc0f.js","./assets/bootstrap-icons-a448e25b.css"],import.meta.url),()=>D(()=>import("./chunks/15-151919e1.js"),["./chunks/15-151919e1.js","./components/pages/(www)/signup/_page.svelte-13b4781b.js","./chunks/index-effa2c47.js"],import.meta.url)],Bt=[],Mt={"/":[2],"/(www)/about":[10],"/(www)/account":[11],"/(www)/createorg":[12],"/(roles)/f":[5],"/(gameflow)/invite":[3],"/(www)/login":[13],"/(roles)/o":[6],"/(roles)/o/dashboard":[7],"/(roles)/p":[8],"/(roles)/p/dashboard":[9],"/(www)/register":[14],"/(www)/signup":[15],"/(gameflow)/start":[4]},Gt={handleError:({error:n})=>{console.error(n)}};let Se=class{constructor(e,a){this.status=e,typeof a=="string"?this.body={message:a}:a?this.body=a:this.body={message:`Error: ${e}`}}toString(){return JSON.stringify(this.body)}},Qe=class{constructor(e,a){this.status=e,this.location=a}};async function Ht(n){var e;for(const a in n)if(typeof((e=n[a])==null?void 0:e.then)=="function")return Object.fromEntries(await Promise.all(Object.entries(n).map(async([l,i])=>[l,await i])));return n}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");const Jt=-1,Kt=-2,zt=-3,Wt=-4,Yt=-5,Xt=-6;function Zt(n){if(typeof n=="number")return l(n,!0);if(!Array.isArray(n)||n.length===0)throw new Error("Invalid input");const e=n,a=Array(e.length);function l(i,m=!1){if(i===Jt)return;if(i===zt)return NaN;if(i===Wt)return 1/0;if(i===Yt)return-1/0;if(i===Xt)return-0;if(m)throw new Error("Invalid input");if(i in a)return a[i];const t=e[i];if(!t||typeof t!="object")a[i]=t;else if(Array.isArray(t))if(typeof t[0]=="string")switch(t[0]){case"Date":a[i]=new Date(t[1]);break;case"Set":const h=new Set;a[i]=h;for(let v=1;v<t.length;v+=1)h.add(l(t[v]));break;case"Map":const _=new Map;a[i]=_;for(let v=1;v<t.length;v+=2)_.set(l(t[v]),l(t[v+1]));break;case"RegExp":a[i]=new RegExp(t[1],t[2]);break;case"Object":a[i]=Object(t[1]);break;case"BigInt":a[i]=BigInt(t[1]);break;case"null":const w=Object.create(null);a[i]=w;for(let v=1;v<t.length;v+=2)w[t[v]]=l(t[v+1]);break}else{const f=new Array(t.length);a[i]=f;for(let h=0;h<t.length;h+=1){const _=t[h];_!==Kt&&(f[h]=l(_))}}else{const f={};a[i]=f;for(const h in t){const _=t[h];f[h]=l(_)}}return a[i]}return l(0)}const Re=Nt(me,Bt,Mt,Ft),Oe=me[0],Pe=me[1];Oe();Pe();let ne={};try{ne=JSON.parse(sessionStorage[et])}catch{}function Le(n){ne[n]=ue()}function Qt({target:n,base:e}){var Ge;const a=document.documentElement,l=[];let i=null;const m={before_navigate:[],after_navigate:[]};let t={branch:[],error:null,url:null},f=!1,h=!1,_=!0,w=!1,v=!1,L=!1,$=!1,j,P=(Ge=history.state)==null?void 0:Ge[C];P||(P=Date.now(),history.replaceState({...history.state,[C]:P},"",location.href));const _e=ne[P];_e&&(history.scrollRestoration="manual",scrollTo(_e.x,_e.y));let F,Ne,re;async function Ue(){re=re||Promise.resolve(),await re,re=null;const r=new URL(location.href),o=se(r,!0);i=null,await je(o,r,[])}async function ge(r,{noScroll:o=!1,replaceState:c=!1,keepFocus:s=!1,state:d={},invalidateAll:u=!1},p,y){return typeof r=="string"&&(r=new URL(r,Ke(document))),le({url:r,scroll:o?ue():null,keepfocus:s,redirect_chain:p,details:{state:d,replaceState:c},nav_token:y,accepted:()=>{u&&($=!0)},blocked:()=>{},type:"goto"})}async function $e(r){const o=se(r,!1);if(!o)throw new Error(`Attempted to preload a URL that does not belong to this app: ${r}`);return i={id:o.id,promise:Ce(o).then(c=>(c.type==="loaded"&&c.state.error&&(i=null),c))},i.promise}async function oe(...r){const c=Re.filter(s=>r.some(d=>s.exec(d))).map(s=>Promise.all([...s.layouts,s.leaf].map(d=>d==null?void 0:d[1]())));await Promise.all(c)}async function je(r,o,c,s,d={},u){var y,b;Ne=d;let p=r&&await Ce(r);if(p||(p=await Me(o,{id:null},await te(new Error(`Not found: ${o.pathname}`),{url:o,params:{},route:{id:null}}),404)),o=(r==null?void 0:r.url)||o,Ne!==d)return!1;if(p.type==="redirect")if(c.length>10||c.includes(o.pathname))p=await ie({status:500,error:await te(new Error("Redirect loop"),{url:o,params:{},route:{id:null}}),url:o,route:{id:null}});else return ge(new URL(p.location,o).href,{},[...c,o.pathname],d),!1;else((b=(y=p.props)==null?void 0:y.page)==null?void 0:b.status)>=400&&await B.updated.check()&&await ee(o);if(l.length=0,$=!1,w=!0,s&&s.details){const{details:g}=s,k=g.replaceState?0:1;g.state[C]=P+=k,history[g.replaceState?"replaceState":"pushState"](g.state,"",o)}if(i=null,h?(t=p.state,p.props.page&&(p.props.page.url=o),j.$set(p.props)):Ve(p),s){const{scroll:g,keepfocus:k}=s;if(k||Ie(),await ce(),_){const I=o.hash&&document.getElementById(o.hash.slice(1));g?scrollTo(g.x,g.y):I?I.scrollIntoView():scrollTo(0,0)}}else await ce();_=!0,p.props.page&&(F=p.props.page),u&&u(),w=!1}function Ve(r){var s;t=r.state;const o=document.querySelector("style[data-sveltekit]");o&&o.remove(),F=r.props.page,j=new Ct({target:n,props:{...r.props,stores:B},hydrate:!0});const c={from:null,to:{params:t.params,route:{id:((s=t.route)==null?void 0:s.id)??null},url:new URL(location.href)},willUnload:!1,type:"enter"};m.after_navigate.forEach(d=>d(c)),h=!0}async function x({url:r,params:o,branch:c,status:s,error:d,route:u,form:p}){const y=c.filter(Boolean);let b="never";for(const A of c)(A==null?void 0:A.slash)!==void 0&&(b=A.slash);r.pathname=gt(r.pathname,b),r.search=r.search;const g={type:"loaded",state:{url:r,params:o,branch:c,error:d,route:u},props:{components:y.map(A=>A.node.component)}};p!==void 0&&(g.props.form=p);let k={},I=!F;for(let A=0;A<y.length;A+=1){const E=y[A];k={...k,...E.data},(I||!t.branch.some(N=>N===E))&&(g.props[`data_${A}`]=k,I=I||Object.keys(E.data??{}).length>0)}return I||(I=Object.keys(F.data).length!==Object.keys(k).length),(!t.url||r.href!==t.url.href||t.error!==d||p!==void 0&&p!==F.form||I)&&(g.props.page={error:d,params:o,route:{id:(u==null?void 0:u.id)??null},status:s,url:new URL(r),form:p??null,data:I?k:F.data}),g}async function we({loader:r,parent:o,url:c,params:s,route:d,server_data_node:u}){var g,k,I;let p=null;const y={dependencies:new Set,params:new Set,parent:!1,route:!1,url:!1},b=await r();if((g=b.universal)!=null&&g.load){let V=function(...E){for(const N of E){const{href:U}=new URL(N,c);y.dependencies.add(U)}};const A={route:{get id(){return y.route=!0,d.id}},params:new Proxy(s,{get:(E,N)=>(y.params.add(N),E[N])}),data:(u==null?void 0:u.data)??null,url:vt(c,()=>{y.url=!0}),async fetch(E,N){let U;E instanceof Request?(U=E.url,N={body:E.method==="GET"||E.method==="HEAD"?void 0:await E.blob(),cache:E.cache,credentials:E.credentials,headers:E.headers,integrity:E.integrity,keepalive:E.keepalive,method:E.method,mode:E.mode,redirect:E.redirect,referrer:E.referrer,referrerPolicy:E.referrerPolicy,signal:E.signal,...N}):U=E;const R=new URL(U,c).href;return V(R),h?At(U,R,N):It(U,N)},setHeaders:()=>{},depends:V,parent(){return y.parent=!0,o()}};p=await b.universal.load.call(null,A)??null,p=p?await Ht(p):null}return{node:b,loader:r,server:u,universal:(k=b.universal)!=null&&k.load?{type:"data",data:p,uses:y}:null,data:p??(u==null?void 0:u.data)??null,slash:((I=b.universal)==null?void 0:I.trailingSlash)??(u==null?void 0:u.slash)}}function qe(r,o,c,s,d){if($)return!0;if(!s)return!1;if(s.parent&&r||s.route&&o||s.url&&c)return!0;for(const u of s.params)if(d[u]!==t.params[u])return!0;for(const u of s.dependencies)if(l.some(p=>p(new URL(u))))return!0;return!1}function ye(r,o){return(r==null?void 0:r.type)==="data"?{type:"data",data:r.data,uses:{dependencies:new Set(r.uses.dependencies??[]),params:new Set(r.uses.params??[]),parent:!!r.uses.parent,route:!!r.uses.route,url:!!r.uses.url},slash:r.slash}:(r==null?void 0:r.type)==="skip"?o??null:null}async function Ce({id:r,invalidating:o,url:c,params:s,route:d}){if((i==null?void 0:i.id)===r)return i.promise;const{errors:u,layouts:p,leaf:y}=d,b=[...p,y];u.forEach(R=>R==null?void 0:R().catch(()=>{})),b.forEach(R=>R==null?void 0:R[1]().catch(()=>{}));let g=null;const k=t.url?r!==t.url.pathname+t.url.search:!1,I=t.route?d.id!==t.route.id:!1,V=b.reduce((R,O,T)=>{var W;const S=t.branch[T],z=!!(O!=null&&O[0])&&((S==null?void 0:S.loader)!==O[1]||qe(R.some(Boolean),I,k,(W=S.server)==null?void 0:W.uses,s));return R.push(z),R},[]);if(V.some(Boolean)){try{g=await xe(c,V)}catch(R){return ie({status:500,error:await te(R,{url:c,params:s,route:{id:d.id}}),url:c,route:d})}if(g.type==="redirect")return g}const A=g==null?void 0:g.nodes;let E=!1;const N=b.map(async(R,O)=>{var W;if(!R)return;const T=t.branch[O],S=A==null?void 0:A[O];if((!S||S.type==="skip")&&R[1]===(T==null?void 0:T.loader)&&!qe(E,I,k,(W=T.universal)==null?void 0:W.uses,s))return T;if(E=!0,(S==null?void 0:S.type)==="error")throw S;return we({loader:R[1],url:c,params:s,route:d,parent:async()=>{var Je;const He={};for(let be=0;be<O;be+=1)Object.assign(He,(Je=await N[be])==null?void 0:Je.data);return He},server_data_node:ye(S===void 0&&R[0]?{type:"skip"}:S??null,T==null?void 0:T.server)})});for(const R of N)R.catch(()=>{});const U=[];for(let R=0;R<b.length;R+=1)if(b[R])try{U.push(await N[R])}catch(O){if(O instanceof Qe)return{type:"redirect",location:O.location};let T=500,S;if(A!=null&&A.includes(O))T=O.status??T,S=O.error;else if(O instanceof Se)T=O.status,S=O.body;else{if(await B.updated.check())return await ee(c);S=await te(O,{params:s,url:c,route:{id:d.id}})}const z=await Fe(R,U,u);return z?await x({url:c,params:s,branch:U.slice(0,z.idx).concat(z.node),status:T,error:S,route:d}):await Me(c,{id:d.id},S,T)}else U.push(void 0);return await x({url:c,params:s,branch:U,status:200,error:null,route:d,form:o?void 0:null})}async function Fe(r,o,c){for(;r--;)if(c[r]){let s=r;for(;!o[s];)s-=1;try{return{idx:s+1,node:{node:await c[r](),loader:c[r],data:{},server:null,universal:null}}}catch{continue}}}async function ie({status:r,error:o,url:c,route:s}){const d={},u=await Oe();let p=null;if(u.has_server_load)try{const g=await xe(c,[!0]);if(g.type!=="data"||g.nodes[0]&&g.nodes[0].type!=="data")throw 0;p=g.nodes[0]??null}catch{(c.origin!==location.origin||c.pathname!==location.pathname||f)&&await ee(c)}const y=await we({loader:Oe,url:c,params:d,route:s,parent:()=>Promise.resolve({}),server_data_node:ye(p)}),b={node:await Pe(),loader:Pe,universal:null,server:null,data:null};return await x({url:c,params:d,branch:[y,b],status:r,error:o,route:null})}function se(r,o){if(We(r,e))return;const c=wt(r.pathname.slice(e.length)||"/");for(const s of Re){const d=s.exec(c);if(d)return{id:r.pathname+r.search,invalidating:o,route:s,params:yt(d),url:r}}}function Be({url:r,type:o,intent:c,delta:s}){var y,b;let d=!1;const u={from:{params:t.params,route:{id:((y=t.route)==null?void 0:y.id)??null},url:t.url},to:{params:(c==null?void 0:c.params)??null,route:{id:((b=c==null?void 0:c.route)==null?void 0:b.id)??null},url:r},willUnload:!c,type:o};s!==void 0&&(u.delta=s);const p={...u,cancel:()=>{d=!0}};return v||m.before_navigate.forEach(g=>g(p)),d?null:u}async function le({url:r,scroll:o,keepfocus:c,redirect_chain:s,details:d,type:u,delta:p,nav_token:y,accepted:b,blocked:g}){const k=se(r,!1),I=Be({url:r,type:u,delta:p,intent:k});if(!I){g();return}Le(P),b(),v=!0,h&&B.navigating.set(I),await je(k,r,s,{scroll:o,keepfocus:c,details:d},y,()=>{v=!1,m.after_navigate.forEach(V=>V(I)),B.navigating.set(null)})}async function Me(r,o,c,s){return r.origin===location.origin&&r.pathname===location.pathname&&!f?await ie({status:s,error:c,url:r,route:o}):await ee(r)}function ee(r){return location.href=r.href,new Promise(()=>{})}function tt(){let r;a.addEventListener("mousemove",u=>{const p=u.target;clearTimeout(r),r=setTimeout(()=>{s(p,2)},20)});function o(u){s(u.composedPath()[0],1)}a.addEventListener("mousedown",o),a.addEventListener("touchstart",o,{passive:!0});const c=new IntersectionObserver(u=>{for(const p of u)p.isIntersecting&&(oe(new URL(p.target.href).pathname),c.unobserve(p.target))},{threshold:0});function s(u,p){const y=ze(u,a);if(!y)return;const{url:b,external:g}=Ee(y,e);if(g)return;const k=fe(y);k.reload||(p<=k.preload_data?$e(b):p<=k.preload_code&&oe(b.pathname))}function d(){c.disconnect();for(const u of a.querySelectorAll("a")){const{url:p,external:y}=Ee(u,e);if(y)continue;const b=fe(u);b.reload||(b.preload_code===Ye.viewport&&c.observe(u),b.preload_code===Ye.eager&&oe(p.pathname))}}m.after_navigate.push(d),d()}return{after_navigate:r=>{Ae(()=>(m.after_navigate.push(r),()=>{const o=m.after_navigate.indexOf(r);m.after_navigate.splice(o,1)}))},before_navigate:r=>{Ae(()=>(m.before_navigate.push(r),()=>{const o=m.before_navigate.indexOf(r);m.before_navigate.splice(o,1)}))},disable_scroll_handling:()=>{(w||!h)&&(_=!1)},goto:(r,o={})=>ge(r,o,[]),invalidate:r=>{if(typeof r=="function")l.push(r);else{const{href:o}=new URL(r,location.href);l.push(c=>c.href===o)}return Ue()},invalidateAll:()=>($=!0,Ue()),preload_data:async r=>{const o=new URL(r,Ke(document));await $e(o)},preload_code:oe,apply_action:async r=>{if(r.type==="error"){const o=new URL(location.href),{branch:c,route:s}=t;if(!s)return;const d=await Fe(t.branch.length,c,s.errors);if(d){const u=await x({url:o,params:t.params,branch:c.slice(0,d.idx).concat(d.node),status:r.status??500,error:r.error,route:s});t=u.state,j.$set(u.props),ce().then(Ie)}}else if(r.type==="redirect")ge(r.location,{invalidateAll:!0},[]);else{const o={form:r.data,page:{...F,form:r.data,status:r.status}};j.$set(o),r.type==="success"&&ce().then(Ie)}},_start_router:()=>{var r;history.scrollRestoration="manual",addEventListener("beforeunload",o=>{var s;let c=!1;if(!v){const d={from:{params:t.params,route:{id:((s=t.route)==null?void 0:s.id)??null},url:t.url},to:null,willUnload:!0,type:"leave",cancel:()=>c=!0};m.before_navigate.forEach(u=>u(d))}c?(o.preventDefault(),o.returnValue=""):history.scrollRestoration="auto"}),addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden"){Le(P);try{sessionStorage[et]=JSON.stringify(ne)}catch{}}}),(r=navigator.connection)!=null&&r.saveData||tt(),a.addEventListener("click",o=>{if(o.button||o.which!==1||o.metaKey||o.ctrlKey||o.shiftKey||o.altKey||o.defaultPrevented)return;const c=ze(o.composedPath()[0],a);if(!c)return;const{url:s,external:d,has:u}=Ee(c,e),p=fe(c);if(!s||!(c instanceof SVGAElement)&&s.protocol!==location.protocol&&!(s.protocol==="https:"||s.protocol==="http:")||u.download)return;if(d||p.reload){Be({url:s,type:"link"})||o.preventDefault(),v=!0;return}const[b,g]=s.href.split("#");if(g!==void 0&&b===location.href.split("#")[0]){L=!0,Le(P),t.url=s,B.page.set({...F,url:s}),B.page.notify();return}le({url:s,scroll:p.noscroll?ue():null,keepfocus:!1,redirect_chain:[],details:{state:{},replaceState:s.href===location.href},accepted:()=>o.preventDefault(),blocked:()=>o.preventDefault(),type:"link"})}),a.addEventListener("submit",o=>{if(o.defaultPrevented)return;const c=HTMLFormElement.prototype.cloneNode.call(o.target),s=o.submitter;if(((s==null?void 0:s.formMethod)||c.method)!=="get")return;const u=new URL((s==null?void 0:s.hasAttribute("formaction"))&&(s==null?void 0:s.formAction)||c.action);if(We(u,e))return;const p=o.target,{noscroll:y,reload:b}=fe(p);if(b)return;o.preventDefault(),o.stopPropagation();const g=new FormData(p),k=s==null?void 0:s.getAttribute("name");k&&g.append(k,(s==null?void 0:s.getAttribute("value"))??""),u.search=new URLSearchParams(g).toString(),le({url:u,scroll:y?ue():null,keepfocus:!1,redirect_chain:[],details:{state:{},replaceState:!1},nav_token:{},accepted:()=>{},blocked:()=>{},type:"form"})}),addEventListener("popstate",o=>{var c;if((c=o.state)!=null&&c[C]){if(o.state[C]===P)return;const s=o.state[C]-P;le({url:new URL(location.href),scroll:ne[o.state[C]],keepfocus:!1,redirect_chain:[],details:null,accepted:()=>{P=o.state[C]},blocked:()=>{history.go(-s)},type:"popstate",delta:s})}}),addEventListener("hashchange",()=>{L&&(L=!1,history.replaceState({...history.state,[C]:++P},"",location.href))});for(const o of document.querySelectorAll("link"))o.rel==="icon"&&(o.href=o.href);addEventListener("pageshow",o=>{o.persisted&&B.navigating.set(null)})},_hydrate:async({status:r=200,error:o,node_ids:c,params:s,route:d,data:u,form:p})=>{f=!0;const y=new URL(location.href);({params:s={},route:d={id:null}}=se(y,!1)||{});let b;try{const g=c.map(async(k,I)=>{const V=u[I];return we({loader:me[k],url:y,params:s,route:d,parent:async()=>{const A={};for(let E=0;E<I;E+=1)Object.assign(A,(await g[E]).data);return A},server_data_node:ye(V)})});b=await x({url:y,params:s,branch:await Promise.all(g),status:r,error:o,form:p,route:Re.find(({id:k})=>k===d.id)??null})}catch(g){if(g instanceof Qe){await ee(new URL(g.location,location.href));return}b=await ie({status:g instanceof Se?g.status:500,error:await te(g,{url:y,params:s,route:d}),url:y,route:d})}Ve(b)}}}async function xe(n,e){var m;const a=new URL(n);a.pathname=Rt(n.pathname),a.searchParams.append("x-sveltekit-invalidated",e.map(t=>t?"1":"").join("_"));const l=await he(a.href),i=await l.json();if(!l.ok)throw new Error(i);return(m=i.nodes)==null||m.forEach(t=>{(t==null?void 0:t.type)==="data"&&(t.data=Zt(t.data),t.uses={dependencies:new Set(t.uses.dependencies??[]),params:new Set(t.uses.params??[]),parent:!!t.uses.parent,route:!!t.uses.route,url:!!t.uses.url})}),i}function te(n,e){return n instanceof Se?n.body:Gt.handleError({error:n,event:e})??{message:e.route.id!=null?"Internal Error":"Not Found"}}function Ie(){const n=document.querySelector("[autofocus]");if(n)n.focus();else{const e=document.body,a=e.getAttribute("tabindex");e.tabIndex=-1,e.focus({preventScroll:!0}),setTimeout(()=>{var l;(l=getSelection())==null||l.removeAllRanges()}),a!==null?e.setAttribute("tabindex",a):e.removeAttribute("tabindex")}}async function ra({env:n,hydrate:e,paths:a,target:l,version:i}){ht(a),_t(i);const m=Qt({target:l,base:a.base});mt({client:m}),e?await m._hydrate(e):m.goto(location.href,{replaceState:!0}),m._start_router()}export{ra as start};
