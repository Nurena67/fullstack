import express from 'express';
import { 
    createPatient, 
    getPatients,
    getPatientDetail, 
    updatePatient, 
    deletePatient } from '../controllers/patientController.js';

const router = express.Router();

router.post('/', createPatient);
router.get('/', getPatients);
router.get('/:medicalRecordNumber', getPatientDetail);
router.put('/:medicalRecordNumber', updatePatient);
router.delete('/:medicalRecordNumber', deletePatient);

export default router;
