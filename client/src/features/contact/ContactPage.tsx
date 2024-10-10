import { Button, ButtonGroup, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/configureStore';
import { decrement, increment } from './counterSlice';

export default function ContactPage() {
  const dispatch = useAppDispatch();
  const { data, title } = useAppSelector((state) => state.counter);

  return (
    <>
      <Typography variant="h2"> {title}</Typography>
      <Typography variant="h5"> data is {data}</Typography>
      <ButtonGroup>
        <Button
          onClick={() => dispatch(increment(5))}
          variant="contained"
          color="error"
        >
          Decrement
        </Button>
        <Button
          onClick={() => dispatch(decrement(2))}
          variant="contained"
          color="primary"
        >
          Encremnt
        </Button>
      </ButtonGroup>
    </>
  );
}
