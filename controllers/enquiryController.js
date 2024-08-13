const enqModel = require("../models/enquiryModel");

//submit and enquiry
const createEnquiry = async (req, res) => {
  try {
    const addedEnquiry = await enqModel.create(req.body);
    res.json(addedEnquiry);
  } catch (error) {
    res.json(err.message);
  }
};

//delete enquiry
const deleteEnquiry = async (req, res) => {
  try {
    const deletedEnquiry = await enqModel.findByIdAndDelete(req.params.id);
    res.json(deletedEnquiry);
  } catch (error) {
    res.jsdon({ msg: error.message });
  }
};

//Get all enquiries
const allEnquiries = async (req, res) => {
  try {
    const enquiries = await enqModel.find({});
    res.json(enquiries);
  } catch (error) {
    res.json({ msg: error.message });
  }
};

//single enquiry
const singleEnq = async (req, res) => {
  try {
    const enq = await enqModel.findById(req?.params.id);
    if (enq) {
      return res.json(enq);
    }
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

//update enquiry
const updateEnquiry = async (req, res) => {
  try {
    const updatedEnquiry = await enqModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedEnquiry);
  } catch (error) {
    res.json({ msg: error.message });
  }
};

module.exports = { singleEnq, createEnquiry, deleteEnquiry, allEnquiries, updateEnquiry };
