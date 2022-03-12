const mongoose = require('mongoose');
const router = require('express').Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const {body, validationResult} = require('express-validator');

//Route 1 - Get all notes login required
router.get('/fetchallnotes',fetchuser ,async (req, res) => {
    try {
    const notes = await Note.find({user: req.user.id});
    res.json(notes);
} catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
}}
);

//Route 2 - Add a new note using post login required
router.post('/addnote',fetchuser,[
    body('title').not().isEmpty().withMessage('Title is required'),
    body('description').not().isEmpty().withMessage('Description is required')  
] ,async (req, res) => {
    try{
    const {title, description, tag} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const newNote = await new Note({
        user: req.user.id,
        title,
        description,
        tag
    });
    await newNote.save();
    res.json("Note added");
    }catch(err){
        console.log(err);
        res.status(500).send('Server Error');
    }
}

);

//Route 3 - update a note using put login required
router.put('/updatenote/:id',fetchuser, async (req, res) => {
    
    const {title, description, tag} = req.body;
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};
    
    //Find the note to updated
    let note = await Note.findById(req.params.id);
    if(!note){
        return res.status(404).json({msg: 'Note not found'});
    }
    //Make sure user owns the note
    if(note.user.toString() !== req.user.id){
        return res.status(401).json({msg: 'Not Authorized'});
    }
    //Update the note
    
    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
    res.json('Note updated');
    
    // note.title = newNote.title;
    // note.description = newNote.description;
    // note.tag = newNote.tag;
    // await note.save();
    // res.json(note);
    

});

// Route 4 - delete a note using delete login required
    router.delete('/deletenote/:id',fetchuser, async (req, res) => {
        try {
            const note = await Note.findById(req.params.id);
            if(!note){
                return res.status(404).json({msg: 'Note not found'});
            }
            //Make sure user owns the note
            if(note.user.toString() !== req.user.id){
                return res.status(401).json({msg: 'Not Authorized'});
            }
            await Note.findByIdAndRemove(req.params.id);

            res.json({msg: 'Note removed'});
        } catch (error) {

            console.error(error.message);
            res.status(500).send('Server Error');
        }
    });

    module.exports = router;