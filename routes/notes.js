var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Note = mongoose.model('Note');

// GET all the tasks
router.get('/', function(req, res){
  Note.find(function(err, notes, count){
    res.send(notes);
  });
});

// POST create a new task
router.post('/', function(req, res){
  new Note({
    title: req.body.title
  }).save(function(err, note, count){
    res.send(note);
  });
});

router.post('/notes_template', function(req, res){
  var note = req.body;
  res.render('notes', {id: note.id, title: note.title, complete: note.complete})
});

//PUT a check
router.put('/:id', function(req, res) {
  Note.findByIdAndUpdate(
    req.params.id, 
    { $set: {complete: req.body.complete}},
    function(err, note) {
      res.send(note);
    });
});

//Delete a note

router.delete('/:id', function(req, res) {
 Note.findById(req.params.id, function(err, note) {
   note.remove();
   res.status(200).send({success: true});
  });
});

module.exports = router;













