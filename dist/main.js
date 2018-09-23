!function(t){var e={};function s(i){if(e[i])return e[i].exports;var n=e[i]={i:i,l:!1,exports:{}};return t[i].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(i,n,function(e){return t[e]}.bind(null,n));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=0)}([function(t,e,s){"use strict";s.r(e);const i=t=>{return`${255*(-104976*(t-.045)**4+1)},${255*(-50625*(t-.07)**4+1)},${255*(-14641*(t-.11)**4+1)}`},n=t=>{const e=t.magnitude();return`hsl(${Math.min(e/.01*120+240,360)},100%,50%)`},o=({x:t})=>t>0?"blue":t<0?"green":"grey";var a=class{constructor(t,e){this.canvas=document.querySelector("canvas"),this.state=t,this.client=e,this.ctx=this.canvas.getContext("2d",{alpha:!1}),this.resize.bind(this)(),this.ctx.fillStyle="rgba(255,255,255,1)",this.ctx.strokeStyle="rgba(255,255,255,1)",window.onresize=(()=>this.resize())}get scale(){return Math.min(this.width,this.height)}render(){this.mouse(this.client.mouse),this.renderParticles()}renderParticles(){switch(this.ctx.shadowBlur=0,this.ctx.shadowColor="rgba(0, 0, 0, 0)",this.ctx.fillStyle="white",this.client.mode){case"stars":this.renderStars();break;case"automata":this.renderAutomata();break;case"networks":this.renderNetworks();break;case"gases":this.renderGases()}}renderStars(){const{particles:t}=this.state,e=t.length;for(let s=0;s<e;s+=1){const e=t[s];e.visualSize(this.scale)<1?this.dot(e):this.star(e)}}renderAutomata(){const{particles:t}=this.state,e=t.length;for(let s=0;s<e;s+=1)this.automata(t[s])}renderGases(){const{particles:t}=this.state,e=t.length;for(let s=0;s<e;s+=1)this.gas(t[s])}renderNetworks(){this.ctx.lineWidth=.3,this.ctx.strokeStyle="rgba(255,255,255,0.5)",this.ctx.fillStyle="rgba(255,255,255,0.5)";const{particles:t}=this.state,e=t.length;for(let s=0;s<e;s+=1){const e=t[s],i=e.nearby.length;for(let t=0;t<i;t+=1)this.dot(e),this.line(e.pos,e.nearby[t]);e.nearby.length=0}}resize(){this.width=window.innerWidth,this.height=window.innerHeight,this.client.displayWidth=this.width,this.client.displayHeight=this.height,this.canvas.width=this.width,this.canvas.height=this.height,this.ctx.fillStyle="rgba(255,255,255,1)",this.ctx.strokeStyle="rgba(255,255,255,1)",this.ctx.globalCompositeOperation="screen"}reset(){this.ctx.clearRect(0,0,this.width,this.height)}mouse({x:t,y:e}){this.ctx.lineWidth=1.5,this.strokeStyle="rgba(255,255,255,0.2)",this.ctx.beginPath(),this.ctx.arc(t*this.width,e*this.height,.008*this.scale,0,2*Math.PI,!1),this.ctx.stroke()}star(t){const{pos:e}=t,s=t.visualSize(this.scale),n=i(t.size);this.ctx.fillStyle=`rgba(${n},1)`,this.ctx.shadowBlur=2*s,this.ctx.shadowColor=`rgba(${n},1)`,this.ctx.beginPath(),this.ctx.arc(e.x*this.width,e.y*this.height,s,0,2*Math.PI,!1),this.ctx.fill()}circle(t){const{pos:e}=t,s=t.visualSize(this.scale);this.ctx.beginPath(),this.ctx.arc(e.x*this.width,e.y*this.height,s,0,2*Math.PI,!1),this.ctx.fill()}automata(t){const{pos:e}=t,s=t.visualSize(this.scale);this.ctx.fillStyle=o(t.vel),this.ctx.beginPath(),this.ctx.arc(e.x*this.width,e.y*this.height,s,0,2*Math.PI,!1),this.ctx.fill()}gas(t){const{pos:e}=t,s=t.visualSize(this.scale);this.ctx.fillStyle=n(t.vel),this.ctx.beginPath(),this.ctx.arc(e.x*this.width,e.y*this.height,s,0,2*Math.PI,!1),this.ctx.fill()}dot({pos:t}){this.ctx.fillStyle="SandyBrown",this.ctx.fillRect(t.x*this.width,t.y*this.height,1,1)}line(t,e){this.ctx.beginPath(),this.ctx.moveTo(t.x*this.width,t.y*this.height),this.ctx.lineTo(e.x*this.width,e.y*this.height),this.ctx.stroke()}};class r{constructor(t,e){this.x=t,this.y=e}add(t){return this.x+=t.x,this.y+=t.y,this}subtract(t){return this.x-=t.x,this.y-=t.y,this}scale(t){return this.x*=t,this.y*=t,this}moveTo(t,e){return this.x=t,this.y=e,this}normalize(){return(this.x||this.y)&&this.scale(1/this.magnitude()),this}sqDist(t){return(this.x-t.x)**2+(this.y-t.y)**2}dist(t){const e=this.x-t.x,s=this.y-t.y;return Math.hypot(e,s)}dot(t){return this.x*t.x+this.y*t.y}magnitude(){return Math.hypot(this.x,this.y)}static direction(t,e){return new r(0,0).add(t).subtract(e).normalize()}static randomDir(t=1){return new r(Math.random()-Math.random(),Math.random()-Math.random()).normalize().scale(t)}static origin(){return new r(0,0)}static clone(t){return new r(t.x,t.y)}static random(){return new r(Math.random(),Math.random())}}var h=r;var c=class{constructor({pos:t=new h(0,0),vel:e=new h(0,0),mass:s=0,charge:i=0,radius:n=0}){this.pos=t,this.vel=e,this.mass=s,this.charge=i,this.radius=n,this.protected=!0}get momentum(){return new h(0,0).add(this.vel).scale(this.mass)}get size(){return this.radius}visualSize(t){return this.radius*t}update(){this.pos.add(this.vel)}accelerate(t){this.vel.add(t)}move(t){this.pos.add(t)}grow(t){this.mass+=t}delete(){this.protected=!1}isTouching(t,e){return this.pos.sqDist(t)<(this.size+e)**2}isContained(t,e){return this.pos.dist(t)<this.size-e}};const l=(t,e)=>{t.grow(e.mass),e.delete()},d=(t,e)=>{const s=t.momentum.add(e.momentum).scale(1/(t.mass+e.mass));t.vel.scale(0),t.accelerate(s)},u=(t,e,s)=>{e.move(h.direction(e.pos,t.pos).scale(s*(t.size+e.size)-t.pos.dist(e.pos)))},m=(t,e)=>{const s=t.mass/t.pos.sqDist(e.pos),i=new h(0,0).add(t.pos).subtract(e.pos);e.accelerate(i.scale(.025*s))},p=(t,e,s)=>{const i=t.pos.sqDist(e.pos),n=Math.min(2e-11/(i*i),s),o=h.direction(e.pos,t.pos);e.accelerate(o.scale(n))};var w=class extends c{visualSize(t){return Math.sqrt(this.mass)*t}get size(){return Math.sqrt(this.mass)}interact(t){const{pos:e,size:s}=t;this.isTouching(e,.1*s)&&this.protected?(d(this,t),l(this,t)):m(this,t)}};var g=class extends c{inReach(t,e){return this.pos.sqDist(t)<(2*this.size+e)**2}interact(t){this.inReach(t.pos,t.size)&&u(this,t,1.1)}};var y=class extends c{get size(){return.001}interact(t){p(this,t,1e-4)}};var x=class extends c{constructor(t){super(t),this.nearby=[]}interact({pos:t}){this.isTouching(t,0)&&this.nearby.push(t)}};const v=(t,e)=>h.randomDir(e*Math.random()).add(t),f={stars:t=>new w({mass:5e-7,vel:h.randomDir(1e-5),pos:v(t,.03)}),gases:t=>new y({radius:.005,vel:h.randomDir(1e-4),pos:v(t,.1)}),automata:t=>new g({radius:.006,vel:h.randomDir(.001),pos:v(t,.01)}),networks:t=>new x({radius:.1,vel:h.randomDir(2e-4),pos:v(t,.15)})},b={stars:(t,e)=>new w({mass:3e-6,vel:e.scale(.007),pos:v(t,.01)}),gases:(t,e)=>new y({radius:.005,vel:e.scale(.006),pos:v(t,1e-6)}),automata:(t,e)=>new g({radius:.006,vel:e.scale(.003),pos:v(t,.01)}),networks:(t,e)=>new x({radius:.1,vel:e.scale(.003),pos:v(t,.05)})},S={stars:t=>new w({mass:5e-5,vel:new h(0,0),pos:v(t,.001)}),gases:t=>new y({vel:new h(0,0),pos:v(t,.001),radius:.005}),automata:t=>new g({radius:.006,vel:new h(0,0),pos:v(t,.001)}),networks:t=>new x({radius:.1,vel:new h(0,0),pos:v(t,.001)})};var M=class{constructor(t){this.state=t,this.mouse=new h(0,0),this.mouseHistory=Array.from({length:5},()=>new h(0,0)),this.pressing=!1,this.mode="stars",this.action="paint",this.paint=f,this.shoot=b,this.place=S,this.addEvents()}get pointer(){return h.direction(this.mouse,this.mouseHistory[0])}resetMouse(){this.pressed=!1}handleActions(){this.pressing&&this.continuousAction()}clickAction(){const{particles:t}=this.state;"place"===this.action&&t.push(this.place[this.mode](this.mouse))}continuousAction(){const{particles:t}=this.state;"place"!==this.action&&t.push(this[this.action][this.mode](this.mouse,this.pointer))}toggleWalls(){return this.state.wall=!this.state.wall,this.state.wall}addEvents(){const t=document.getElementById("option-buttons"),e=document.getElementById("mode-buttons"),s=document.querySelector("canvas");t.onclick=this.selectAction(),t.ontouchstart=this.selectAction(),e.onclick=this.selectMode(),e.ontouchstart=this.selectMode(),s.onmousedown=this.mouseDown(),s.ontouchstart=this.mouseDown(),document.onmousemove=this.mouseMove(),document.ontouchmove=this.mouseMove(),document.onmouseup=this.mouseUp(),document.ontouchend=this.mouseUp()}mouseDown(){return t=>{this.mouse.moveTo(t.clientX/window.innerWidth,t.clientY/window.innerHeight),this.pressing=!0}}mouseMove(){return t=>{t.preventDefault(),this.mouseHistory.shift(),this.mouseHistory.push(h.clone(this.mouse)),this.mouse.moveTo(t.clientX/window.innerWidth,t.clientY/window.innerHeight)}}mouseUp(){return()=>{this.pressing=!1,this.clickAction()}}selectMode(){return t=>{this.mode!==t.target.id&&(this.state.reset(),this.mode=t.target.id)}}selectAction(){return t=>{switch(t.target.id){case"reset":this.state.reset();break;default:this.action=t.target.id}}}};const k=(t,e)=>{for(let s=0;s<t.length;s+=1){const i=document.createElement("button");i.className="btn",i.id=t[s],i.innerText=t[s],document.getElementById(e).appendChild(i)}};var z=()=>{k(["paint","shoot","place","reset"],"option-buttons"),k(["stars","gases","networks","automata"],"mode-buttons")};const P=window.localStorage.getItem("dotsTutorial")||2,D=(t,e)=>document.getElementById(t).classList.add(e),I=(t,e)=>document.getElementById(t).classList.remove(e),T=t=>new Promise(e=>setTimeout(e,1e3*t));var A=async()=>{await T(0),I("title","hidden"),await T(3),D("title","hidden"),"0"!==P?(I("select-mode","hidden"),D("mode","top-peek"),document.querySelector(".mode").onclick=(async()=>{I("mode","top-peek"),D("select-mode","fade-out"),await T(.99),D("select-mode","hidden"),I("select-option","hidden"),D("option","right-peek"),document.querySelector(".option").onclick=(async()=>{I("option","right-peek"),D("select-option","fade-out"),await T(1),D("select-option","hidden"),I("enjoy","hidden"),await T(1),D("enjoy","fade-out"),await T(.49),D("enjoy","hidden"),D("welcome","hidden")})}),window.localStorage.setItem("dotsTutorial",P-1)):D("welcome","hidden")};var q=class{constructor(t=[]){this.particles=t,this.wall=!0}cleanup(){const t=this.particles.length;let e=0;for(let s=0;s<t;s+=1){const t=this.particles[s];t.protected&&(s!==e&&(this.particles[e]=t),e+=1)}this.particles.length=e}update(){const t=this.particles.length;this.calculateInteractions(t),this.updateParticles(t),this.wall&&this.walls(t)}updateParticles(t){for(let e=0;e<t;e+=1)this.particles[e].update()}calculateInteractions(t){for(let e=0;e<t;e+=1)for(let s=0;s<t;s+=1)e!==s&&this.particles[e].protected&&this.particles[e].interact(this.particles[s])}walls(t){for(let e=0;e<t;e+=1){const{pos:t,vel:s,size:i}=this.particles[e];(t.x+i>1||t.x-i<0)&&s.subtract(new h(s.x,0).scale(2)),(t.y+i>1||t.y-i<0)&&s.subtract(new h(0,s.y).scale(2))}}reset(){this.particles.length=0}};document.addEventListener("DOMContentLoaded",()=>{z(),A();const t=new q,e=new M(t),s=new a(t,e),i=()=>{window.requestAnimationFrame(i),s.reset(),s.render(),e.handleActions(),e.resetMouse(),t.update(),t.cleanup()};window.Vector=h,window.state=t,window.client=e,i()})}]);
//# sourceMappingURL=main.js.map