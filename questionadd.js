function sendQuestion() {
    // user not logged in
    if (sessionStorage.getItem('user') == null) {
        document.getElementById('failureSignIn').style.display = 'block';
        return;
    }
    //unauthorized user
    if(JSON.parse(sessionStorage.getItem('user')).email != "andrew.hua@ucc.on.ca") {
        document.getElementById('unauthorized').style.display = 'block';
        console.log("hello");
        return;
    }

    const http = new XMLHttpRequest();
    const url = "https://etutor1.herokuapp.com/addquestion"

    var topic = document.getElementById("selectTopic").value;
    var title = document.getElementById("questionTitle").value;
    var question = document.getElementById("question").value;
    var answer = document.getElementById("answer").value;
    var solution = document.getElementById("solution").value;

    // any fields invalid
    if (topic == "Choose topic" || title == "" || question == "" || answer == "" || solution == "") {
        document.getElementById('failureSend').style.display = 'block';
        return;
    }

    var newQuestion = {
        topic: topic,
        title: title,
        question: question,
        answer: answer,
        solution: solution
    }
    http.open("POST", url, true);
    http.setRequestHeader('Content-Type', 'application/json');
    console.log(newQuestion)
    document.getElementById('successSend').style.display = 'block';
    console.log(JSON.stringify(newQuestion));
    http.send(JSON.stringify(newQuestion));
    console.log(newQuestion)
}


document.getElementById("button-submit").addEventListener("click", function (e) {
    sendQuestion();
})

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

//fill dropdown menu with topics
for (var i = 0; i < topics.length; i++) {
    var selectTopic = document.getElementById("selectTopic");
    const para = document.createElement("option");
    para.value = topics[i];
    const node = document.createTextNode(topics[i]);
    para.appendChild(node);
    selectTopic.appendChild(para);
}