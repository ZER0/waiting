import { setMessage, setWaiting, button, label } from "./ui.js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const once = (el, eventName) =>
  new Promise((resolve) =>
    el.addEventListener(eventName, resolve, { once: true })
  );

const audioElement = new Audio("vivaldi.mp3");
audioElement.loop = true;
audioElement.volume = 0.5;

let events = [once(audioElement, "loadeddata")];
if (speechSynthesis.getVoices().length === 0) {
  events.push(once(speechSynthesis, "voiceschanged"));
}

await Promise.all(events);

const voices = speechSynthesis.getVoices();
let voice = voices.find((voice) => voice.lang === "it-IT");
await delay(250);

document.querySelector("main").classList.add("fade-up-in");

async function start() {
  let i = 0;
  while (true) {
    let line = lines[i];
    i = (i + 1) % lines.length;

    await delay(4000);
    setWaiting(line);
    let ssu = new SpeechSynthesisUtterance(line);
    ssu.voice = voice;
    speechSynthesis.speak(ssu);
    await once(ssu, "end");
  }
}

button.addEventListener("click", async () => {
  audioElement.play();
  setWaiting("");
  start();
});

const lines = [
  "Siete in attesa di essere collegati con ZERO, si prega di non riagganciare, per non perdere la priorità acquisita.",
  "Nel mentre, fai qualcosa di costruttivo.",
  "Come giocare a squash.",
  "O lava la tua macchina.",
  "O prepara la cena.",
  "O prendi parte a una banda funky.",
  "O viaggia in un paese straniero.",
  "O diventa Presidente Della Repubblica.",
  "O parla ad un membro del sesso opposto.",
  "O lubrifica la tua macchina.",
  "O prepara un wurstel fritto.",
  "O cerca un tesoro sepolto.",
  "O mungi una mucca.",
  "O fai una gara di abbaiate con il cane del tuo vicino",
  "O effettua un'operazione al cervello.",
  "O dipingi una linea gialla in mezzo alla tua strada d'accesso privata.",
  "O scrivi il tuo nome nella neve.",
  "O insegna pallacanestro acquatico alle vongole.",
  "O canta le canzoni di Lucio Dalla in banca.",
  "O pianta alberi sul suolo pubblico.",
  "O confondi la persona accanto a te.",
  "O costruisci un tavolo triangolare.",
  "O trotta, balzella e salta.",
  "O cavalca un treno.",
  "O organizza il tuo cassetto delle calze in ordine alfabetico.",
  "O vai a giocare a Bowling con tua mamma.",
  "O addestra gli insetti a fare scherzi.",
  "O fai una trapunta.",
  "O pubblica una rivista sui trucioli delle matite.",
  "O mangia gelatina al limone con ananas.",
  "O asfalta un'autostrada.",
  "O impara a disegnare.",
  "O iscriviti a fotografia.",
  "O impara a parlare greco antico.",
  "O fotocopia denaro.",
  "O esci a mangiare la pasta.",
  "O cuci un vestito.",
  "O lava il tuo iguana.",
  "O vai a pesca.",
  "O dipingi la casa di uno sconosciuto di notte.",
  "O iscriviti a windsurf.",
  "O cambia lo stile dei tuoi capelli.",
  "O affila i tuoi gessetti.",
  "O dai da mangiare ad un tucano.",
  "O goditi il sole.",
  "O fai delle parole incrociate.",
  "O compra dei bei vestiti.",
  "O vai alla spiaggia.",
  "O gioca a cricket con tuo padre.",
  "O innaffia le tue piante.",
  "O costruisci una casa per le bambole.",
  "O organizza una cena con salmone e vino bianco.",
  "Ricominciamo!",
];
//
