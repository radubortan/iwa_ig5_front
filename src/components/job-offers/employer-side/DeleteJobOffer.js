
import { 
    Modal, 
    Button ,
    Card
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const DeleteJobOffer = (props) => {
    const {t} = useTranslation();

  return (
    <Modal open={props.open}  onClose={props.onClose}>
        <Card>
            <div className="row">
            <h2>
            {t('CONFIRM_DELETE_JOB_OFFER')}
            </h2>
        </div>
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
        </Card>
    </Modal>
  );
};
export default DeleteJobOffer;