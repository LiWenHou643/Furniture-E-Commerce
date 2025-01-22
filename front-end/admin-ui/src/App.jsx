import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import ScrollToTop from './components/ScrollToTop';
import DashBoard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <ScrollToTop />
                <Routes>
                    {/* The AppLayout will wrap around these routes */}
                    <Route element={<AppLayout />}>
                        {/* Home Page */}
                        <Route path='/' element={<DashBoard />} />

                        {/* Login Page */}
                        <Route path='/login' element={<LoginPage />} />

                        {/* 404 Page */}
                        <Route path='*' element={<NotFoundPage />} />
                    </Route>
                </Routes>
            </Router>
            <ReactQueryDevtools initialIsOpen={false} />
            <Toaster />
        </QueryClientProvider>
    );
}

export default App;
