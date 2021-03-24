const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const dataObject = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]

  };

  var jsonData = JSON.stringify(dataObject);

  const url = "https://us1.api.mailchimp.com/3.0/lists/8a2a222282";

  const options = {
    method: "POST",
    auth: "mesam0007:414e268806b42934d3debb0df39a4342-us1"
  }

  const request = https.request(url, options, function(response) {
     if (response.statusCode === 200) {
       res.sendFile(__dirname + "/success.html");
     } else {
        res.sendFile (__dirname + "/failure.html");
     }
     response.on("data", function(data){
       console.log(JSON.parse(data));
     });
  });

request.write(jsonData);
request.end();

});

app.post("/failure", function(req, res){
  res.redirect("/");
});


app.listen(process.env.PORT || 3000, function() {
  console.log("server is running..");
});



//api-key: 414e268806b42934d3debb0df39a4342-us1
// list i: 8a2a222282
