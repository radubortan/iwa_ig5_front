import { 
    Button,
    ListItem,
    MdModeEdit
} from "@mui/material";
import { useTranslation } from "react-i18next";
function JobOffer(props) {
    const {t} = useTranslation();
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
                {t('EDIT')}
            </Button>
            <Button
              className='addButton'
              onClick={(e) => {
                e.stopPropagation();
                props.onDeleteJobOffer(props.index, props.jobOffer);
              }}
            >
                {t('DELETE')}
            </Button>
          </div>}
        </div>
      </ListItem>
    );
  }
  
  export default JobOffer;