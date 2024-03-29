import {createTheme} from '@mui/material';

export default createTheme({
  spacing: 10,
  components: {
    MuiStack: {
      defaultProps: {
        useFlexGap: true
      }
    }
  }
});
