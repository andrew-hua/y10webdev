
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

getUserData()
confirmUser()
