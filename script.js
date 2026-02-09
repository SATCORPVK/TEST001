const SYSTEM = { awareness:0, scrollLocked:true, activeNode:null, idleTime:0, terminalState:"ACCESS UNCERTAIN" };
const nodes = document.querySelectorAll(".node.capability");

// Boot sequence
gsap.to(".node-boot", { opacity:1, duration:2, delay:0.6, onComplete:()=>{
  SYSTEM.awareness=1; unlockScroll(); gsap.to(".channel",{opacity:1,duration:1.6,delay:0.6});
}});

// Scroll control
let scrollIndex=0;
function lockScroll(){SYSTEM.scrollLocked=true;document.body.style.overflow="hidden";}
function unlockScroll(){SYSTEM.scrollLocked=false;}
lockScroll();
window.addEventListener("wheel", e=>{
  if(SYSTEM.scrollLocked){e.preventDefault();return;}
  SYSTEM.scrollLocked=true;
  scrollIndex=Math.min(scrollIndex+1,nodes.length-1);
  focusNode(nodes[scrollIndex]);
});

// Node focus
function focusNode(node){
  nodes.forEach(n=>n.classList.remove("active"));
  SYSTEM.activeNode=node;
  node.classList.add("active");
  gsap.to(node.querySelector(".latent"),{opacity:1,y:0,duration:1.2});
  setTimeout(()=>{SYSTEM.scrollLocked=false;},1200);
}

// Alien proximity engine
document.addEventListener("mousemove", e=>{
  nodes.forEach(node=>{
    const rect=node.getBoundingClientRect();
    const distance=Math.abs(e.clientY-rect.top);
    if(distance<120){node.classList.add("active");gsap.to(node.querySelector(".latent"),{opacity:1,y:0,duration:0.8});}
    else if(node!==SYSTEM.activeNode){node.classList.remove("active");gsap.to(node.querySelector(".latent"),{opacity:0,y:12,duration:0.8});}
  });
});

// Idle entropy
let idleTimer;
function resetIdle(){SYSTEM.idleTime=0; clearInterval(idleTimer); idleTimer=setInterval(()=>{
  SYSTEM.idleTime++;
  if(SYSTEM.idleTime>6){nodes.forEach(n=>{if(n!==SYSTEM.activeNode)gsap.to(n,{opacity:0.08,duration:1.6});});
}},1000);}
["mousemove","wheel","keydown"].forEach(evt=>document.addEventListener(evt,resetIdle));

// Terminal
const terminal=document.getElementById("terminal");
const input=terminal.querySelector("input");
const stateLabel=terminal.querySelector(".state");
const output=terminal.querySelector(".terminal-output");

gsap.to("#terminal",{opacity:1,duration:1.6,delay:4});

const states=["ACCESS UNCERTAIN","COMPATIBILITY UNKNOWN","REQUEST UNDER REVIEW","OPERATOR RESPONSE PENDING","CHANNEL ACCEPTED"];
let stateIndex=0;
const stateInterval=setInterval(()=>{
  stateIndex++;
  if(stateIndex<states.length){stateLabel.textContent=states[stateIndex];}
  if(states[stateIndex]==="CHANNEL ACCEPTED"){
    terminal.querySelector(".terminal-input").classList.remove("locked");
    input.tabIndex=0; input.focus();
    clearInterval(stateInterval);
  }
},1800);

input.addEventListener("keydown", e=>{
  if(e.key==="Enter"){e.preventDefault();transmit(input.value);}
});

function transmit(value){
  input.value="";
  terminal.querySelector(".terminal-input").classList.add("locked");
  const responses=["COMPATIBILITY UNKNOWN","REQUEST UNDER REVIEW","OPERATOR RESPONSE PENDING","CHANNEL ACCEPTED"];
  const response=responses[Math.floor(Math.random()*responses.length)];
  const id="SC-"+Math.floor(Math.random()*90000+10000);
  let index=0;
  output.innerHTML="";
  const chars=response.split("");
  const typeInterval=setInterval(()=>{
    output.innerHTML+=chars[index];
    index++;
    if(index>=chars.length){clearInterval(typeInterval); output.innerHTML+="\nID: "+id+"\nTIMESTAMP: "+new Date().toISOString();}
  },60);
}
