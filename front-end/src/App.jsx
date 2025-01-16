import { ThemeProvider, createTheme } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import ScrollToTop from './components/ScrollToTop';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import { ArticleDetailPage, NewsPage } from './pages/NewsPage';
import NotFoundPage from './pages/NotFoundPage';
import OrdersPage from './pages/OrdersPage';
import PaymentCancelledPage from './pages/PaymentCancelPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductPage from './pages/ProductPage';
import ProfilePage from './pages/ProfilePage';
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
const queryClient = new QueryClient();

function App() {
    return (
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <ScrollToTop />
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
                            <Route
                                path='/checkout'
                                element={<CheckoutPage />}
                            />
                            {/* Login Page */}
                            <Route path='/login' element={<LoginPage />} />
                            {/* Register Page */}
                            <Route
                                path='/register'
                                element={<RegisterPage />}
                            />
                            {/* Profile Page */}
                            <Route path='/profile' element={<ProfilePage />} />
                            {/* News Page */}
                            <Route path='/news' element={<NewsPage />} />
                            {/* Article Detail Page */}
                            <Route
                                path='/news/:id'
                                element={<ArticleDetailPage />}
                            />
                            {/* Orders Page */}
                            <Route path='/orders' element={<OrdersPage />} />

                            {/* Cancelled Payment Page */}
                            <Route
                                path='/orders/:id/paypal/cancel'
                                element={<PaymentCancelledPage />}
                            />
                            {/* 404 Page */}
                            <Route path='*' element={<NotFoundPage />} />
                        </Route>
                    </Routes>
                </Router>
                <ReactQueryDevtools initialIsOpen={false} />
                <Toaster />
            </QueryClientProvider>
        </ThemeProvider>
    );
}

export default App;
