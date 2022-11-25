import JobOffer from "./JobOffer";

const JobOfferList = (props) => {

    return (
        <ul>
            {props.jobOfferList.length === 0 && (
                <p>Aucune offre d'emploi</p>
            )}
            {props.jobOfferList.length !== 0 &&
                props.jobOfferList.map((jobOffer, index) => (
                <JobOffer
                    key={jobOffer.id}
                    index={index}
                    jobOffer={jobOffer}
                    onViewJobOffer={props.onViewJobOffer}
                    onEditJobOffer={props.onEditJobOffer}
                    onDeleteJobOffer={props.onDeleteJobOffer}
                />
                ))
            }
        </ul>
    )
}

export default JobOfferList;