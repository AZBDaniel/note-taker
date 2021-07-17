const router = require("express").Router();
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

//this is route for getting all nots
router.get("/notes", (req, res) => {
    let db = fs.readFileSync("db/db.json");
    db = JSON.parse(db);
    res.json(db);
})


//creating new notes, POST ROUTE
router.post("/notes", (req, res) => {
    let note = req.body;
    note.id = uuidv4();
    let db = fs.readFileSync("db/db.json");
    db = JSON.parse(db);
    db.push(note);
    fs.writeFileSync("db/db.json", JSON.stringify(db));
    res.json(db);
})




//deleteing notes
router.delete("/notes/:id", (req, res) => {
    let idNote = req.params.id;
    let db = fs.readFileSync("db/db.json");
    db = JSON.parse(db);
    let allNotes = db.filter(note => note.id !== idNote);
    fs.writeFileSync("db/db.json", JSON.stringify(allNotes));
    res.json(allNotes);
})




module.exports=router;