import{S as Rt,i as St,s as zt,e as Bt,b as v,n as kt,h as l,J as Ct,o as qt,k as u,r as $,a as b,l as n,m as _,u as k,c as E,q as rt,p as d,F as s,K as $t,v as Gt,L as Mt,E as Dt,z as Ft,A as Lt,B as Wt,g as Jt,d as Kt,C as Yt}from"../chunks/index.7f1a9c88.js";import{u as jt}from"../chunks/useForm.256e94d5.js";/* empty css                                */import{c as Qt,p as Xt}from"../chunks/pocketbase.2fde5c2d.js";import{g as at}from"../chunks/navigation.e42409cb.js";function Ht(f){let t,i,a,r,p,m,h,O,D=f[0].username+"",o,y,T,B,K,Y,j,w,R,st,U,F,ut,S,nt,V,L,Q,N,z,ot,P,W,ft,C,ct,A,J,X,Z,x,g,q,pt,_t,G,vt,dt,H,mt,ht,Tt;function Ot(e,c){return e[0].avatar?xt:Zt}let tt=Ot(f),I=tt(f);return{c(){t=u("div"),i=u("div"),a=u("hgroup"),r=u("h1"),p=$("Account Settings"),m=b(),h=u("h2"),O=$("Welcome back, "),o=$(D),y=b(),T=u("div"),I.c(),B=b(),K=u("hr"),Y=u("br"),j=b(),w=u("div"),R=u("div"),st=$(`Name
			`),U=u("input"),ut=b(),S=u("div"),nt=$(`Email
			`),V=u("input"),Q=b(),N=u("div"),z=u("div"),ot=$(`Organization
			`),P=u("input"),ft=b(),C=u("div"),ct=$(`Role
			`),A=u("input"),X=b(),Z=u("br"),x=b(),g=u("div"),q=u("button"),pt=$("Edit Account"),_t=b(),G=u("button"),vt=$("Change Password"),dt=b(),H=u("button"),mt=$("Sign Out"),this.h()},l(e){t=n(e,"DIV",{class:!0});var c=_(t);i=n(c,"DIV",{});var wt=_(i);a=n(wt,"HGROUP",{});var et=_(a);r=n(et,"H1",{style:!0});var Nt=_(r);p=k(Nt,"Account Settings"),Nt.forEach(l),m=E(et),h=n(et,"H2",{});var bt=_(h);O=k(bt,"Welcome back, "),o=k(bt,D),bt.forEach(l),et.forEach(l),wt.forEach(l),y=E(c),T=n(c,"DIV",{style:!0});var Ut=_(T);I.l(Ut),Ut.forEach(l),c.forEach(l),B=E(e),K=n(e,"HR",{}),Y=n(e,"BR",{}),j=E(e),w=n(e,"DIV",{class:!0});var lt=_(w);R=n(lt,"DIV",{});var Et=_(R);st=k(Et,`Name
			`),U=n(Et,"INPUT",{type:!0}),Et.forEach(l),ut=E(lt),S=n(lt,"DIV",{});var yt=_(S);nt=k(yt,`Email
			`),V=n(yt,"INPUT",{type:!0}),yt.forEach(l),lt.forEach(l),Q=E(e),N=n(e,"DIV",{class:!0});var it=_(N);z=n(it,"DIV",{});var gt=_(z);ot=k(gt,`Organization
			`),P=n(gt,"INPUT",{type:!0}),gt.forEach(l),ft=E(it),C=n(it,"DIV",{});var It=_(C);ct=k(It,`Role
			`),A=n(It,"INPUT",{type:!0}),It.forEach(l),it.forEach(l),X=E(e),Z=n(e,"BR",{}),x=E(e),g=n(e,"DIV",{class:!0});var M=_(g);q=n(M,"BUTTON",{});var Vt=_(q);pt=k(Vt,"Edit Account"),Vt.forEach(l),_t=E(M),G=n(M,"BUTTON",{});var Pt=_(G);vt=k(Pt,"Change Password"),Pt.forEach(l),dt=E(M),H=n(M,"BUTTON",{class:!0});var At=_(H);mt=k(At,"Sign Out"),At.forEach(l),M.forEach(l),this.h()},h(){rt(r,"font-size","40px"),rt(T,"text-align","right"),d(t,"class","grid"),d(U,"type","text"),U.value=F=f[0].username,U.readOnly=!0,d(V,"type","text"),V.value=L=f[0].email,V.readOnly=!0,d(w,"class","grid"),d(P,"type","text"),P.value=W=f[0].org,P.disabled=!0,d(A,"type","text"),A.value=J=f[0].role,A.disabled=!0,d(N,"class","grid"),d(H,"class","secondary outline"),d(g,"class","grid")},m(e,c){v(e,t,c),s(t,i),s(i,a),s(a,r),s(r,p),s(a,m),s(a,h),s(h,O),s(h,o),s(t,y),s(t,T),I.m(T,null),v(e,B,c),v(e,K,c),v(e,Y,c),v(e,j,c),v(e,w,c),s(w,R),s(R,st),s(R,U),s(w,ut),s(w,S),s(S,nt),s(S,V),v(e,Q,c),v(e,N,c),s(N,z),s(z,ot),s(z,P),s(N,ft),s(N,C),s(C,ct),s(C,A),v(e,X,c),v(e,Z,c),v(e,x,c),v(e,g,c),s(g,q),s(q,pt),s(g,_t),s(g,G),s(G,vt),s(g,dt),s(g,H),s(H,mt),ht||(Tt=[$t(q,"click",f[2]),$t(G,"click",f[3]),$t(H,"click",f[1])],ht=!0)},p(e,c){c&1&&D!==(D=e[0].username+"")&&Gt(o,D),tt===(tt=Ot(e))&&I?I.p(e,c):(I.d(1),I=tt(e),I&&(I.c(),I.m(T,null))),c&1&&F!==(F=e[0].username)&&U.value!==F&&(U.value=F),c&1&&L!==(L=e[0].email)&&V.value!==L&&(V.value=L),c&1&&W!==(W=e[0].org)&&P.value!==W&&(P.value=W),c&1&&J!==(J=e[0].role)&&A.value!==J&&(A.value=J)},d(e){e&&l(t),I.d(),e&&l(B),e&&l(K),e&&l(Y),e&&l(j),e&&l(w),e&&l(Q),e&&l(N),e&&l(X),e&&l(Z),e&&l(x),e&&l(g),ht=!1,Mt(Tt)}}}function Zt(f){let t,i,a;return{c(){t=u("img"),this.h()},l(r){t=n(r,"IMG",{src:!0,width:!0,height:!0,style:!0,alt:!0}),this.h()},h(){Dt(t.src,i="/defaultpfp.png")||d(t,"src",i),d(t,"width","100"),d(t,"height","100"),rt(t,"border-radius","25px"),d(t,"alt",a=f[0].username)},m(r,p){v(r,t,p)},p(r,p){p&1&&a!==(a=r[0].username)&&d(t,"alt",a)},d(r){r&&l(t)}}}function xt(f){let t,i,a;return{c(){t=u("img"),this.h()},l(r){t=n(r,"IMG",{src:!0,width:!0,height:!0,style:!0,alt:!0}),this.h()},h(){Dt(t.src,i="https://api.gttx.app/api/files/_pb_users_auth_/"+f[0].id+"/"+f[0].avatar+"?thumb=100x100")||d(t,"src",i),d(t,"width","100"),d(t,"height","100"),rt(t,"border-radius","25px"),d(t,"alt",a=f[0].username)},m(r,p){v(r,t,p)},p(r,p){p&1&&!Dt(t.src,i="https://api.gttx.app/api/files/_pb_users_auth_/"+r[0].id+"/"+r[0].avatar+"?thumb=100x100")&&d(t,"src",i),p&1&&a!==(a=r[0].username)&&d(t,"alt",a)},d(r){r&&l(t)}}}function te(f){let t,i=f[0]&&Ht(f);return{c(){i&&i.c(),t=Bt()},l(a){i&&i.l(a),t=Bt()},m(a,r){i&&i.m(a,r),v(a,t,r)},p(a,[r]){a[0]?i?i.p(a,r):(i=Ht(a),i.c(),i.m(t.parentNode,t)):i&&(i.d(1),i=null)},i:kt,o:kt,d(a){i&&i.d(a),a&&l(t)}}}function ee(f,t,i){let a;Ct(f,Qt,h=>i(0,a=h));async function r(){Xt.authStore.clear(),at("/")}async function p(){at("/account/edit")}async function m(){at("/account/password")}return qt(()=>{a||at("/login")}),[a,r,p,m]}class le extends Rt{constructor(t){super(),St(this,t,ee,te,zt,{})}}function ie(f){let t,i,a,r,p,m,h,O,D;return m=new le({}),{c(){t=u("head"),i=u("title"),a=$("Hello, world!"),r=b(),p=u("body"),Ft(m.$$.fragment),h=b(),O=u("pre")},l(o){t=n(o,"HEAD",{});var y=_(t);i=n(y,"TITLE",{});var T=_(i);a=k(T,"Hello, world!"),T.forEach(l),y.forEach(l),r=E(o),p=n(o,"BODY",{});var B=_(p);Lt(m.$$.fragment,B),B.forEach(l),h=E(o),O=n(o,"PRE",{}),_(O).forEach(l)},m(o,y){v(o,t,y),s(t,i),s(i,a),v(o,r,y),v(o,p,y),Wt(m,p,null),v(o,h,y),v(o,O,y),D=!0},p:kt,i(o){D||(Jt(m.$$.fragment,o),D=!0)},o(o){Kt(m.$$.fragment,o),D=!1},d(o){o&&l(t),o&&l(r),o&&l(p),Yt(m),o&&l(h),o&&l(O)}}}function ae(f){return jt(),[]}class fe extends Rt{constructor(t){super(),St(this,t,ae,ie,zt,{})}}export{fe as default};
