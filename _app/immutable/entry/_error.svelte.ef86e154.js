import{S as c,i as u,s as p,k as l,r as b,l as m,m as d,u as g,h as o,b as _,G as f,v as h,n as i,L as v}from"../chunks/index.d8729f0b.js";import{s as $}from"../chunks/singletons.f67f6e98.js";const x=()=>{const e=$;return{page:{subscribe:e.page.subscribe},navigating:{subscribe:e.navigating.subscribe},updated:e.updated}},E={subscribe(e){return x().page.subscribe(e)}};function S(e){let s,r=e[0].error.message+"",a;return{c(){s=l("h1"),a=b(r)},l(t){s=m(t,"H1",{});var n=d(s);a=g(n,r),n.forEach(o)},m(t,n){_(t,s,n),f(s,a)},p(t,[n]){n&1&&r!==(r=t[0].error.message+"")&&h(a,r)},i,o:i,d(t){t&&o(s)}}}function y(e,s,r){let a;return v(e,E,t=>r(0,a=t)),[a]}let C=class extends c{constructor(s){super(),u(this,s,y,S,p,{})}};export{C as default};
