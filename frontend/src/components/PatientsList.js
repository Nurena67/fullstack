import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPatients } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import "bulma/css/bulma.css";

const PatientsList = () => {
    const [patients, setPatients] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const getPatients = async () => {
            try {
                const response = await fetchPatients();
                setPatients(response.data);  // Menyimpan data ke state
            } catch (error) {
                console.error("Error fetching patients:", error);
            }
        }
        getPatients();
    }, []);

    // Fungsi untuk berpindah ke halaman detail
    const goToDetail = (medicalRecordNumber) => {
        navigate(`/patients/${medicalRecordNumber}`); // Navigasi ke halaman detail
    }
    const goToAdd = (add) => {
        navigate('/patients/add');
    }
  return (
    <div className="container mt-5 is-centered">
        <div className="row">
            <div className="col-md-8">
            <h1 className='title'> List Data Patients </h1>
            <div>
        <button onClick={goToAdd}
        className="button is-lg is-primary"> Add Patient </button>
        </div>
                <table className="table is-striped is-fullwidth mt-3">
                    <thead style={{ backgroundColor: '#f0f8ff' }}>
                        <tr>
                            <th>No. RM</th>
                            <th>Nama</th>
                            <th>Umur</th>
                            <th>Keluhan</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                    {patients.map(patient => (
                                <tr key={patient.medicalRecordNumber}>
                                    <td>{patient.medicalRecordNumber}</td>
                                    <td>{patient.name}</td>
                                    <td>{patient.age}</td>
                                    <td>{patient.complaint}</td>
                                    <td>
                                    <button onClick={() => goToDetail(patient.medicalRecordNumber)} // Pindah ke detail
                                            className="button is-info is-small is-rounded">
                                            <FontAwesomeIcon icon={faCircleInfo} size="lg" /> Detail
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
};

export default PatientsList