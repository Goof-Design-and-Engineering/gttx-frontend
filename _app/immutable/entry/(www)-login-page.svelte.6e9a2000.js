import{S as ce,i as pe,s as me,D as de,e as A,b,H as be,g as N,d as P,h as i,L as ae,o as he,R as $e,n as d,w as Ee,f as ve,k as p,r as C,a as y,z as S,l as m,m as g,u as I,c as T,A as W,p as v,G as f,V as z,B as D,M as j,W as Z,Y as ge,C as G,N as ke,q as x}from"../chunks/index.f25a3516.js";import{c as _e,p as ne}from"../chunks/pocketbase.4c010b3b.js";import{H as we,a as ee}from"../chunks/HintGroup.aa7a84a4.js";import{u as ye,v as oe,r as se,e as Te}from"../chunks/validators.75e44f34.js";import{g as ie}from"../chunks/navigation.b6d28c6e.js";function Ne(o){return{c:d,l:d,m:d,p:d,i:d,o:d,d}}function Re(o){let r,a,t=!o[4]&&ue(o);return{c(){t&&t.c(),r=A()},l(e){t&&t.l(e),r=A()},m(e,l){t&&t.m(e,l),b(e,r,l),a=!0},p(e,l){e[4]?t&&(Ee(),P(t,1,1,()=>{t=null}),ve()):t?(t.p(e,l),l&16&&N(t,1)):(t=ue(e),t.c(),N(t,1),t.m(r.parentNode,r))},i(e){a||(N(t),a=!0)},o(e){P(t),a=!1},d(e){t&&t.d(e),e&&i(r)}}}function ue(o){let r,a,t,e,l,n,u,h,B,k,H,R,O,F,c,J,L,K,w,Q,V,Y,q,U,X,te;k=new we({props:{for:"email",$$slots:{default:[Be]},$$scope:{ctx:o}}}),L=new ee({props:{for:"password",on:"required",$$slots:{default:[Ce]},$$scope:{ctx:o}}});let E=o[3]&&fe(o);return{c(){r=p("h1"),a=C("Login"),t=y(),e=p("form"),l=p("label"),n=C("Email Address"),u=y(),h=p("input"),B=y(),S(k.$$.fragment),H=y(),R=p("label"),O=C("Password"),F=y(),c=p("input"),J=y(),S(L.$$.fragment),K=y(),w=p("button"),Q=C("Login"),Y=y(),E&&E.c(),q=A(),this.h()},l(s){r=m(s,"H1",{class:!0});var _=g(r);a=I(_,"Login"),_.forEach(i),t=T(s),e=m(s,"FORM",{});var $=g(e);l=m($,"LABEL",{for:!0});var M=g(l);n=I(M,"Email Address"),M.forEach(i),u=T($),h=m($,"INPUT",{type:!0,name:!0,id:!0,placeholder:!0}),B=T($),W(k.$$.fragment,$),H=T($),R=m($,"LABEL",{for:!0});var le=g(R);O=I(le,"Password"),le.forEach(i),F=T($),c=m($,"INPUT",{type:!0,name:!0,id:!0,placeholder:!0}),J=T($),W(L.$$.fragment,$),K=T($),w=m($,"BUTTON",{id:!0,"aria-busy":!0});var re=g(w);Q=I(re,"Login"),re.forEach(i),$.forEach(i),Y=T(s),E&&E.l(s),q=A(),this.h()},h(){v(r,"class","page-name-header"),v(l,"for","email"),v(h,"type","email"),v(h,"name","email"),v(h,"id","email"),v(h,"placeholder","goof@goofle.com"),v(R,"for","password"),v(c,"type","password"),v(c,"name","password"),v(c,"id","password"),v(c,"placeholder","Password"),v(w,"id","login_button"),w.disabled=V=!o[5].valid,v(w,"aria-busy",o[2])},m(s,_){b(s,r,_),f(r,a),b(s,t,_),b(s,e,_),f(e,l),f(l,n),f(e,u),f(e,h),z(h,o[0]),f(e,B),D(k,e,null),f(e,H),f(e,R),f(R,O),f(e,F),f(e,c),z(c,o[1]),f(e,J),D(L,e,null),f(e,K),f(e,w),f(w,Q),b(s,Y,_),E&&E.m(s,_),b(s,q,_),U=!0,X||(te=[j(h,"input",o[9]),Z(oe.call(null,h,[se,Te])),j(c,"input",o[10]),Z(oe.call(null,c,[se])),j(w,"click",o[7]),Z(o[6].call(null,e)),j(e,"submit",ge(o[8]))],X=!0)},p(s,_){_&1&&h.value!==s[0]&&z(h,s[0]);const $={};_&32768&&($.$$scope={dirty:_,ctx:s}),k.$set($),_&2&&c.value!==s[1]&&z(c,s[1]);const M={};_&32768&&(M.$$scope={dirty:_,ctx:s}),L.$set(M),(!U||_&32&&V!==(V=!s[5].valid))&&(w.disabled=V),(!U||_&4)&&v(w,"aria-busy",s[2]),s[3]?E?E.p(s,_):(E=fe(s),E.c(),E.m(q.parentNode,q)):E&&(E.d(1),E=null)},i(s){U||(N(k.$$.fragment,s),N(L.$$.fragment,s),U=!0)},o(s){P(k.$$.fragment,s),P(L.$$.fragment,s),U=!1},d(s){s&&i(r),s&&i(t),s&&i(e),G(k),G(L),s&&i(Y),E&&E.d(s),s&&i(q),X=!1,ke(te)}}}function Le(o){let r,a,t,e;return{c(){r=p("i"),a=p("center"),t=C("This is a mandatory field"),e=p("br")},l(l){r=m(l,"I",{});var n=g(r);a=m(n,"CENTER",{});var u=g(a);t=I(u,"This is a mandatory field"),u.forEach(i),n.forEach(i),e=m(l,"BR",{})},m(l,n){b(l,r,n),f(r,a),f(a,t),b(l,e,n)},p:d,d(l){l&&i(r),l&&i(e)}}}function Pe(o){let r,a,t,e;return{c(){r=p("i"),a=p("center"),t=C("Email is not valid"),e=p("br")},l(l){r=m(l,"I",{});var n=g(r);a=m(n,"CENTER",{});var u=g(a);t=I(u,"Email is not valid"),u.forEach(i),n.forEach(i),e=m(l,"BR",{})},m(l,n){b(l,r,n),f(r,a),f(a,t),b(l,e,n)},p:d,d(l){l&&i(r),l&&i(e)}}}function Be(o){let r,a,t,e;return r=new ee({props:{on:"required",$$slots:{default:[Le]},$$scope:{ctx:o}}}),t=new ee({props:{on:"email",hideWhenRequired:!0,class:"login-hint",$$slots:{default:[Pe]},$$scope:{ctx:o}}}),{c(){S(r.$$.fragment),a=y(),S(t.$$.fragment)},l(l){W(r.$$.fragment,l),a=T(l),W(t.$$.fragment,l)},m(l,n){D(r,l,n),b(l,a,n),D(t,l,n),e=!0},p(l,n){const u={};n&32768&&(u.$$scope={dirty:n,ctx:l}),r.$set(u);const h={};n&32768&&(h.$$scope={dirty:n,ctx:l}),t.$set(h)},i(l){e||(N(r.$$.fragment,l),N(t.$$.fragment,l),e=!0)},o(l){P(r.$$.fragment,l),P(t.$$.fragment,l),e=!1},d(l){G(r,l),l&&i(a),G(t,l)}}}function Ce(o){let r,a,t,e;return{c(){r=p("i"),a=p("center"),t=C("This is a mandatory field"),e=p("br")},l(l){r=m(l,"I",{});var n=g(r);a=m(n,"CENTER",{});var u=g(a);t=I(u,"This is a mandatory field"),u.forEach(i),n.forEach(i),e=m(l,"BR",{})},m(l,n){b(l,r,n),f(r,a),f(a,t),b(l,e,n)},p:d,d(l){l&&i(r),l&&i(e)}}}function fe(o){let r,a;return{c(){r=p("center"),a=p("input"),this.h()},l(t){r=m(t,"CENTER",{});var e=g(r);a=m(e,"INPUT",{style:!0,type:!0}),e.forEach(i),this.h()},h(){x(a,"border","2px solid red"),x(a,"border-radius","5px"),x(a,"text-align","center"),v(a,"type","text"),a.value=o[3],a.readOnly=!0},m(t,e){b(t,r,e),f(r,a)},p(t,e){e&8&&a.value!==t[3]&&(a.value=t[3])},d(t){t&&i(r)}}}function Ie(o){return{c:d,l:d,m:d,p:d,i:d,o:d,d}}function qe(o){let r,a,t={ctx:o,current:null,token:null,hasCatch:!1,pending:Ie,then:Re,catch:Ne,value:14,blocks:[,,,]};return de(_e,t),{c(){r=A(),t.block.c()},l(e){r=A(),t.block.l(e)},m(e,l){b(e,r,l),t.block.m(e,t.anchor=l),t.mount=()=>r.parentNode,t.anchor=r,a=!0},p(e,[l]){o=e,be(t,o,l)},i(e){a||(N(t.block),a=!0)},o(e){for(let l=0;l<3;l+=1){const n=t.blocks[l];P(n)}a=!1},d(e){e&&i(r),t.block.d(e),t.token=null,t=null}}}function Ue(o,r,a){let t,e;ae(o,_e,c=>a(4,t=c));const l=ye();ae(o,l,c=>a(5,e=c));var n="",u="";let h=!1,B=!1,k;async function H(){try{a(2,B=!0),a(3,k=!1),h=!1,await ne.collection("users").authWithPassword(n,u),ie("/dashboard")}catch(c){a(2,B=!1),console.log(ne.authStore.isValid),a(3,k=c)}}he(async()=>{if(t)ie("/createorg");else return});function R(c){$e.call(this,o,c)}function O(){n=this.value,a(0,n)}function F(){u=this.value,a(1,u)}return[n,u,B,k,t,e,l,H,R,O,F]}class Ae extends ce{constructor(r){super(),pe(this,r,Ue,qe,me,{})}}function He(o){let r,a,t,e,l;return a=new Ae({}),{c(){r=p("body"),S(a.$$.fragment),t=y(),e=p("pre")},l(n){r=m(n,"BODY",{});var u=g(r);W(a.$$.fragment,u),u.forEach(i),t=T(n),e=m(n,"PRE",{}),g(e).forEach(i)},m(n,u){b(n,r,u),D(a,r,null),b(n,t,u),b(n,e,u),l=!0},p:d,i(n){l||(N(a.$$.fragment,n),l=!0)},o(n){P(a.$$.fragment,n),l=!1},d(n){n&&i(r),G(a),n&&i(t),n&&i(e)}}}class De extends ce{constructor(r){super(),pe(this,r,null,He,me,{})}}export{De as default};
