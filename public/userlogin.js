function createUser() {
  const http = new XMLHttpRequest();
  const url = "http://localhost:8081/signup"
  http.open("POST", url);
  var email = document.getElementById("userEmail").value;
  var password = document.getElementById("userPassword").value;
  var fname = document.getElementById("fname").value;
  var lname = document.getElementById("lname").value;

  var newUser = {
    email_in: email, 
    password_in: password,
    fname_in: fname,
    lname_in: lname,
  }

  http.open("POST", url, true);
  http.setRequestHeader('Content-Type', 'application/json');
  console.log(newUser)
  http.send(JSON.stringify(newUser));
}

document.getElementById("button-submit").addEventListener("click", function(e) {
  createUser();
})
