import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductPage from './pages/ProductPage';

const theme = createTheme({
    palette: {
        primary: {
            main: '#693E05FF', // Customize primary color
        },
        secondary: {
            main: '#FFD900FF', // Customize secondary color
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    {/* The AppLayout will wrap around these routes */}
                    <Route element={<AppLayout />}>
                        {/* Home Page */}
                        <Route path='/' element={<HomePage />} />
                        {/* Dynamic Product Page */}
                        <Route path='/products' element={<ProductPage />} />
                        {/* Dynamic Product Detail Page */}
                        <Route
                            path='/products/:productId'
                            element={<ProductDetailPage />}
                        />
                    </Route>
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
