import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../store/configureStore';
import agent from '../../api/agent';
import { removeItem } from './basketSlice';

export default function BasketPage() {
  const { basket } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

  // function handleAddItem(productId:number,name:string){

  // }

  function handleRemoveItem(productId: number, quantity: number = 1) {
    agent.basket
      .removeItem(productId, quantity)
      .then(() => dispatch(removeItem({ productId, quantity })))
      .catch((error) => console.log(error))
      .finally();
  }

  if (!basket) {
    return <Typography variant="h3">your basket is empty</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {basket.items.map((item) => (
            <TableRow
              key={item.productId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell align="right">
                ${(item.price / 100).toFixed(2)}
              </TableCell>
              <TableCell align="right">{item.quantity}</TableCell>
              <TableCell align="right">
                ${((item.price / 100) * item.quantity).toFixed()}
              </TableCell>
              <TableCell align="right">
                <IconButton
                  color="error"
                  onClick={() => handleRemoveItem(item.productId)}
                >
                  <Delete></Delete>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
