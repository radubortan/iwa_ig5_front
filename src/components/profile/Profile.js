import React, { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';
import userService from '../../services/userService';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Container, Typography, Box, Button } from '@mui/material';
import { convertEpochDate } from '../../util/date';
import RatingsContainer from '../ratings/RatingsContainer';

const Profile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        phoneNumber: '',
        lastName: '',
        firstName: '',
        address: '',
        birthday: null,
        companyName: '',
    });
    const { id } = useParams();
    const user = useUser();

    //get user id from navigations

    const fetchProfileInfo = async () => {
        const role = await userService.getUserRole(id, user.accessToken);
        //if the request fails, we redirect to a 404
        if (role.code === 'ERR_BAD_REQUEST') {
            navigate('/404');
            return;
        }
        let profileInfo;
        if (role.name === 'ROLE_EMPLOYER') {
            profileInfo = await userService.getEmployerById(
                id,
                user.accessToken
            );
        } else {
            profileInfo = await userService.getCandidateById(
                id,
                user.accessToken
            );
        }
        setProfile({
            role: role.name,
            ...profileInfo,
        });
    };

    useEffect(() => {
        fetchProfileInfo();
    }, [id]);

    return (
        <Container
            sx={{
                mt: 5,
                display: 'flex',
                flexDirection: 'column',
                gap: '50px',
            }}
        >
            <Card
                sx={{
                    p: 5,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '10px',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: '10px',
                    }}
                >
                    <Typography sx={{ m: 0, p: 0 }} variant='h3' gutterBottom>
                        {profile.role === 'ROLE_EMPLOYER'
                            ? profile.companyName
                            : `${profile.firstName} ${profile.lastName}`}
                    </Typography>
                    <Typography variant='p' gutterBottom>
                        {`Type : ${
                            profile.role === 'ROLE_EMPLOYER'
                                ? 'Entreprise'
                                : 'Candidat'
                        }`}
                    </Typography>
                    {profile.role === 'ROLE_CANDIDATE' && (
                        <Typography variant='p' gutterBottom>
                            {`Date de naissance : ${convertEpochDate(
                                Date.parse(profile.birthday)
                            )}`}
                        </Typography>
                    )}
                    <Typography variant='p' gutterBottom>
                        {`Phone number : ${profile.phoneNumber}`}
                    </Typography>
                    {profile.role === 'ROLE_EMPLOYER' && (
                        <Typography variant='p' gutterBottom>
                            {`Adresse : ${profile.address}`}
                        </Typography>
                    )}
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                    }}
                >
                    {/* edit button only shown if the user is visualising their own profile */}
                    {user.accountId === id && (
                        <Button
                            variant='contained'
                            onClick={() => navigate('/profile/edit')}
                        >
                            Editer mes informations
                        </Button>
                    )}
                    {profile.role === 'ROLE_CANDIDATE' && (
                        <Button
                            variant='contained'
                            onClick={() => {
                                // TO DO: navigate to the CV page
                                navigate('/');
                            }}
                        >
                            Voir CV
                        </Button>
                    )}
                </Box>
            </Card>

            <RatingsContainer role={profile.role} />
        </Container>
    );
};

export default Profile;
