const fs = require('fs')
let config = require('config');
let path = config.FILEPath
const httpStatusCodes = require('../HttpStatusCode')


var data = [];

readFromFile(fs);

function store(fs, arr) {
    var dogs = ""
    for(var i = 0; i < arr.length; i++) {
        dogs += JSON.stringify(arr[i]) + ((i + 1) < arr.length ? "\n" : "");
    }
    writeToFile(fs, dogs)
}

function writeToFile(fs, dogs) {
    fs.writeFile(path, dogs, err => {
        if (err) {
            console.error(err);
        }
    });
}


function readFromFile(fs) {
    fs.readFile(path, 'utf8', (err, data1) => {
        if (err) {
          console.error(err);
          return;
        }
        var i = 0
        var test = []
        data1.split(/\r?\n/).forEach(line =>  {
            test[i] = JSON.parse(line);
            i = i + 1;
        });
        data = test.reverse();
    });
}


const getDogs = (res) => {
    data = data
    if(data.length == 0) {
        res({"statusCode": httpStatusCodes.BAD_REQUEST, "data": {"status": "fail", "message": "list is empty", "data": []}})
    } else {
        res({"statusCode": httpStatusCodes.OK, "data": {"status": "success", "message": "", "data": data}})
    }
}

const getDog = (id, res) => {
    var index = -1
    for(i = 0; i < data.length; i++) {
        if(data[i].id == id) {
            index = i
        }
    }
    if(index == -1) {
        res({"statusCode": httpStatusCodes.NOT_FOUND, "data": {"status": "fail", "message": "dog not found"}})
    } else {
        res({"statusCode": httpStatusCodes.OK, "data": {"status": "success", "message": "", "data": data[index]}})
    }
}

const addDog = (req, res) => {
    dog = {}
    const { name, breed, age, gender, imageURL } = req.body
    if(name == undefined || breed == undefined || age == undefined || gender == undefined
        || (gender != "male" && gender != "female")
        || isNaN(age)) {
        res({"statusCode": httpStatusCodes.BAD_REQUEST, "data": {"status": "fail", "message": "wrong body"}})
        return
    }

    dog["id"] = data.length + 1
    dog["name"] = name
    dog["breed"] = breed
    dog["age"] = age
    dog["gender"] = gender
    dog["imageURL"] = "./images/" + imageURL
    data.push(dog)
    store(fs, data)
    res({"statusCode": httpStatusCodes.OK, "data": {"status": "success", "message": ""}})
    
}

const updateDog = (id, req, res) => {
    var dog = {}
    const { name, breed, age, gender, imageURL } = req.body
    if(name == undefined || breed == undefined || age == undefined || gender == undefined
        || (gender != "male" && gender != "female")
        || isNaN(age)) {
        res({"statusCode": httpStatusCodes.BAD_REQUEST, "data": {"status": "fail", "message": "wrong body"}})
        return
    }
    dog["id"] = id
    dog["name"] = name
    dog["breed"] = breed
    dog["age"] = age
    dog["gender"] = gender
    dog["imageURL"] = "./images/" + imageURL
    var index = -1
    for(i = 0; i < data.length; i++) {
        if(data[i].id == id) {
            index = i
        }
    }

    if(index == -1) {
        res({"statusCode": httpStatusCodes.NOT_FOUND, "data": {"status": "fail", "message": "wrong body"}})
        return
    }

    if (index >= 0) {
        data[index] = dog
    }
    
    store(fs, data)
    res({"statusCode": httpStatusCodes.OK, "data": {"status": "success", "message": ""}})
}

const deleteDog = (id, res) => {
    newData = []
    var isDeleted = false
    for(i = 0; i < data.length; i++) {
        if(data[i].id != id) {
            newData.push(data[i])
        } else{
            isDeleted = true
        }
    }
    if(isDeleted == false) {
        res({"statusCode": httpStatusCodes.NOT_FOUND, "data": {"status": "fail", "message": "unable to delete"}})
        return
    }
    data = newData
    store(fs, data)
    res({"statusCode": httpStatusCodes.OK, "data": {"status": "success", "message": ""}})
}

module.exports = {
    getDogs,
    getDog,
    addDog,
    updateDog,
    deleteDog
}