import Header from '@layout/Header';
import {CssBaseline, ThemeProvider} from '@mui/material';
import theme from '@styles/theme';
import './App.css';
import RoutedComponents from './RoutedComponents';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <RoutedComponents />
    </ThemeProvider>
  );
}

export default App;
