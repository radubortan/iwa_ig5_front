import React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import registrationService from '../../services/registrationService';
import { isTextFieldEmpty, isEmailValid } from '../../util/validation';

const SignupPage = () => {
    const [accountType, setAccountType] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [address, setAddress] = useState('');
    // contains a Date object
    const [birthday, setBirthday] = useState(null);

    const [firstNameValid, setFirstNameValid] = useState(true);
    const [lastNameValid, setLastNameValid] = useState(true);
    const [phoneNumberValid, setPhoneNumberValid] = useState(true);
    const [companyNameValid, setCompanyNameValid] = useState(true);
    const [addressValid, setAddressValid] = useState(true);
    const [birthdayValid, setBirthdayValid] = useState(true);

    //email error state
    const [emailValid, setEmailValid] = useState(true);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');

    //password error state
    const [passwordValid, setPasswordValid] = useState(true);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

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

    //checks if the password is valid and set the error message in case it isn't
    const isPasswordValid = () => {
        if (isTextFieldEmpty(password) || isTextFieldEmpty(confirmPassword)) {
            setPasswordErrorMessage('Le champ ne peut pas être vide');
            return false;
        } else if (password !== confirmPassword) {
            setPasswordErrorMessage('Les mots de passe ne sont pas les mêmes');
            return false;
        } else if (password.length < 8) {
            setPasswordErrorMessage('Le mot de passe est trop court');
            return false;
        }
        setPasswordErrorMessage('');
        return true;
    };

    //checks which fields are invalid
    const checkValidity = () => {
        resetValidity();
        if (accountType === 'employer') {
            if (isTextFieldEmpty(companyName)) {
                setCompanyNameValid(false);
            }
            if (isTextFieldEmpty(address)) {
                setAddressValid(false);
            }
        } else {
            if (birthday === null) {
                setBirthdayValid(false);
            }
            if (isTextFieldEmpty(firstName)) {
                setFirstNameValid(false);
            }
            if (isTextFieldEmpty(lastName)) {
                setLastNameValid(false);
            }
        }
        if (!isEmailFieldValid(email)) {
            setEmailValid(false);
        }
        if (isTextFieldEmpty(phoneNumber)) {
            setPhoneNumberValid(false);
        }
        if (!isPasswordValid()) {
            setPasswordValid(false);
        }
    };

    //returns if all the fiels are valid
    const areFieldsValid = () => {
        if (accountType === 'employer') {
            return (
                companyNameValid &&
                addressValid &&
                phoneNumberValid &&
                emailValid &&
                passwordValid
            );
        } else {
            return (
                firstNameValid &&
                lastNameValid &&
                birthdayValid &&
                phoneNumberValid &&
                emailValid &&
                passwordValid
            );
        }
    };

    //sets all fiels as valid
    const resetValidity = () => {
        setEmailValid(true);
        setFirstNameValid(true);
        setLastNameValid(true);
        setPhoneNumberValid(true);
        setPasswordValid(true);
        setCompanyNameValid(true);
        setAddressValid(true);
        setBirthdayValid(true);
        setPasswordErrorMessage('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        checkValidity();
        if (areFieldsValid()) {
            if (accountType === 'employer') {
                //request to employer api
            } else {
                //request to candidate api
            }
        }
    };

    return (
        <Container component='main' maxWidth='xs'>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component='h1' variant='h5'>
                    Inscription
                </Typography>
                <Box
                    component='form'
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 3 }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id='demo-simple-select-label'>
                                    Vous êtes
                                </InputLabel>
                                <Select
                                    labelId='demo-simple-select-label'
                                    id='demo-simple-select'
                                    value={accountType}
                                    label='Vous êtes'
                                    onChange={(event) => {
                                        resetValidity();
                                        setAccountType(event.target.value);
                                    }}
                                >
                                    <MenuItem value={'candidate'}>
                                        Chercheur d'emploi
                                    </MenuItem>
                                    <MenuItem value={'employer'}>
                                        Employeur
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {accountType === 'employer' && (
                            <>
                                <Grid item xs={12}>
                                    <TextField
                                        error={!companyNameValid}
                                        helperText={
                                            !companyNameValid
                                                ? 'Le champ ne peut pas être vide'
                                                : ''
                                        }
                                        required
                                        fullWidth
                                        id='companyName'
                                        label='Nom entreprise'
                                        name='companyName'
                                        onChange={(event) =>
                                            setCompanyName(event.target.value)
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        error={!addressValid}
                                        helperText={
                                            !addressValid
                                                ? 'Le champ ne peut pas être vide'
                                                : ''
                                        }
                                        required
                                        fullWidth
                                        id='address'
                                        label='Adresse'
                                        name='address'
                                        onChange={(event) =>
                                            setAddress(event.target.value)
                                        }
                                    />
                                </Grid>
                            </>
                        )}

                        {accountType === 'candidate' && (
                            <>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        error={!firstNameValid}
                                        helperText={
                                            !firstNameValid
                                                ? 'Le champ ne peut pas être vide'
                                                : ''
                                        }
                                        autoComplete='given-name'
                                        name='firstName'
                                        required
                                        fullWidth
                                        id='firstName'
                                        label='Prénom'
                                        autoFocus
                                        onChange={(event) =>
                                            setFirstName(event.target.value)
                                        }
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        error={!lastNameValid}
                                        helperText={
                                            !lastNameValid
                                                ? 'Le champ ne peut pas être vide'
                                                : ''
                                        }
                                        required
                                        fullWidth
                                        id='lastName'
                                        label='Nom'
                                        name='lastName'
                                        autoComplete='family-name'
                                        onChange={(event) =>
                                            setLastName(event.target.value)
                                        }
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                    >
                                        <DatePicker
                                            error
                                            label='Date de naissance'
                                            value={birthday}
                                            onChange={(newValue) => {
                                                setBirthday(newValue);
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    fullWidth
                                                    style={{
                                                        borderRadius: '5px',
                                                        backgroundColor:
                                                            !birthdayValid &&
                                                            '##ffe3e3',
                                                    }}
                                                />
                                            )}
                                        />
                                        {!birthdayValid && (
                                            <p
                                                style={{
                                                    color: 'red',
                                                    fontSize: '0.75rem',
                                                    color: '#d32f2f',
                                                    textAlign: 'left',
                                                    paddingLeft: '14px',
                                                    marginTop: '3px',
                                                    fontFamily: 'Helvetica',
                                                    marginBottom: '0',
                                                }}
                                            >
                                                Le champ ne peut pas être vide
                                            </p>
                                        )}
                                    </LocalizationProvider>
                                </Grid>
                            </>
                        )}

                        {accountType && (
                            <>
                                <Grid item xs={12}>
                                    <TextField
                                        error={!phoneNumberValid}
                                        helperText={
                                            !phoneNumberValid
                                                ? 'Le champ ne peut pas être vide'
                                                : ''
                                        }
                                        required
                                        fullWidth
                                        id='phoneNumber'
                                        label='Numéro de téléphone'
                                        name='phoneNumber'
                                        onChange={(event) =>
                                            setPhoneNumber(event.target.value)
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        error={!emailValid}
                                        helperText={emailErrorMessage}
                                        required
                                        fullWidth
                                        id='email'
                                        label='Email Address'
                                        name='email'
                                        autoComplete='email'
                                        onChange={(event) =>
                                            setEmail(event.target.value)
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        error={!passwordValid}
                                        helperText={passwordErrorMessage}
                                        required
                                        fullWidth
                                        name='password'
                                        label='Mot de passe'
                                        type='password'
                                        id='password'
                                        onChange={(event) =>
                                            setPassword(event.target.value)
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        error={!passwordValid}
                                        helperText={passwordErrorMessage}
                                        required
                                        fullWidth
                                        name='confirmPassword'
                                        label='Confirmer mot de passe'
                                        type='password'
                                        id='confirmPassword'
                                        onChange={(event) =>
                                            setConfirmPassword(
                                                event.target.value
                                            )
                                        }
                                    />
                                </Grid>
                            </>
                        )}
                    </Grid>
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent='center'>
                        <Grid item>
                            <Link href='#' variant='body2'>
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default SignupPage;
