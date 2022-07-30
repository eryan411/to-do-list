const express = require('express')
const bodyParser = require('body-parser')
const { response } = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient

const PORT = 3000

let db, 
    dbConnectionStr = 'mongodb+srv://eryan411:testserver123@cluster0.701bxt1.mongodb.net/?retryWrites=true&w=majority'
    dbName = 'todos'

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
.then(client => {
    console.log('Connected to Database');
    db = client.db('to-do-list');    
})

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})

app.get('/', async (req, res) => {
    const todoItems = await db.collection('todos').find().toArray()
    const itemsLeft = await db.collection('todos').countDocuments({completed: false})
    res.render('index.ejs', { todos: todoItems, left: itemsLeft })
})

app.post('/to-dos', (req, res) => {
    db.collection('todos').insertOne({action: req.body.action, date: req.body.date, completed: false})
    .then(result => {
        console.log(`You have added ${req.body.action} to be completed on ${req.body.date} to the list`)
        res.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/markcomplete', (req, res) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = `${yyyy}-${mm}-${dd}`;
    db.collection('todos').updateOne(
        {action: req.body.itemFromJS},
        {
            $set: {
                completed: true,
                date: today
            }
        },
        {
            sort: {_id: -1},
            upsert: false
        }
    ).then(result => {
        console.log('Marked Complete')
        response.json('Marked Complete')
    }).catch(error => console.error)
    
})

app.delete('/delete', (req, res) => {
    db.collection('todos').deleteOne({action: req.body.itemFromJS}) 
    .then(result => {
        console.log('Task deleted')
        response.json('Task deleted')
    })
    .catch(err => {
        console.log(err)
    })
    
})
