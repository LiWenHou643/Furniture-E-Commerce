import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppLayout from './components/AppLayout';
const theme = createTheme();

function App() {
    return (
        <ThemeProvider theme={theme}>
            <AppLayout />
        </ThemeProvider>
    );
}

export default App;
