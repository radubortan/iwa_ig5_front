import {
    Modal,
    Card
} from '@mui/material';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
const JobOfferDetail = (props) => {
    const {t} = useTranslation();
    const jobOffer = props.jobOffer
    return (
        <Modal open={props.open} onClose={props.onClose}>
            <Card>
                <h1>{jobOffer.title}</h1>
                <p>{t('DESCRIPTION')}: {jobOffer.description}</p>
                <p>{t('BEGINNING_DATE')}: {jobOffer.beginningDate}</p>
                <p>{t('ENDING_DATE')}: {jobOffer.endingDate}</p>
                <p>{t('PLACE')}: {jobOffer.place}</p>
                <p>{t('NUMBER_POSITIONS')}: {jobOffer.numberPositions}</p>
                <p>{t('REMUNERATION')}: {jobOffer.remuneration}</p>
                <p>{t('PUBLISHING_DATE')}: {jobOffer.publishingDate}</p>
                <p>Nom Employeur</p>
            </Card>                     
        </Modal>
    )
}

export default JobOfferDetail;