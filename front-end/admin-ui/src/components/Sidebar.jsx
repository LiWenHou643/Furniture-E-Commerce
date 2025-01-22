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

export function Sidebar() {
    return (
        <Drawer variant='permanent' anchor='left'>
            <List>
                {[
                    { text: 'Dashboard', icon: <DashboardIcon /> },
                    { text: 'Orders', icon: <ShoppingCartIcon /> },
                    { text: 'Customers', icon: <PeopleIcon /> },
                    { text: 'Analytics', icon: <BarChartIcon /> },
                ].map((item, index) => (
                    <ListItem key={index}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}
