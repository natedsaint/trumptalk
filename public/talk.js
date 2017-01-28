var xhr = new XMLHttpRequest();
var question;
var talkBox = document.querySelector(".talkBox");
var trumpatar = document.querySelector(".trumpatar");
var timer;
var id = 0;

function askQuestion() {
  question = document.querySelector(".userQuestion").value;
  if (!question) {
    return;
  }
  document.querySelector(".userQuestion").value = '';
  xhr.onreadystatechange = handleResponse;
  xhr.open('GET','/ask?q=' + question);
  xhr.send();
}

function handleResponse(res) {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    id++;
    var res = JSON.parse(xhr.responseText);
    var answer = res.answer.response;
    var mood = res.answer.mood;
    
    if (!answer) {
      answer = JSON.parse(xhr.responseText).error;
    }
    talkBox.innerHTML += '<div id="question-' + id + '" class="question"> ' + question +  '</div>';
    talkBox.innerHTML += '<div id="answer-' + id + '" class="answer"> ' + answer + '</div>';
    trumpatar.classList.add("talking");
    if (mood) {
      trumpatar.classList.add(mood);
    }    
    clearTimeout(timer);
    timer = setTimeout(stopTalking,5000);
    talkBox.scrollTop = talkBox.scrollHeight;
    document.querySelector("#question-"+id).classList.add("visible");
    document.querySelector("#answer-"+id).classList.add("visible");
  }
}

function stopTalking() {
  trumpatar.classList.remove("talking");
  trumpatar.classList.remove("kompromat");
  trumpatar.classList.remove("angry");
  trumpatar.classList.remove("smug");
}

function keyPress(event) {
  var key = event.keyCode;
  if (key === 13) {
    askQuestion();
    event.stopPropagation();
    return false;
  }
}

document.querySelector("button.ask").addEventListener("click",askQuestion);

document.querySelector(".userQuestion").addEventListener("keyup",keyPress);
