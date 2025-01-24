import BarChartIcon from '@mui/icons-material/BarChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { NavLink } from 'react-router-dom';

export function Sidebar() {
    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
        { text: 'Orders', icon: <ShoppingCartIcon />, path: '/orders' },
        { text: 'Customers', icon: <PeopleIcon />, path: '/customers' },
        { text: 'Products', icon: <BarChartIcon />, path: '/products' },
    ];

    return (
        <Drawer variant='permanent' anchor='left'>
            <List>
                {menuItems.map((item, index) => (
                    <ListItem
                        key={index}
                        component={NavLink}
                        to={item.path}
                        style={({ isActive }) => ({
                            textDecoration: 'none',
                            color: isActive ? 'blue' : 'inherit',
                            backgroundColor: isActive
                                ? '#f0f0f0'
                                : 'transparent',
                        })}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}
