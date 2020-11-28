const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors')
const bodyParser = require('body-parser');
const Scheduler = require('./scheduler');
var newScheduler = new Scheduler();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.static('public')); //to access the files in public folder
app.use(cors()); // it enables all cors requests
app.use(fileUpload());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

// file upload api
app.post('/api/schedule/fileupload', (req, res) => {
  if (!req.files) {
      return res.status(500).send({ msg: "file is not found" })
  }
      // accessing the file
  const myFile = req.files.file;
  //  mv() method places the file inside public directory
  myFile.mv(`${__dirname}/data/${myFile.name}`, function (err) {
      if (err) {
          console.log(err)
          return res.status(500).send({ msg: "Error occured" });
      }
      // TODO: do something with the file here (it is in the data folder)
      // probably change Scheduler to just take the file?

      // returing the response with file path and name
      newScheduler.addFile(`${__dirname}/data/${myFile.name}`);
      console.log("This is the new file in server "+`${__dirname}/data/${myFile.name}`);
      return res.send({name: myFile.name, path: `/${myFile.name}`});
  });
})

app.post('/api/schedule/inputs', (req, res) => {
  var post = req.body;
  console.log(post);
  
  var ans = newScheduler.addParameters(post.numPeople, post.numTests, post.numTestDays, post.numTestHours, post.numStaff, post.testTime, post.numWeeks, post.maxGroups);
  console.log("this is ans: "+ans);
  ans.then(function(result){
    return res.status(200).send({msg: result});
    // return result;
  });
  // var scheduleNumPeople = newScheduler.totalTests();
  // (async function(){
  //   var result = await ans;
  //   console.log('Woo done!', result);
    
  // })()
  // console.log(ans);
  // res.send(
  //   `I received your POST request. This is what you sent me: ${req.body.post}`,
  // );
});

app.listen(port, () => console.log(`Listening on port ${port}`));
