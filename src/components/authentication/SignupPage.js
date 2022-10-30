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

const SignupPage = () => {
    const [accountType, setAccountType] = useState('');

    // contains a Date object
    const [dateOfBirth, setDateOfBirth] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
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

                        {accountType == 'employer' && (
                            <>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id='companyName'
                                        label='Nom entreprise'
                                        name='companyName'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id='address'
                                        label='Adresse'
                                        name='address'
                                    />
                                </Grid>
                            </>
                        )}

                        {accountType == 'candidate' && (
                            <>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete='given-name'
                                        name='firstName'
                                        required
                                        fullWidth
                                        id='firstName'
                                        label='Prénom'
                                        autoFocus
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id='lastName'
                                        label='Nom'
                                        name='lastName'
                                        autoComplete='family-name'
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                    >
                                        <DatePicker
                                            label='Date de naissance'
                                            value={dateOfBirth}
                                            onChange={(newValue) => {
                                                setDateOfBirth(newValue);
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
                                        required
                                        fullWidth
                                        id='phoneNumber'
                                        label='Numéro de téléphone'
                                        name='phoneNumber'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id='email'
                                        label='Email Address'
                                        name='email'
                                        autoComplete='email'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name='password'
                                        label='Mot de passe'
                                        type='password'
                                        id='password'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name='password'
                                        label='Confirmer mot de passe'
                                        type='password'
                                        id='password'
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
