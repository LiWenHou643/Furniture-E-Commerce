import { createTheme, ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import {
    Navigate,
    Route,
    BrowserRouter as Router,
    Routes,
} from 'react-router-dom';
import AppLayout from './components/AppLayout';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import Brands from './pages/Brands';
import Categories from './pages/Categories';
import DashBoard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import Materials from './pages/Materials';
import NotFoundPage from './pages/NotFoundPage';
import Orders from './pages/Orders';
import Products from './pages/Products';

const queryClient = new QueryClient();

const theme = createTheme({
    palette: {
        primary: {
            main: '#944300FF',
        },
        secondary: {
            main: '#333333',
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <ScrollToTop />
                    <Routes>
                        {/* Public routes */}
                        <Route path='/login' element={<LoginPage />} />

                        {/* Protected routes */}
                        <Route
                            element={
                                <ProtectedRoute>
                                    <AppLayout />
                                </ProtectedRoute>
                            }
                        >
                            <Route path='/' element={<DashBoard />} />
                            <Route
                                path='/orders-management'
                                element={<Orders />}
                            />
                            <Route
                                path='/products-management'
                                element={
                                    <Navigate
                                        to='/products-management/products'
                                        replace
                                    />
                                }
                            />
                            <Route
                                path='/products-management/products'
                                element={<Products />}
                            />
                            <Route
                                path='/products-management/categories'
                                element={<Categories />}
                            />
                            <Route
                                path='/products-management/brands'
                                element={<Brands />}
                            />
                            <Route
                                path='/products-management/materials'
                                element={<Materials />}
                            />
                        </Route>

                        {/* 404 Not Found */}
                        <Route path='*' element={<NotFoundPage />} />
                    </Routes>
                </Router>
                <ReactQueryDevtools initialIsOpen={false} />
                <Toaster />
            </QueryClientProvider>
        </ThemeProvider>
    );
}

export default App;
