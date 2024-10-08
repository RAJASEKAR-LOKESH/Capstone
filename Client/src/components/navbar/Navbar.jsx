import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { useMediaQuery } from '@mui/material';

function Navbar() {
    const { user, logout, loading } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const location = useLocation(); // Get the current route

    if (loading) {
        return null;  // Don't show the Navbar while loading
    }

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // Check if the current route is the login page
    const isLoginPage = location.pathname === '/login';

    return (
        <AppBar position='static'>
            <Toolbar>
                <IconButton edge='start' color='inherit' aria-label='menu' onClick={handleMenuOpen}>
                    <MenuIcon />
                </IconButton>
                <Typography variant='h6' style={{ flexGrow: 1 }}>
                    Event Booking
                </Typography>

                {/* Render directly in Navbar if on Login Page */}
                {isLoginPage ? (
                    <>
                        <Button color='inherit' component={Link} to="/login">Login</Button>
                        <Button color='inherit' component={Link} to="/register">Register</Button>
                    </>
                ) : (
                    <>
                        {isSmallScreen ? (
                            // Show only Events, Dashboard, and Logout on small screens
                            <>
                                {user && (
                                    <>
                                        <Button color='inherit' component={Link} to="/events">Events</Button>
                                        {user.role=='user' ?(<Button color='inherit' component={Link} to="/dashboard">Dashboard</Button>):(<></>)}
                                        <Button color='inherit' onClick={logout}>Logout</Button>
                                    </>
                                )}
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                >
                                    {user ? (
                                        <>
                                            <MenuItem onClick={handleMenuClose}>
                                                <Button color='inherit' component={Link} to="/newEvent">Create Event</Button>
                                            </MenuItem>
                                            {user.role === 'organizer' && (
                                                <MenuItem onClick={handleMenuClose}>
                                                    <Button color="inherit" component={Link} to="/organizerdashboard">Dashboard</Button>
                                                </MenuItem>
                                            )}
                                            {user.role === 'admin' && (
                                                <>
                                                    <MenuItem onClick={handleMenuClose}>
                                                        <Button color="inherit" component={Link} to="/eventApproval">Event Approval</Button>
                                                    </MenuItem>
                                                    <MenuItem onClick={handleMenuClose}>
                                                        <Button color="inherit" component={Link} to="/analytics">Admin Dashboard</Button>
                                                    </MenuItem>
                                                </>
                                            )}
                                            <MenuItem onClick={handleMenuClose}>
                                                <Button color='inherit' component={Link} to="/profile">Profile</Button>
                                            </MenuItem>
                                        </>
                                    ) : (
                                        <>
                                            <MenuItem onClick={handleMenuClose}>
                                                <Button color='inherit' component={Link} to="/login">Login</Button>
                                            </MenuItem>
                                            <MenuItem onClick={handleMenuClose}>
                                                <Button color='inherit' component={Link} to="/register">Register</Button>
                                            </MenuItem>
                                        </>
                                    )}
                                </Menu>
                            </>
                        ) : (
                            // Show all buttons on larger screens
                            <>
                                {user ? (
                                    <>
                                        <Button color='inherit' component={Link} to="/events">Events</Button>
                                        <Button color='inherit' component={Link} to="/newEvent">Create Event</Button>
                                        {/* Show User Dashboard only if the role is 'user' */}
                                        {user.role === 'user' && (
                                            <Button color='inherit' component={Link} to="/dashboard">Dashboard</Button>
                                        )}
                                        {/* Show Organizer Dashboard only if the role is 'organizer' */}
                                        {user.role === 'organizer' && (
                                            <Button color="inherit" component={Link} to="/organizerdashboard">Dashboard</Button>
                                        )}
                                        {/* Show Admin Dashboard only if the role is 'admin' */}
                                        {user.role === 'admin' && (
                                            <>
                                                <Button color="inherit" component={Link} to="/eventApproval">Event Approval</Button>
                                                <Button color="inherit" component={Link} to="/analytics">Dashboard</Button>
                                            </>
                                        )}
                                        <Button color='inherit' component={Link} to="/profile">Profile</Button>
                                        <Button color='inherit' onClick={logout}>Logout</Button>
                                    </>
                                ) : (
                                    <>
                                        <Button color='inherit' component={Link} to="/login">Login</Button>
                                        <Button color='inherit' component={Link} to="/register">Register</Button>
                                    </>
                                )}
                            </>
                        )}
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
