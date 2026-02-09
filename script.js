const bootLines = [
  "INITIALIZING SATCORP NODE",
  "AUTHENTICATING USER",
  "LOADING OPERATOR PROFILE: ANU",
  "MOUNTING MODULES",
  "SYSTEM READY"
];

const bootLog = document.getElementById("boot-log");
const system = document.getElementById("system");

let i = 0;
function bootSequence() {
  if (i < bootLines.length) {
    bootLog.textContent += bootLines[i] + "\n";
    i++;
    setTimeout(bootSequence, 600);
  } else {
    setTimeout(() => {
      document.getElementById("boot").style.display = "none";
      system.classList.remove("hidden");
    }, 800);
  }
}
bootSequence();

const capData = {
  strategy: "Operational foresight, systemic planning, long-range architecture.",
  identity: "Identity as infrastructure, not branding.",
  experience: "Designing user flow as executable logic.",
  interface: "Interfaces as instruments, not decoration.",
  automation: "Reducing friction through intelligent systems.",
  creative: "Direction rooted in intent, not trend."
};

document.querySelectorAll(".capabilities li").forEach(li => {
  li.onclick = () => {
    document.getElementById("cap-detail").textContent =
      capData[li.dataset.expand];
  };
});

const netData = {
  "ANU·Ki-Ra Studios": "Primary creative intelligence node.",
  "KYRAX": "Systems research and speculative engineering.",
  "PULSΞ": "Signal, rhythm, and interaction core.",
  "SCOPU": "Observation, analysis, reconnaissance."
};

document.querySelectorAll(".nodes div").forEach(n => {
  n.onclick = () => {
    document.getElementById("net-detail").textContent =
      netData[n.dataset.node];
  };
});

const methodData = {
  Observe: "Deep observation of context and signal.",
  Decode: "Extracting patterns and meaning.",
  Architect: "Designing the system structure.",
  Construct: "Executing with precision.",
  Deploy: "Releasing into operation.",
  Evolve: "Continuous adaptation."
};

document.querySelectorAll(".steps span").forEach(s => {
  s.onclick = () => {
    document.getElementById("method-detail").textContent =
      methodData[s.dataset.step];
  };
});

const input = document.getElementById("console-input");
const output = document.getElementById("console-output");

input.addEventListener("keydown", e => {
  if (e.key === "Enter" && input.value.trim()) {
    output.textContent += "> " + input.value + "\n";
    output.textContent +=
      "Transmission received. SATCORP will evaluate compatibility.\n";
    input.value = "";
  }
});
