import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PatientsList from "./components/PatientsList";
import PatientDetail from "./components/PatientDetail";
import PatientAdd from "./components/PatientAdd";
import PatientEdit from "./components/PatientEdit";

const App = () => {
  return (<Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/patients" element={<PatientsList />} />
      <Route path="/patients/:medicalRecordNumber" element={<PatientDetail />} /> 
      <Route path="/patients/add" element={<PatientAdd />} /> 
      <Route path="/patients/edit/:medicalRecordNumber" element={<PatientEdit />} /> 
    </Routes>
  </Router>
  )
};

export default App;
