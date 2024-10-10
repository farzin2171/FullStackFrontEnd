import { ShoppingCart } from '@mui/icons-material';
import {
  AppBar,
  Box,
  IconButton,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
  Badge,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../store/configureStore';
import SignedInMenu from './SignedInMenu';

const midLink = [
  { title: 'catalog', path: '/catalog' },
  { title: 'about', path: '/about' },
  { title: 'contact', path: '/contact' },
];

const rightLink = [
  { title: 'login', path: '/login' },
  { title: 'register', path: '/register' },
];

type Props = {
  darkMode: boolean;
  handleThemeChange: () => void;
};

export default function Header({ darkMode, handleThemeChange }: Props) {
  const { user } = useAppSelector((state) => state.account);
  const { basket } = useAppSelector((state) => state.basket);

  const itemCount = basket?.items.reduce(
    (sum, item) => sum + item.quantity / 10,
    0
  );

  return (
    <AppBar position="fixed" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={NavLink}
          to="/"
          sx={{ color: 'inherit', textDecoration: 'none' }}
        >
          WebTech Store
        </Typography>
        <Switch checked={darkMode} onChange={handleThemeChange} />
        <List sx={{ display: 'flex' }}>
          {midLink.map(({ title, path }) => (
            <ListItem
              component={NavLink}
              to={path}
              key={path}
              sx={{
                color: 'inherit',
                Typography: 'h6',
                '&:hover': {
                  color: 'secondary.main',
                },
                '&.active': {
                  color: 'text.secondary',
                },
              }}
            >
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>
        <Box sx={{ flexGrow: 1 }} />
        <Box display="flex" alignItems="center">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            href="/basket"
          >
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCart></ShoppingCart>
            </Badge>
          </IconButton>
          {user ? (
            <SignedInMenu></SignedInMenu>
          ) : (
            <List sx={{ display: 'flex' }}>
              {rightLink.map(({ title, path }) => (
                <ListItem
                  component={NavLink}
                  to={path}
                  key={path}
                  sx={{ color: 'inherit', Typography: 'h6' }}
                >
                  {title.toUpperCase()}
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
