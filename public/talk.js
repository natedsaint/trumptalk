var xhr = new XMLHttpRequest();
var question;
var talkBox = document.querySelector(".talkBox");
var trumpatar = document.querySelector(".trumpatar");
var timer;

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
    var answer = JSON.parse(xhr.responseText).answer;
    if (!answer) {
      answer = JSON.parse(xhr.responseText).error;
    }
    talkBox.innerHTML += '<div class="question"> ' + question +  '</div>';
    talkBox.innerHTML += '<div class="answer"> ' + answer + '</div>';
    trumpatar.classList.add("talking");
    clearTimeout(timer);
    timer = setTimeout(stopTalking,5000);
    talkBox.scrollTop = talkBox.scrollHeight;
  }
}

function stopTalking() {
  trumpatar.classList.remove("talking");
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
