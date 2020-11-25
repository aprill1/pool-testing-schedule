const express = require('express');
const bodyParser = require('body-parser');
const Scheduler = require('./scheduler');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/schedule/inputs', (req, res) => {
  var post = req.body.post;
  console.log(post);
  console.log(post.numPeople);

  var newScheduler = new Scheduler(post.numPeople, post.numTests, post.numTestDays, post.numTestHours, post.numStaff, post.testTime, post.numWeeks, post.maxGroups);
  var scheduleNumPeople = newScheduler.totalTests();
  console.log(scheduleNumPeople);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));
