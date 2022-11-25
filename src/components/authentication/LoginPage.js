import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { isTextFieldEmpty, isEmailValid } from '../../util/validation';
import { Alert, CircularProgress } from '@mui/material';
import loginService from '../../services/loginService';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useTranslation } from 'react-i18next';

const LoginPage = (props) => {
    const { t } = useTranslation();
    const user = useUser();
    const navigate = useNavigate();

    //spinner state
    const [isLoading, setIsLoading] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [passwordValid, setPasswordValid] = useState(true);

    //email error state
    const [emailValid, setEmailValid] = useState(true);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    //checks which fields are invalid
    const resetValidity = () => {
        setEmailValid(true);
        setPasswordValid(true);
    };

    //sets the validity of the fiels and returns if all of them are valid
    const checkValidity = () => {
        resetValidity();

        //needed because react updates state asynchronously
        let emailV = true;
        let passwordV = true;

        if (!isEmailFieldValid(email)) {
            emailV = false;
            setEmailValid(false);
        }
        if (isTextFieldEmpty(password)) {
            passwordV = false;
            setPasswordValid(false);
        }
        return emailV && passwordV;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (checkValidity()) {
            setIsLoading(true);
            try {
                const data = await loginService.loginUser(email, password);
                user.logIn(data.accountType, data.accessToken, data.accountId);
                navigate('/');
            } catch (error) {
                setIsLoading(false);
                setErrorMessage(t('BAD_EMAIL_OR_PASSWORD'));
            }
        }
    };

    //checks if the value in the email field is valid and sets the error message in case it isn't
    const isEmailFieldValid = (email) => {
        if (isTextFieldEmpty(email)) {
            setEmailErrorMessage(t('FIELD_CANNOT_BE_EMPTY'));
            return false;
        }
        const regexEvaluation = isEmailValid(email);
        setEmailErrorMessage(t('INVALID_EMAIL'));
        return regexEvaluation.validity;
    };

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    {t('LOGIN')}
                </Typography>
                <Box
                    component='form'
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        error={!emailValid}
                        helperText={emailErrorMessage}
                        margin='normal'
                        required
                        fullWidth
                        id='email'
                        label={t('EMAIL_ADDRESS')}
                        name='email'
                        autoComplete='email'
                        autoFocus
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                    />
                    <TextField
                        error={!passwordValid}
                        helperText={
                            !passwordValid ? t('FIELD_CANNOT_BE_EMPTY') : ''
                        }
                        margin='normal'
                        required
                        fullWidth
                        name='password'
                        label={t('PASSWORD')}
                        type='password'
                        id='password'
                        autoComplete='current-password'
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                    />
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        sx={{ mt: 3, mb: 2 }}
                        disabled={isLoading}
                    >
                        {t('LOGIN')}
                    </Button>
                    {errorMessage.length > 0 && (
                        <Alert sx={{ mb: 1 }} severity='error'>
                            {errorMessage}
                        </Alert>
                    )}
                    <Grid container>
                        <Grid item>
                            <Link
                                to='/signup'
                                component={RouterLink}
                                variant='body2'
                            >
                                {t('CREATE_ACCOUNT')}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            {isLoading && <CircularProgress />}
        </Container>
    );
};

export default LoginPage;
