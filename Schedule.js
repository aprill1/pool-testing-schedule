const csv=require('csvtojson')
var residents;
// Invoking csv returns a promise
const converter=csv()
	.fromFile('./Book2.csv')
	.then((json)=>{
		residents = json;
		console.log("promise of csv for residents fulfilled");
	})

//TODO: change if testing frequency is not a week
var testing_days_per_week = 5;
var days_between_testing = 7; // weekly testing
var hours_per_day = 7;
var tests_shipped_per_day = 300;
var staff = 2;
var hours_per_test = 0.5;
var testing_weeks = 5;
var max_simultaneous_groups = 2;
var max_possible_tests_per_day = Math.min(tests_shipped_per_day, hours_per_day/hours_per_test*staff);
var max_group_size = max_possible_tests_per_day/max_simultaneous_groups;
// because residents is a promise it's better for us to have the hardcoded number ahead of time for our calculations
// else we're not certain that the promise will be fulfilled before we start newCalendar
var number_residents = 215;


//possible that they are off tuesdays or testing MWF
var testing_days = ["Monday", "Tuesday", "Wednesday"]
var newTestsPerDay = [];

//testGroups maps a new testGroup to each new addition of a batch of new residents to test
var testGroups = new Map();
var groups_to_testdays = new Map();
var testdays_to_groups = new Map();
var totalTestsPerDay = new Map();

// Calendar of new resident groups that will be added 
function newCalendar(){
	var added = 0;
	var testGroup = 1;
	while(added<number_residents){
		newTestsPerDay.push(Math.min(max_group_size, number_residents-added));
		testGroups.set(testGroup, Math.min(max_group_size, number_residents-added));
		added += max_group_size;
		testGroup ++;

	}
	console.log(newTestsPerDay);
	console.log(testGroups);
}


function daysToTest(){
	for(let testGroup of testGroups.keys()){
		for(var i = 0; i<testing_weeks; i++){
			if(!groups_to_testdays.has(testGroup)){
				groups_to_testdays.set(testGroup, []);
			}
			var testday = testGroup+testing_days_per_week*i;
			groups_to_testdays.get(testGroup).push(testday);
			if(!testdays_to_groups.has(testday)){
				testdays_to_groups.set(testday, []);
			}
			testdays_to_groups.get(testday).push(testGroup);
		}
	}
	console.log(groups_to_testdays);
	console.log(testdays_to_groups.size);
}

function totalTests(){
	for(var i = 1; i<=testdays_to_groups.size; i++){
		var total = 0;
		for(let group of testdays_to_groups.get(i)){
			total+=testGroups.get(group);
		}
		totalTestsPerDay.set(i, total);
	}
	console.log(totalTestsPerDay);
}

newCalendar();
daysToTest();
totalTests();

// Shift to next day 

// const Utils = require('./Utils');
// const Address = require('./Address');
// // use this to generate a number ID for each user
// var numUsers = 0;
// /**
// * Returns an object representing a grEAT user.
// *
// * @param firstName The user's first name.
// * @param lastName The user's last name.
// * @param emailAddress The user's email address.
// * @param passwordHash The user's password hash.
// * @param zipCode The user's zip code.
// * @return A User with the supplied first & last names, email address, and zip code.
// */
// const User = function(firstName, lastName, emailAddress, passwordHash, zipCode) {
// const that = Object.create(User.prototype);
// // assign a user ID and increment the counter
// const userId = numUsers;
// numUsers++;
// // "private fields"
// // a list of grEATings that this user was/is involved in
// const greatings = [];
// // a list of dietary restrictions that this user has
// var restrictions = [];
// // a list of notification preferences that this user has
// var notificationPrefs = ['new member', 'new craving', 'finalize time', 'finalize place', 'cancel time', 'cancel place', 'invite'];
// // a notification preference - time to receive an email about an upcoming grEATing
// var emailTime = undefined;
// var address = Address();
// // "public methods"
// /**
// * @return true iff the inputted password hash is correct.
// */
// that.authenticate = function(passHash) {
// return passwordHash === passHash;
// }
// /**
// * @return the location address of this User.
// */
// that.getAddress = function() {
// return address;
// }
// /**
// * @return the email address of this User.
// */
// that.getEmailAddress = function() {
// return emailAddress;
// }
// /**
// * @return the string representing how far in advance to email a user about an upcoming grEATing.
// */
// that.getEmailTime = function() {
// if (notificationPrefs.includes('greating notifications')) {
// return emailTime;
// }
// return undefined;
// }
// /**
// * @return the first name of this User.
// */
// that.getFirstName = function() {
// return firstName;
// }
// /**
// * @return the first and last names and email address of this User.
// */
// that.getInfo = function() {
// return {firstName: firstName, lastName: lastName, email: emailAddress};
// }
// /**
// * @return the last name of this User.
// */
// that.getLastName = function() {
// return lastName;
// }
// /**
// * @return the notification preferences of this User.
// */
// that.getNotificationPreferences = function() {
// return [...notificationPrefs];
// }
// *
// * @return the list of dietary restrictions of this User.

// that.getRestrictions = function() {
// return [...restrictions];
// }
// /**
// * @return the zip code of this User.
// */
// that.getZipCode = function() {
// return zipCode;
// }
// /**
// * @param info an info object, as returned by getInfo()
// * @return true iff the info matches that of this user
// */
// that.sameInfo = function(info) {
// return info.firstName === firstName && info.lastName === lastName && info.email === emailAddress;
// }
// /**
// * Sets the location address for this User.
// *
// * @param addr The new desired address for this User.
// */
// that.setAddress = function(addr) {
// address = addr;
// }
// /**
// * Sets the email address for this User.
// *
// * @param addr The new desired email address for this User.
// */
// that.setEmailAddress = function(addr) {
// if (Utils.isEmailAddress(addr)) {
// emailAddress = addr;
// } else {
// new Error(addr + ' is not a valid email address!');
// }
// }
// /**
// * Sets the email time for this User.
// *
// * @param time The new desired email time for this User.
// */
// that.setEmailTime = function(time) {
// emailTime = time;
// }
// /**
// * Sets the first name for this User.
// *
// * @param name The new first name for this User.
// */
// that.setFirstName = function(name) {
// firstName = name;
// }
// /**
// * Sets the last name for this User.
// *
// * @param name The new last name for this User.
// */
// that.setLastName = function(name) {
// lastName = name;
// }
// /**
// * Sets the notification preferences for this User.
// *
// * @param prefs The new notification preferences list for this user.
// */
// that.setNotificationPreferences = function(prefs) {
// notificationPrefs = [...prefs];
// }
// /**
// * Sets the password hash for this User.
// *
// * @param newHash The new password hash for this User.
// */
// that.setPasswordHash = function(newHash) {
// passwordHash = newHash;
// }
// /**
// * Sets the dietary restrictions for this User.
// *
// * @param restr The new list of dietary restrictions for this User.
// */
// that.setRestrictions = function(restr) {
// restrictions = [...restr];
// }
// /**
// * Sets the zip code for this User.
// *
// * @param code The new zip code for this User.
// */
// that.setZipCode = function(code) {
// if (Utils.isZipCode(code)) {
// zipCode = code;
// } else {
// new Error(code + ' is not a valid 5-digit zip code!');
// }
// }
// // only private fields (closure variables) can change--actual fields can't.
// return Object.freeze(that);
// }
// // Make a User by using:
// // const User = require(path/to/this/file);
// // var myUser = User(firstName, lastName, emailAddress, zipCode)
// module.exports = User;