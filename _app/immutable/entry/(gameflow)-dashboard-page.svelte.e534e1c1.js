import{S as ve,i as Ee,s as ke,D as Oe,e as K,b as g,H as Re,n as w,h as l,L as ne,o as Te,k as u,r as H,a as O,l as f,m as h,u as N,c as R,q as V,p as d,G as n,M as J,v as De,N as we,F as oe,z as Ge,A as He,B as Ne,g as Be,d as Me,C as Ue}from"../chunks/index.d8729f0b.js";import{c as ye,a as Ie,b as ze,p as Ce}from"../chunks/pocketbase.f160ef4f.js";import{g as S}from"../chunks/navigation.19906f8e.js";function $e(s){return{c:w,l:w,m:w,p:w,d:w}}function Se(s){let e,t=s[1]&&be(s);return{c(){t&&t.c(),e=K()},l(a){t&&t.l(a),e=K()},m(a,r){t&&t.m(a,r),g(a,e,r)},p(a,r){a[1]?t?t.p(a,r):(t=be(a),t.c(),t.m(e.parentNode,e)):t&&(t.d(1),t=null)},d(a){t&&t.d(a),a&&l(e)}}}function be(s){let e,t,a,r,o,i,_,E,k=s[0].username+"",p,T,v,M,U,q,D,L,C,Q,X,G,A,I,Z,x,P,z,ee,te,B,ae,re,se;function ie(c,b){return c[0].avatar?Pe:Le}let F=ie(s),y=F(s),m=s[2]=="facilitator"&&ge(s);return{c(){e=u("div"),t=u("div"),a=u("hgroup"),r=u("h1"),o=H("Dashboard"),i=O(),_=u("h2"),E=H("Welcome back, "),p=H(k),T=O(),v=u("div"),y.c(),M=O(),U=u("hr"),q=O(),D=u("article"),L=u("header"),C=u("button"),Q=H("Open a Game Room"),X=O(),G=u("div"),m&&m.c(),A=O(),I=u("button"),Z=H("Manage account"),x=O(),P=u("footer"),z=u("center"),ee=u("br"),te=O(),B=u("button"),ae=H("Sign out"),this.h()},l(c){e=f(c,"DIV",{class:!0});var b=h(e);t=f(b,"DIV",{});var ce=h(t);a=f(ce,"HGROUP",{});var W=h(a);r=f(W,"H1",{style:!0});var ue=h(r);o=N(ue,"Dashboard"),ue.forEach(l),i=R(W),_=f(W,"H2",{});var le=h(_);E=N(le,"Welcome back, "),p=N(le,k),le.forEach(l),W.forEach(l),ce.forEach(l),T=R(b),v=f(b,"DIV",{style:!0});var fe=h(v);y.l(fe),fe.forEach(l),b.forEach(l),M=R(c),U=f(c,"HR",{}),q=R(c),D=f(c,"ARTICLE",{});var $=h(D);L=f($,"HEADER",{});var he=h(L);C=f(he,"BUTTON",{});var _e=h(C);Q=N(_e,"Open a Game Room"),_e.forEach(l),he.forEach(l),X=R($),G=f($,"DIV",{class:!0});var Y=h(G);m&&m.l(Y),A=R(Y),I=f(Y,"BUTTON",{class:!0});var de=h(I);Z=N(de,"Manage account"),de.forEach(l),Y.forEach(l),x=R($),P=f($,"FOOTER",{});var pe=h(P);z=f(pe,"CENTER",{});var j=h(z);ee=f(j,"BR",{}),te=R(j),B=f(j,"BUTTON",{style:!0,class:!0});var me=h(B);ae=N(me,"Sign out"),me.forEach(l),j.forEach(l),pe.forEach(l),$.forEach(l),this.h()},h(){V(r,"font-size","40px"),V(v,"text-align","right"),d(e,"class","grid"),d(I,"class","secondary"),d(G,"class","grid"),V(B,"width","50%"),d(B,"class","contrast outline")},m(c,b){g(c,e,b),n(e,t),n(t,a),n(a,r),n(r,o),n(a,i),n(a,_),n(_,E),n(_,p),n(e,T),n(e,v),y.m(v,null),g(c,M,b),g(c,U,b),g(c,q,b),g(c,D,b),n(D,L),n(L,C),n(C,Q),n(D,X),n(D,G),m&&m.m(G,null),n(G,A),n(G,I),n(I,Z),n(D,x),n(D,P),n(P,z),n(z,ee),n(z,te),n(z,B),n(B,ae),re||(se=[J(C,"click",s[5]),J(I,"click",s[4]),J(B,"click",s[3])],re=!0)},p(c,b){b&1&&k!==(k=c[0].username+"")&&De(p,k),F===(F=ie(c))&&y?y.p(c,b):(y.d(1),y=F(c),y&&(y.c(),y.m(v,null))),c[2]=="facilitator"?m?m.p(c,b):(m=ge(c),m.c(),m.m(G,A)):m&&(m.d(1),m=null)},d(c){c&&l(e),y.d(),c&&l(M),c&&l(U),c&&l(q),c&&l(D),m&&m.d(),re=!1,we(se)}}}function Le(s){let e,t,a;return{c(){e=u("img"),this.h()},l(r){e=f(r,"IMG",{src:!0,width:!0,height:!0,style:!0,alt:!0}),this.h()},h(){oe(e.src,t="/defaultpfp.png")||d(e,"src",t),d(e,"width","100"),d(e,"height","100"),V(e,"border-radius","25px"),d(e,"alt",a=s[0].username)},m(r,o){g(r,e,o)},p(r,o){o&1&&a!==(a=r[0].username)&&d(e,"alt",a)},d(r){r&&l(e)}}}function Pe(s){let e,t,a;return{c(){e=u("img"),this.h()},l(r){e=f(r,"IMG",{src:!0,width:!0,height:!0,style:!0,alt:!0}),this.h()},h(){oe(e.src,t="https://api.gttx.app/api/files/_pb_users_auth_/"+s[0].id+"/"+s[0].avatar+"?thumb=100x100")||d(e,"src",t),d(e,"width","100"),d(e,"height","100"),V(e,"border-radius","25px"),d(e,"alt",a=s[0].username)},m(r,o){g(r,e,o)},p(r,o){o&1&&!oe(e.src,t="https://api.gttx.app/api/files/_pb_users_auth_/"+r[0].id+"/"+r[0].avatar+"?thumb=100x100")&&d(e,"src",t),o&1&&a!==(a=r[0].username)&&d(e,"alt",a)},d(r){r&&l(e)}}}function ge(s){let e,t,a,r;return{c(){e=u("button"),t=H("Manage Organization"),this.h()},l(o){e=f(o,"BUTTON",{class:!0});var i=h(e);t=N(i,"Manage Organization"),i.forEach(l),this.h()},h(){d(e,"class","secondary")},m(o,i){g(o,e,i),n(e,t),a||(r=J(e,"click",s[6]),a=!0)},p:w,d(o){o&&l(e),a=!1,r()}}}function Ve(s){let e,t,a,r,o,i,_,E,k;return{c(){e=u("center"),t=u("br"),a=O(),r=u("hgroup"),o=u("h1"),i=H("Loading..."),_=O(),E=u("h2"),k=H("Give it a second..."),this.h()},l(p){e=f(p,"CENTER",{});var T=h(e);t=f(T,"BR",{}),a=R(T),r=f(T,"HGROUP",{});var v=h(r);o=f(v,"H1",{"aria-busy":!0});var M=h(o);i=N(M,"Loading..."),M.forEach(l),_=R(v),E=f(v,"H2",{});var U=h(E);k=N(U,"Give it a second..."),U.forEach(l),v.forEach(l),T.forEach(l),this.h()},h(){d(o,"aria-busy","true")},m(p,T){g(p,e,T),n(e,t),n(e,a),n(e,r),n(r,o),n(o,i),n(r,_),n(r,E),n(E,k)},p:w,d(p){p&&l(e)}}}function qe(s){let e,t={ctx:s,current:null,token:null,hasCatch:!1,pending:Ve,then:Se,catch:$e};return Oe(ye,t),{c(){e=K(),t.block.c()},l(a){e=K(),t.block.l(a)},m(a,r){g(a,e,r),t.block.m(a,t.anchor=r),t.mount=()=>e.parentNode,t.anchor=e},p(a,[r]){s=a,Re(t,s,r)},i:w,o:w,d(a){a&&l(e),t.block.d(a),t.token=null,t=null}}}function Ae(s,e,t){let a,r,o;ne(s,ye,p=>t(0,a=p)),ne(s,Ie,p=>t(1,r=p)),ne(s,ze,p=>t(2,o=p));async function i(){try{await Ce.authStore.clear()}finally{S("/login")}}async function _(){S("/account")}async function E(){S("start")}async function k(){S("/dashboard/manage_org")}return Te(()=>{if(a){if(a.org)return;S("/createorg")}else S("/login")}),[a,r,o,i,_,E,k]}class Fe extends ve{constructor(e){super(),Ee(this,e,Ae,qe,ke,{})}}function We(s){let e,t,a,r,o;return t=new Fe({}),{c(){e=u("body"),Ge(t.$$.fragment),a=O(),r=u("pre")},l(i){e=f(i,"BODY",{});var _=h(e);He(t.$$.fragment,_),_.forEach(l),a=R(i),r=f(i,"PRE",{}),h(r).forEach(l)},m(i,_){g(i,e,_),Ne(t,e,null),g(i,a,_),g(i,r,_),o=!0},p:w,i(i){o||(Be(t.$$.fragment,i),o=!0)},o(i){Me(t.$$.fragment,i),o=!1},d(i){i&&l(e),Ue(t),i&&l(a),i&&l(r)}}}class Ke extends ve{constructor(e){super(),Ee(this,e,null,We,ke,{})}}export{Ke as default};