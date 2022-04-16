
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

function sendQuestion() {
  const http = new XMLHttpRequest();
  let url = "localhost:3000/addQuestion";
  http.open("GET", url, true);
  http.setRequestHeader("Content-Type", "application/json");
  let data = JSON.stringify(sampleQuestion);
  http.send();
}

function getQuestion() {

}

function appendQuestion() {
  let questionContainer = document.getElementById("questionContainer");
  let newQuestion = document.createElement("div");
  newQuestion.innerHTML = sampleQuestion.question;
  questionContainer.appendChild(newQuestion);
}

appendQuestion();

function checkAnswer() { //function initiated when user presses submit button
  document.getElementById("success").style.display = "none";
  document.getElementById("failure").style.display = "none";
  document.getElementById("giveup").style.display = "none";
  guess = document.getElementById("answerBox").value; //take user input
  answer = 2; // this is the correct answer
  if (guess == answer) { // if the user's input is correct display the correct message
    document.getElementById("success").style.display = "block"; //display success message
  }
  else { //display incorrect answer message
    document.getElementById("failure").style.display = "block";
  }

  document.getElementById("solution").style.display = "block";


}

function giveUp() {
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
