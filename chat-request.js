//display the message in the chat box sent by user
function displayMessage() {
    const message = document.getElementById("chat-input").value;
    var div = document.createElement("div");
    div.id = 'user-message';
    div.innerHTML = message;
    document.getElementById("chat-content").appendChild(div);
    document.getElementById("chat-input").value = "";
    response(message);
    
}

function response(query) {
    const PossibleResponse = {
        "hi": "Hello! How can I help you?",
        "hello": "Hello! How can I help you?",
        "how are you": "I am good! How can I help you?",
        "what is your name": "I am a chatbot! How can I help you?",
        "what is your age": "I am a chatbot! How can I help you?",
    };
    if(query === "") {
        var div = document.createElement("div");
        div.id = 'chat-message';
        div.innerHTML = "దయచేసి మీ ప్రశ్నను ఇక్కడ టైప్ చేయండి.";
        document.getElementById("chat-content").appendChild(div);
        return;
    }
    if(PossibleResponse[query] === undefined){
        fetch('/translate',{
            method : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({message: query})
        }).then(response => {
            if(!response.ok){
                return "సర్వర్ ఆఫ్‌లైన్‌లో ఉంది! దయచేసి తర్వాత మళ్లీ ప్రయత్నించండి.";
            }
            else{
                return response.text();
            }
        }).then(data => {
            var div = document.createElement("div");
            div.id = 'chat-message';
            div.innerHTML = data;
            document.getElementById("chat-content").appendChild(div);
        })
    }
    else{
        var div = document.createElement("div");
        div.id = 'chat-message';
        div.innerHTML = PossibleResponse[query];
        document.getElementById("chat-content").appendChild(div);
    }
    console.log(PossibleResponse[query]);
}

record.addEventListener('click', function() {
    var speech = true;
    window.SpeechRecognition = window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interiemResults = true;
    recognition.lang = document.getElementById('language-record').value;
    console.log(recognition.lang);
    recognition.continuous = true;

    const sendbutton = document.getElementById('send-button');
    sendbutton.addEventListener('click', function() {
        speech = false;
        recognition.stop();
    })


    recognition.addEventListener('result', e=> {
        const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        document.getElementById('chat-input').value = transcript;
        console.log(transcript);

    })
    if(speech === true){
        recognition.start();
    }
}
)