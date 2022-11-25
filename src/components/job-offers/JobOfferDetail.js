import {
    Modal,
    Card
} from '@mui/material';
import { Fragment } from 'react';
const JobOfferDetail = (props) => {
    const jobOffer = props.jobOffer
    return (
        <Modal open={props.open} onClose={props.onClose}>
            <Card>
                <h1>{jobOffer.title}</h1>
                <p>Description: {jobOffer.description}</p>
                <p>Date de début: {jobOffer.beginningDate}</p>
                <p>Date de fin: {jobOffer.endingDate}</p>
                <p>Lieu: {jobOffer.place}</p>
                <p>Nombre de postes: {jobOffer.numberPositions}</p>
                <p>Rémunération: {jobOffer.remuneration}</p>
                <p>Date de publication: {jobOffer.publishingDate}</p>
                <p>Nom Employeur</p>
            </Card>                     
        </Modal>
    )
}

export default JobOfferDetail;