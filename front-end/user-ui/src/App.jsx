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
import OrderDetailPage from './pages/OrderDetailPage';
import OrdersPage from './pages/OrdersPage';
import PaymentCancelledPage from './pages/PaymentCancelPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductPage from './pages/ProductPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
const theme = createTheme({
    palette: {
        primary: {
            main: '#944300', // Brown-Orange (Main Color)
        },
        secondary: {
            main: '#333333', // Dark Gray (For Text, Borders)
        },
        background: {
            default: '#FAEBDD', // Light Beige for Chat Background
            paper: '#F5F5F5', // Light Gray for Boxes
        },
        chat: {
            sent: '#944300', // Sent Message Bubble
            received: '#E1B07E', // Received Message Bubble
        },
        accent: {
            main: '#D97043', // Accent Color for Buttons, Highlights
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

                            {/* Order Detail Page */}
                            <Route
                                path='/orders/:id'
                                element={<OrderDetailPage />}
                            />

                            {/* Cancelled Payment Page */}
                            <Route
                                path='/orders/:id/cancel'
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
