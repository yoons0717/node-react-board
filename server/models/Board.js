const mongoose = require('mongoose')

const boardSchema = mongoose.Schema({
    title:{
        type: String,
        maxlength: 70
    },

    writer:{
        type: String,
        maxlength: 50
    },

    content:{
        type: String,
        maxlength:100
    }



}, {timestamps:true})

const Board = mongoose.model('Board', boardSchema) // 스키마를 모델로 감싸기

module.exports = {Board}