function checkAnswer() { //function initiated when user presses submit button
  document.getElementById('answerBox').disabled = true;
  document.getElementById('submitButton').disabled = true;
  document.getElementById('giveUpButton').disabled = true;
  document.getElementById('nextQuestion').style.display = "block";

  document.getElementById("success").style.display = "none";
  document.getElementById("failure").style.display = "none";
  document.getElementById("giveup").style.display = "none";
  guess = document.getElementById("answerBox").value; //take user input
  answer = questionAnswer; // this is the correct answer
  if (guess == answer) { // if the user's input is correct display the correct message
    document.getElementById("success").style.display = "block"; //display success message
    updateCredits(300);
  }
  else { //display incorrect answer message
    document.getElementById("failure").style.display = "block";
  }

  document.getElementById("solution").style.display = "block";


}

function giveUp() {
  document.getElementById('answerBox').disabled = true;
  document.getElementById('submitButton').disabled = true;
  document.getElementById('giveUpButton').disabled = true;
  document.getElementById('nextQuestion').style.display = "block";

  document.getElementById("success").style.display = "none";
  document.getElementById("failure").style.display = "none";
  document.getElementById("giveup").style.display = "block";
  document.getElementById("solution").style.display = "block";
}


function summonPage(content) {
  console.log(content);
  window.location.replace("exercisemodule.html");
  document.cookie = content;
}

function displayContent() {
  let topic = document.cookie;
  console.log(topic);
  document.getElementById("topicHeader").innerHTML = topic;
  document.cookie = "";
  nextQuestion(topic);
}

function updateCredits(newCredits) {
  //update session storage
  let userData = JSON.parse(sessionStorage.getItem('user'));
  userData.credits = userData.credits + newCredits;
  sessionStorage.setItem('user', JSON.stringify(userData));

  //update database
  console.log(userData.credits);
  const http = new XMLHttpRequest();
  const url = "http://localhost:8081/exercisemodule"
  http.open("POST", url, true);
  http.setRequestHeader('Content-Type', 'application/json');
  console.log(userData)
  http.send(JSON.stringify(userData));
}

function nextQuestion(value) {
  const url = "http://localhost:8081/module"
  var temp = {
    topic: value
  }
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(temp),
    headers: { "Content-type": "application/json" }
  }).then(response => response.json())
    .then(data => displayQuestion(data))
}


let isFirstTime = true;
var a = 0;
function displayQuestion(val) {
  //assume that there will always be questions available
  console.log(val);
  if (isFirstTime) {
    var a = val[Math.floor(Math.random() * val.length)];
    isFirstTime = false;
    console.log(a);
  }
  else {
    var a = val[Math.floor(Math.random() * val.length)];
    console.log(a);
    while (a.question == document.getElementById("questionQuestion").innerHTML) {
      a = val[Math.floor(Math.random() * val.length)];
      console.log(a);
    }
  }
  questionAnswer = a.answer;

  //clean up and change question
  document.getElementById("questionTitle").innerHTML = a.title;
  document.getElementById("questionQuestion").innerHTML = a.question;
  document.getElementById("questionSolution").innerHTML = a.solution;
  document.getElementById('answerBox').disabled = false;
  document.getElementById('submitButton').disabled = false;
  document.getElementById('giveUpButton').disabled = false;
  document.getElementById('nextQuestion').style.display = "none";

  document.getElementById("success").style.display = "none";
  document.getElementById("failure").style.display = "none";
  document.getElementById("giveup").style.display = "none";
  document.getElementById("solution").style.display = "none";
}




document.getElementById("nextQuestion").addEventListener("click", function (e) {
  let topic = document.cookie;
  document.cookie = "";
  nextQuestion(topic);

})