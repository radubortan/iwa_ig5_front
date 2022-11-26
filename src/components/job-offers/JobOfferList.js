import { List, ListItem } from "@mui/material";
import JobOffer from "./JobOffer";

const JobOfferList = (props) => {
    const onViewModeOnly = props.onViewModeOnly

    return (
        <List>
            {props.jobOfferList.length === 0 && (
                <p>Aucune offre d'emploi</p>
            )}
            {props.jobOfferList.length !== 0 &&
                props.jobOfferList.map((jobOffer, index) => (
                <ListItem disablePadding>
                    {!onViewModeOnly && <JobOffer
                        key={jobOffer.idJobOffer}
                        index={index}
                        jobOffer={jobOffer}
                        onViewJobOffer={props.onViewJobOffer}
                        onEditJobOffer={props.onEditJobOffer}
                        onDeleteJobOffer={props.onDeleteJobOffer}
                    />}
                    {onViewModeOnly && <JobOffer
                        key={jobOffer.idJobOffer}
                        index={index}
                        jobOffer={jobOffer}
                        onViewJobOffer={props.onViewJobOffer}
                        onViewModeOnly
                    />}
                    
                </ListItem>
                ))
            }
        </List>
    )
}

export default JobOfferList;