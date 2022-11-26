
import { 
    Modal, 
    Button,
    Card,
    Container,
    Box,
    Typography
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const DeleteJobOffer = (props) => {
    const {t} = useTranslation();

  return (
    <Modal open={props.open}  onClose={props.onClose}>
        <Container component='main' maxWidth='xs'>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: "whitesmoke"
                }}
            >  
            <Typography component='h1' variant='h5'>
                <Box fontWeight="bold" display='inline' m={5}>
                {t('CONFIRM_DELETE_JOB_OFFER')}
                </Box>
            </Typography>
            <div>
            <Button
            onClick={() => {
                props.onClose();
                props.onDeleteJobOffer(
                props.indexJobOffer,
                props.jobOffer.idJobOffer
                );
            }}
            className='cancelButton'
            >
            {t('DELETE')}
            </Button>
            <Button className='confirmButton' onClick={props.onClose}>
            {t('CANCEL')}
            </Button>
        </div>

            </Box>
        </Container>
    </Modal>
  );
};
export default DeleteJobOffer;