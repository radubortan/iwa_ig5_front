import React from 'react';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useTranslation } from 'react-i18next';
import LanguageIcon from '@mui/icons-material/Language';
import i18next from 'i18next';
import PersonIcon from '@mui/icons-material/Person';

const pagesCandidate = ['Offres', 'Mes candidatures', 'Notifications'];
const pagesEmployer = ['Mes Offres'];

const Nav = () => {
    const { t } = useTranslation();

    const user = useUser();
    const navigate = useNavigate();

    return (
        <nav
            className='navbar-expand-lg navbar navbar-dark'
            style={{ backgroundColor: '#1565c0' }}
        >
            <a
                className='navbar-brand'
                href='#'
                onClick={() => {
                    navigate('/');
                }}
            >
                FSJ
            </a>
            <button
                className='navbar-toggler'
                type='button'
                data-toggle='collapse'
                data-target='#navbarNavDropdown'
                aria-controls='navbarNavDropdown'
                aria-expanded='false'
                aria-label='Toggle navigation'
            >
                <span className='navbar-toggler-icon'></span>
            </button>
            <div
                className='collapse navbar-collapse justify-content-between'
                id='navbarNavDropdown'
            >
                <ul className='navbar-nav'>
                    <li className='nav-item '>
                        <a className='nav-link' href='#'>
                            {t('HOME')}
                        </a>
                    </li>
                    <li className='nav-item '>
                        <a className='nav-link' href='/job-offer'>
                            {t('JOB_OFFERS')}
                        </a>
                    </li>
                </ul>
                <ul className='navbar-nav'>
                    <li className='nav-item dropdown'>
                        <a
                            className='nav-link dropdown-toggle'
                            href='#'
                            id='languageDropdown'
                            data-toggle='dropdown'
                            aria-haspopup='true'
                            aria-expanded='false'
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '2px',
                                justifyContent: 'center',
                            }}
                        >
                            <LanguageIcon sx={{ fontSize: '20px' }} />{' '}
                            {t('LANGUAGE')}
                        </a>
                        <div
                            className='dropdown-menu'
                            aria-labelledby='languageDropdown'
                        >
                            <a
                                className='dropdown-item'
                                href='#'
                                onClick={() => {
                                    i18next.changeLanguage('fr');
                                }}
                            >
                                {t('FRENCH')}
                            </a>
                            <a
                                className='dropdown-item'
                                href='#'
                                onClick={() => {
                                    i18next.changeLanguage('en');
                                }}
                            >
                                {t('ENGLISH')}
                            </a>
                        </div>
                    </li>
                    <li className='nav-item dropdown'>
                        <a
                            className='nav-link dropdown-toggle'
                            href='#'
                            id='profileDropdown'
                            data-toggle='dropdown'
                            aria-haspopup='true'
                            aria-expanded='false'
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '2px',
                                justifyContent: 'center',
                            }}
                        >
                            <PersonIcon />
                            {t('PROFILE')}
                        </a>
                        <div
                            className='dropdown-menu'
                            aria-labelledby='profileDropdown'
                        >
                            <a
                                className='dropdown-item'
                                href='#'
                                onClick={() => {
                                    navigate(`/profile/${user.accountId}`);
                                }}
                            >
                                {t('MY_PROFILE')}
                            </a>
                            <a
                                className='dropdown-item'
                                href='#'
                                onClick={() => navigate('/profile/edit')}
                            >
                                {t('SETTINGS')}
                            </a>
                            <a
                                className='dropdown-item'
                                href='#'
                                onClick={() => {
                                    user.signOut();
                                    navigate('/');
                                }}
                            >
                                {t('SIGNOUT')}
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Nav;
=======
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

const pagesCandidate = ['Offres', 'Mes candidatures', 'Notifications'];
const pagesEmployer = ['Mes Offres'];
const settings = ['Mon Profil', 'Paramètres', 'Déconnexion'];

const Nav = () => {
    const isLoggedIn = true;
    const accountType = 'candidate';

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
                    <Typography
                        variant='h6'
                        noWrap
                        component='a'
                        href='/'
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
                            {accountType === 'candidate' &&
                                pagesCandidate.map((page) => (
                                    <MenuItem
                                        key={page}
                                        onClick={handleCloseNavMenu}
                                    >
                                        <Typography textAlign='center'>
                                            {page}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            {accountType == 'employer' &&
                                pagesEmployer.map((page) => (
                                    <Button
                                        key={page}
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
                        component='a'
                        href=''
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
                        FSB
                    </Typography>

                    {/* nav elements full screen */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        {accountType === 'candidate' &&
                            pagesCandidate.map((page) => (
                                <Button
                                    key={page}
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
                        {accountType == 'employer' &&
                            pagesEmployer.map((page) => (
                                <Button
                                    key={page}
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
                    {!isLoggedIn && (
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title='Open settings'>
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    sx={{ p: 0 }}
                                >
                                    <Avatar alt='Remy Sharp' />
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
                                {settings.map((setting) => (
                                    <MenuItem
                                        key={setting}
                                        onClick={handleCloseUserMenu}
                                    >
                                        <Typography textAlign='center'>
                                            {setting}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Nav;
>>>>>>> bf0df47 (feat(): add navbar from radu)
