require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

//Solution2: Create a Model
//Define a Schema
let personSchema = new mongoose.Schema({
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: [String]
})
//Export a Model
const Person = mongoose.model('Person', personSchema)

//Solution3: Create and Save a Record of a Model
const createAndSavePerson = (done) => {
  //Create an instance of the model 
  let newPerson = new Person({name: 'Irana', age: 39, favoriteFoods: ['LevengiChicken', 'Fish', 'Meat']})
  //Save data to the database
  newPerson.save(function(err, data) {
    if (err) return console.error(err)
    done(null, data)
  })
}

//Solution4: Create Many Records with model.create()
const arrayOfPeople = [
  {name: "Irana", age: 39, favoriteFoods: ['LevengiChicken', 'Fish', 'Meat', 'Borw', 'Stolichniy', 'Medoviy']},
  {name: "Gunay", age: 43, favoriteFoods: ['Blinchiki', 'Kotleti', 'YarpagDolmasi']},
  {name: "Nuriyya", age: 64, favoriteFoods: ['Kuku', 'Balig', 'QushPlov']}
]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err)
    done(null, people)
  })
}

//Solution5: Use model.find() to Search Your Database
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function (err, data) {
    if (err) return console.log(err)
    done(null, data)
  })
}

//Solution6: Use model.findOne() to Return a Single Matching Document from Your Database
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function (err, data) {
    if (err) return console.log(err)
    done(null, data)
  })
}

//Solution7: Use model.findById() to Search Your Database By _id
const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, function (err, data) {
    if (err) return console.log(err)
    done(null, data)
  })
}

//Solution8: Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger"
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err)
    person.favoriteFoods.push(foodToAdd)
    person.save((err, data) => {
      if(err) return console.log(err)
      done(null, data)
    })
  })
}

//Solution9: Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
  const ageToSet = 20
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, data) => {
      if(err) return console.log(err)
      done(null, data)
    })
}

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
