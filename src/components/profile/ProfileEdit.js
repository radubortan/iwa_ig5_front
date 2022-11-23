import React, { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';
import userService from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import { Card, Container, Button, Grid, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { isTextFieldEmpty } from '../../util/validation';
import { CircularProgress } from '@mui/material';

const ProfileEdit = () => {
    const navigate = useNavigate();
    //spinner state
    const [isLoading, setIsLoading] = useState(false);

    const [profile, setProfile] = useState({
        phoneNumber: '',
        lastName: '',
        firstName: '',
        address: '',
        birthday: null,
        companyName: '',
    });
    const user = useUser();

    const [firstNameValid, setFirstNameValid] = useState(true);
    const [lastNameValid, setLastNameValid] = useState(true);
    const [phoneNumberValid, setPhoneNumberValid] = useState(true);
    const [companyNameValid, setCompanyNameValid] = useState(true);
    const [addressValid, setAddressValid] = useState(true);
    const [birthdayValid, setBirthdayValid] = useState(true);

    //checks which fields are invalid
    const checkValidity = () => {
        resetValidity();

        //needed because react updates state asynchronously
        let companyNameV = true;
        let addressV = true;
        let birthdayV = true;
        let firstNameV = true;
        let lastNameV = true;
        let phoneNumberV = true;

        if (user.accountType === 'ROLE_EMPLOYER') {
            if (isTextFieldEmpty(profile.companyName)) {
                companyNameV = false;
                setCompanyNameValid(false);
            }
            if (isTextFieldEmpty(profile.address)) {
                addressV = false;
                setAddressValid(false);
            }
        } else {
            if (profile.birthday === null) {
                birthdayV = false;
                setBirthdayValid(false);
            }
            if (isTextFieldEmpty(profile.firstName)) {
                firstNameV = false;
                setFirstNameValid(false);
            }
            if (isTextFieldEmpty(profile.lastName)) {
                lastNameV = true;
                setLastNameValid(false);
            }
        }
        if (isTextFieldEmpty(profile.phoneNumber)) {
            phoneNumberV = false;
            setPhoneNumberValid(false);
        }

        if (user.accountType === 'ROLE_EMPLOYER') {
            return companyNameV && addressV && phoneNumberV;
        } else {
            return firstNameV && lastNameV && birthdayV && phoneNumberV;
        }
    };

    //sets all fiels as valid
    const resetValidity = () => {
        setFirstNameValid(true);
        setLastNameValid(true);
        setPhoneNumberValid(true);
        setCompanyNameValid(true);
        setAddressValid(true);
        setBirthdayValid(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (checkValidity()) {
            setIsLoading(true);
            if (user.accountType === 'ROLE_EMPLOYER') {
                try {
                    await userService.updateEmployer(
                        user.accountId,
                        profile,
                        user.accessToken
                    );
                } catch (error) {
                    setIsLoading(false);
                }
            } else {
                try {
                    await userService.updateCandidate(
                        user.accountId,
                        profile,
                        user.accessToken
                    );
                } catch (error) {
                    setIsLoading(false);
                }
            }
            navigate(`/profile/${user.accountId}`);
        }
    };

    const fetchProfileInfo = async () => {
        const role = await userService.getUserRole(
            user.accountId,
            user.accessToken
        );
        //if the request fails, we redirect to a 404
        if (role.code === 'ERR_BAD_REQUEST') {
            navigate('/404');
            return;
        }
        let profileInfo;
        if (role.name === 'ROLE_EMPLOYER') {
            profileInfo = await userService.getEmployerById(
                user.accountId,
                user.accessToken
            );
        } else {
            profileInfo = await userService.getCandidateById(
                user.accountId,
                user.accessToken
            );
        }
        setProfile({
            role: role.name,
            ...profileInfo,
        });
    };

    //fetches profile info when the component loads
    useEffect(() => {
        fetchProfileInfo();
    }, []);

    return (
        <Container sx={{ mt: 5 }} maxWidth='xs'>
            <Card
                sx={{
                    p: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px',
                }}
                component='form'
                onSubmit={handleSubmit}
            >
                <Grid container spacing={2}>
                    {profile.role === 'ROLE_CANDIDATE' && (
                        <>
                            <Grid item xs={12}>
                                <TextField
                                    error={!firstNameValid}
                                    helperText={
                                        !firstNameValid
                                            ? 'Le champ ne peut pas être vide'
                                            : ''
                                    }
                                    value={profile.firstName}
                                    onChange={(event) => {
                                        setProfile((prev) => {
                                            return {
                                                ...prev,
                                                firstName: event.target.value,
                                            };
                                        });
                                    }}
                                    fullWidth
                                    id='firstName'
                                    label='Prénom'
                                    name='firstName'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={!lastNameValid}
                                    helperText={
                                        !lastNameValid
                                            ? 'Le champ ne peut pas être vide'
                                            : ''
                                    }
                                    value={profile.lastName}
                                    onChange={(event) => {
                                        setProfile((prev) => {
                                            return {
                                                ...prev,
                                                lastName: event.target.value,
                                            };
                                        });
                                    }}
                                    fullWidth
                                    id='lastName'
                                    label='Nom'
                                    name='lastName'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                >
                                    <DatePicker
                                        inputFormat='DD/MM/YYYY'
                                        error
                                        label='Date de naissance'
                                        value={profile.birthday}
                                        onChange={(date) => {
                                            setProfile((prev) => {
                                                return {
                                                    ...prev,
                                                    birthday: date,
                                                };
                                            });
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
                                            Le champ ne peut pas être vide
                                        </p>
                                    )}
                                </LocalizationProvider>
                            </Grid>
                        </>
                    )}

                    {profile.role === 'ROLE_EMPLOYER' && (
                        <>
                            <Grid item xs={12}>
                                <TextField
                                    error={!companyNameValid}
                                    helperText={
                                        !companyNameValid
                                            ? 'Le champ ne peut pas être vide'
                                            : ''
                                    }
                                    value={profile.companyName}
                                    fullWidth
                                    id='companyName'
                                    label='Nom entreprise'
                                    name='companyName'
                                    onChange={(event) => {
                                        setProfile((prev) => {
                                            return {
                                                ...prev,
                                                companyName: event.target.value,
                                            };
                                        });
                                    }}
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
                                    value={profile.address}
                                    fullWidth
                                    id='address'
                                    label='Adresse'
                                    name='address'
                                    onChange={(event) => {
                                        setProfile((prev) => {
                                            return {
                                                ...prev,
                                                address: event.target.value,
                                            };
                                        });
                                    }}
                                />
                            </Grid>
                        </>
                    )}
                    <Grid item xs={12}>
                        <TextField
                            error={!phoneNumberValid}
                            helperText={
                                !phoneNumberValid
                                    ? 'Le champ ne peut pas être vide'
                                    : ''
                            }
                            fullWidth
                            value={profile.phoneNumber}
                            onChange={(event) => {
                                setProfile((prev) => {
                                    return {
                                        ...prev,
                                        phoneNumber: event.target.value,
                                    };
                                });
                            }}
                            id='phoneNumber'
                            label='Numéro de téléphone'
                            name='phoneNumber'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            disabled={isLoading}
                            // onClick={() => handleSubmit()}
                        >
                            Enregistrer
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant='contained'
                            color='error'
                            onClick={() =>
                                navigate(`/profile/${user.accountId}`)
                            }
                        >
                            Annuler
                        </Button>
                    </Grid>
                </Grid>
            </Card>
            {isLoading && <CircularProgress />}
        </Container>
    );
};

export default ProfileEdit;
