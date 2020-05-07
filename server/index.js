const express = require('express')
const mongoose =  require('mongoose')
const app = express();
const cors =  require('cors')

//para conectar a mongodb
mongoose.connect('mongodb://localhost/react-example', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const Task = require('./models/task')


app.use(cors());
app.use(express.json())


//
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});


//  mongodb te da la posicion  con =  .estimatedDocumentCount()
app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  task.sorting = await Task.estimatedDocumentCount();
  await task.save();
  res.json(task);
});




app.put('/tasks', async (req, res) => {
  const tasksIds = req.body;
  for (const [i, id] of tasksIds.entries()) {
    await Task.updateOne({_id: id}, {sorting: i});
    // console.log(i, id)
  }
  res.json('the list was ordered');
});



app.listen(4000, () => {

    console.log("server on port 4000");
    
} )

