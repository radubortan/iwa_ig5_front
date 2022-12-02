import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const Home = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Button
                onClick={() => {
                    navigate('/profile/1');
                }}
            >
                Employer
            </Button>
        </div>
    );
};

export default Home;
