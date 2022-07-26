const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient

const PORT = 3000

MongoClient.connect('mongodb+srv://eryan411:testserver123@cluster0.701bxt1.mongodb.net/?retryWrites=true&w=majority', {useUnifiedTopology: true})
.then(client => {
    console.log('Connected to Database');
    const db = client.db('to-do-list');
    const todoCollection = db.collection('todos');
    
    app.set('view engine', 'ejs');
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static('public'));
    app.use(bodyParser.json())
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    })
    
    app.get('/', (req, res) => {
        db.collection('todos').find().toArray()
        .then(todos =>{
            res.render('index.ejs', { todos: todos })
        }
        )
    })

    app.post('/to-dos', (req, res) => {
        todoCollection.insertOne(req.body)
        .then(result => {
            res.redirect('/')
        })
        .catch(error => console.error(error))
    })

    app.put('/to-dos', (req, res) => {
        todoCollection.updateOne(
            {
                action: req.body.action,
                date: req.body.date
            },
            {
                $set: {
                    action: req.body.action,
                    date: req.body.date
                }
            }
        )
        .then(result => {
            console.log(result)
        })
        .catch(error => console.error)
    })

    app.delete('/to-dos', (req, res) => {
        todoCollection.deleteOne({action: req.body.action}) 
        .then(result => {
            console.log('Task delete')
            response.json('Task deleted')
        })
        .catch(err => {
            console.log(err)
            res.redirect('/')
        })
        
    })
})
