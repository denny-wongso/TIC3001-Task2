const express = require('express');
const path = require('path');
const ejs = require('ejs');
const cors = require('cors');
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req.body.test == 'true')
    if(req.body.test == 'true') {
      cb(null, './test/')
    } else {
      cb(null, '../client/public/images/')
    }
  },
  filename: (req, file, cb) => {
    console.log(req.body.test == 'true')
    if(req.body.test == 'true') {
      var name = file.originalname
    } else {
      var name = Date.now() + path.extname(file.originalname)
    }
    cb(null, name)

    req.middlewareStorage = {
        fileimage : name
    }
  }
})
const upload = multer({storage: storage})

const {
  checkRequiredPermissions,
  validateAccessToken,
} = require("./middleware/auth0.middleware.js");

const { getDogs, getDog, addDog, deleteDog, updateDog } = require('./apis/dogs');


const app = express();
app.use(express.static('public'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.use(express.json())
app.use(cors());

const PORT = 8081;
const HOST = '0.0.0.0';
const local_path = '/api/v1/';

app.get(local_path + 'admin', validateAccessToken, checkRequiredPermissions(["delete:new-dog", "write:new-dog", "update:new-dog"]), (req,res) => {
  res.status(200).json({"statusCode": 200, "data": {"status": "success", "message": "you are admin", "data": []}})
})

app.get(local_path + 'dogs', (req,res) => {
  getDogs(async function(data) {
      res.status(data.statusCode).json(data.data)
  })
})

app.get(local_path +'dogs/:id', (req, res) => {
  id = req.params.id
  getDog(id, async function(data) {
    res.status(data.statusCode).json(data.data)
  })
})

app.post(local_path + 'dogs', validateAccessToken, checkRequiredPermissions(["write:new-dog"]),  upload.single("image"), (req, res) => {
    var fileimage = req.middlewareStorage.fileimage;
    req.body.imageURL = fileimage
    addDog(req, async function(data) {
      res.status(data.statusCode).json(data.data)
    })
})

app.put(local_path + 'dogs/:id', validateAccessToken, checkRequiredPermissions(["update:new-dog"]),  upload.single("image"), (req, res) => {
  const { id } = req.params;
  var fileimage = req.middlewareStorage.fileimage;
  req.body.imageURL = fileimage
  updateDog(id, req, async function(data) {
    res.status(data.statusCode).json(data.data)
  })
});

app.delete(local_path + 'dogs/:id', validateAccessToken, checkRequiredPermissions(["delete:new-dog"]), (req, res) => {
  const { id } = req.params;
  deleteDog(id, async function(data) {
    res.status(data.statusCode).json(data.data)
  })
});

app.listen(PORT, HOST, () => {
  console.log(`Example app listening on port ${PORT}`);
});

module.exports = app