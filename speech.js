start_recording = document.getElementById('start_recording');
start_recording.addEventListener('click', () => {

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
        var convertText = document.getElementById('convert_text');
        convertText.innerHTML = transcript;
        console.log(transcript);

    })
    
    if(speech === true){
        recognition.start();
    }
}
)

document.getElementById("openPopup").addEventListener("click", function() {
    document.getElementById("popup").style.display = "block";
});

document.getElementsByClassName("close")[0].addEventListener("click", function() {
    document.getElementById("popup").style.display = "none";
});


function sendMessage(){
    const mainDiv = document.getElementById('client-message');
    var cloneDiv = mainDiv.cloneNode(true);
    cloneDiv.innerHTML = document.getElementById('convert_text').value;
    document.getElementById('convert_text').value = '';
    document.getElementById('chat-history').appendChild(cloneDiv);

}