import JobOffer from "./JobOffer";

const JobOfferList = (props) => {

    return (
        <ul>
            {props.jobOfferList.length === 0 && (
                <p>Aucune offre d'emploi</p>
            )}
            {props.jobOfferList.length !== 0 &&
                props.jobOfferList.map((jobOffer) => (
                <JobOffer
                    key={jobOffer.id}
                    jobOffer={jobOffer}
                    onViewJobOffer={props.onViewJobOffer}
                />
                ))
            }
        </ul>
    )
}

export default JobOfferList;