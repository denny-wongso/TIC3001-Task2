const fs = require('fs')

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
    fs.writeFile('server/dogs.txt', dogs, err => {
        if (err) {
            console.error(err);
        }
    });
}


function readFromFile(fs) {
    fs.readFile('server/dogs.txt', 'utf8', (err, data1) => {
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
        data = test;
    });
}


const getDogs = (res) => {
    data = data
    res({"status": "success", "message": "", "data": data})
}

const getDog = (id, res) => {
    each = data.find(c => c.id == id)
    res({"status": "success", "message": "", "data": each})
}

const addDog = (req, res) => {
    dog = {}
    const { name, breed, age, gender } = req.body
    dog["id"] = data.length + 1
    dog["name"] = name
    dog["breed"] = breed
    dog["age"] = age
    dog["gender"] = gender
    data.push(dog)
    store(fs, data)
    res({"status": "success", "message": ""})
}

const updateDog = (id, req, res) => {
    var dog = {}
    const { name, breed, age, gender } = req.body
    dog["id"] = id
    dog["name"] = name
    dog["breed"] = breed
    dog["age"] = age
    dog["gender"] = gender
    var index = -1
    for(i = 0; i < data.length; i++) {
        if(data[i].id == id) {
            index = i
        }
    }
    if (index >= 0) {
        data[index] = dog
    }
    store(fs, data)
    res({"status": "success", "message": ""})
}

const deleteDog = (id, res) => {
    newData = []
    for(i = 0; i < data.length; i++) {
        if(data[i].id != id) {
            newData.push(data[i])
        }
    }
    data = newData
    store(fs, data)
    res({"status": "success", "message": ""})
}

module.exports = {
    getDogs,
    getDog,
    addDog,
    updateDog,
    deleteDog
}