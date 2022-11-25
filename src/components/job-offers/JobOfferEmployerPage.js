import { useState } from "react";
import JobOfferDetail from "./JobOfferDetail";
import JobOfferList from "./JobOfferList";

const JobOfferEmployerPage = (props) => {
    const jobOfferList = [
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
            <h1>Mes offres d'emploi</h1>
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
