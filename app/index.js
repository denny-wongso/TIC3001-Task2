const express = require('express');
const path = require('path');
const ejs = require('ejs');

const { getDogs, getDog, addDog, deleteDog, updateDog } = require('./server/dogs');


const app = express();
app.use(express.static('public'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.use(express.json())

const PORT = 8081;
const HOST = '0.0.0.0';
const local_path = '/api/v1/'

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

app.post(local_path + 'dogs', (req, res) => {
    addDog(req, async function(data) {
      res.status(data.statusCode).json(data.data)
    })
})

app.put(local_path + 'dogs/:id', (req, res) => {
  const { id } = req.params;
  updateDog(id, req, async function(data) {
    res.status(data.statusCode).json(data.data)
  })
});

app.delete(local_path + 'dogs/:id', (req, res) => {
  const { id } = req.params;
  deleteDog(id, async function(data) {
    res.status(data.statusCode).json(data.data)
  })
});

app.listen(PORT, HOST, () => {
  console.log(`Example app listening on port ${PORT}`);
});

module.exports = app