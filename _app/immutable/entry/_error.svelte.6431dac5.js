import{S as G,i as W,s as k,k as d,r as _,a as y,l as f,m as v,u as E,c as H,h,b as q,G as n,v as S,n as x,L as C}from"../chunks/index.d8729f0b.js";import{s as L}from"../chunks/singletons.43526e4f.js";const O=()=>{const t=L;return{page:{subscribe:t.page.subscribe},navigating:{subscribe:t.navigating.subscribe},updated:t.updated}},P={subscribe(t){return O().page.subscribe(t)}};function R(t){let e,s,r=t[0].status+"",i,g,l=t[0].error.message+"",u,m,c,b;return{c(){e=d("hgroup"),s=d("h1"),i=_(r),g=y(),u=_(l),m=y(),c=d("h2"),b=_("Well, that's certainly something.")},l(o){e=f(o,"HGROUP",{});var a=v(e);s=f(a,"H1",{});var p=v(s);i=E(p,r),g=H(p),u=E(p,l),p.forEach(h),m=H(a),c=f(a,"H2",{});var $=v(c);b=E($,"Well, that's certainly something."),$.forEach(h),a.forEach(h)},m(o,a){q(o,e,a),n(e,s),n(s,i),n(s,g),n(s,u),n(e,m),n(e,c),n(c,b)},p(o,[a]){a&1&&r!==(r=o[0].status+"")&&S(i,r),a&1&&l!==(l=o[0].error.message+"")&&S(u,l)},i:x,o:x,d(o){o&&h(e)}}}function U(t,e,s){let r;return C(t,P,i=>s(0,r=i)),[r]}let z=class extends G{constructor(e){super(),W(this,e,U,R,k,{})}};export{z as default};
