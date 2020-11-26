const csv=require('csvtojson')

class Scheduler {
  // var number_residents = 215;
  constructor (numPeople, numTests, numTestDays, numTestHours, numStaff, testTime, numWeeks, maxGroups){
    
    //TODO: change if testing frequency is not a week
    this.number_residents = numPeople;
    this.tests_shipped_per_day = numTests;
    this.testing_days_per_week = numTestDays;

    this.hours_per_day = numTestHours;
  
    this.staff = numStaff;
    this.hours_per_test = testTime;
    this.testing_weeks = numWeeks;
    this.max_simultaneous_groups = maxGroups;

    //TODO: change for flexibility but default is 7
    // var days_between_testing = 7; // weekly testing

    //file of residents (TODO: needs to take in a file not a string)
    var residents;
    // Invoking csv returns a promise
    // const converter=csv()
    //  .fromFile('./Book2.csv')
    //  .then((json)=>{
    //    this.residents = json;
    //    console.log("promise of csv for residents fulfilled");
    //  });
  
    //calculated values
    this.max_possible_tests_per_day = Math.min(this.tests_shipped_per_day, this.hours_per_day/this.hours_per_test*this.staff);

    this.max_group_size = this.max_possible_tests_per_day/this.max_simultaneous_groups;
    console.log("in constructor"+ this.max_possible_tests_per_day);
    // because residents is a promise it's better for us to have the hardcoded number ahead of time for our calculations
    // else we're not certain that the promise will be fulfilled before we start newCalendar
    //TODO: possible that they are off tuesdays or testing MWF
    this.testing_days = ["Monday", "Tuesday", "Wednesday"]

    this.newTestsPerDay = [];

    //testGroups maps a new testGroup to each new addition of a batch of new residents to test
    this.testGroups = new Map();
    
    this.groups_to_testdays = new Map();
    this.testdays_to_groups = new Map();
    this.totalTestsPerDay = new Map();

    console.log(this.number_residents);
  }

  newCalendar(){
    var added = 0;
    console.log("added"+added);
    var testGroup = 1;
    console.log("here");
    while(added<this.number_residents){
      console.log("in loop"+testGroup);
      this.newTestsPerDay.push(Math.min(this.max_group_size, this.number_residents-added));
      this.testGroups.set(testGroup, Math.min(this.max_group_size, this.number_residents-added));
      console.log("added"+this.max_group_size);
      added += this.max_group_size;
      testGroup ++;
      console.log("added"+added+" "+this.number_residents);
    }
  }


  daysToTest(){
   for(let testGroup of this.testGroups.keys()){
     for(var i = 0; i<this.testing_weeks; i++){
       if(!this.groups_to_testdays.has(testGroup)){
         this.groups_to_testdays.set(testGroup, []);
       }
       var testday = testGroup+this.testing_days_per_week*i;
       this.groups_to_testdays.get(testGroup).push(testday);
       if(!this.testdays_to_groups.has(testday)){
         this.testdays_to_groups.set(testday, []);
       }
       this.testdays_to_groups.get(testday).push(testGroup);
     }
   }
  }

  totalTests(){
    this.newCalendar();
    console.log(this.testGroups);
    this.daysToTest();
    for(var i = 1; i<=this.testdays_to_groups.size; i++){
      var total = 0;
      for(let group of this.testdays_to_groups.get(i)){
        total+=this.testGroups.get(group);
      }
    this.totalTestsPerDay.set(i, total);
    }
    return this.totalTestsPerDay;
  }
}

module.exports = Scheduler;
