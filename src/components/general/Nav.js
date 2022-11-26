import React from 'react';
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
