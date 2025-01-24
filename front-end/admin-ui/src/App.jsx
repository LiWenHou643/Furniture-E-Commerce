import { createTheme, ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
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
            main: '#B33F68FF',
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
                        {/* The AppLayout will wrap around these routes */}
                        <Route element={<AppLayout />}>
                            <Route path='/' element={<DashBoard />} />
                            <Route path='/orders' element={<Orders />} />
                            <Route path='/products' element={<Products />} />
                            <Route
                                path='/products/categories'
                                element={<Categories />}
                            />
                            <Route
                                path='/products/brands'
                                element={<Brands />}
                            />
                            <Route
                                path='/products/materials'
                                element={<Materials />}
                            />

                            <Route path='*' element={<NotFoundPage />} />
                        </Route>
                        <Route path='/login' element={<LoginPage />} />
                    </Routes>
                </Router>
                <ReactQueryDevtools initialIsOpen={false} />
                <Toaster />
            </QueryClientProvider>
        </ThemeProvider>
    );
}

export default App;
