import { Fragment } from "react"
import { useState, useUser, useEffect } from "react";
import jobOfferService from "../../services/jobOfferService";
import JobOfferList from "./JobOfferList";
import JobOfferDetail from "./JobOfferDetail";
import { useTranslation } from "react-i18next";

const JobOfferCandidatePage = (props) => {
    const {t} = useTranslation();
    const user = {
        id: props.accountId
    }
    const [jobOfferList, setJobOfferList] = useState([])
    const accessToken = "token"
    const fetchJobOffers = async () => {
        const response = await jobOfferService.getAllJobOffers(accessToken)
        if(response){
            setJobOfferList(response)
        }
    }

    useEffect(() => {
        setJobOfferList([]);
        fetchJobOffers();
    }, [props.accountId,props.role]);


    const [onViewJobOffer, setOnViewJobOffer] = useState(null);

    const hideViewJobOfferPanel = () => {
        setOnViewJobOffer(null);
    };
    
    const showViewJobOfferPanel = (jobOffer) => {
    setOnViewJobOffer(jobOffer);
    };

    return (
        <Fragment>
            <h1>{t('ALL_JOB_OFFERS')}</h1>
            {onViewJobOffer && (
            <JobOfferDetail
              onClose={hideViewJobOfferPanel}
              open={true}
              jobOffer={onViewJobOffer}
            />)}
            <JobOfferList 
                jobOfferList={jobOfferList}
                onViewModeOnly
                onViewJobOffer={showViewJobOfferPanel}
            />
        </Fragment>
        
    )
}

export default JobOfferCandidatePage;
