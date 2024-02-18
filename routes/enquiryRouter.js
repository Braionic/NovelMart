const express = require('express')
const {createEnquiry, deleteEnquiry, allEnquiries, updateEnquiry} = require('../controllers/enquiryController')
const enqRouter = express.Router()


enqRouter.post('/', createEnquiry)
enqRouter.delete('/deleteenquiry/:id', deleteEnquiry)
enqRouter.get('/', allEnquiries)
enqRouter.put('/update/:id', updateEnquiry)


module.exports = enqRouter