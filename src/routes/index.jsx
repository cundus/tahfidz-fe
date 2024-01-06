import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import { ProtectedPage, UnProtectedPage } from "./AuthGuard";
import DataSiswa from "../pages/master/DataSiswa";
import DataGuru from "../pages/master/DataGuru";
import DataOperator from "../pages/master/DataOperator";
import DataTahunAjaran from "../pages/master/DataTahunAjaran";
import DataSekolah from "../pages/master/DataSekolah";
import KelompokHalaqoh from "../pages/halaqoh/KelompokHalaqoh";
import AbsensiSiswa from "../pages/halaqoh/AbsensiSiswa";
import AbsensiGuru from "../pages/halaqoh/AbsensiGuru";

function RoutePage() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <UnProtectedPage>
            <Login />
          </UnProtectedPage>
        }
      />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedPage>
            <Dashboard />
          </ProtectedPage>
        }
      />

      {/* Master Data */}
      <Route
        path="/master-data/data-siswa"
        element={
          <ProtectedPage>
            <DataSiswa />
          </ProtectedPage>
        }
      />
      <Route
        path="/master-data/data-guru"
        element={
          <ProtectedPage>
            <DataGuru />
          </ProtectedPage>
        }
      />
      <Route
        path="/master-data/data-operator"
        element={
          <ProtectedPage>
            <DataOperator />
          </ProtectedPage>
        }
      />
      <Route
        path="/master-data/data-tahun-ajaran"
        element={
          <ProtectedPage>
            <DataTahunAjaran />
          </ProtectedPage>
        }
      />
      <Route
        path="/master-data/data-sekolah"
        element={
          <ProtectedPage>
            <DataSekolah />
          </ProtectedPage>
        }
      />

      {/* Halaqoh */}
      <Route
        path="/halaqoh/kelompok-halaqoh"
        element={
          <ProtectedPage>
            <KelompokHalaqoh />
          </ProtectedPage>
        }
      />
      <Route
        path="/halaqoh/absensi-siswa"
        element={
          <ProtectedPage>
            <AbsensiSiswa />
          </ProtectedPage>
        }
      />
      <Route
        path="/halaqoh/absensi-guru"
        element={
          <ProtectedPage>
            <AbsensiGuru />
          </ProtectedPage>
        }
      />
    </Routes>
  );
}

export default RoutePage;
