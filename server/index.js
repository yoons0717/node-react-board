const express = require('express')
const app = express()
const port = 5000

const config = require("./config/key");
const bodyParser = require('body-parser')
const mongoose = require('mongoose') // 몽구스를 이용해서 몽고디비랑 연동

const { Board } = require("./models/Board")



// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended : true}))
// application/json
app.use(bodyParser.json())



app.get('/api/hello', (req, res) => {
  res.send('Hello World!')
})

mongoose.connect(config.mongoURI, {
    useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true, useFindAndModify:false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

// req.body 안에 데이터가 이런식으로 들어있음 -> bodyParser가 있기 때문
// {
//   id:"hello",
//   password:"123"
// }
app.post('/api/boards/write',(req,res) => {
  const board = new Board(req.body)

    // mongoDB method
    board.save((err,boardInfo) =>{
      if(err) 
        return res.json({success:false,err}) // 클라이언트에게 json 값을 보냄
      return res.status(200).json({  // status(200)은 성공했다는 것
        success:true
    })
  })


})

// 게시판 리스트
app.get('/api/boards/list', (req,res) => {
  Board.find({}, (err,boards)=>{
    if(err)
      return res.status(500).send("게시글 전체 조회 실패.")
    
      res.status(200).json({success:true, boards})
    
  })
})

// GET BOOKS BY id
app.get('/api/boards/getboard/:board_id', (req,res)=>{ 
  Board.find({_id: req.params.board_id},(err, board)=>{
      if(err) return res.status(500).json({error: err});
      if(board.length === 0) return res.status(404).json({error: 'board not found'});
      res.status(200).json({success:true, board})
  })
 
})

// update

app.put('/api/boards/update/:board_id', function(req, res){
  Board.findById(req.params.board_id, function(err, board){
      if(err) return res.status(500).json({ error: 'database failure' });
      if(!board) return res.status(404).json({ error: 'board not found' });

      if(req.body.title) board.title = req.body.title;
      if(req.body.writer) board.writer = req.body.writer;
      if(req.body.content) board.content = req.body.content;

      board.save(function(err){
          if(err) res.status(500).json({error: 'failed to update'});
          res.json({success:true,message: 'board updated'});
      });

  });

});

// DELETE-  id로
app.delete('/api/boards/:board_id', function(req, res){
  Board.remove({ _id: req.params.board_id }, function(err, output){
      if(err) return res.status(500).json({ error: "database failure" });
      res.status(200).json({success:true})
  })
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})