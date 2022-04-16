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
//20 topics total

function summonPage(content) {
    console.log(content);
    window.location.replace("learnmodule.html");
    document.cookie = content;
}

function displayContent() {
    let lesson = document.cookie;
    
    console.log(topics.indexOf(lesson));
    console.log(lesson);

    document.getElementById("topicName").innerHTML = lesson;
    document.cookie = "";
    if (topics.indexOf(lesson) == 0){
        document.getElementById("lessonBack").disabled = true;
    }
    else if (topics.indexOf(lesson) == topics.length-1){
        document.getElementById("lessonForward").disabled = true;
    }
    else {
        document.getElementById("lessonBack").disabled = false;
        document.getElementById("lessonForward").disabled = false;
    }
}

function previousLesson() {
    //define lesson, lesson is a local variable
    lesson = document.getElementById("topicName").innerHTML;
    let loc = topics.indexOf(lesson);
    loc--;
    document.getElementById("topicName").innerHTML = topics[loc];
    document.getElementById("lessonForward").disabled = false;
    if (loc == 0){
        document.getElementById("lessonBack").disabled = true;
    }
}

function confirmUser(){
    let user = sessionStorage.getItem('user');
    console.log(user);
    if (user != null) {
        document.getElementById('signup').style.display = 'none';
        document.getElementById('login').style.display = 'none';
        document.getElementById('logout').style.display = 'block';
    } else {
        document.getElementById('signup').style.display = 'inline';
        document.getElementById('login').style.display = 'inline';
        document.getElementById('logout').style.display = 'none';
    }
}

confirmUser();

function userLogout(){
    sessionStorage.clear();
    document.getElementById('signup').style.display = 'block';
    document.getElementById('login').style.display = 'block';
    document.getElementById('logout').style.display = 'none';
}


function checkUnderstanding() {

}

function nextLesson() {
    lesson = document.getElementById("topicName").innerHTML;
    let loc = topics.indexOf(lesson);
    loc++;
    document.getElementById("topicName").innerHTML = topics[loc];
    document.getElementById("lessonBack").disabled = false;
    if (loc == topics.length-1){
        document.getElementById("lessonForward").disabled = true;
    }
}

function getData() {
    const http = new XMLHttpRequest();
    const url = 'http://localhost:8081/home'
    http.open("GET", url)
    http.send();

    http.onreadystatechange=(e)=> {
        console.log(http.responseText)
    }
}

//runs when the page is opened
getData();

