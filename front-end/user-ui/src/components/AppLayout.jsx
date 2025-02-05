import { Outlet } from 'react-router-dom';
import ChatBox from './ChatBox';
import Footer from './Footer';
import Header from './Header';

const AppLayout = () => {
    return (
        <div>
            <Header />
            <Outlet />
            <ChatBox />
            <Footer />
        </div>
    );
};

export default AppLayout;
