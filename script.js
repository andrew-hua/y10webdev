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
    if (sessionStorage.getItem('user') != null) {
      updateCredits(300);
      addSkill(document.getElementById("topicHeader").innerHTML);
    }
  }
  else { //display incorrect answer message
    document.getElementById("failure").style.display = "block";
    if (sessionStorage.getItem('user') != null) {
      subSkill(document.getElementById("topicHeader").innerHTML);
    }
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
  if (sessionStorage.getItem('user') != null) {
    subSkill(document.getElementById("topicHeader").innerHTML);
  }
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
  const url = "https://etutor1.herokuapp.com/exercisemodule"
  http.open("POST", url, true);
  http.setRequestHeader('Content-Type', 'application/json');
  console.log(userData)
  http.send(JSON.stringify(userData));
}

const topics = [
  "Arithmetic",
  "Fractions, Decimals, and Percents",
  "Math with Money",
  "Integers",
  "Perfects Squares and Square Roots",
  "The Metric System",
  "Data Analysis",
  "Probability",
  "2D Geometry",
  "Proportions",
  "Algebra",
  "Simple and Compound Interest",
  "The Coordinate System",
  "More Advanced Algebra",
  "More Advanced Geometry",
  "Problem Solving Techniques",
  "Tips for the Math Kangaroo",
  "Tips for the AMC contest series",
  "Trigonometry",
  "Quadratics"
]
function addSkill(skill) {
  console.log(skill);
  let userData = JSON.parse(sessionStorage.getItem('user'));

  //update session storage
  console.log(userData);
  console.log(userData.skill_list);
  userData.skill_list[topics.indexOf(skill)] = userData.skill_list[topics.indexOf(skill)] + 1;
  sessionStorage.setItem('user', JSON.stringify(userData));

  //update database
  const http = new XMLHttpRequest();
  const url = "https://etutor1.herokuapp.com/addskill"
  http.open("POST", url, true);
  http.setRequestHeader('Content-Type', 'application/json');
  console.log(userData)
  http.send(JSON.stringify(userData));
}

function subSkill(skill) {
  console.log(skill);
  let userData = JSON.parse(sessionStorage.getItem('user'));

  //update session storage
  console.log(userData);
  console.log(userData.skill_list);
  userData.skill_list[topics.indexOf(skill)] = userData.skill_list[topics.indexOf(skill)] - 1;
  sessionStorage.setItem('user', JSON.stringify(userData));

  //update database
  const http = new XMLHttpRequest();
  const url = "https://etutor1.herokuapp.com/subskill"
  http.open("POST", url, true);
  http.setRequestHeader('Content-Type', 'application/json');
  console.log(userData)
  http.send(JSON.stringify(userData));
}




function nextQuestion(value) {
  if (sessionStorage.getItem('personalizedQuestions') == null) {
    const url = "https://etutor1.herokuapp.com/module"
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
  //there are personalized questions available, do not show default topic questions
  else {
    personalizedQuestions = JSON.parse(sessionStorage.getItem('personalizedQuestions'));
    console.log(personalizedQuestions);
    for (var i = 0; i < personalizedQuestions.length; i++) {
      console.log(personalizedQuestions[i]);
    }
    displayQuestion(personalizedQuestions);
  }
}


let isFirstTime = true;
var a = 0;
function displayQuestion(val) {
  //assume that there will always be questions available
  console.log(val);
  //ensure that the question is not repeated
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
  document.getElementById("topicHeader").innerHTML = a.topic;
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

function confirmUser() {
  let user = sessionStorage.getItem('user');
  console.log(user);
  if (user != null) {
    document.getElementById('signup').style.display = 'none';
    document.getElementById('login').style.display = 'none';
    document.getElementById('logout').style.display = 'block';

    var myUser = JSON.parse(sessionStorage.getItem('user'));
    var fname = myUser.firstname;

    document.getElementById('welcome').innerHTML = "Welcome, " + fname;
    document.getElementById('welcome').style.display = 'inline';
  } else {
    document.getElementById('signup').style.display = 'inline';
    document.getElementById('login').style.display = 'inline';
    document.getElementById('logout').style.display = 'none';
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('welcome').innerHTML = "";
  }
}

function userLogout() {
  sessionStorage.clear();
  document.getElementById('signup').style.display = 'inline';
  document.getElementById('login').style.display = 'inline';
  document.getElementById('logout').style.display = 'none';
  document.getElementById('welcome').style.display = 'none';
  document.getElementById('welcome').innerHTML = "";
}

function notSignedIn() {
  console.log(sessionStorage.getItem('user'));
  if(sessionStorage.getItem('user') == null ){
    document.getElementById('signInWarning').style.display = 'block';
  }
}
notSignedIn();


document.getElementById("nextQuestion").addEventListener("click", function (e) {
  let topic = document.cookie;
  document.cookie = "";
  nextQuestion(topic);

})