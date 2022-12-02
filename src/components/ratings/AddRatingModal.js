import React from 'react';
import {
    Modal,
    Box,
    Typography,
    Button,
    TextField,
    Rating,
} from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { t } from 'i18next';

const AddRatingModal = (props) => {
    const [comment, setComment] = useState('');
    const [ratingValue, setRatingValue] = useState(0);
    const [ratingError, setRatingError] = useState(false);
    const user = useUser();
    const { id } = useParams();

    const style = {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: '10px',
        p: 4,
    };

    const handleSubmit = () => {
        if (ratingValue === 0) {
            setRatingError(true);
        } else {
            const rating = {
                value: ratingValue,
                date: new Date(),
                comment: comment,
                idReceiver: id,
            };
            resetValues();
            props.onSubmit(rating);
            props.onClose();
        }
    };

    const handleClose = () => {
        resetValues();
        props.onClose();
    };

    const resetValues = () => {
        setComment('');
        setRatingValue(0);
        setRatingError(false);
    };

    return (
        <Modal open={props.open} onClose={props.handleClose}>
            <Box sx={style}>
                <Typography id='modal-modal-title' variant='h6' component='h2'>
                    {t('ADD_RATING')}
                </Typography>
                <Box>
                    <Rating
                        name='rating'
                        value={ratingValue}
                        onChange={(event, newValue) => {
                            setRatingValue(newValue);
                        }}
                    />
                    {ratingError && (
                        <Typography sx={{ color: '#d32f2f' }}>
                            {t('RATING_MUST_BE_CHOSEN')}
                        </Typography>
                    )}
                </Box>

                <TextField
                    id='outlined-multiline-static'
                    multiline
                    rows={4}
                    placeholder={t('OPTIONAL')}
                    value={comment}
                    onChange={(event) => {
                        setComment(event.target.value);
                    }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        gap: '20px',
                        alignSelf: 'center',
                        mt: 2,
                    }}
                >
                    <Button variant='contained' onClick={handleSubmit}>
                        {t('ADD')}
                    </Button>
                    <Button
                        variant='contained'
                        color='error'
                        onClick={handleClose}
                    >
                        {t('CANCEL')}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddRatingModal;
