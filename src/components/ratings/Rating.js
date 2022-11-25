import { Typography, Link, Box } from '@mui/material';
import React from 'react';
import { Card } from '@mui/material';
import { Rating as MuiRating } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import { convertYyyymmddToDdmmyyyy } from '../../util/date';
import { useTranslation } from 'react-i18next';

const Rating = (props) => {
    const { t } = useTranslation();
    const { rating, role } = props;
    const navigate = useNavigate();

    return (
        <Card
            sx={{
                p: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '15px',
                width: '80%',
            }}
        >
            <Link
                onClick={() => {
                    navigate(`/profile/${rating.sender.id}`);
                }}
            >
                <Typography style={{ fontSize: '1.2rem' }}>
                    {rating.sender.firstName &&
                        role == 'ROLE_EMPLOYER' &&
                        `${rating.sender.firstName} ${rating.sender.lastName}`}
                    {rating.sender.companyName &&
                        role === 'ROLE_CANDIDATE' &&
                        `${rating.sender.companyName}`}
                </Typography>
            </Link>

            <Box sx={{ display: 'flex' }} style={{ fontSize: '1.2rem' }}>
                <MuiRating
                    name='half-rating-read'
                    defaultValue={2.5}
                    precision={0.5}
                    readOnly
                    value={rating.value}
                />
                <Box sx={{ ml: '10px', color: 'gray' }}>{`${t(
                    'DATE_ON'
                )} ${convertYyyymmddToDdmmyyyy(rating.date)}`}</Box>
            </Box>
            <Typography style={{ fontSize: '1.1rem', textAlign: 'left' }}>
                {rating.comment}
            </Typography>
        </Card>
    );
};

export default Rating;
