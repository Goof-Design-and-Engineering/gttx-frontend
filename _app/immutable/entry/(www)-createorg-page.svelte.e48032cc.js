import{S as me,i as pe,s as _e,a as C,k as c,r as w,z as X,c as T,l as f,m as v,u as B,h as i,A as Z,p as b,b as z,G as l,V as ue,B as x,M as D,W as ce,Y as he,g as ee,d as te,C as re,N as be,L as fe,o as ve,v as $e,R as ye,n as ge}from"../chunks/index.d8729f0b.js";import{c as Ee,p as q}from"../chunks/pocketbase.f160ef4f.js";import{H as Ne,a as Ce}from"../chunks/HintGroup.6e42d805.js";import{u as Te}from"../chunks/useForm.f7d2ec9d.js";import{v as ze,r as Oe}from"../chunks/validators.6e79bf68.js";import{g as P}from"../chunks/navigation.19906f8e.js";function de(s){let e,a;return{c(){e=c("p"),a=w(s[1])},l(r){e=f(r,"P",{});var t=v(e);a=B(t,s[1]),t.forEach(i)},m(r,t){z(r,e,t),l(e,a)},p(r,t){t&2&&$e(a,r[1])},d(r){r&&i(e)}}}function we(s){let e,a,r;return{c(){e=c("center"),a=w("This is a mandatory field"),r=c("br")},l(t){e=f(t,"CENTER",{});var o=v(e);a=B(o,"This is a mandatory field"),o.forEach(i),r=f(t,"BR",{})},m(t,o){z(t,e,o),l(e,a),z(t,r,o)},p:ge,d(t){t&&i(e),t&&i(r)}}}function Be(s){let e,a;return e=new Ce({props:{on:"required",$$slots:{default:[we]},$$scope:{ctx:s}}}),{c(){X(e.$$.fragment)},l(r){Z(e.$$.fragment,r)},m(r,t){x(e,r,t),a=!0},p(r,t){const o={};t&4096&&(o.$$scope={dirty:t,ctx:r}),e.$set(o)},i(r){a||(ee(e.$$.fragment,r),a=!0)},o(r){te(e.$$.fragment,r),a=!1},d(r){re(e,r)}}}function Le(s){let e,a,r,t,o,$,_,y,I,M,p,S,E,g,d,L,U,G,j,F,J,N,k,Y,W,O,K,R,Q,ae,u=s[1]&&de(s);return E=new Ne({props:{for:"organization",$$slots:{default:[Be]},$$scope:{ctx:s}}}),{c(){u&&u.c(),e=C(),a=c("h1"),r=w("Create an org"),t=C(),o=c("form"),$=c("div"),_=c("div"),y=c("label"),I=w("Organization Name"),M=C(),p=c("input"),S=C(),X(E.$$.fragment),g=C(),d=c("button"),L=w("Create your organization!"),G=C(),j=c("hr"),F=c("br"),J=C(),N=c("div"),k=c("button"),Y=w("Join an org instead"),W=C(),O=c("button"),K=w("Nevermind, sign out"),this.h()},l(n){u&&u.l(n),e=T(n),a=f(n,"H1",{class:!0});var m=v(a);r=B(m,"Create an org"),m.forEach(i),t=T(n),o=f(n,"FORM",{method:!0});var h=v(o);$=f(h,"DIV",{class:!0});var oe=v($);_=f(oe,"DIV",{});var H=v(_);y=f(H,"LABEL",{for:!0});var ne=v(y);I=B(ne,"Organization Name"),ne.forEach(i),M=T(H),p=f(H,"INPUT",{type:!0,name:!0,id:!0,placeholder:!0}),S=T(H),Z(E.$$.fragment,H),H.forEach(i),oe.forEach(i),g=T(h),d=f(h,"BUTTON",{"aria-busy":!0});var se=v(d);L=B(se,"Create your organization!"),se.forEach(i),G=T(h),j=f(h,"HR",{}),F=f(h,"BR",{}),J=T(h),N=f(h,"DIV",{class:!0});var V=v(N);k=f(V,"BUTTON",{});var le=v(k);Y=B(le,"Join an org instead"),le.forEach(i),W=T(V),O=f(V,"BUTTON",{class:!0});var ie=v(O);K=B(ie,"Nevermind, sign out"),ie.forEach(i),V.forEach(i),h.forEach(i),this.h()},h(){b(a,"class","page-name-header"),b(y,"for","organization"),b(p,"type","username"),b(p,"name","organization"),b(p,"id","username"),b(p,"placeholder","Goof, LLC"),b($,"class","grid"),b(d,"aria-busy",s[2]),d.disabled=U=!s[3].valid,b(O,"class","contrast"),b(N,"class","grid"),b(o,"method","POST")},m(n,m){u&&u.m(n,m),z(n,e,m),z(n,a,m),l(a,r),z(n,t,m),z(n,o,m),l(o,$),l($,_),l(_,y),l(y,I),l(_,M),l(_,p),ue(p,s[0]),l(_,S),x(E,_,null),l(o,g),l(o,d),l(d,L),l(o,G),l(o,j),l(o,F),l(o,J),l(o,N),l(N,k),l(k,Y),l(N,W),l(N,O),l(O,K),R=!0,Q||(ae=[D(p,"input",s[9]),ce(ze.call(null,p,[Oe])),D(d,"click",s[5]),D(k,"click",s[6]),D(O,"click",s[7]),ce(s[4].call(null,o)),D(o,"submit",he(s[8]))],Q=!0)},p(n,[m]){n[1]?u?u.p(n,m):(u=de(n),u.c(),u.m(e.parentNode,e)):u&&(u.d(1),u=null),m&1&&ue(p,n[0]);const h={};m&4096&&(h.$$scope={dirty:m,ctx:n}),E.$set(h),(!R||m&4)&&b(d,"aria-busy",n[2]),(!R||m&8&&U!==(U=!n[3].valid))&&(d.disabled=U)},i(n){R||(ee(E.$$.fragment,n),R=!0)},o(n){te(E.$$.fragment,n),R=!1},d(n){u&&u.d(n),n&&i(e),n&&i(a),n&&i(t),n&&i(o),re(E),Q=!1,be(ae)}}}function A(s){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",r=s.substr(0,3).toUpperCase();let t=r;for(let o=0;o<8-r.length;o++)t+=e.charAt(Math.floor(Math.random()*e.length));return t}function Ue(s,e,a){let r,t;fe(s,Ee,g=>a(10,r=g));const o=Te();fe(s,o,g=>a(3,t=g));let $,_,y=!1;async function I(){var g;a(2,y=!0);try{console.log(A("test"));const d={name:$,members:[r.id],participant_code:A("participant"),facilitator_code:A("facilitator"),observer_code:A("observer")},L=await q.collection("organization").create(d);if(L!=null){const U={org:L.id};q.collection("users").update((g=q.authStore.model)==null?void 0:g.id,U)}P("/dashboard")}catch(d){console.log(d),a(1,_=d),P("/createorg")}a(2,y=!1)}async function M(){P("joinorg")}async function p(){await q.authStore.clear(),P("/")}ve(async()=>{r.org!=""&&P("/dashboard")});function S(g){ye.call(this,s,g)}function E(){$=this.value,a(0,$)}return[$,_,y,t,o,I,M,p,S,E]}class ke extends me{constructor(e){super(),pe(this,e,Ue,Le,_e,{})}}function Re(s){let e,a,r;return a=new ke({}),{c(){e=c("body"),X(a.$$.fragment)},l(t){e=f(t,"BODY",{});var o=v(e);Z(a.$$.fragment,o),o.forEach(i)},m(t,o){z(t,e,o),x(a,e,null),r=!0},p:ge,i(t){r||(ee(a.$$.fragment,t),r=!0)},o(t){te(a.$$.fragment,t),r=!1},d(t){t&&i(e),re(a)}}}class Ve extends me{constructor(e){super(),pe(this,e,null,Re,_e,{})}}export{Ve as default};