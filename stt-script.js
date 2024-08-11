// Use the SpeechRecognition interface from the Web Speech API
// Some browsers use webkitSpeechRecognition as a fallback
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// Create a new instance of the SpeechRecognition object
let recognition = new SpeechRecognition();

// Configure the recognition to provide interim results
// interimResults = true means it will show results as the user speaks
recognition.interimResults = true;

// Set the recognition language to English (United States)
recognition.lang = 'en-US';

// Get references to the textarea and button elements from the DOM
let textarea = document.querySelector("textarea");
let button = document.querySelector("button");

// Add an event listener to the button to start speech recognition when clicked
button.addEventListener("click", () => {
    // Start the speech recognition service
    recognition.start();
    textarea.value = ''; // Clear the textarea when starting new recognition
});

// Add an event listener to handle the results of the speech recognition
recognition.addEventListener("result", (e) => {
    // Extract the transcript from the recognition result event
    // The result event provides a list of SpeechRecognitionResult objects
    let transcript = Array.from(e.results)
        .map(result => result[0]) // Get the SpeechRecognitionAlternative from each result
        .map(result => result.transcript) // Get the transcript text
        .join(''); // Join the transcripts into a single string

    // Update the value of the textarea with the transcript
    textarea.value = transcript;
});

// Add an event listener to handle the end of the speech recognition
recognition.addEventListener("end", () => {
    // Stop the speech recognition service
    recognition.stop();
});

// Back button event listener
document.getElementById('back-btn').addEventListener('click', () => {
    window.location.href = 'index.html';
});
