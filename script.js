let pages = [];
let current = 0;

let voiceEnabled = true;

fetch("chapters.json")
    .then(res => res.json())
    .then(data => {
        pages = data.chapters;
        render();
    });

function speak(text) {
    if (!voiceEnabled) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
        utterance.voice = voices[0];
    }

    window.speechSynthesis.speak(utterance);
}

function render() {
    const content = pages[current];

    const title = content.split("\n")[0];
    const body = content.split("\n").slice(1).join("<br><br>");

    document.getElementById("page").innerHTML =
        `<h1>${title}</h1>
         <div>${body}</div>
         <div class="page-number">Page ${current + 1} of ${pages.length}</div>`;

    speak(content);
}

function nextPage() {
    if (current < pages.length - 1) {
        current++;
        render();
    }
}

function prevPage() {
    if (current > 0) {
        current--;
        render();
    }
}

function toggleVoice() {
    voiceEnabled = !voiceEnabled;

    if (!voiceEnabled) {
        window.speechSynthesis.cancel();
    } else {
        speak(pages[current]);
    }
}
