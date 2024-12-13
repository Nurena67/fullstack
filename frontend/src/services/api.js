import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/patients'
});


export const fetchPatients = () => API.get('/');
export const fetchPatientDetail = (medicalRecordNumber) =>
    API.get(`/${medicalRecordNumber}`);
export const createPatient = (patientData) => API.post('/', patientData);
export const updatePatient = (medicalRecordNumber, updatedData) =>
    API.put(`/${medicalRecordNumber}`, updatedData);
export const deletePatient = (medicalRecordNumber) =>
    API.delete(`/${medicalRecordNumber}`);