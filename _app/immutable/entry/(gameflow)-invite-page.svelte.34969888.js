import{S as ke,i as ye,s as De,a as A,k as p,r as k,e as me,c as V,l as _,m as h,u as y,h as n,b as I,G as s,v as C,U as Ie,n as he,L as Le,o as we,O as Ae,p as N,M as j,N as Ve,V as ze,Y as F}from"../chunks/index.4fc2f4c3.js";import{c as ve,p as H}from"../chunks/pocketbase.7918e77e.js";import{g as Me}from"../chunks/navigation.7cb7a34e.js";function be(u,e,l){const a=u.slice();return a[7]=e[l],a[9]=l,a}function Ee(u){let e;return{c(){e=k(u[2])},l(l){e=y(l,u[2])},m(l,a){I(l,e,a)},p(l,a){a&4&&C(e,l[2])},d(l){l&&n(e)}}}function Ne(u){let e=u[7].username+"",l;return{c(){l=k(e)},l(a){l=y(a,e)},m(a,r){I(a,l,r)},p(a,r){r&2&&e!==(e=a[7].username+"")&&C(l,e)},d(a){a&&n(l)}}}function Oe(u){let e=u[7].username+"",l,a;return{c(){l=k(e),a=k(" (self)")},l(r){l=y(r,e),a=y(r," (self)")},m(r,v){I(r,l,v),I(r,a,v)},p(r,v){v&2&&e!==(e=r[7].username+"")&&C(l,e)},d(r){r&&n(l),r&&n(a)}}}function ge(u,e){let l,a,r,v,m,g=e[7].role+"",d,z,f,i,c,L,t,o,b,O,J,K,Y,S,Q,W,q,R,X,Z,B,M,U,$,x,ee;function le(w,E){return w[7].id==w[3].id?Oe:Ne}let G=le(e),D=G(e);return{key:u,first:null,c(){l=p("div"),a=p("div"),r=p("h3"),D.c(),v=A(),m=p("div"),d=k(g),z=A(),f=p("div"),i=p("details"),c=p("summary"),L=k("role"),t=A(),o=p("ul"),b=p("li"),O=p("a"),J=k("facilitator"),K=A(),Y=p("li"),S=p("a"),Q=k("participant"),W=A(),q=p("li"),R=p("a"),X=k("observer"),Z=A(),B=p("div"),M=p("a"),U=k("DELETE"),$=A(),this.h()},l(w){l=_(w,"DIV",{class:!0});var E=h(l);a=_(E,"DIV",{});var te=h(a);r=_(te,"H3",{});var ae=h(r);D.l(ae),ae.forEach(n),te.forEach(n),v=V(E),m=_(E,"DIV",{});var oe=h(m);d=y(oe,g),oe.forEach(n),z=V(E),f=_(E,"DIV",{});var ie=h(f);i=_(ie,"DETAILS",{role:!0});var P=h(i);c=_(P,"SUMMARY",{"aria-haspopup":!0,role:!0,class:!0});var re=h(c);L=y(re,"role"),re.forEach(n),t=V(P),o=_(P,"UL",{role:!0});var T=h(o);b=_(T,"LI",{});var se=h(b);O=_(se,"A",{});var ne=h(O);J=y(ne,"facilitator"),ne.forEach(n),se.forEach(n),K=V(T),Y=_(T,"LI",{});var fe=h(Y);S=_(fe,"A",{});var ce=h(S);Q=y(ce,"participant"),ce.forEach(n),fe.forEach(n),W=V(T),q=_(T,"LI",{});var ue=h(q);R=_(ue,"A",{});var de=h(R);X=y(de,"observer"),de.forEach(n),ue.forEach(n),T.forEach(n),P.forEach(n),ie.forEach(n),Z=V(E),B=_(E,"DIV",{});var pe=h(B);M=_(pe,"A",{href:!0,role:!0});var _e=h(M);U=y(_e,"DELETE"),_e.forEach(n),pe.forEach(n),$=V(E),E.forEach(n),this.h()},h(){N(c,"aria-haspopup","listbox"),N(c,"role","button"),N(c,"class","secondary"),N(o,"role","listbox"),N(i,"role","list"),N(M,"href","#"),N(M,"role","button"),N(l,"class","grid"),this.first=l},m(w,E){I(w,l,E),s(l,a),s(a,r),D.m(r,null),s(l,v),s(l,m),s(m,d),s(l,z),s(l,f),s(f,i),s(i,c),s(c,L),s(i,t),s(i,o),s(o,b),s(b,O),s(O,J),s(o,K),s(o,Y),s(Y,S),s(S,Q),s(o,W),s(o,q),s(q,R),s(R,X),s(l,Z),s(l,B),s(B,M),s(M,U),s(l,$),x||(ee=[j(O,"click",function(){F(e[5](e[7].id,"facilitator"))&&e[5](e[7].id,"facilitator").apply(this,arguments)}),j(S,"click",function(){F(e[5](e[7].id,"participant"))&&e[5](e[7].id,"participant").apply(this,arguments)}),j(R,"click",function(){F(e[5](e[7].id,"observer"))&&e[5](e[7].id,"observer").apply(this,arguments)}),j(M,"click",function(){F(e[4](e[7].id))&&e[4](e[7].id).apply(this,arguments)})],x=!0)},p(w,E){e=w,G===(G=le(e))&&D?D.p(e,E):(D.d(1),D=G(e),D&&(D.c(),D.m(r,null))),E&2&&g!==(g=e[7].role+"")&&C(d,g)},d(w){w&&n(l),D.d(),x=!1,Ve(ee)}}}function Se(u){let e,l,a,r,v,m,g,d=[],z=new Map,f,i=u[2]!=""&&Ee(u),c=u[1];const L=t=>t[7].id;for(let t=0;t<c.length;t+=1){let o=be(u,c,t),b=L(o);z.set(b,d[t]=ge(b,o))}return{c(){i&&i.c(),e=A(),l=p("h1"),a=k("start: "),r=k(u[0]),v=A(),m=p("br"),g=A();for(let t=0;t<d.length;t+=1)d[t].c();f=me()},l(t){i&&i.l(t),e=V(t),l=_(t,"H1",{});var o=h(l);a=y(o,"start: "),r=y(o,u[0]),o.forEach(n),v=V(t),m=_(t,"BR",{}),g=V(t);for(let b=0;b<d.length;b+=1)d[b].l(t);f=me()},m(t,o){i&&i.m(t,o),I(t,e,o),I(t,l,o),s(l,a),s(l,r),I(t,v,o),I(t,m,o),I(t,g,o);for(let b=0;b<d.length;b+=1)d[b].m(t,o);I(t,f,o)},p(t,[o]){t[2]!=""?i?i.p(t,o):(i=Ee(t),i.c(),i.m(e.parentNode,e)):i&&(i.d(1),i=null),o&1&&C(r,t[0]),o&58&&(c=t[1],d=Ie(d,o,L,1,t,c,z,f.parentNode,ze,ge,f,be))},i:he,o:he,d(t){i&&i.d(t),t&&n(e),t&&n(l),t&&n(v),t&&n(m),t&&n(g);for(let o=0;o<d.length;o+=1)d[o].d(t);t&&n(f)}}}function Re(u,e,l){let a;Le(u,ve,f=>l(3,a=f));let r,v,m=[],g="";we(async()=>{var i;if(((i=ve)==null?void 0:i.org)==""){Me("createorg");return}const f=await H.collection("organization").getOne(a==null?void 0:a.org,{expand:"members"});l(1,m=[...m,...f.expand.members]),l(0,v=f.name),r=await H.collection("organization").subscribe(a==null?void 0:a.org,async function(c){console.log(c.record);const L=await H.collection("organization").getOne(c.record.id,{expand:"members"});l(1,m=L.expand.members)})}),Ae(()=>{r==null||r()});async function d(f){const i=m.filter(c=>c.id!==f);console.log(i),H.collection("organization").update(a==null?void 0:a.org,{members:i.map(c=>c.id)})}async function z(f,i){console.log(i),console.log(f);const c={role:i},L=await H.collection("users").update(f,c);l(2,g=L);const t=await H.collection("organization").getOne(a==null?void 0:a.org,{expand:"members"});l(1,m=t.expand.members)}return[v,m,g,a,d,z]}class qe extends ke{constructor(e){super(),ye(this,e,Re,Se,De,{})}}export{qe as default};
