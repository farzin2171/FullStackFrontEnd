import {
  Card,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  CardHeader,
  Avatar,
} from '@mui/material';
import { Product } from '../modules/Product';
import { useState } from 'react';
import agent from '../../api/agent';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch } from '../../store/configureStore';
import { setBasket } from '../basket/basketSlice';

type Props = {
  product: Product;
  key: number;
};
export default function ProductCard({ product }: Props) {
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  function handleAddItem(productId: number) {
    setLoading(true);
    agent.basket
      .addItem(productId)
      .then((basket) => dispatch(setBasket(basket)))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'secondery.main' }}>
            {product.name.charAt(0).toLocaleUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: { fontWeight: 'bold', color: 'primary.main' },
        }}
      />
      <CardMedia
        sx={{ height: 140 }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5">
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {product.brand}/{product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          loading={loading}
          onClick={() => handleAddItem(product.id)}
          size="small"
        >
          Add To Cart
        </LoadingButton>
        <Button size="small" href={`/catalog/${product.id}`}>
          View
        </Button>
      </CardActions>
    </Card>
  );
}
