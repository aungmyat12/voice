let number = document.querySelectorAll(".number")
// let increaseBtn = document.querySelectorAll(".increaseBtn");
// let decreaseBtn = document.querySelector(".decreaseBtn");

let talkBtn = document.getElementById("talkBtn");
let tbody = document.querySelector('.tbody');

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

greetings = [
    "That is great choice",
    "You can order more",
    "Thanks for ordering",
    "That is good",
    "thanks and will you order more?"
];

response = [
    "I cannot record your voice Please cleaing voice again",
    "I don't know what you mean? Please try again later",
    "Your voice is not cleaning Please cleaning voice again"
]
const recognition = new SpeechRecognition();

recognition.onstart = () => {
    console.log("Voice is activated, you can to microphone");
}
let i = 1;
let count = 1;
recognition.onresult = event => {
    console.log(event);
    const current = event.resultIndex;
    let transcript = event.results[current][0].transcript;
    if (transcript === "orange juice" || transcript === "apple juice" || transcript === "pineapple juice" || transcript === "lemon juice" || transcript === "avocado juice" || transcript === "papaya juice" || transcript === "strawberry juice" || transcript === "watermelon juice" || transcript === "iced black tea" || transcript === "iced jasmine tea" || transcript === "iced lemon tea" || transcript === "iced lemon honey tea" || transcript === "milk" || transcript === "chocolate milk tea" || transcript === "strawberry milk tea" || transcript === "Peach black tea") {
        tbody.innerHTML += `
                <tr class="trow${i}">
                    <td>${i}</td>
                    <td>${transcript}</td>
                    <td class="number${i}">1</td>
                    <td class="increaseBtn" onclick="increaseNumber(${i})"><i class="fas fa-plus-circle"></i></td>
                    <td class="decreaseBtn" onclick="decreaseNumber(${i})"><i class="fas fa-minus-circle"></i></td>
                    <td class="deleteBtn" onclick="deleteList(${i})"><i class="delete fas fa-trash"></i></td>
                </tr>
            `;
        i++;
    }
    readOutLoud(transcript);
}
function increaseNumber(id) {

    document.querySelector(`.number${id}`).textContent++; 
    // console.log(document.querySelector(".number${id}"));
}
function decreaseNumber(id) {
    if (document.querySelector(`.number${id}`).textContent > 0) {
        document.querySelector(`.number${id}`).textContent--;
    }else{
        console.log("hi");
    }
    console.log(document.querySelector(`.number${id}`));
}

function deleteList(id){
    let current = document.querySelector(`.trow${id}`);
    current.classList.add('fall');
    // tbody.removeChild(current);
    current.addEventListener("transitionend",()=>{
        tbody.removeChild(current);
    })
    // current.addEventListener('transitionend',function(){
    //     tbody.removeChild(current);
    // })
    i -= 1;
}

talkBtn.addEventListener('click',function(){
    recognition.start();
});

function readOutLoud(message){
    let speech = new SpeechSynthesisUtterance();
    speech.text = response[Math.floor(Math.random() * response.length)];
    if (message.includes("orange juice") ||message.includes("apple juice") || message.includes("pineapple juice") || message.includes("lemon juice") || message.includes("avocado juice") || message.includes("papaya juice") || message.includes("strawberry juice") || message.includes("watermelon juice") || message.includes("iced black tea") || message.includes("iced jasmine tea") || message.includes("iced lemon tea") || message.includes("iced lemon honey tea") || message.includes("thai milk tea") || message.includes("milk") || message.includes("strawberry milk tea") || message.includes("Peach black tea")) {
        const finalText = greetings[Math.floor(Math.random() * greetings.length)];
        speech.text = finalText;
    } else if (message.includes("stop talking your voice")) {
        speech.text = "Yes, Ok Sir";
    }
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
}
