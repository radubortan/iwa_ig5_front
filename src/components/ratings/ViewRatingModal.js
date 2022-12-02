import React from 'react';
import { Modal, Box, Typography, Button, Divider } from '@mui/material';
import { Rating as MuiRating } from '@mui/material';
import { convertYyyymmddToDdmmyyyy } from '../../util/date';
import { useState } from 'react';
import ConfirmationModal from '../general/ConfirmationModal';
import { useTranslation } from 'react-i18next';

const ViewRatingModal = (props) => {
    const { t } = useTranslation();
    const { rating } = props;
    const [showDeleteModal, setShowDeleteModal] = useState(false);

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

    return (
        <>
            {showDeleteModal && (
                <ConfirmationModal
                    open={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    yes='Delete'
                    no='Cancel'
                    handleDelete={() => {
                        props.onDelete();
                        setShowDeleteModal(false);
                        props.onClose();
                    }}
                >
                    {t('SURE_DELETE_RATING')}
                </ConfirmationModal>
            )}

            <Modal open={props.open} onClose={props.handleClose}>
                <Box sx={style}>
                    <Typography
                        id='modal-modal-title'
                        variant='h6'
                        component='h2'
                    >
                        {t('MY_RATING')}
                    </Typography>

                    {rating && (
                        <>
                            <Box
                                sx={{ display: 'flex' }}
                                style={{ fontSize: '1.2rem' }}
                            >
                                <MuiRating
                                    name='rating'
                                    precision={0.5}
                                    readOnly
                                    value={rating.value}
                                />
                                {rating.date && (
                                    <Box
                                        sx={{ ml: '10px', color: 'gray' }}
                                    >{`le ${convertYyyymmddToDdmmyyyy(
                                        rating.date
                                    )}`}</Box>
                                )}
                            </Box>
                            {rating.comment && (
                                <>
                                    <Divider />
                                    <Typography sx={{ py: 2 }}>
                                        {rating.comment}
                                    </Typography>
                                </>
                            )}
                        </>
                    )}

                    <Box
                        sx={{
                            display: 'flex',
                            gap: '20px',
                            alignSelf: 'center',
                            mt: 2,
                        }}
                    >
                        <Button
                            variant='contained'
                            color='error'
                            onClick={() => {
                                setShowDeleteModal(true);
                            }}
                        >
                            {t('DELETE')}
                        </Button>
                        <Button
                            variant='contained'
                            color='error'
                            onClick={props.onClose}
                        >
                            {t('CLOSE')}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default ViewRatingModal;
