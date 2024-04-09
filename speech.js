start_recording.addEventListener('click', function() {

    const language = document.getElementById('language').value;
    var speech = true;
    window.SpeechRecognition = window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interiemResults = true;
    recognition.lang = language;

    recognition.addEventListener('result', e=> {
        const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        convert_text.innerHTML = transcript;
        console.log(transcript);

    })
    if(speech === true){
        recognition.start();
    }
}
)