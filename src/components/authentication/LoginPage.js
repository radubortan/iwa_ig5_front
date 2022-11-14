import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { isTextFieldEmpty, isEmailValid } from '../../util/validation';
import { CircularProgress } from '@mui/material';

const LoginPage = () => {
    //spinner state
    const [isLoading, setIsLoading] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [passwordValid, setPasswordValid] = useState(true);

    //email error state
    const [emailValid, setEmailValid] = useState(true);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');

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

    const handleSubmit = (event) => {
        event.preventDefault();
        if (checkValidity()) {
            setIsLoading(true);
        }
    };

    //checks if the value in the email field is valid and sets the error message in case it isn't
    const isEmailFieldValid = (email) => {
        if (isTextFieldEmpty(email)) {
            setEmailErrorMessage('Le champ ne peut pas être vide');
            return false;
        }
        const regexEvaluation = isEmailValid(email);
        setEmailErrorMessage(regexEvaluation.message);
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
                    Connexion
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
                        label='Adresse mail'
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
                            !passwordValid
                                ? 'Le champ ne peut pas être vide'
                                : ''
                        }
                        margin='normal'
                        required
                        fullWidth
                        name='password'
                        label='Mot de passe'
                        type='password'
                        id='password'
                        autoComplete='current-password'
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                    />
                    {/* <FormControlLabel
                        control={<Checkbox value='remember' color='primary' />}
                        label='Se souvenir de moi'
                    /> */}
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Connexion
                    </Button>
                    <Grid container>
                        {/* <Grid item xs>
                            <Link href='#' variant='body2'>
                                Mot de passe oublié?
                            </Link>
                        </Grid> */}
                        <Grid item>
                            <Link href='#' variant='body2'>
                                {'Créer un compte'}
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
