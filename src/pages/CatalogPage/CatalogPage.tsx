import CarsList from '../../components/CarsList/CarsList';
import Filters from '../../components/Filters/Filters';

export default function CatalogPage() {
  return (
    <>
      <h1 className="visually-hidden">Catalog of cars</h1>
      <Filters />
      <CarsList />
    </>
  );
}
