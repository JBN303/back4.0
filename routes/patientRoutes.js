const express = require('express');
const Patient = require('../model/patientmodel'); // Adjust the path accordingly
const router = express.Router();
const mongoose = require('mongoose');

router.post('/pnew', async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    const savedPatient = await newPatient.save();
    res.status(200).send(savedPatient);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/patients', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.get('/patients/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid patient ID' });
    }
    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (error) {
    console.error('Error fetching patient by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Add more routes as needed

module.exports = router;