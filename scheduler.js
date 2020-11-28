const csv=require('csvtojson')

class Scheduler {
  // var number_residents = 215;
  constructor (file, numPeople, numTests, numTestDays, numTestHours, numStaff, testTime, numWeeks, maxGroups){
    
    //TODO: change if testing frequency is not a week
    this.number_residents = numPeople;
    //TODO: this.numner_residents should match this.residents.length .. can place check in getResidentNames
    this.tests_shipped_per_day = numTests;
    this.testing_days_per_week = numTestDays;

    this.hours_per_day = numTestHours;
  
    this.staff = numStaff;
    this.hours_per_test = testTime;
    this.testing_weeks = numWeeks;
    this.max_simultaneous_groups = maxGroups;

    //TODO: change for flexibility but default is 7
    // var days_between_testing = 7; // weekly testing

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

    //file of residents (TODO: needs to take in a file not a string)
    this.residents = [];
    console.log("this filer"+file.type);
    this.file = file;
    console.log("this is the filer"+file[0])
    // this.getResidentNames(file);
    this.residents_test_schedule = new Map();
    console.log(this.number_residents);
  }

  getResidentNames(file){
    // Invoking csv returns a promise
    let residents = [];
    console.log("this is the filer"+file[0].size);
    const converter=csv()
     // .fromFile('./example_residents.csv')
     .fromFile(file)
     .then((json)=>{

       var total = json.length;
       // console.log("promise of csv for residents fulfilled"+JSON.stringify(this.residents)+"  "+this.residents.length);
       for (var i = 0; i<total; i++){
          var last_name = JSON.stringify(json[i]["Last"]);
          var first_name = JSON.stringify(json[i]["First"]);
          var full_name = last_name.concat(", ",first_name);
          this.residents.push(full_name);
       }
    }).then(function() {
      this.specificResidentsTested();
    }.bind(this));
  }

  specificResidentsTested(){
    console.log("in a second then function");
    this.totalTests();
  }

   newCalendar(){
    var added = 0;
    var testGroup = 1;
    console.log("newCalendar"+this.residents.length);
    var r_index = 0;
    while(added<this.number_residents){
      var newlyAdded = Math.min(this.max_group_size, this.number_residents-added);
      this.newTestsPerDay.push(newlyAdded);
      var newlyAddedResidents = [];
      for(var i = 0; i<newlyAdded; i++){
        newlyAddedResidents.push(this.residents[r_index]);
        r_index++;
      }
      this.testGroups.set(testGroup, newlyAddedResidents);
      added += this.max_group_size;
      testGroup ++;
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
    this.daysToTest();
    for(var i = 1; i<=this.testdays_to_groups.size; i++){
      var peopleToTest = [];
      for(let group of this.testdays_to_groups.get(i)){
        peopleToTest = peopleToTest.concat(this.testGroups.get(group));
      }
      this.totalTestsPerDay.set(i, peopleToTest);
    }
    return this.totalTestsPerDay;
  }

}

module.exports = Scheduler;
