import { 
    Button,
    ListItem,
    MdModeEdit
} from "@mui/material";
function JobOffer(props) {
    const onViewModeOnly = props.onViewModeOnly
    return (
      <ListItem
        onClick={() => {
          props.onViewJobOffer(props.jobOffer);
        }}
      >
        <div>
          <div className="col-5">
          <h3 >{props.jobOffer.title} - {props.jobOffer.place}</h3>
          </div>
          {!onViewModeOnly && <div className="col-5">
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
          </div>}
        </div>
      </ListItem>
    );
  }
  
  export default JobOffer;