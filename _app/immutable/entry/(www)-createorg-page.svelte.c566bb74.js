import{S as _e,i as be,s as ge,e as fe,b as B,w as ve,d as F,f as ye,g as J,h as l,L as de,o as Ee,R as $e,k as f,r as D,a as O,l as d,m as _,u as I,c as T,p as g,q as Y,G as o,n as j,z as te,A as re,W as he,B as ae,M as G,X as pe,Z as ke,C as oe,N as we}from"../chunks/index.4fc2f4c3.js";import{c as ze,p as X}from"../chunks/pocketbase.cc5ca80f.js";import{H as Ce,a as Ne}from"../chunks/HintGroup.74a3b5b1.js";import{u as Oe}from"../chunks/useForm.24789db4.js";import{v as Te,r as Be}from"../chunks/validators.c512e31b.js";import{g as x}from"../chunks/navigation.3dc8513e.js";function De(i){let e,r,a,t,n,u,v,s,b,c,U,k,C,p,y;return{c(){e=f("hgroup"),r=f("h1"),a=D("Success! Your organization has been created!"),t=O(),n=f("h2"),u=D("Click one of the buttons below to manage your new organization or head to the dashboard."),v=O(),s=f("div"),b=f("div"),c=f("a"),U=D("Manage Organization"),k=O(),C=f("div"),p=f("a"),y=D("Dashboard"),this.h()},l(m){e=d(m,"HGROUP",{});var $=_(e);r=d($,"H1",{});var H=_(r);a=I(H,"Success! Your organization has been created!"),H.forEach(l),t=T($),n=d($,"H2",{});var S=_(n);u=I(S,"Click one of the buttons below to manage your new organization or head to the dashboard."),S.forEach(l),$.forEach(l),v=T(m),s=d(m,"DIV",{class:!0});var L=_(s);b=d(L,"DIV",{});var V=_(b);c=d(V,"A",{class:!0,role:!0,href:!0,style:!0});var N=_(c);U=I(N,"Manage Organization"),N.forEach(l),V.forEach(l),k=T(L),C=d(L,"DIV",{});var R=_(C);p=d(R,"A",{role:!0,href:!0,style:!0});var A=_(p);y=I(A,"Dashboard"),A.forEach(l),R.forEach(l),L.forEach(l),this.h()},h(){g(c,"class","secondary"),g(c,"role","button"),g(c,"href","/dashboard/manage_org"),Y(c,"width","100%"),g(p,"role","button"),g(p,"href","/dashboard"),Y(p,"width","100%"),g(s,"class","grid")},m(m,$){B(m,e,$),o(e,r),o(r,a),o(e,t),o(e,n),o(n,u),B(m,v,$),B(m,s,$),o(s,b),o(b,c),o(c,U),o(s,k),o(s,C),o(C,p),o(p,y)},p:j,i:j,o:j,d(m){m&&l(e),m&&l(v),m&&l(s)}}}function Ie(i){let e,r,a,t,n,u,v,s,b,c,U,k,C,p,y,m,$,H,S,L,V,N,R,A,Z,M,K,P,Q,ne;k=new Ce({props:{for:"organization",$$slots:{default:[He]},$$scope:{ctx:i}}});let E=i[1]&&me(i);return{c(){e=f("h1"),r=D("Create an org"),a=O(),t=f("form"),n=f("div"),u=f("div"),v=f("label"),s=D("Organization Name"),b=O(),c=f("input"),U=O(),te(k.$$.fragment),C=O(),p=f("button"),y=D("Create your organization!"),$=O(),E&&E.c(),H=O(),S=f("hr"),L=f("br"),V=O(),N=f("div"),R=f("button"),A=D("Join an org instead"),Z=O(),M=f("button"),K=D("Nevermind, sign out"),this.h()},l(h){e=d(h,"H1",{class:!0});var z=_(e);r=I(z,"Create an org"),z.forEach(l),a=T(h),t=d(h,"FORM",{method:!0});var w=_(t);n=d(w,"DIV",{class:!0});var se=_(n);u=d(se,"DIV",{});var q=_(u);v=d(q,"LABEL",{for:!0});var le=_(v);s=I(le,"Organization Name"),le.forEach(l),b=T(q),c=d(q,"INPUT",{type:!0,name:!0,id:!0,placeholder:!0}),U=T(q),re(k.$$.fragment,q),q.forEach(l),se.forEach(l),C=T(w),p=d(w,"BUTTON",{"aria-busy":!0});var ie=_(p);y=I(ie,"Create your organization!"),ie.forEach(l),$=T(w),E&&E.l(w),H=T(w),S=d(w,"HR",{}),L=d(w,"BR",{}),V=T(w),N=d(w,"DIV",{class:!0});var W=_(N);R=d(W,"BUTTON",{});var ue=_(R);A=I(ue,"Join an org instead"),ue.forEach(l),Z=T(W),M=d(W,"BUTTON",{class:!0});var ce=_(M);K=I(ce,"Nevermind, sign out"),ce.forEach(l),W.forEach(l),w.forEach(l),this.h()},h(){g(e,"class","page-name-header"),g(v,"for","organization"),g(c,"type","username"),g(c,"name","organization"),g(c,"id","username"),g(c,"placeholder","Goof, LLC"),g(n,"class","grid"),g(p,"aria-busy",i[2]),p.disabled=m=!i[4].valid,g(M,"class","contrast"),g(N,"class","grid"),g(t,"method","POST")},m(h,z){B(h,e,z),o(e,r),B(h,a,z),B(h,t,z),o(t,n),o(n,u),o(u,v),o(v,s),o(u,b),o(u,c),he(c,i[0]),o(u,U),ae(k,u,null),o(t,C),o(t,p),o(p,y),o(t,$),E&&E.m(t,null),o(t,H),o(t,S),o(t,L),o(t,V),o(t,N),o(N,R),o(R,A),o(N,Z),o(N,M),o(M,K),P=!0,Q||(ne=[G(c,"input",i[10]),pe(Te.call(null,c,[Be])),G(p,"click",i[6]),G(R,"click",i[7]),G(M,"click",i[8]),pe(i[5].call(null,t)),G(t,"submit",ke(i[9]))],Q=!0)},p(h,z){z&1&&he(c,h[0]);const w={};z&8192&&(w.$$scope={dirty:z,ctx:h}),k.$set(w),(!P||z&4)&&g(p,"aria-busy",h[2]),(!P||z&16&&m!==(m=!h[4].valid))&&(p.disabled=m),h[1]?E?E.p(h,z):(E=me(h),E.c(),E.m(t,H)):E&&(E.d(1),E=null)},i(h){P||(J(k.$$.fragment,h),P=!0)},o(h){F(k.$$.fragment,h),P=!1},d(h){h&&l(e),h&&l(a),h&&l(t),oe(k),E&&E.d(),Q=!1,we(ne)}}}function Ue(i){let e,r,a;return{c(){e=f("center"),r=D("This is a mandatory field"),a=f("br")},l(t){e=d(t,"CENTER",{});var n=_(e);r=I(n,"This is a mandatory field"),n.forEach(l),a=d(t,"BR",{})},m(t,n){B(t,e,n),o(e,r),B(t,a,n)},p:j,d(t){t&&l(e),t&&l(a)}}}function He(i){let e,r;return e=new Ne({props:{on:"required",$$slots:{default:[Ue]},$$scope:{ctx:i}}}),{c(){te(e.$$.fragment)},l(a){re(e.$$.fragment,a)},m(a,t){ae(e,a,t),r=!0},p(a,t){const n={};t&8192&&(n.$$scope={dirty:t,ctx:a}),e.$set(n)},i(a){r||(J(e.$$.fragment,a),r=!0)},o(a){F(e.$$.fragment,a),r=!1},d(a){oe(e,a)}}}function me(i){let e,r;return{c(){e=f("center"),r=f("input"),this.h()},l(a){e=d(a,"CENTER",{});var t=_(e);r=d(t,"INPUT",{style:!0,type:!0}),t.forEach(l),this.h()},h(){Y(r,"border","2px solid red"),Y(r,"border-radius","5px"),Y(r,"text-align","center"),g(r,"type","text"),r.value=i[1],r.readOnly=!0},m(a,t){B(a,e,t),o(e,r)},p(a,t){t&2&&r.value!==a[1]&&(r.value=a[1])},d(a){a&&l(e)}}}function Re(i){let e,r,a,t;const n=[Ie,De],u=[];function v(s,b){return s[3]?1:0}return e=v(i),r=u[e]=n[e](i),{c(){r.c(),a=fe()},l(s){r.l(s),a=fe()},m(s,b){u[e].m(s,b),B(s,a,b),t=!0},p(s,[b]){let c=e;e=v(s),e===c?u[e].p(s,b):(ve(),F(u[c],1,1,()=>{u[c]=null}),ye(),r=u[e],r?r.p(s,b):(r=u[e]=n[e](s),r.c()),J(r,1),r.m(a.parentNode,a))},i(s){t||(J(r),t=!0)},o(s){F(r),t=!1},d(s){u[e].d(s),s&&l(a)}}}function ee(i){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",a=i.substr(0,3).toUpperCase();let t=a;for(let n=0;n<8-a.length;n++)t+=e.charAt(Math.floor(Math.random()*e.length));return t}function Le(i,e,r){let a,t;de(i,ze,y=>r(11,a=y));const n=Oe();de(i,n,y=>r(4,t=y));let u,v,s=!1,b=!1;async function c(){var y;r(1,v=""),r(2,s=!0);try{const m={name:u,members:[a.id],participant_code:ee("participant"),facilitator_code:ee("facilitator"),observer_code:ee("observer")},$=await X.collection("organization").create(m);if($!=null){const H={org:$.id};X.collection("users").update((y=X.authStore.model)==null?void 0:y.id,H)}r(3,b=!0)}catch(m){r(1,v=m),r(0,u="")}r(2,s=!1)}async function U(){x("joinorg")}async function k(){await X.authStore.clear(),x("/")}Ee(async()=>{a.org!=""&&x("/dashboard")});function C(y){$e.call(this,i,y)}function p(){u=this.value,r(0,u)}return[u,v,s,b,t,n,c,U,k,C,p]}class Me extends _e{constructor(e){super(),be(this,e,Le,Re,ge,{})}}function Se(i){let e,r,a;return r=new Me({}),{c(){e=f("body"),te(r.$$.fragment)},l(t){e=d(t,"BODY",{});var n=_(e);re(r.$$.fragment,n),n.forEach(l)},m(t,n){B(t,e,n),ae(r,e,null),a=!0},p:j,i(t){a||(J(r.$$.fragment,t),a=!0)},o(t){F(r.$$.fragment,t),a=!1},d(t){t&&l(e),oe(r)}}}class je extends _e{constructor(e){super(),be(this,e,null,Se,ge,{})}}export{je as default};
