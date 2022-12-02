import React from 'react';

import { Modal, Box, Typography, Button, Divider } from '@mui/material';
import { useState } from 'react';

const ConfirmationModal = (props) => {
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
        <Modal open={props.open} onClose={props.handleClose}>
            <Box sx={style}>
                <Typography id='modal-modal-title' variant='h6' component='h2'>
                    {props.children}
                </Typography>
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
                        onClick={props.handleDelete}
                    >
                        {props.yes}
                    </Button>
                    <Button
                        variant='contained'
                        color='error'
                        onClick={props.onClose}
                    >
                        {props.no}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ConfirmationModal;
