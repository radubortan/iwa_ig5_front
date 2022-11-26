import { List, ListItem } from "@mui/material";
import JobOffer from "./JobOffer";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";

const JobOfferList = (props) => {
    const {t} = useTranslation();
    const onViewModeOnly = props.onViewModeOnly

    return (
        <List>
            {props.jobOfferList.length === 0 && (
                <p>{t('NO_JOB_OFFER_AVAILABLE')}</p>
            )}
            {props.jobOfferList.length !== 0 &&
                props.jobOfferList.map((jobOffer, index) => (
                <Fragment>
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
                    
                </Fragment>
                ))
            }
        </List>
    )
}

export default JobOfferList;