const wrapper = document.querySelector(".wrapper"),
searchInput = wrapper.querySelector("input"),
infoText = wrapper.querySelector(".info-text");
volumeIcon = wrapper.querySelector(".word i"),
removeIcon = wrapper.querySelector(".search span");
let audio;
var computerWord=0;
var runningScore=0;
var round = 1;
var fakeRound = 0;

function computerWordLength() {
    computerWord = Math.round(Math.random() * 9) + 1;

}

function data(result, word) {
    if(result.title){
        infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please enter a valid word.`;
        if (wrapper.classList.contains("active")) {
        // pass the particiular response data to a particular html element
        document.querySelector(".word p").innerText = "Number of Letters: "
        document.querySelector(".word span").innerText = 0;
        // document.querySelector(".word span").innerText = phonetics;
        document.querySelector(".meaning span").innerText = `Can't find the meaning of "${word}". Please enter a valid word.`;
        // document.querySelector(".example span").innerText = definitions.example;
        computerWordLength();
        document.querySelector(".answer span").innerText = computerWord;
        runningScore = runningScore - computerWord;
        if (runningScore > 0) {
        document.querySelector(".user span").innerText = "You are winning by " + runningScore + " (" + runningScore + ")";
        } else if (runningScore < 0) {
        document.querySelector(".user span").innerText = "You are losing by " + (-runningScore) + " (" + runningScore + ")";    
        } else {
        document.querySelector(".user span").innerText = "You are tied at " + (0);    
        }
        if (fakeRound == 5) {
            document.querySelector(".rounds span").innerText = fakeRound + "/5 (Enter in any word for result or remove/add a letter from existing word)";
            } else {
                document.querySelector(".rounds span").innerText = fakeRound + "/5";
            }
        }
    }else {
        console.log(result);
        wrapper.classList.add("active");
        let definitions = result[0].meanings[0].definitions[0],
        phonetics = `${result[0].meanings[0].partOfSpeech} /${result[0].phonetics[0].text}/`;

        // pass the particiular response data to a particular html element
        document.querySelector(".word p").innerText = "Number of Letters: "
        document.querySelector(".word span").innerText = result[0].word.length;
        // document.querySelector(".word span").innerText = phonetics;
        document.querySelector(".meaning span").innerText = definitions.definition;
        // document.querySelector(".example span").innerText = definitions.example;
        computerWordLength();
        document.querySelector(".answer span").innerText = computerWord;
        runningScore = runningScore + word.length - computerWord;
        if (runningScore > 0) {
            document.querySelector(".user span").innerText = "You are winning by " + runningScore + " (" + runningScore + ")";
            } else if (runningScore < 0) {
            document.querySelector(".user span").innerText = "You are losing by " + (-runningScore) + " (" + runningScore + ")";    
            } else {
            document.querySelector(".user span").innerText = "You are tied at " + (0);    
            }
        if (fakeRound == 5) {
        document.querySelector(".rounds span").innerText = fakeRound + "/5 (Enter in any word for result or remove/add a letter from existing word)";
        } else {
            document.querySelector(".rounds span").innerText = fakeRound + "/5";
        }
    }
}
function winOrLose() {
    if (runningScore > 0) {
        if (wrapper.classList.contains("active")) {
            wrapper.classList.remove("active");
    }
    infoText.innerHTML = "WIN  (Final Score: " + runningScore + ")";
} else if (runningScore < 0) {
    if (wrapper.classList.contains("active")) {
        wrapper.classList.remove("active");
}
infoText.innerHTML = "LOSE  (Final Score: " + runningScore + ")";
} else {
    if (wrapper.classList.contains("active")) {
        wrapper.classList.remove("active");
}
infoText.innerHTML = "TIE (Final Score: " + runningScore + ")";
}
}

/* fetch api function */
function fetchApi(word){
    infoText.style.color = "#000";
    infoText.innerHTML = `Checking the word <span>"${word}"</span>`;
    let url =  `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(url).then(res => res.json()).then(result => data(result, word));
}
var playAgain = true;
searchInput.addEventListener("keyup", e=>{
    if (playAgain) {
        if (round == 6) {
            winOrLose();
            playAgain = false;
        } else if(e.key === "Enter" && e.target.value){
           fetchApi(e.target.value);
           round++;
           fakeRound++;
        }
    }
});

removeIcon.addEventListener("click", ()=>{
    searchInput.value = "";
    searchInput.focus();
});