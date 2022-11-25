import { 
    Button,
    MdModeEdit
} from "@mui/material";
function JobOffer(props) {
    return (
      <li
        onClick={() => {
          props.onViewJobOffer(props.jobOffer);
        }}
      >
        <div>
          <h3 >{props.jobOffer.title} - {props.jobOffer.place}</h3>
          <div>
            <Button
              className='addButton'
              onClick={(e) => {
                e.stopPropagation();
                props.onEditJobOffer(props.jobOffer, props.index);
              }}
            >
                Modifier
            </Button>
            <Button
              className='addButton'
              onClick={(e) => {
                e.stopPropagation();
                props.onDeleteJobOffer(props.index, props.jobOffer);
              }}
            >
                Supprimer
            </Button>
          </div>
        </div>
      </li>
    );
  }
  
  export default JobOffer;