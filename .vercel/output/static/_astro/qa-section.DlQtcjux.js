import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as n}from"./index.Dy6lLLXr.js";const m=({faqSection:l})=>{const r=l.faqs,[a,x]=n.useState(-1),i=t=>{x(a===t?-1:t)};return e.jsx("div",{className:"w-full",children:e.jsx("div",{className:"mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40 w-full",children:e.jsxs("div",{className:"mx-auto w-full",children:[e.jsxs("div",{className:"bg-white p-6 rounded-lg shadow-lg",children:[e.jsx("h2",{className:"lg:text-base/7 text-sm font-semibold text-blue-600 text-left",children:l.tag}),e.jsx("p",{className:"mt-2 max-w-lg text-pretty lg:text-4xl text-2xl font-semibold tracking-tight text-gray-950 text-left",children:l.title}),e.jsx("p",{className:"lg:mt-6 mt-2 max-w-2xl text-pretty text-left text-sm lg:text-base font-medium text-gray-600",children:l.description})]}),e.jsx("dl",{className:"mt-2 divide-y divide-gray-900/10 w-full bg-white p-6 rounded-lg shadow-lg",children:r.map((t,s)=>e.jsxs("div",{className:"py-6 first:pt-0 last:pb-0",children:[e.jsx("dt",{children:e.jsxs("button",{type:"button",className:"flex w-full items-start justify-between text-left text-gray-900 text-lg",onClick:()=>i(s),"aria-expanded":a===s,children:[e.jsx("span",{className:"md:text-base text-sm font-semibold",children:t.question}),e.jsx("span",{className:"ml-6 flex h-7 items-center",children:a===s?e.jsx("svg",{className:"size-6",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M18 12H6"})}):e.jsx("svg",{className:"size-6",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 6v12m6-6H6"})})})]})}),e.jsx("dd",{className:`mt-2 pr-12 text-gray-600 ${a===s?"":"hidden"}`,children:e.jsx("p",{className:"md:text-base/7 text-sm",children:t.answer})})]},s))})]})})})};export{m as default};
