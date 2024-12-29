import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductPage from './pages/ProductPage';
import RegisterPage from './pages/RegisterPage';

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
                        {/* Cart Page */}
                        <Route path='/cart' element={<CartPage />} />
                        {/* Checkout Page */}
                        <Route path='/checkout' element={<CheckoutPage />} />
                        {/* Login Page */}
                        <Route path='/login' element={<LoginPage />} />
                        {/* Register Page */}
                        <Route path='/register' element={<RegisterPage />} />

                        {/* 404 Page */}
                        <Route path='*' element={<NotFoundPage />} />
                    </Route>
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
