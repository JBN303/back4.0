const express = require('express');
const Doctor = require('../model/doctorModel');
const router = express.Router();

router.get('/doctors', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/doctors/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const doctors = await Doctor.findById(id);
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/dnew', async (req, res) => {
  try {
    const newDoctor = new Doctor(req.body);
    const savedDoctor = await newDoctor.save();
    res.status(200).send(savedDoctor);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.put('/doctors/toggle/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Toggle the status
    doctor.status = doctor.status === 'active' ? 'inactive' : 'active';

    const updatedDoctor = await doctor.save();

    res.status(200).json(updatedDoctor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;