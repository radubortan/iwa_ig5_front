import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import WorkIcon from '@mui/icons-material/Work';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const pagesCandidate = ['Offres', 'Mes candidatures', 'Notifications'];
const pagesEmployer = ['Mes Offres'];

const Nav = () => {
    const user = useUser();
    const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position='static'>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    {/* brand mobile */}
                    <WorkIcon
                        sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
                    />
                    <ReactLink style={{ textDecoration: 'none' }} to='/'>
                        <Typography
                            variant='h6'
                            noWrap
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                // fontFamily: 'monospace',
                                fontWeight: 700,
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            FSB
                        </Typography>
                    </ReactLink>

                    {/* nev elements mobile */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                        }}
                    >
                        <IconButton
                            size='large'
                            aria-label='account of current user'
                            aria-controls='menu-appbar'
                            aria-haspopup='true'
                            onClick={handleOpenNavMenu}
                            color='inherit'
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id='menu-appbar'
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {user.accountType === 'candidate' &&
                                pagesCandidate.map((page) => (
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign='center'>
                                            {page}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            {user.accountType === 'employer' &&
                                pagesEmployer.map((page) => (
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{
                                            my: 2,
                                            color: 'white',
                                            display: 'block',
                                        }}
                                    >
                                        {page}
                                    </Button>
                                ))}
                        </Menu>
                    </Box>

                    {/* brand fullscreen */}
                    <WorkIcon
                        sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
                    />

                    <Typography
                        variant='h5'
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            // fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <ReactLink style={{ textDecoration: 'none' }} to='/'>
                            FSB
                        </ReactLink>
                    </Typography>

                    {/* nav elements full screen */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        {user.accountType === 'candidate' &&
                            pagesCandidate.map((page) => (
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        color: 'white',
                                        display: 'block',
                                    }}
                                >
                                    {page}
                                </Button>
                            ))}
                        {user.accountType === 'employer' &&
                            pagesEmployer.map((page) => (
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        color: 'white',
                                        display: 'block',
                                    }}
                                >
                                    {page}
                                </Button>
                            ))}
                    </Box>

                    {/* dropdown menu on the right */}
                    {user.accountType && (
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title='Open user menu'>
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    sx={{ p: 0 }}
                                >
                                    <Avatar alt='profile icon' />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id='menu-appbar'
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem>
                                    <Typography
                                        textAlign='center'
                                        onClick={() => {
                                            navigate(
                                                `/profile/${user.accountId}`
                                            );
                                        }}
                                    >
                                        Mon profil
                                    </Typography>
                                </MenuItem>
                                <MenuItem>
                                    <Typography
                                        textAlign='center'
                                        onClick={() =>
                                            navigate('/profile/edit')
                                        }
                                    >
                                        Paramètres
                                    </Typography>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        user.signOut();
                                        navigate('/');
                                    }}
                                >
                                    <Typography textAlign='center'>
                                        Déconnexion
                                    </Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Nav;
