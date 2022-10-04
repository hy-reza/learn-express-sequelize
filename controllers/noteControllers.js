const Validator = require('fastest-validator')
const {Notes} = require('../models/')

const v = new Validator()


exports.getNotes = async (req, res, next) => {
  const {id} = req.params
  try {
    let note = null
    if(id){
      note = await Notes.findByPk(req.params.id)
    }else{
      note = await Notes.findAll()
    }
    res.status(200).json({message: "Success", data: note})
  } catch (error) {
    res.status(400).send(error.message)
  }
}

exports.postNotes = async (req, res, next) => {
  const schema = {
    title: 'string',
    description: 'string|optional'
  }
  try {
    const validate = v.validate(req.body, schema)
    validate.length && res.status(400).send(validate)

    const note = await Notes.create(req.body)
    res.status(200).json({message: 'Note successfully created', data: note})
  } catch (error) {
    res.status(400).send(error.message)
  }
}

exports.updateNotes = async (req, res, next) => {
  const schema = {
    title: 'string|optional',
    description: 'string|optional'
  }
  try {
    const {id} = req.params
    const note = await Notes.findByPk(id)
    if(!note){
      res.status(404).json({message: 'Note not found !'})
    }
    const validate = v.validate(req.body, schema)
    validate.length && res.status(400).send(validate)

    const newNote = await note.update(req.body)
    res.status(200).json({message: 'Note successfully updated', data: newNote})
  } catch (error) {
    res.status(400).send(error.message)
  }
}

exports.deleteNotes = async (req, res, next) => {
  const {id} = req.params
  try {
    let note = await Notes.findByPk(id)
    if(!note){
      return res.status(404).json({message: 'Note not found !'})
    }
    await note.destroy()
    res.status(200).json({message: "Note Successfully deleted", data: note})
  } catch (error) {
    res.status(400).send(error.message)   
  }
}