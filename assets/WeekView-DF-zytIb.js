import{d as V,u as T,a as b,r as _,w as B,o as D,c as d,n as L,b as M,e as t,t as s,F as N,f as S,g as v,h as c,i as j,j as f,k,l as F,T as I,W as O,m as $,_ as x}from"./index-BGZ1xrUA.js";const z={class:"page"},A={class:"title"},E={class:"weather-status"},P=["src"],q={key:0,class:"full-width"},G={class:"weather-info"},H=V({__name:"WeekView",setup(J){const o=T(),h=b(),y=$(),r=_(o.getCity),i=_(o.getWeatherWeek),u=_(),w=new Date,W=async e=>{h.started(),await y.getWeatherWeekData(e).then(n=>{i.value=n,o.setWeatherWeek(i.value)}).finally(()=>{setTimeout(()=>{h.finished()},100)})},p=e=>{const n=new Date;return n.setDate(w.getDate()+e),n.toLocaleString("ru",{day:"numeric",month:"long",weekday:"long"})},C=e=>{if(u.value===e){u.value=void 0;return}u.value=e},g=e=>{(Object.keys(i.value).length===0||e!==o.city)&&W(o.city)};return B(o,()=>{g(r.value),setTimeout(()=>{r.value=o.getCity},100)}),D(()=>{var e,n;r.value&&g((n=(e=i.value)==null?void 0:e.city)==null?void 0:n.name)}),(e,n)=>(c(),d("div",z,[Object.keys(i.value).length!==0?(c(),d("div",{key:0,class:L(["wrapper",{loading:M(h).isLoading}])},[t("h1",A,s(r.value),1),(c(!0),d(N,null,S(i.value.list,(a,l)=>(c(),j(O,{key:l,onClick:m=>C(l)},{default:f(()=>{var m;return[k(s(p(l))+" ",1),t("div",E,[t("img",{id:"wicon",src:`https://openweathermap.org/img/w/${(m=a.weather[0])==null?void 0:m.icon}.png`,alt:"Weather icon"},null,8,P),k(" "+s(a.weather[0].description),1)]),t("h2",null,s(Math.round(a.main.temp_min))+"°C/"+s(Math.round(a.main.temp_max))+"°C",1),F(I,{name:"slide-fade"},{default:f(()=>[u.value===l?(c(),d("div",q,[t("div",G,[t("h2",null,s(p(l)),1),t("span",null,"Ощущается как "+s(a.main.feels_like),1),t("span",null,"Атмосферное давление "+s(a.main.pressure)+" hPa",1),t("span",null,"Влажность "+s(a.main.humidity),1),t("span",null,"Видимость "+s(Math.round(a.visibility/1e3))+" Км",1),t("span",null,"Скорость ветра "+s(a.wind.speed)+" м/с",1)])])):v("",!0)]),_:2},1024)]}),_:2},1032,["onClick"]))),128))],2)):v("",!0)]))}}),Q=x(H,[["__scopeId","data-v-9f435f27"]]);export{Q as default};