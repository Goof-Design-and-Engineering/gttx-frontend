import{S as Y,i as j,s as K,e as F,b as u,B as A,h as r,I as U,o as Q,k as w,q as b,a as M,l as O,r as c,c as N,m as z,D as G,n as H,E as P,J as V,u as y,w as W,x as X,y as Z,f as h,t as d,z as g}from"../../../chunks/index-effa2c47.js";import{u as x}from"../../../chunks/main-991480f9.js";/* empty css                                      */import{c as tt,a as et,b as lt,p as st}from"../../../chunks/pocketbase-21d39c15.js";import{g as J}from"../../../chunks/navigation-b2d51cf1.js";function L(f){let l,e,i,o,n=f[0].username+"",m,p,v,E,s=f[0].org+"",_,k,$,B,T=f[0].avatar+"",q,D,S,I,R,C;return{c(){l=w("img"),o=b(`
	Signed in as `),m=b(n),p=b(", "),v=b(f[1]),E=b(","),_=b(s),k=b(","),$=b(f[2]),B=b(","),q=b(T),D=M(),S=w("button"),I=b("logout"),this.h()},l(t){l=O(t,"IMG",{src:!0,alt:!0}),o=c(t,`
	Signed in as `),m=c(t,n),p=c(t,", "),v=c(t,f[1]),E=c(t,","),_=c(t,s),k=c(t,","),$=c(t,f[2]),B=c(t,","),q=c(t,T),D=N(t),S=O(t,"BUTTON",{});var a=z(S);I=c(a,"logout"),a.forEach(r),this.h()},h(){G(l.src,e="https://api.gttx.app/api/files/_pb_users_auth_/"+f[0].id+"/"+f[0].avatar+"?thumb=100x100")||H(l,"src",e),H(l,"alt",i=f[0].username)},m(t,a){u(t,l,a),u(t,o,a),u(t,m,a),u(t,p,a),u(t,v,a),u(t,E,a),u(t,_,a),u(t,k,a),u(t,$,a),u(t,B,a),u(t,q,a),u(t,D,a),u(t,S,a),P(S,I),R||(C=V(S,"click",f[3]),R=!0)},p(t,a){a&1&&!G(l.src,e="https://api.gttx.app/api/files/_pb_users_auth_/"+t[0].id+"/"+t[0].avatar+"?thumb=100x100")&&H(l,"src",e),a&1&&i!==(i=t[0].username)&&H(l,"alt",i),a&1&&n!==(n=t[0].username+"")&&y(m,n),a&2&&y(v,t[1]),a&1&&s!==(s=t[0].org+"")&&y(_,s),a&4&&y($,t[2]),a&1&&T!==(T=t[0].avatar+"")&&y(q,T)},d(t){t&&r(l),t&&r(o),t&&r(m),t&&r(p),t&&r(v),t&&r(E),t&&r(_),t&&r(k),t&&r($),t&&r(B),t&&r(q),t&&r(D),t&&r(S),R=!1,C()}}}function it(f){let l,e=f[0]&&L(f);return{c(){e&&e.c(),l=F()},l(i){e&&e.l(i),l=F()},m(i,o){e&&e.m(i,o),u(i,l,o)},p(i,[o]){i[0]?e?e.p(i,o):(e=L(i),e.c(),e.m(l.parentNode,l)):e&&(e.d(1),e=null)},i:A,o:A,d(i){e&&e.d(i),i&&r(l)}}}function at(f,l,e){let i,o,n;U(f,tt,p=>e(0,i=p)),U(f,et,p=>e(1,o=p)),U(f,lt,p=>e(2,n=p));async function m(){st.authStore.clear(),J("/")}return Q(()=>{i||J("/login")}),[i,o,n,m]}class rt extends Y{constructor(l){super(),j(this,l,at,it,K,{})}}function ft(f){let l,e,i,o,n,m,p,v,E;return m=new rt({}),{c(){l=w("head"),e=w("title"),i=b("Hello, world!"),o=M(),n=w("body"),W(m.$$.fragment),p=M(),v=w("pre")},l(s){l=O(s,"HEAD",{});var _=z(l);e=O(_,"TITLE",{});var k=z(e);i=c(k,"Hello, world!"),k.forEach(r),_.forEach(r),o=N(s),n=O(s,"BODY",{});var $=z(n);X(m.$$.fragment,$),$.forEach(r),p=N(s),v=O(s,"PRE",{}),z(v).forEach(r)},m(s,_){u(s,l,_),P(l,e),P(e,i),u(s,o,_),u(s,n,_),Z(m,n,null),u(s,p,_),u(s,v,_),E=!0},p:A,i(s){E||(h(m.$$.fragment,s),E=!0)},o(s){d(m.$$.fragment,s),E=!1},d(s){s&&r(l),s&&r(o),s&&r(n),g(m),s&&r(p),s&&r(v)}}}function ut(f){return x(),[]}class bt extends Y{constructor(l){super(),j(this,l,ut,ft,K,{})}}export{bt as default};