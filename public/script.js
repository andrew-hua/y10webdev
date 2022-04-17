
class exercise {
  constructor(question, solution) {
    this.question = question;
    this.solution = solution;
    this.successCount = 0;
    this.failureCount = 0;
  }

  getSuccessRate() {
    if (this.failureCount == 0) {
      return;
    }
    return this.successCount / (this.successCount + this.failureCount);
  }
}

// easy arithmetic class of questions
class arithmeticEasy extends exercise {
  constructor(a, b, operation) {
    this.a = a;
    this.b = b;
  }

  formula() {
    if (operation == '*') {
      return this.a * this.b;
    } else if (operation == '+') {
      return this.a + this.b;
    } else if (operation == '-') {
      return this.a - this.b;
    } else if (operation == '/') {
      return this.a / this.b;
    }
  }

  checkAnswer(result) {
    if (result == this.formula()) {
      this.successCount = this.successCount + 1;
      return true;
    }
    this.failureCount = this.failureCount + 1;
    return false;
  }
}

var sampleQuestion = new exercise(
  "This is a sample question",
  "This is a sample answer"
)

function getQuestion() {

}

// function appendQuestion() {
//   let questionContainer = document.getElementById("questionContainer");
//   let newQuestion = document.createElement("div");
//   newQuestion.innerHTML = sampleQuestion.question;
//   questionContainer.appendChild(newQuestion);
// }


function checkAnswer() { //function initiated when user presses submit button
  document.getElementById('answerBox').disabled = true;
  document.getElementById('submitButton').disabled = true;
  document.getElementById('giveUpButton').disabled = true;
  document.getElementById('nextQuestion').style.display = "block";

  document.getElementById("success").style.display = "none";
  document.getElementById("failure").style.display = "none";
  document.getElementById("giveup").style.display = "none";
  guess = document.getElementById("answerBox").value; //take user input
  answer = 2; // this is the correct answer
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


function updateCredits(newCredits){
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
    headers: {"Content-type": "application/json"}
  }).then(response => response.json())
  .then(data => displayQuestion(data))
}

function displayQuestion(val){
  //assume that there will always be questions available
  console.log(val);
  var a = val[Math.floor(Math.random() * val.length)];
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




document.getElementById("nextQuestion").addEventListener("click", function(e) { 
  nextQuestion("Integers");

})