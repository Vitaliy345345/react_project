import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';

const AppBarComponent = () => {
    return (
        <AppBar
            style={{
                boxShadow: '0 0 2rem 0 rgba(0, 0, 0, .2)',
                backgroundColor: 'rgba(100, 100, 100, 0.25)',
                backdropFilter: 'blur(6px)'
            }}
            position="static"
        >
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1 }}
                >
                    TodoList
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    );
};

export default AppBarComponent;