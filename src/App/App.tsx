import { lazy, Suspense } from 'react';
import Layout from '../components/Layout/Layout';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const MainPage = lazy(() => import('../pages/MainPage/MainPage'));
const CatalogPage = lazy(() => import('../pages/CatalogPage/CatalogPage'));
const CarDetailsPage = lazy(
  () => import('../pages/CarDetailsPage/CarDetailsPage')
);

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
