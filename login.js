var userData = {};

// function loginUsers() {
//     const http = new XMLHttpRequest();
//     const url = "http://localhost:8081/login"
//     var email = document.getElementById("userEmail").value;
//     var password = document.getElementById("userPassword").value;
  
//     var User = {
//       email_in: email, 
//       password_in: password,
//     }
  
//     http.open("POST", url, true);
//     http.setRequestHeader('Content-Type', 'application/json');
//     http.send(JSON.stringify(User));
//   }

//   function getData() {
//     const http = new XMLHttpRequest();
//     const url = 'http://localhost:8081/verify'
//     http.open("GET", url)
//     http.send();

//     http.onreadystatechange=(e)=> {
//         console.log(http.responseText)
//     }
// }


function loginresult(val) { 
  console.log(val);
  if (val) {
    document.getElementById("successSignup").style.display = "block";
    document.getElementById("failureSignup").style.display = "none";
    userData = {
      firstname: val.firstname,
      lastname: val.lastname,
      credits: val.credits,
      email: val.email,
      unlocked_themes: val.unlocked_themes,
      skill_list: val.skill_list,
    }
    sessionStorage.setItem('user', JSON.stringify(userData));
  } else {
    document.getElementById("successSignup").style.display = "none";
    document.getElementById("failureSignup").style.display = "block";
  }
}

  function loginUser() {
    var email = document.getElementById("userEmail").value;
    var password = document.getElementById("userPassword").value;
    var User = {
      email_in: email, 
      password_in: password,
    }
    const url = "https://etutor1.herokuapp.com/login"
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(User),
      headers: {"Content-type": "application/json"}
    }).then(response => response.json())
    .then(data => loginresult(data))
  }


document.getElementById("button-submit").addEventListener("click", function(e) { 
  loginUser();
})
