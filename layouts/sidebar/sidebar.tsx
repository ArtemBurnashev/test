import { Box, Drawer } from '@mui/material';
import React from 'react';

interface SidebarProps {
  toggleDrawer: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  isOpen: boolean;
  width?: number
}

const Sidebar: React.FC<SidebarProps> = ({
  toggleDrawer,
  isOpen,
  children,
  width
}) => (
  <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
    <Box
      sx={{ width: width || 250}}
    >
      {children}
    </Box>
  </Drawer>
);

export default Sidebar;
