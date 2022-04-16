function getUserData() {
    
    console.log(sessionStorage.getItem('user'));
    var myUser = JSON.parse(sessionStorage.getItem('user'));
    document.getElementById("name").innerHTML = "First Name: " +  myUser.firstname;
    document.getElementById("lname").innerHTML = "Last Name: " + myUser.lastname;
    document.getElementById("credits").innerHTML = "Credits: " + myUser.credits;


}

getUserData()