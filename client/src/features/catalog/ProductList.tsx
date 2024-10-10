import { Grid } from '@mui/material';
import { Product } from '../modules/Product';
import ProductCard from './ProductCard';

type Props = {
  products: Product[];
};
export default function ProductList({ products }: Props) {
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid item xs={3} key={product.id}>
          <ProductCard key={product.id} product={product}></ProductCard>
        </Grid>
      ))}
    </Grid>
  );
}
