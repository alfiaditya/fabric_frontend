import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./componets/Login";
import Register from "./componets/Register";
import Users from "./pages/Users";
import UserFormCreate from "./pages/Users/UserFromCreate";
import UserFormEdit from "./pages/Users/UserFormEdit";
import Verifikasi from "./pages/Verifikasi";
import Sapi from "./pages/Sapi";
import AddSapi from "./pages/Sapi/AddSapi";
import PembaruanSapi from "./pages/Sapi/PembaruanSapi";
import FormPembaruan from "./pages/Sapi/FormPembaruan";
import Upload from "./pages/Upload";
import GenerateQr from "./pages/GenerateQr";
import Qr from "./pages/Qr";
import Vaksinasi from "./pages/Vaksinasi";
import Formvaksinasi from "./pages/Sapi/Formvaksinasi";
import Kelayakan from "./pages/Kelayakan";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/tambah" element={<UserFormCreate />} />
          <Route path="/users/edit/:id" element={<UserFormEdit />} />
          <Route path="/verifikasi" element={<Verifikasi />} />
          <Route path="/sapi" element={<Sapi />} />
          <Route path="/sapi/tambah" element={<AddSapi />} />
          <Route path="/pembaruan" element={<PembaruanSapi />} />
          <Route path="/pembaruan/update/:id" element={<FormPembaruan />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/generate" element={<GenerateQr />} />
          <Route path="/generate/:earTag" element={<Qr />} />
          <Route path="/vaksinasi" element={<Vaksinasi />} />
          <Route path="/vaksinasi/update/:id" element={<Formvaksinasi />} />
          <Route path="/kelayakan" element={<Kelayakan />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
