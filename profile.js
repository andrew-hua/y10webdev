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
  ];
var strength = [];
var weak = [];
function getUserData() {
    if (sessionStorage.getItem('user') != null) {
        console.log(sessionStorage.getItem('user'));
        var myUser = JSON.parse(sessionStorage.getItem('user'));
        document.getElementById("name").innerHTML = myUser.firstname + ' ' + myUser.lastname;
        document.getElementById("credits").innerHTML = "Credits: " + myUser.credits;
    } else {
        document.getElementById("signInWarning").style.display = 'block';
    }
}

document.getElementById("logout").addEventListener("click", userLogout);

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
    location.reload();
}

function displaySkills() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    console.log(user)
    if (user == null){
        document.getElementById('ppractice').disabled = true;
        return;
    }

    let skill = user.skill_list;
    console.log(skill)
    if (user != null){
        strength = []
        weak = []
        for(var i = 0; i<20; i++){
            if (skill[i] >= 5){
                const temp = document.createElement("p");
                temp.innerHTML = topics[i]
                document.getElementById("strengthcontainer").appendChild(temp);
                strength.push(topics[i]);
            }
            else if (skill[i] <= -5){
                const temp = document.createElement("p");
                temp.innerHTML = topics[i]
                document.getElementById("weakcontainer").appendChild(temp);
                weak.push(topics[i]);
            }
        }
        if (strength.length == 0){
            const temp = document.createElement("p");
            temp.innerHTML = "You are not strong in any topics"
            document.getElementById("strengthcontainer").appendChild(temp);
        }
        if (weak.length == 0){
            const temp = document.createElement("p");
            temp.innerHTML = "You are not weak in any topics"
            document.getElementById("weakcontainer").appendChild(temp);
            document.getElementById("ppractice").disabled = true;
        }
        console.log(strength)
        console.log(weak)
    }
}
var personalizedQuestions = [];
async function personalizedPractice(subjects) {
    console.log(subjects);
    for(var i = 0; i<subjects.length; i++){
        console.log(subjects[i]);
        const url = "https://etutor1.herokuapp.com/personalizedpractice";
        var temp = {
            // list of weak topics
          topic: subjects[i]
        }
        // send to api
        await fetch(url, {
          method: 'POST',
          body: JSON.stringify(temp),
          headers: { "Content-type": "application/json" }
        }).then(response => response.json())
          .then(data => addQuestionsPersonalizedList(data))
    }
    for(var i =0; i<personalizedQuestions.length; i++){
        console.log(personalizedQuestions[i]);
    }
    sessionStorage.setItem("personalizedQuestions", JSON.stringify(personalizedQuestions));
    console.log(personalizedQuestions);
    window.location.replace("exercisemodule.html");

}

function addQuestionsPersonalizedList(temp){
    personalizedQuestions = personalizedQuestions.concat(temp);
}


document.getElementById("ppractice").addEventListener("click", function (e) {
    personalizedPractice(weak);
  })

displaySkills();
getUserData()
confirmUser()
