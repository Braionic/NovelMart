const express = require('express')
const {createEnquiry, deleteEnquiry, allEnquiries, updateEnquiry, singleEnq} = require('../controllers/enquiryController')
const enqRouter = express.Router()


enqRouter.post('/', createEnquiry)
enqRouter.delete('/deleteenquiry/:id', deleteEnquiry)
enqRouter.get('/', allEnquiries)
enqRouter.get('/:id', singleEnq)
enqRouter.put('/update/:id', updateEnquiry)


module.exports = enqRouter