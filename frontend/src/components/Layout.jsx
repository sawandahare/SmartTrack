import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Badge,
} from '@mui/material';

import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  Assessment as ReportIcon,
  Logout as LogoutIcon,
  Inventory2 as Inventory2Icon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

const Layout = ({ children, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Inventory List', icon: <InventoryIcon />, path: '/inventory' },
    { text: 'Reports & Audits', icon: <ReportIcon />, path: '/reports' },
  ];

  /* =======================
     SIDEBAR CONTENT
  ======================== */
  const drawer = (
    <Box
      sx={{
        height: '100%',
        backgroundColor: '#0f172a',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Logo */}
      <Toolbar sx={{ borderBottom: '1px solid #1e293b' }}>
        <Inventory2Icon sx={{ mr: 1, color: '#60a5fa' }} />
        <Typography variant="h6" fontWeight="bold">
          SmartTrack
        </Typography>
      </Toolbar>

      {/* User Info */}
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            p: 2,
            borderRadius: 2,
            backgroundColor: '#1e293b',
          }}
        >
          <Avatar sx={{ bgcolor: '#3b82f6' }}>A</Avatar>
          <Box>
            <Typography fontSize={14} fontWeight={600}>
              Admin User
            </Typography>
            <Typography fontSize={12} color="#94a3b8">
              Administrator
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Navigation */}
      <List sx={{ px: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  setMobileOpen(false);
                }}
                sx={{
                  my: 0.5,
                  borderRadius: 2,
                  color: isActive ? 'white' : '#94a3b8',
                  backgroundColor: isActive ? '#2563eb' : 'transparent',
                  '&:hover': {
                    backgroundColor: '#1e293b',
                    color: 'white',
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: 36 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Logout */}
      <Box sx={{ mt: 'auto', p: 2, borderTop: '1px solid #1e293b' }}>
        <ListItemButton
          onClick={onLogout}
          sx={{
            borderRadius: 2,
            color: '#94a3b8',
            '&:hover': {
              backgroundColor: '#1e293b',
              color: 'white',
            },
          }}
        >
          <ListItemIcon sx={{ color: 'inherit', minWidth: 36 }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* =======================
          TOP APP BAR
      ======================== */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: 'white',
          color: 'text.primary',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" fontWeight={600}>
              {menuItems.find((item) => item.path === location.pathname)?.text ||
                'SmartTrack Inventory'}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton>
              <Badge variant="dot" color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Avatar sx={{ bgcolor: '#6366f1' }}>A</Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      {/* =======================
          DRAWERS
      ======================== */}
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        {/* Mobile */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop */}
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* =======================
          MAIN CONTENT
      ======================== */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          minHeight: '100vh',
          backgroundColor: '#f8fafc',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
