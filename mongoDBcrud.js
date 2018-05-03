// Create a database called 'my_first_db'.
db = db.getSiblingDB('test_database')

// Create students collection.
db.createCollection('students');

// Each document you insert into this collection should have the following format: ({name: STRING, home_state: STRING, lucky_number: NUMBER, birthday: {month: NUMBER, day: NUMBER, year: NUMBER}})
// Create 5 students with the appropriate info.

db.students.insert({
    name: "Prescott",
    home_state: "Washington",
    lucky_number: 28,
    birthday: {month: 3, day: 1, year: 1983}
})

db.students.insert({
    name: "Justin",
    home_state: "Colorado",
    lucky_number: 1,
    birthday: {month: 4, day: 12, year: 1985}
})

db.students.insert({
    name: "Stephen",
    home_state: "Washington",
    lucky_number: 5,
    birthday: {month: 12, day: 30, year: 1993}
})

db.students.insert({
    name: "Sun",
    home_state: "Korea",
    lucky_number: 99,
    birthday: {month: 3, day: 1, year: 1995}
})

db.students.insert({
    name: "Chuck Norris",
    home_state: "Texas",
    lucky_number: 1000000,
    birthday: {month: 1, day: 1, year: 1901}
})
// Get all students.
db.students.find().pretty()

// Retrieve all students who are from California (San Jose Dojo) or Washington (Seattle Dojo).
db.students.find({$or: [ {home_state: "California"}, {home_state: "Washington"} ] }).pretty()

// Get all students whose lucky number is:
// greater than 3
db.students.find({lucky_number: {$gt: 3}}).pretty()

// less than or equal to 10
db.students.find({lucky_number: {$lte: 10}}).pretty()
// between 1 and 9 (inclusive)
db.students.find( {$and: [ {lucky_number: {$gt: 1}}, {lucky_number: {$lte: 9}} ] }).pretty()

// Add a field to each student collection called 'interests' that is an ARRAY.  It should contain the following entries: 'coding', 'brunch', 'MongoDB'. Do this in ONE operation.
db.students.update({},{$set : {interests: ['coding', 'brunch', 'MongoDB']}},false,true)

// Add some unique interests for each particular student into each of their interest arrays.
db.students.update({_id: ObjectId("5aea8eded876fcf2f6930b33")}, {$push: {interests: 'being grumpy'}})
db.students.update({_id: ObjectId("5aea8eded876fcf2f6930b34")}, {$push: {interests: 'being difficult'}})
db.students.update({_id: ObjectId("5aea8eded876fcf2f6930b35")}, {$push: {interests: 'mumbling'}})
db.students.update({_id: ObjectId("5aea8eded876fcf2f6930b36")}, {$push: {interests: 'flirting'}})
db.students.update({_id: ObjectId("5aea8edfd876fcf2f6930b37")}, {$push: {interests: 'round-house kicking'}})

// Add the interest 'taxes' into someone's interest array.
db.students.update({_id: ObjectId("5aea8eded876fcf2f6930b34")}, {$push: {interests: 'taxes'}})

// Remove the 'taxes' interest you just added.
db.students.update({_id: ObjectId("5aea8eded876fcf2f6930b34")}, {$pop: {interests: 1}})

// Remove all students who are from California (or Washington).
db.students.remove({$or: [ {home_state: "California"}, {home_state: "Washington"} ] })

// Remove a student by name. 
db.students.remove({name: "Justin"})

// Remove a student whose lucky number is greater than 5 (JUST ONE)
db.students.remove({lucky_number: {$gt: 5}}, true)

// Add a field to each student collection called 'number_of_belts' and set it to 0.
db.students.update({}, {$set: {number_of_belts: 0}}, false, true)

// Increment this field by 1 for all students in Washington (Seattle Dojo).
db.students.update({home_state: "Washington"}, {$set: {number_of_belts: 1}},false, true)

// Rename the 'number_of_belts' field to 'belts_earned'
db.students.update({}, {$rename:{"number_of_belts": "belts_earned"}}, false, true);

// Remove the 'lucky_number' field.
db.getCollection('students').update({}, {$unset: {lucky_number: 1}}, {multi: true})

// Add a 'updated_on' field, and set the value as the current date.
db.students.update({}, {$set:{"updated_on": new Date()}}, false, true)