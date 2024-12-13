import Patient from '../models/patientModel.js';

// Read All
export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll();
    const patientsData = patients.map(patient => patient.get());  // Mengambil data bersih untuk setiap pasien
    console.log("All Patients Fetched:", patientsData); // Log data pasien
    res.status(200).json(patientsData); // Mengirim data dalam format JSON
  } catch (err) {
    console.error("Error fetching patients:", err.message);
    res.status(500).json({ error: err.message });
  }
};

//detail
export const getPatientDetail = async (req, res) => {
  try {
    const { medicalRecordNumber } = req.params;
    const patient = await Patient.findOne({
      where: { medicalRecordNumber },
    });
    
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    
    const patientData = patient.get();  // Mengambil data dalam format JSON yang bersih
    console.log("Patient Detail Fetched:", patientData); // Log data pasien
    res.json(patientData); // Mengirim data dalam format JSON
  } catch (err) {
    console.error("Error fetching patient detail:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Create
export const createPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    const patientData = patient.get();  // Mengambil data sebagai objek JSON bersih
    console.log("Patient Created:", patientData); // Logging setelah pembuatan pasien
    res.status(201).json(patientData);
  } catch (err) {
    console.error("Error creating patient:", err.message); // Logging error
    res.status(400).json({ error: err.message });
  }
};

// Update
export const updatePatient = async (req, res) => {
  try {
    const { medicalRecordNumber } = req.params; // Mengambil ID pasien dari parameter URL

    // Cek apakah pasien dengan ID yang diberikan ada di database
    const patient = await Patient.findByPk(medicalRecordNumber);
    if (!patient) {
      console.error(`Patient with ID ${medicalRecordNumber} not found`); // Logging jika pasien tidak ditemukan
      return res.status(404).json({ error: "Patient not found" });
    }

    // Update data pasien dengan data dari body request
    await patient.update(req.body);
    const updatedPatientData = patient.get(); // Mengambil data yang telah diperbarui

    console.log("Patient Updated:", updatedPatientData); // Logging setelah update pasien
    res.status(200).json(updatedPatientData);
  } catch (err) {
    console.error("Error updating patient:", err.message); // Logging error
    res.status(400).json({ error: err.message });
  }
};


// Delete
export const deletePatient = async (req, res) => {
  try {
    const { medicalRecordNumber } = req.params;
    console.log("Delete Request for MRN:", medicalRecordNumber);

    const deleted = await Patient.destroy({ where: { medicalRecordNumber } });
    if (!deleted) {
      console.log("Patient not found for deletion:", medicalRecordNumber);
      return res.status(404).json({ error: 'Patient not found' });
    }

    console.log("Patient Deleted:", medicalRecordNumber);
    res.status(200).json({ message: 'Patient deleted successfully' }); // Mengirimkan respons JSON
  } catch (err) {
    console.error("Error deleting patient:", err.message);
    res.status(500).json({ error: err.message });
  }
};


