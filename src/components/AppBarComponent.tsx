import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom'
import { Paths } from '../paths';

const AppBarComponent = () => {

    const stylesLink = {
        textDecoration: 'none',
        color: 'inherit'
    }

    return (
        <AppBar
            style={{
                boxShadow: '0 0 2rem 0 rgba(0, 0, 0, .2)',
                backgroundColor: 'rgba(100, 100, 100, 0.25)',
                backdropFilter: 'blur(6px)',
                minWidth: '100vw'
            }}
            position="static"
        >
            <Toolbar style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Link to={Paths.home} style={stylesLink}>
                        <Typography
                            variant="h6"
                            component="div"
                            style={{ flexGrow: 1, textDecoration: 'none' }}
                        >
                            TodoList
                        </Typography>
                    </Link>
                </div>
                <div>
                    <Link to={Paths.login} style={stylesLink}>
                        <Button color="inherit">Login</Button>
                    </Link>
                    <Link to={Paths.register} style={stylesLink}>
                        <Button color="inherit">Register</Button>
                    </Link>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default AppBarComponent;