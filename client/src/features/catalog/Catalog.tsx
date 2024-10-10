import { Product } from '../modules/Product';
import ProductList from './ProductList';
import { useEffect, useState } from 'react';
import agent from '../../api/agent';
import LoadingComponent from '../layout/LoadingComponent';

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    agent.catalog
      .lsit()
      .then((products) => setProducts(products))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <LoadingComponent></LoadingComponent>;
  }
  return (
    <>
      <ProductList products={products}></ProductList>
    </>
  );
}
