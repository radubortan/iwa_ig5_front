import { useState, useUser, useEffect } from "react";
import {
    Button,
    Typography,
    Box
} from "@mui/material";
import JobOfferDetail from "./JobOfferDetail";
import JobOfferList from "./JobOfferList";
import AddJobOffer from "./employer-side/AddJobOffer"
import EditJobOffer from "./employer-side/EditJobOffer"
import DeleteJobOffer from "./employer-side/DeleteJobOffer"
import jobOfferService from "../../services/jobOfferService";
import { useTranslation } from "react-i18next";

const JobOfferEmployerPage = (props) => {
    const {t} = useTranslation();
    const user = {
        id: props.accountId
    }
    const [jobOfferList, setJobOfferList] = useState([])
    const accessToken = "token"
    const fetchJobOffers = async () => {
        const response = await jobOfferService.getJobOffersByIdEmployer(user.id, accessToken)
        if(response){
            setJobOfferList(response)
        }
    }

    useEffect(() => {
        setJobOfferList([]);
        fetchJobOffers();
    }, [props.role]);

    // Add Job Offer

    const [onAddJobOffer, setOnAddJobOffer] = useState(false);

    const hideAddJobOfferPanel = () => {
      setOnAddJobOffer(false);
    };
  
    const showAddJobOfferPanel = () => {
      setOnAddJobOffer(true);
    };

    const addJobOffer = async (newJobOffer) => {
        let response = await jobOfferService.addJobOffer(newJobOffer, user.id, accessToken);
        if(response){
            newJobOffer.idJobOffer = response.idJobOffer;
            setJobOfferList([...jobOfferList, newJobOffer]);
        }
    };

    // Edit Job Offer

    const [onEditJobOffer, setOnEditJobOffer] = useState(null);

    const hideEditJobOfferPanel = () => {
        setOnEditJobOffer(null);
    };

    const showEditJobOfferPanel = (jobOffer, index) => {
        const jobOfferInfo = {
        jobOffer: jobOffer,
        index: index,
        };
        setOnEditJobOffer(jobOfferInfo);
    };

    const editJobOffer = async (editedJobOffer, indexJobOffer) => {
        let response = await jobOfferService.updateJobOffer(editedJobOffer, accessToken)
        const updatedJobOffers = [...jobOfferList];
        updatedJobOffers.splice(indexJobOffer, 1, editedJobOffer);
        setJobOfferList([...updatedJobOffers]);
    };

      // Delete Job Offer

    const [indexJobOfferBeingDeleted, setIndexJobOfferBeingDeleted] =
            useState(null);
    const [jobOfferBeingDeleted, setJobOfferBeingDeleted] = useState(null);

    const hideDeleteJobOfferPanel = () => {
        setIndexJobOfferBeingDeleted(null);
    };

    const showDeleteJobOfferPanel = (indexJobOffer, jobOffer) => {
        setIndexJobOfferBeingDeleted(indexJobOffer);
        setJobOfferBeingDeleted(jobOffer);
    };

    const deleteJobOffer = async (indexJobOffer, idJobOffer) => {
        let response = await jobOfferService.deleteJobOffer(idJobOffer, accessToken)
        const updatedJobOffer = [...jobOfferList];
        updatedJobOffer.splice(indexJobOffer, 1);
        setJobOfferList([...updatedJobOffer]);
    };


    // View Job Offer

    const [onViewJobOffer, setOnViewJobOffer] = useState(null);

    const hideViewJobOfferPanel = () => {
        setOnViewJobOffer(null);
    };
    
    const showViewJobOfferPanel = (jobOffer) => {
    setOnViewJobOffer(jobOffer);
    };
    

    return (
        <div>
            <Typography component='h1' variant='h4'>
                <Box fontWeight="bold" display='inline' by={10}>
                    {t('MY_JOB_OFFERS')}
                </Box>
            </Typography>
            <Button
                onClick={showAddJobOfferPanel} my={2}
            >
               {t('ADD_JOB_OFFER')}
            </Button>
            {onAddJobOffer && (
            <AddJobOffer
              onClose={hideAddJobOfferPanel}
              open={true}
              addJobOffer={addJobOffer}
            />
            )}
            {onEditJobOffer && (
            <EditJobOffer
              onClose={hideEditJobOfferPanel}
              jobOfferInfo={onEditJobOffer}
              open={true}
              editJobOffer={editJobOffer}
              jobOfferList={JobOfferList}
            />
            )}
            {indexJobOfferBeingDeleted !== null && (
            <DeleteJobOffer
              onClose={hideDeleteJobOfferPanel}
              open={true}
              indexJobOffer={indexJobOfferBeingDeleted}
              jobOffer={jobOfferBeingDeleted}
              onDeleteJobOffer={deleteJobOffer}
            />
            )}
            {onViewJobOffer && (
            <JobOfferDetail
              onClose={hideViewJobOfferPanel}
              open={true}
              jobOffer={onViewJobOffer}
            />
            )}
            <JobOfferList
            jobOfferList={jobOfferList}
            onViewJobOffer={showViewJobOfferPanel}
            onEditJobOffer={showEditJobOfferPanel}
            onDeleteJobOffer={showDeleteJobOfferPanel}
            />
        </div>
    )
}

export default JobOfferEmployerPage;
