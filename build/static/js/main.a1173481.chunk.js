(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{39:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var c=t(15),a=t.n(c),r=t(6),u=t(3),o=t(2),i=t(0),s=function(e){var n=e.searchName,t=e.handleSearchChange;return Object(i.jsxs)("div",{children:["filter shown with",Object(i.jsx)("input",{value:n,onChange:t})]})},d=function(e){var n=e.addName,t=e.newName,c=e.handleNameChange,a=e.newNumber,r=e.handleNumberChange;return Object(i.jsx)("div",{children:Object(i.jsxs)("form",{onSubmit:n,children:[Object(i.jsxs)("div",{children:["name: ",Object(i.jsx)("input",{value:t,onChange:c})]}),Object(i.jsxs)("div",{children:["number: ",Object(i.jsx)("input",{value:a,onChange:r})]}),Object(i.jsx)("div",{children:Object(i.jsx)("button",{type:"submit",children:"add"})})]})})},l=function(e){var n=e.persons,t=e.deletePerson;return n.map((function(e){return Object(i.jsxs)("p",{children:[e.name," ",e.number,Object(i.jsx)("button",{onClick:function(){return t(e.id)},children:"delete"})]},e.id)}))},h=function(e){var n=e.message,t=e.className;return null===n?null:Object(i.jsxs)("div",{className:t,children:["\u2713 ",n]})},j=t(4),b=t.n(j),f="http://localhost:3001/api/persons",m=function(){return b.a.get(f).then((function(e){return e.data}))},O=function(e){return b.a.post(f,e).then((function(e){return e.data}))},p=function(e,n){return b.a.put("".concat(f,"/").concat(e.id),n).then((function(e){return e.data}))},v=function(e){return b.a.delete("".concat(f,"/").concat(e)).then((function(e){return e.data}))},x=function(){var e=Object(o.useState)([]),n=Object(u.a)(e,2),t=n[0],c=n[1],a=Object(o.useState)(""),j=Object(u.a)(a,2),b=j[0],f=j[1],x=Object(o.useState)(""),g=Object(u.a)(x,2),N=g[0],w=g[1],C=Object(o.useState)(""),S=Object(u.a)(C,2),k=S[0],y=S[1],E=Object(o.useState)(null),P=Object(u.a)(E,2),T=P[0],A=P[1],D=Object(o.useState)(null),J=Object(u.a)(D,2),B=J[0],I=J[1];Object(o.useEffect)((function(){m().then((function(e){return c(e)}))}),[]);var R=new RegExp(k,"i"),q=t.filter((function(e){return R.test(e.name)}));return Object(i.jsxs)("div",{children:[Object(i.jsx)("h2",{children:"Phone book"}),Object(i.jsx)(h,{className:"success",message:T}),Object(i.jsx)(h,{className:"error",message:B}),Object(i.jsx)(s,{searchName:k,handleSearchChange:function(e){y(e.target.value)}}),Object(i.jsx)("h3",{children:"Add a new"}),Object(i.jsx)(d,{newName:b,newNumber:N,handleNameChange:function(e){f(e.target.value)},handleNumberChange:function(e){w(e.target.value)},addName:function(e){if(e.preventDefault(),t.some((function(e){return e.name===b}))){if(window.confirm(" ".concat(b," is already added to the phone book, replace old number with a new one?"))){var n=t.find((function(e){return e.name===b})),a=Object(r.a)(Object(r.a)({},n),{},{number:N});p(n,a).then((function(e){c(t.map((function(t){return t.name!==n.name?t:e})))})).catch((function(e){I("Can't update, this entry is no longer on the server."),setTimeout((function(){I(null)}),5e3)})),f(""),w(""),y("")}}else O({name:b,number:N}).then((function(e){c(t.concat(e)),A("Added ".concat(e.name)),setTimeout((function(){A(null)}),3e3),f(""),w("")}))}}),Object(i.jsx)("h3",{children:"Numbers"}),Object(i.jsx)("div",{children:Object(i.jsx)(l,{persons:q,deletePerson:function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Delete entry: ".concat(n.name," ? "))&&v(e).then((function(n){c(t.filter((function(n){return n.id!==e}))),y("")})).catch((function(e){console.log(e),I("".concat(n.name," had already been removed"),"error"),setTimeout((function(){I(null)}),5e3)}))}})})]})};t(39);a.a.render(Object(i.jsx)(x,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.a1173481.chunk.js.map