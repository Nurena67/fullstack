import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { fetchPatientDetail , deletePatient } from "../services/api"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import "bulma/css/bulma.css";


function PatientDetail() {
  const { medicalRecordNumber } = useParams();
  const navigate = useNavigate(); // Untuk navigasi
  const [patient, setPatient] = useState(null); // State untuk menyimpan data pasien

  // Ambil data pasien berdasarkan ID
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await fetchPatientDetail(medicalRecordNumber); // Sesuaikan dengan endpoint backend
        setPatient(response.data);
      } catch (error) {
        console.error("Error fetching patient:", error);
      }
    };

    fetchPatient();
  }, [medicalRecordNumber]);

  const handleDelete = async (medicalRecordNumber) => {
    try {
      await deletePatient(medicalRecordNumber); // Panggil API untuk hapus pasien
      setPatient(null); // Reset state karena pasien sudah dihapus
      alert("Pasien berhasil dihapus");
      navigate('/patients'); // Navigasi kembali ke halaman pasien
    } catch (error) {
      console.error("Error deleting patient:", error);
      alert("Gagal menghapus pasien");
    }
  };
  

  const goEdit = () => {
    navigate(`/patients/edit/${medicalRecordNumber}`)
  };

  if (!patient) {
    return <div>Data Pasien Tidak di Temukan </div>;
  }
  return (
    <div className="container mt-5 is-centered">
      <h1 className="title">Detail Pasien</h1>
      <table className="table is-fullwidth is-striped">
        <thead style={{ backgroundColor: '#f5f5f5', color: '#363636' }}>
          <tr>
            <th>No.RM</th>
            <th>Nama</th>
            <th>Umur</th>
            <th>Jenis Kelamin</th>
            <th>Keluhan</th>
            <th>Riwayat Penyakit</th>
            <th>Golongan Darah</th>
            <th>Nama Keluarga</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody style={{ backgroundColor: '#f0f8ff' }}>
            <tr key={patient.medicalRecordNumber}>
              <td>{patient.medicalRecordNumber}</td>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
              <td>{patient.gender}</td>
              <td>{patient.complaint}</td>
              <td>{patient.medicalHistory}</td>
              <td>{patient.bloodGroup}</td>
              <td>{patient.familyName}</td>
              <td>
                <button
                  onClick={goEdit}
                  className="button is-small is-info">
                  <FontAwesomeIcon icon={faEdit} size="lg" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(patient.medicalRecordNumber)}
                  className="button is-small is-danger ml-2">
                    <FontAwesomeIcon icon={faTrash} size="lg" />
                  Hapus
                </button>
              </td>
            </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PatientDetail