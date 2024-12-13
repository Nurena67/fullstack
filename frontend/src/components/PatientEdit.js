import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchPatientDetail, updatePatient } from '../services/api';

const PatientEdit = () => {
    const navigate = useNavigate();
    const { medicalRecordNumber } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        bloodGroup: '',
        complaint: '',
        medicalHistory: '',
        familyName: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getPatientById();
    }, []);

    const getPatientById = async () => {
        try {
            const response = await fetchPatientDetail(medicalRecordNumber);
            setFormData(response.data);
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch patient data.");
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updatePatient(medicalRecordNumber, formData);
            alert("Data pasien berhasil diperbarui");
            navigate('/patients');
        } catch (error) {
            console.error("Error updating patient data:", error);
            alert("Gagal memperbarui data pasien");
        }
    };

    const back = () => {
        navigate('/patients');
    };

    if (loading) {
        return <div>Memuat data pasien...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

return (
    <div className="container mt-5 is-centered">
    <div className="colums is-half">
      <h1 className="title">Form Edit Patient</h1>
      <form onSubmit={handleSubmit}>
      <div className="field">
                <label className="label">Nama Lengkap</label>
                <div className="control">
                    <input
                        className="input"
                        name='name'
                        type="text"
                        placeholder="Nama Lengkap"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div className="field">
                <label className="label">Umur</label>
                <div className="control">
                    <input
                        className="input"
                        name='age'
                        type="number"
                        placeholder="Umur"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        min={1}
                    />
                </div>
            </div>

            <div className="field">
                <label className="label">Jenis Kelamin</label>
                <div className="control">
                    <div className="select">
                        <select
                        name='gender' 
                        value={formData.gender}
                        onChange={handleChange}
                        required
                        >
                            <option value="">Pilih Jenis Kelamin</option>
                            <option value="Laki-laki">Laki-laki</option>
                            <option value="Perempuan">Perempuan</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="field">
                <label className="label">Keluhan</label>
                <div className="control">
                    <textarea
                        className="textarea"
                        name='complaint'
                        placeholder="Masukkan Keluhan Anda Di sini"
                        value={formData.complaint}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div className="field">
                <label className="label">Riwayat Penyakit</label>
                <div className="control">
                    <textarea
                        className="textarea"
                        name='medicalHistory'
                        placeholder="Masukkan Riwayat Penyakit Anda Jika Ada"
                        value={formData.medicalHistory}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="field">
                <label className="label">Golongan Darah</label>
                <div className="control">
                    <div className="select">
                        <select 
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleChange}

                        >
                            <option value="">Pilih Golongan Darah Anda</option>
                            <option value="A">A</option>
                            <option value="AB">AB</option>
                            <option value="B">B</option>
                            <option value="O">O</option>
                            <option value="Tidak Tahu"> Tidak Tahu </option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="field">
                <label className="label">Nama Keluarga</label>
                <div className="control">
                    <input
                        className="input"
                        name='familyName'
                        type="text"
                        placeholder="Nama Keluarga"
                        value={formData.familyName}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div className="field is-grouped mb-6">
                <div className="control">
                    <button className="button is-link" type="submit">
                        Update
                    </button>
                </div>
                <div className="control">
                    <button onClick={back} className="button is-link is-light" type="button">
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    </div>
    </div>
);
};

export default PatientEdit;
