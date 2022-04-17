var express = require('express')
var app = express();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://user1:user1@cluster0.57irp.mongodb.net/cluster0?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
//npx browser-sync start --server

var userResult = {
    found: true
}

// used once to create a sample user
function createUserDB(user, pass, name, lname) {
    client.connect(err => {
        var dbo = client.db("eTutor");
        var sampleUser = {
            username: user,
            password: pass,
            firstname: name,
            lastname: lname,
            unlocked_themes: [],
            strengths: [],
            weaknesses: [], 
            credits: 0
        }
        dbo.collection("users").insertOne(sampleUser, function(err, res) {
            if (err) throw err;
            console.log("user");
            client.close();
        });
    })
}

// function checker() {
//     userResult.found = false;
// }

// find user in database
async function checkUser(u, p, response) {
    await client.connect(err => {
        var temp = null;
        var dbo = client.db("eTutor");
        dbo.collection("users").findOne({username: u, password: p}, function(err, res) {
            if (err) throw err;
            if (res == null || res == undefined) {
                userResult.found = false;
                console.log("user not found");
            } else {
                userResult.found = true;
                console.log("user found");
                temp = {
                    email: res.username,
                    firstname: res.firstname,
                    lastname: res.lastname,
                    credits: res.credits,
                    unlocked_themes: res.unlocked_themes,
                    strengths: res.strengths,
                    weaknesses: res.weaknesses,
                }
            }
            response.status(200).send(JSON.stringify(temp))
            client.close();
        });
    })
}

// async function findUser(u, p) {
//     await client.connect(err => {
//         var dbo = client.db("eTutor");
//         dbo.collection("users").findOne({credentials: u + ":" + p}, function(err, res) {
//             if (err) throw err;
//             console.log(res);
//             if (res == null || res == undefined) {
//                 console.log("user not found");
//                 userResult.found = false;
//             } else {
//                 userResult.found = true;
//                 console.log("user found");
//             }
//              client.close();
//         });
//     })
// }



app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
    
app.get('/verify', function (req, res) {
    res.send(JSON.stringify(userResult));
})


app.post('/addquestion', jsonParser, function(req, res) {
    console.log(req.body);
    createQuestion(req.body.topic, req.body.title, req.body.question, req.body.answer, req.body.solution);

});

app.post('/signup', jsonParser, function(req, res) {
    console.log(req.body);
    createUserDB(req.body.email_in, req.body.password_in, req.body.fname_in, req.body.lname_in);
})

app.post('/login', jsonParser, function(req, res) {
    console.log(req.body);
    checkUser(req.body.email_in, req.body.password_in, res);
})

async function findQuestion(t, response) {
    await client.connect(err => {
        client.db("eTutor").collection("questions").find({topic:t}).toArray(function(err, res) {
            if (err) throw err;
            if (res == null || res == undefined) {
                console.log("no such questions");
            } else {
                console.log("questions found");
                console.log(res);
            }
            response.status(200).send(JSON.stringify(res))
            client.close();
        });
    })
}

app.post('/module', jsonParser, function(req, res) { 
    console.log(req.body.topic);
    findQuestion(req.body.topic, res)
})


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log(server.address().address)
 })

app.post('/exercisemodule', jsonParser, function(req,res){
    console.log(req.body);
    updateUserCredits(req.body.email, req.body.credits);
})

function updateUserCredits(email, credits) {
    client.connect(err => {
        var dbo = client.db("eTutor");
        dbo.collection("users").updateOne({email: email}, {$set: {credits: credits}}, function(err, res) {
            if (err) throw err;
            console.log("user credits updated");
            client.close();
        });
    })
}


function createQuestion(topic, title, question, answer, solution) {
    client.connect(err => {
        var dbo = client.db("eTutor");
        var sampleQuestion = {
            topic: topic,
            title: title,
            question: question,
            answer: answer,
            solution: solution,
        }
        dbo.collection("questions").insertOne(sampleQuestion, function(err, res) {
            if (err) throw err;
            console.log("question submitted");
            client.close();
        });
    })
}