import{S as Tt,i as Pt,s as Rt,D as Vt,e as et,b as h,H as Ut,n as B,h as i,L as Nt,o as zt,k as o,r as I,a as O,l as c,m,u as D,c as N,q as w,p as b,G as n,M as _t,v as Bt,N as Ht,F as vt,z as Gt,A as St,B as At,g as Ct,d as $t,C as Mt}from"../chunks/index.f25a3516.js";import{c as qt,a as Lt,p as It}from"../chunks/pocketbase.026f421a.js";import{g as tt}from"../chunks/navigation.7a60c459.js";function Wt(s){return{c:B,l:B,m:B,p:B,d:B}}function Ft(s){let t,e=s[1]&&Dt(s);return{c(){e&&e.c(),t=et()},l(r){e&&e.l(r),t=et()},m(r,l){e&&e.m(r,l),h(r,t,l)},p(r,l){r[1]?e?e.p(r,l):(e=Dt(r),e.c(),e.m(t.parentNode,t)):e&&(e.d(1),e=null)},d(r){e&&e.d(r),r&&i(t)}}}function Dt(s){let t,e,r,l,f,u,_,v,g=s[1].username+"",p,y,E,T,H,F,Y,j,z,S,lt,V,L,rt,A,at,U,W,J,C,K,Q,P,$,it,nt,M,st,ut,G,ot,ct,mt;function ht(a,d){return a[1].avatar?jt:Yt}let X=ht(s),R=X(s),k=s[2]&&wt(s);return{c(){t=o("div"),e=o("div"),r=o("hgroup"),l=o("h1"),f=I("Account Settings"),u=O(),_=o("h2"),v=I("Welcome back, "),p=I(g),y=O(),E=o("div"),R.c(),T=O(),H=o("hr"),F=O(),Y=o("br"),j=O(),z=o("div"),S=o("div"),lt=I(`Name
				`),V=o("input"),rt=O(),A=o("div"),at=I(`Email
				`),U=o("input"),J=O(),k&&k.c(),C=O(),K=o("br"),Q=O(),P=o("div"),$=o("button"),it=I("Edit Account"),nt=O(),M=o("button"),st=I("Change Password"),ut=O(),G=o("button"),ot=I("Sign Out"),this.h()},l(a){t=c(a,"DIV",{class:!0});var d=m(t);e=c(d,"DIV",{});var bt=m(e);r=c(bt,"HGROUP",{});var Z=m(r);l=c(Z,"H1",{style:!0});var yt=m(l);f=D(yt,"Account Settings"),yt.forEach(i),u=N(Z),_=c(Z,"H2",{});var ft=m(_);v=D(ft,"Welcome back, "),p=D(ft,g),ft.forEach(i),Z.forEach(i),bt.forEach(i),y=N(d),E=c(d,"DIV",{style:!0});var gt=m(E);R.l(gt),gt.forEach(i),d.forEach(i),T=N(a),H=c(a,"HR",{}),F=N(a),Y=c(a,"BR",{}),j=N(a),z=c(a,"DIV",{class:!0});var x=m(z);S=c(x,"DIV",{});var pt=m(S);lt=D(pt,`Name
				`),V=c(pt,"INPUT",{style:!0,type:!0}),pt.forEach(i),rt=N(x),A=c(x,"DIV",{});var dt=m(A);at=D(dt,`Email
				`),U=c(dt,"INPUT",{style:!0,type:!0}),dt.forEach(i),x.forEach(i),J=N(a),k&&k.l(a),C=N(a),K=c(a,"BR",{}),Q=N(a),P=c(a,"DIV",{class:!0});var q=m(P);$=c(q,"BUTTON",{});var Et=m($);it=D(Et,"Edit Account"),Et.forEach(i),nt=N(q),M=c(q,"BUTTON",{});var kt=m(M);st=D(kt,"Change Password"),kt.forEach(i),ut=N(q),G=c(q,"BUTTON",{class:!0});var Ot=m(G);ot=D(Ot,"Sign Out"),Ot.forEach(i),q.forEach(i),this.h()},h(){w(l,"font-size","40px"),w(E,"text-align","right"),b(t,"class","grid"),w(V,"border","1px solid var(--primary)"),w(V,"border-radius","1px"),b(V,"type","text"),V.value=L=s[1].username,V.readOnly=!0,w(U,"border","1px solid var(--primary)"),w(U,"border-radius","1px"),b(U,"type","text"),U.value=W=s[1].email,U.readOnly=!0,b(z,"class","grid"),b(G,"class","secondary outline"),b(P,"class","grid")},m(a,d){h(a,t,d),n(t,e),n(e,r),n(r,l),n(l,f),n(r,u),n(r,_),n(_,v),n(_,p),n(t,y),n(t,E),R.m(E,null),h(a,T,d),h(a,H,d),h(a,F,d),h(a,Y,d),h(a,j,d),h(a,z,d),n(z,S),n(S,lt),n(S,V),n(z,rt),n(z,A),n(A,at),n(A,U),h(a,J,d),k&&k.m(a,d),h(a,C,d),h(a,K,d),h(a,Q,d),h(a,P,d),n(P,$),n($,it),n(P,nt),n(P,M),n(M,st),n(P,ut),n(P,G),n(G,ot),ct||(mt=[_t($,"click",s[4]),_t(M,"click",s[5]),_t(G,"click",s[3])],ct=!0)},p(a,d){d&2&&g!==(g=a[1].username+"")&&Bt(p,g),X===(X=ht(a))&&R?R.p(a,d):(R.d(1),R=X(a),R&&(R.c(),R.m(E,null))),d&2&&L!==(L=a[1].username)&&V.value!==L&&(V.value=L),d&2&&W!==(W=a[1].email)&&U.value!==W&&(U.value=W),a[2]?k?k.p(a,d):(k=wt(a),k.c(),k.m(C.parentNode,C)):k&&(k.d(1),k=null)},d(a){a&&i(t),R.d(),a&&i(T),a&&i(H),a&&i(F),a&&i(Y),a&&i(j),a&&i(z),a&&i(J),k&&k.d(a),a&&i(C),a&&i(K),a&&i(Q),a&&i(P),ct=!1,Ht(mt)}}}function Yt(s){let t,e,r;return{c(){t=o("img"),this.h()},l(l){t=c(l,"IMG",{src:!0,width:!0,height:!0,style:!0,alt:!0}),this.h()},h(){vt(t.src,e="/defaultpfp.png")||b(t,"src",e),b(t,"width","100"),b(t,"height","100"),w(t,"border-radius","25px"),b(t,"alt",r=s[1].username)},m(l,f){h(l,t,f)},p(l,f){f&2&&r!==(r=l[1].username)&&b(t,"alt",r)},d(l){l&&i(t)}}}function jt(s){let t,e,r;return{c(){t=o("img"),this.h()},l(l){t=c(l,"IMG",{src:!0,width:!0,height:!0,style:!0,alt:!0}),this.h()},h(){vt(t.src,e="https://api.gttx.app/api/files/_pb_users_auth_/"+s[1].id+"/"+s[1].avatar+"?thumb=100x100")||b(t,"src",e),b(t,"width","100"),b(t,"height","100"),w(t,"border-radius","25px"),b(t,"alt",r=s[1].username)},m(l,f){h(l,t,f)},p(l,f){f&2&&!vt(t.src,e="https://api.gttx.app/api/files/_pb_users_auth_/"+l[1].id+"/"+l[1].avatar+"?thumb=100x100")&&b(t,"src",e),f&2&&r!==(r=l[1].username)&&b(t,"alt",r)},d(l){l&&i(t)}}}function wt(s){let t,e,r,l,f,u,_,v,g;return{c(){t=o("div"),e=o("div"),r=I(`Organization
					`),l=o("input"),f=O(),u=o("div"),_=I(`Role
					`),v=o("input"),this.h()},l(p){t=c(p,"DIV",{class:!0});var y=m(t);e=c(y,"DIV",{});var E=m(e);r=D(E,`Organization
					`),l=c(E,"INPUT",{style:!0,type:!0}),E.forEach(i),f=N(y),u=c(y,"DIV",{});var T=m(u);_=D(T,`Role
					`),v=c(T,"INPUT",{style:!0,type:!0}),T.forEach(i),y.forEach(i),this.h()},h(){w(l,"border","1px solid var(--primary)"),w(l,"border-radius","1px"),b(l,"type","text"),l.value=s[0],l.readOnly=!0,w(v,"border","1px solid var(--primary)"),w(v,"border-radius","1px"),b(v,"type","text"),v.value=g=s[1].role,v.readOnly=!0,b(t,"class","grid")},m(p,y){h(p,t,y),n(t,e),n(e,r),n(e,l),n(t,f),n(t,u),n(u,_),n(u,v)},p(p,y){y&1&&l.value!==p[0]&&(l.value=p[0]),y&2&&g!==(g=p[1].role)&&v.value!==g&&(v.value=g)},d(p){p&&i(t)}}}function Jt(s){let t,e,r,l,f,u,_,v,g;return{c(){t=o("center"),e=o("br"),r=O(),l=o("hgroup"),f=o("h1"),u=I("Loading..."),_=O(),v=o("h2"),g=I("Give it a second..."),this.h()},l(p){t=c(p,"CENTER",{});var y=m(t);e=c(y,"BR",{}),r=N(y),l=c(y,"HGROUP",{});var E=m(l);f=c(E,"H1",{"aria-busy":!0});var T=m(f);u=D(T,"Loading..."),T.forEach(i),_=N(E),v=c(E,"H2",{});var H=m(v);g=D(H,"Give it a second..."),H.forEach(i),E.forEach(i),y.forEach(i),this.h()},h(){b(f,"aria-busy","true")},m(p,y){h(p,t,y),n(t,e),n(t,r),n(t,l),n(l,f),n(f,u),n(l,_),n(l,v),n(v,g)},p:B,d(p){p&&i(t)}}}function Kt(s){let t,e={ctx:s,current:null,token:null,hasCatch:!1,pending:Jt,then:Ft,catch:Wt};return Vt(s[6](),e),{c(){t=et(),e.block.c()},l(r){t=et(),e.block.l(r)},m(r,l){h(r,t,l),e.block.m(r,e.anchor=l),e.mount=()=>t.parentNode,e.anchor=t},p(r,[l]){s=r,Ut(e,s,l)},i:B,o:B,d(r){r&&i(t),e.block.d(r),e.token=null,e=null}}}function Qt(s,t,e){let r,l;Nt(s,qt,p=>e(1,r=p)),Nt(s,Lt,p=>e(2,l=p));let f="None";async function u(){It.authStore.clear(),tt("/")}async function _(){tt("/account/edit")}async function v(){tt("/account/password")}async function g(){if(l){const p=await It.collection("organization").getOne(r==null?void 0:r.org);e(0,f=p.name)}}return zt(async()=>{r||tt("/login")}),[f,r,l,u,_,v,g]}class Xt extends Tt{constructor(t){super(),Pt(this,t,Qt,Kt,Rt,{})}}function Zt(s){let t,e,r,l,f;return e=new Xt({}),{c(){t=o("body"),Gt(e.$$.fragment),r=O(),l=o("pre")},l(u){t=c(u,"BODY",{});var _=m(t);St(e.$$.fragment,_),_.forEach(i),r=N(u),l=c(u,"PRE",{}),m(l).forEach(i)},m(u,_){h(u,t,_),At(e,t,null),h(u,r,_),h(u,l,_),f=!0},p:B,i(u){f||(Ct(e.$$.fragment,u),f=!0)},o(u){$t(e.$$.fragment,u),f=!1},d(u){u&&i(t),Mt(e),u&&i(r),u&&i(l)}}}class le extends Tt{constructor(t){super(),Pt(this,t,null,Zt,Rt,{})}}export{le as default};
