import {Menu as MenuIcon} from '@mui/icons-material';
import {useTheme} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {NavLink} from 'react-router-dom';

export default function Header() {
  const theme = useTheme();
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          sx={{
            marginRight: theme.spacing(2)
          }}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{flexGrow: 1}}>
          Stepful: Coach 1-on-1
        </Typography>
        <Button component={NavLink} to="/coaches" color="inherit">
          Coaches
        </Button>
        <Button component={NavLink} to="/students" color="inherit">
          Students
        </Button>
      </Toolbar>
    </AppBar>
  );
}
