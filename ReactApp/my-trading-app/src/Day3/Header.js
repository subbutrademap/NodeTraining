import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header = ()=> {
    return (
        <AppBar position='static'>
        <Toolbar>
            <IconButton color='inherit'>
                <MenuIcon />
            </IconButton>
            <Typography variant='h5'>Training Site</Typography>
            <Box flexGrow={1} />
            <Typography variant='h6'>Login</Typography>
        </Toolbar>
        </AppBar>

    )
}

export default Header;