import { useState } from "react";
import {
    Button
} from "@mui/material";
import JobOfferDetail from "./JobOfferDetail";
import JobOfferList from "./JobOfferList";
import AddJobOffer from "./employer-side/AddJobOffer"

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
              open={onAddJobOffer}
              addJobOffer={addJobOffer}
            />
          )}
            {onViewJobOffer && (
            <JobOfferDetail
              onClose={hideViewJobOfferPanel}
              open={onViewJobOffer}
              jobOffer={onViewJobOffer}
            />
          )}
            <JobOfferList 
            jobOfferList={jobOfferList}
            onViewJobOffer={showViewJobOfferPanel}
            />
        </div>
    )
}

export default JobOfferEmployerPage;
