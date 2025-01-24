import BarChartIcon from '@mui/icons-material/BarChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
    Collapse,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export function Sidebar() {
    const location = useLocation();
    const [openProducts, setOpenProducts] = useState(false);

    const menuItems = [
        { id: 1, text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
        { id: 2, text: 'Orders', icon: <ShoppingCartIcon />, path: '/orders' },
        {
            id: 3,
            text: 'Products',
            icon: <BarChartIcon />,
            path: '/products',
            hasSubMenu: true,
        },
        { id: 4, text: 'Customers', icon: <PeopleIcon />, path: '/customers' },
        { id: 5, text: 'Chat', icon: <BarChartIcon />, path: '/chat' },
    ];

    const subTabs = [
        { id: 1, text: 'Products', path: '/products' },
        { id: 2, text: 'Categories', path: '/products/categories' },
        { id: 3, text: 'Brands', path: '/products/brands' },
        { id: 4, text: 'Materials', path: '/products/materials' },
    ];

    return (
        <Drawer variant='permanent' anchor='left'>
            <List>
                {menuItems.map((item) => (
                    <React.Fragment key={item.id}>
                        <ListItem
                            component={NavLink}
                            to={item.path}
                            style={({ isActive }) => ({
                                textDecoration: 'none',
                                color: isActive ? 'blue' : 'inherit',
                                backgroundColor: isActive
                                    ? '#f0f0f0'
                                    : 'transparent',
                            })}
                            onClick={() =>
                                item.hasSubMenu &&
                                setOpenProducts(!openProducts)
                            }
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                            {item.hasSubMenu &&
                                (openProducts ? (
                                    <ExpandLessIcon />
                                ) : (
                                    <ExpandMoreIcon />
                                ))}
                        </ListItem>

                        {/* Sub-Menu for Products */}
                        {item.hasSubMenu && (
                            <Collapse
                                in={openProducts}
                                timeout='auto'
                                unmountOnExit
                            >
                                <List component='div' disablePadding>
                                    {subTabs.map((subTab) => (
                                        <ListItem
                                            key={subTab.id}
                                            component={NavLink}
                                            to={subTab.path}
                                            style={({ isActive }) => ({
                                                textDecoration: 'none',
                                                color: isActive
                                                    ? 'green'
                                                    : 'inherit',
                                                paddingLeft: '40px',
                                                backgroundColor: isActive
                                                    ? '#e0e0e0'
                                                    : 'transparent',
                                            })}
                                        >
                                            <ListItemText
                                                primary={subTab.text}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Collapse>
                        )}
                    </React.Fragment>
                ))}
            </List>
        </Drawer>
    );
}
