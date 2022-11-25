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
import { Alert, CircularProgress } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SignupPage = (props) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    //spinner state
    const [isLoading, setIsLoading] = useState(false);

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

    const [errorMessage, setErrorMessage] = useState('');

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

    //checks if the password is valid and set the error message in case it isn't
    const isPasswordValid = () => {
        if (isTextFieldEmpty(password) || isTextFieldEmpty(confirmPassword)) {
            setPasswordErrorMessage(t('FIELD_CANNOT_BE_EMPTY'));
            return false;
        } else if (password !== confirmPassword) {
            setPasswordErrorMessage(t('PASSWORDS_DONT_MATCH'));
            return false;
        } else if (password.length < 8) {
            setPasswordErrorMessage(t('PASSWORD_TOO_SHORT'));
            return false;
        }
        setPasswordErrorMessage('');
        return true;
    };

    //checks which fields are invalid
    const checkValidity = () => {
        resetValidity();

        //needed because react updates state asynchronously
        let companyNameV = true;
        let addressV = true;
        let birthdayV = true;
        let firstNameV = true;
        let lastNameV = true;
        let emailV = true;
        let phoneNumberV = true;
        let passwordV = true;

        if (accountType === 'employer') {
            if (isTextFieldEmpty(companyName)) {
                companyNameV = false;
                setCompanyNameValid(false);
            }
            if (isTextFieldEmpty(address)) {
                addressV = false;
                setAddressValid(false);
            }
        } else {
            if (birthday === null) {
                birthdayV = false;
                setBirthdayValid(false);
            }
            if (isTextFieldEmpty(firstName)) {
                firstNameV = false;
                setFirstNameValid(false);
            }
            if (isTextFieldEmpty(lastName)) {
                lastNameV = true;
                setLastNameValid(false);
            }
        }
        if (!isEmailFieldValid(email)) {
            emailV = false;
            setEmailValid(false);
        }
        if (isTextFieldEmpty(phoneNumber)) {
            phoneNumberV = false;
            setPhoneNumberValid(false);
        }
        if (!isPasswordValid()) {
            passwordV = false;
            setPasswordValid(false);
        }

        if (accountType === 'employer') {
            return (
                companyNameV && addressV && phoneNumberV && emailV && passwordV
            );
        } else {
            return (
                firstNameV &&
                lastNameV &&
                birthdayV &&
                phoneNumberV &&
                emailV &&
                passwordV
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        if (checkValidity()) {
            setIsLoading(true);
            if (accountType === 'employer') {
                try {
                    await registrationService.registerEmployer(
                        email,
                        password,
                        address,
                        companyName,
                        phoneNumber
                    );
                    navigate('/login');
                } catch (error) {
                    setIsLoading(false);
                    const statusCode = error.response.status;
                    if (statusCode === 409) {
                        setErrorMessage(t('EMAIL_ALREADY_TAKEN'));
                    } else {
                        setErrorMessage(t('PROBLEM'));
                    }
                }
            } else {
                try {
                    await registrationService.registerCandidate(
                        email,
                        password,
                        lastName,
                        firstName,
                        birthday,
                        phoneNumber
                    );
                    navigate('/login');
                } catch (error) {
                    setIsLoading(false);
                    const statusCode = error.response.status;
                    if (statusCode === 409) {
                        setErrorMessage(t('EMAIL_ALREADY_TAKEN'));
                    } else {
                        setErrorMessage(t('PROBLEM'));
                    }
                }
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
                    {t('SIGNUP')}
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
                                    {t('YOU_ARE')}
                                </InputLabel>
                                <Select
                                    labelId='demo-simple-select-label'
                                    id='demo-simple-select'
                                    value={accountType}
                                    label={t('YOU_ARE')}
                                    onChange={(event) => {
                                        resetValidity();
                                        setAccountType(event.target.value);
                                    }}
                                >
                                    <MenuItem value={'candidate'}>
                                        {t('CANDIDATE')}
                                    </MenuItem>
                                    <MenuItem value={'employer'}>
                                        {t('EMPLOYER')}
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
                                                ? t('FIELD_CANNOT_BE_EMPTY')
                                                : ''
                                        }
                                        required
                                        fullWidth
                                        id='companyName'
                                        label={t('COMPANY_NAME')}
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
                                                ? t('FIELD_CANNOT_BE_EMPTY')
                                                : ''
                                        }
                                        required
                                        fullWidth
                                        id='address'
                                        label={t('ADDRESS')}
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
                                                ? t('FIELD_CANNOT_BE_EMPTY')
                                                : ''
                                        }
                                        autoComplete='given-name'
                                        name='firstName'
                                        required
                                        fullWidth
                                        id='firstName'
                                        label={t('FIRST_NAME')}
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
                                                ? t('FIELD_CANNOT_BE_EMPTY')
                                                : ''
                                        }
                                        required
                                        fullWidth
                                        id='lastName'
                                        label={t('LAST_NAME')}
                                        name={'lastName'}
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
                                            inputFormat='DD/MM/YYYY'
                                            error
                                            label={t('DATE_OF_BIRTH')}
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
                                                    fontSize: '0.75rem',
                                                    color: '#d32f2f',
                                                    textAlign: 'left',
                                                    paddingLeft: '14px',
                                                    marginTop: '3px',
                                                    fontFamily: 'Helvetica',
                                                    marginBottom: '0',
                                                }}
                                            >
                                                {t('FIELD_CANNOT_BE_EMPTY')}
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
                                                ? t('FIELD_CANNOT_BE_EMPTY')
                                                : ''
                                        }
                                        required
                                        fullWidth
                                        id='phoneNumber'
                                        label={t('PHONE_NUMBER')}
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
                                        label={t('EMAIL_ADDRESS')}
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
                                        label={t('PASSWORD')}
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
                                        label={t('CONFIRM_PASSWORD')}
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
                        disabled={isLoading}
                    >
                        {t('SIGNUP')}
                    </Button>
                    {errorMessage.length > 0 && (
                        <Alert sx={{ mb: 1 }} severity='error'>
                            {errorMessage}
                        </Alert>
                    )}
                    <Grid container justifyContent='center'>
                        <Grid item>
                            <Link
                                variant='body2'
                                to='/login'
                                component={RouterLink}
                            >
                                {t('ALREADY_HAVE_ACCOUNT')}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            {isLoading && <CircularProgress />}
        </Container>
    );
};

export default SignupPage;
