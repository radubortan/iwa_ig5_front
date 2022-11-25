
import { 
    Modal, 
    Button ,
    Card
} from '@mui/material';


const DeleteJobOffer = (props) => {

  return (
    <Modal open={props.open}  onClose={props.onClose}>
        <Card>
            <div className="row">
            <h2>
            Voulez vous vraiment supprimer cette offre d'emploi ?
            </h2>
        </div>
        <div>
            <Button
            onClick={() => {
                props.onClose();
                props.onDeleteJobOffer(
                props.indexJobOffer,
                props.jobOffer.id
                );
            }}
            className='cancelButton'
            >
            Supprimer
            </Button>
            <Button className='confirmButton' onClick={props.onClose}>
            Annuler
            </Button>
        </div>
        </Card>
    </Modal>
  );
};
export default DeleteJobOffer;