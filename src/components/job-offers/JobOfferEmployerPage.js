import { useState } from "react";
import {
    Button
} from "@mui/material";
import JobOfferDetail from "./JobOfferDetail";
import JobOfferList from "./JobOfferList";
import AddJobOffer from "./employer-side/AddJobOffer"
import EditJobOffer from "./employer-side/EditJobOffer"
import DeleteJobOffer from "./employer-side/DeleteJobOffer"

const JobOfferEmployerPage = (props) => {
    const jobOfferListInit = [
        {
            "title": "Offre 1",
            "description": "description",
            "beginningDate": "2012-04-23T18:25:43.511Z",
            "endingDate": "2012-04-23T18:25:43.511Z",
            "place": "Montpellier",
            "numberPositions": 2,
            "remuneration": 2100,
            "publishingDate": "2012-04-23T18:25:43.511Z",
            "idEmployer": 2    
        },
        {
            "title": "Offre 2",
            "description": "description",
            "beginningDate": "2012-04-23T18:25:43.511Z",
            "endingDate": "2012-04-23T18:25:43.511Z",
            "place": "Montpellier",
            "numberPositions": 2,
            "remuneration": 2100,
            "publishingDate": "2012-04-23T18:25:43.511Z",
            "idEmployer": 2    
        },
        {
            "title": "Offre 3",
            "description": "description",
            "beginningDate": "2012-04-23T18:25:43.511Z",
            "endingDate": "2012-04-23T18:25:43.511Z",
            "place": "Montpellier",
            "numberPositions": 2,
            "remuneration": 2100,
            "publishingDate": "2012-04-23T18:25:43.511Z",
            "idEmployer": 2    
        }
    ]

    const [jobOfferList, setJobOfferList] = useState(jobOfferListInit)

    // Add Job Offer

    const [onAddJobOffer, setOnAddJobOffer] = useState(false);

    const hideAddJobOfferPanel = () => {
      setOnAddJobOffer(false);
    };
  
    const showAddJobOfferPanel = () => {
      setOnAddJobOffer(true);
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

    const deleteJobOffer = (indexJobOffer, idJobOffer) => {
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

    const addJobOffer = (newJobOffer) => {
        setJobOfferList([...jobOfferList, newJobOffer]);
    };
    

    return (
        <div>
            <h1>Mes offres d'emploi</h1>
            <Button
                onClick={showAddJobOfferPanel}
            >
                Ajouter une offre d'emploi
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
