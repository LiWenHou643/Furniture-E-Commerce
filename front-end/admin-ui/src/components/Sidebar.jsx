import BarChartIcon from '@mui/icons-material/BarChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LivingIcon from '@mui/icons-material/Living';
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
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export function Sidebar() {
    const theme = useTheme();
    const [openProducts, setOpenProducts] = useState(false);

    const menuItems = [
        { id: 1, text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
        {
            id: 2,
            text: 'Orders',
            icon: <ShoppingCartIcon />,
            path: '/orders-management',
        },
        {
            id: 3,
            text: 'Products',
            icon: <LivingIcon />,
            path: '/products-management',
            hasSubMenu: true,
        },
        {
            id: 4,
            text: 'Customers',
            icon: <PeopleIcon />,
            path: '/customers-management',
        },
        { id: 5, text: 'Chat', icon: <BarChartIcon />, path: '/chat' },
    ];

    const subTabs = [
        { id: 1, text: 'Products', path: '/products-management/products' },
        { id: 2, text: 'Categories', path: '/products-management/categories' },
        { id: 3, text: 'Brands', path: '/products-management/brands' },
        { id: 4, text: 'Materials', path: '/products-management/materials' },
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
                                color: isActive
                                    ? '#fff'
                                    : theme.palette.secondary.main,
                                backgroundColor: isActive
                                    ? theme.palette.primary.main
                                    : 'transparent',
                            })}
                            onClick={() =>
                                item.hasSubMenu &&
                                setOpenProducts(!openProducts)
                            }
                        >
                            <ListItemIcon
                                sx={{
                                    color: 'inherit',
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
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
                                                    ? theme.palette.primary.main
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
