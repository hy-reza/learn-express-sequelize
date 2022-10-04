const router = require('express').Router()
const {postNotes, updateNotes, getNotes, deleteNotes} = require('../controllers/noteControllers.js')

router.get('/', getNotes)
router.get('/:id', getNotes)
router.post('/', postNotes)
router.put('/:id', updateNotes)
router.delete('/:id', deleteNotes)

module.exports = router