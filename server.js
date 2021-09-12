if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express')
const app = express();
const Word = require('./schemaModels.js')
const mongoose = require('mongoose');

app.use(express.json())
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection;
db.on('error', e => {
    console.error(e);
})

db.once('open', () => { //onlyruns once
    console.log('CONNECTED TO MONGOOSE')
})


app.get('/api', async (req, res) => { 
   try {
       const words = await Word.find({}) //queries the 'Word'  schema in schemaModels.js
       console.log(words); //prints out response from db (should be all data stored in the word scheme)
   } catch (err) {
       console.log('nope');
   }
})

app.post('/', async (req, res) => {
    const words = new Word({ //starts a new connection to the Word schema
        word : req.body.word
    })
    try{
        const newWord = await words.save() //writes to db
        console.log('nailed it);')
    } catch(err) {
        console.log('doh');
    }
})
app.listen(3000);

