import { Suspense } from 'react';
import Layout from '../components/Layout/Layout';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage/MainPage';
import CatalogPage from '../pages/CatalogPage/CatalogPage';
import CarDetailsPage from '../pages/CarDetailsPage/CarDetailsPage';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Layout>
      <Suspense>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:id" element={<CarDetailsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <Toaster position="top-center" reverseOrder={false} />
    </Layout>
  );
}

export default App;
