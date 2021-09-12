const mongoose = require('mongoose');

const usedWordsExampleSchema = new mongoose.Schema({ //"table" / model in the database. No need to create a table up front, adding data will do that job. This defines the schema. 
  //literally just stores a word and the date it was entered (for very basic hangman history)
    word: {
        type: String,
        required: true
    },
    usedDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('word', usedWordsExampleSchema) //'word' is going to refer to the usedWordsExampleScheme 'model' in the db