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

    const [emailValid, setEmailValid] = useState(true);
    const [firstNameValid, setFirstNameValid] = useState(true);
    const [lastNameValid, setLastNameValid] = useState(true);
    const [phoneNumberValid, setPhoneNumberValid] = useState(true);
    const [companyNameValid, setCompanyNameValid] = useState(true);
    const [addressValid, setAddressValid] = useState(true);
    const [birthdayValid, setBirthdayValid] = useState(true);

    const [passwordValid, setPasswordValid] = useState(true);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

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
        return true;
    };

    const checkValidity = () => {
        resetValid();
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
        if (isTextFieldEmpty(phoneNumber)) {
            setPhoneNumberValid(false);
        }
        if (!isPasswordValid()) {
            setPasswordValid(false);
        }
    };

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

    const resetValid = () => {
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
                                        resetValid();
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
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                            </>
                        )}

                        {accountType && (
                            <>
                                <Grid item xs={12}>
                                    <TextField
                                        error={!phoneNumberValid}
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
