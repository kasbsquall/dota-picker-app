(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{8371:function(e,s,a){Promise.resolve().then(a.bind(a,3725))},3725:function(e,s,a){"use strict";var i=a(7437),n=a(2265);let r=[{name:"Templar Assassin",image:"/images/templar_assassin.png",video:"/videos/templar_assassin.webm"},{name:"Axe",image:"/images/axe.png",video:"/videos/axe.webm"},{name:"Bane",image:"/images/bane.png",video:"/videos/bane.webm"},{name:"Outworld Devourer",image:"/images/outworld_destroyer.png",video:"/videos/outworld_destroyer.webm"},{name:"Pugna",image:"/images/pugna.png",video:"/videos/pugna.webm"},{name:"Viper",image:"/images/viper.png",video:"/videos/viper.webm"}],o=["Carry","Offlaner","Support","Hard Support","Midlaner"];s.default=()=>{let[e,s]=(0,n.useState)(""),[a,t]=(0,n.useState)(o[0]),[l,c]=(0,n.useState)(""),[m,d]=(0,n.useState)(""),[u,p]=(0,n.useState)(!1),h=async()=>{if(!e||!a){d("Debes seleccionar un h\xe9roe y una posici\xf3n.");return}d(""),p(!0);let s=await fetch("/api/generate-hero",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userHeroSelection:e,position:a})});if(p(!1),!s.ok){let e=await s.json();console.error(e.error),d(e.error||"Error desconocido");return}c((await s.json()).counterPicks)};return(0,i.jsxs)("div",{className:"p-4",children:[(0,i.jsx)("h2",{className:"block mb-4 font-semibold",children:"Selecciona un h\xe9roe:"}),(0,i.jsx)("div",{className:"hero-grid",children:r.map((a,n)=>(0,i.jsxs)("div",{className:"hero-card ".concat(e===a.name?"selected":""),onClick:()=>s(a.name),children:[(0,i.jsx)("img",{src:a.image,alt:a.name,className:"hero-image"}),(0,i.jsx)("p",{children:a.name})]},n))}),(0,i.jsx)("label",{htmlFor:"positionSelect",className:"block mt-4 mb-2 font-semibold",children:"Selecciona tu posici\xf3n:"}),(0,i.jsx)("select",{id:"positionSelect",value:a,onChange:e=>t(e.target.value),className:"mb-4 border rounded p-2",children:o.map(e=>(0,i.jsx)("option",{value:e,children:e},e))}),(0,i.jsx)("button",{onClick:h,className:"mb-4 bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition",children:"Obtener h\xe9roes counter"}),u&&(0,i.jsx)("div",{className:"loader"}),m&&(0,i.jsx)("p",{className:"text-red-500",children:m}),l&&(0,i.jsxs)("div",{className:"mt-4",children:[(0,i.jsx)("h2",{className:"text-lg font-semibold",children:"Counter Pickers que te recomiendo:"}),(0,i.jsx)("ul",{className:"list-disc pl-5",children:l.split("\n").map((e,s)=>(0,i.jsx)("li",{className:"mb-2",children:e.trim()},s))})]})]})}}},function(e){e.O(0,[971,117,744],function(){return e(e.s=8371)}),_N_E=e.O()}]);