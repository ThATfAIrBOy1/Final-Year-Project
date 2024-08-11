let speech = new SpeechSynthesisUtterance();
let voices = [];

// Get references to the select element and button from the DOM
let voiceSelect = document.querySelector("select");
let button = document.querySelector("button");

// Function to populate the select element with available voices
function populateVoiceList() {
    voices = window.speechSynthesis.getVoices();

    // Clear the existing options
    voiceSelect.innerHTML = '';

    voices.forEach((voice, i) => {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });
}

// Event listener for voice selection change
voiceSelect.addEventListener('change', () => {
    speech.voice = voices[voiceSelect.value];
});

// Load voices and populate the select element when they are changed
window.speechSynthesis.onvoiceschanged = () => {
    populateVoiceList();
};

// Event listener for the button click to speak the text
button.addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    
    // Stop any ongoing speech synthesis to avoid overlapping voices
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }

    // Speak the text after a short delay to ensure voices are loaded
    setTimeout(() => {
        window.speechSynthesis.speak(speech);
    }, 100);
});

// Initial population of voice list
populateVoiceList();

// Back button event listener
document.getElementById('back-btn').addEventListener('click', () => {
    window.location.href = 'index.html';
});
