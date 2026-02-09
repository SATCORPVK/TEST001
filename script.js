const lines = [
"SATCORP INTERFACE",
"Initializing operator environment...",
"Loading modules...",
"Brand Systems — OK",
"Web Systems — OK",
"Workflow Architecture — OK",
"Creative Technology — OK",
"Broadcast Systems — OK",
"World Design — OK",
"Secure channel established"
];

const bootText = document.getElementById("bootText");
const bootBar = document.getElementById("bootBar");
const interfaceEl = document.getElementById("interface");

let i = 0;

function typeLine(){
    if(i < lines.length){
        bootText.innerHTML += lines[i] + "<br>";
        bootBar.style.width = ((i+1)/lines.length*100) + "%";
        i++;
        setTimeout(typeLine, 400);
    } else {
        setTimeout(()=>{
            document.getElementById("boot").style.display="none";
            interfaceEl.classList.remove("hidden");
            gsap.from(".panel", {opacity:0, y:40, stagger:.15, duration:1});
        },600);
    }
}

typeLine();
