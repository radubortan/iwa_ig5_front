import { useState } from "react";
import { Modal,
    Grid,
    Card,
    TextField,
    Button,
    Container
 } from "@mui/material";
import { useTranslation } from "react-i18next";

const EditJobOffer = (props) => {
    const {t} = useTranslation();
    const [updatedJobOffer, setUpdatedJobOffer] = useState({
        idJobOffer: props.jobOfferInfo.jobOffer.idJobOffer,
        title: props.jobOfferInfo.jobOffer.title,
        description: props.jobOfferInfo.jobOffer.description,
        beginningDate: props.jobOfferInfo.jobOffer.beginningDate,
        endingDate: props.jobOfferInfo.jobOffer.endingDate,
        place: props.jobOfferInfo.jobOffer.place,
        numberPositions: props.jobOfferInfo.jobOffer.numberPositions,
        remuneration: props.jobOfferInfo.jobOffer.remuneration,
        publishingDate: props.jobOfferInfo.jobOffer.publishingDate,
    });

    
    const handleChange = (e) => {
        const value = e.target.value;
        setUpdatedJobOffer({
            ...updatedJobOffer,
            [e.target.name]: value,
        });
    };

    const [error, setError] = useState(false)

    const isValid = () => {
        setError(false)
        let isValid = true;

        if (updatedJobOffer.title.trim() === '') {
            setError(true)
            isValid = false;
        }
        if (updatedJobOffer.description.trim() === '') {
            setError(true)
            isValid = false;
        }
        if(updatedJobOffer.beginningDate == ''){
            setError(true)
            isValid = false;
        }
        if(updatedJobOffer.endingDate == ''){
            setError(true)
            isValid = false;
        }
        if(updatedJobOffer.place.trim() == ''){
            setError(true)
            isValid = false;
        }
        if(updatedJobOffer.numberPositions == ''){
            setError(true)
            isValid = false;
        }
        if(updatedJobOffer.remuneration == ''){
            setError(true)
            isValid = false;
        }
        if(updatedJobOffer.publishingDate == ''){
            setError(true)
            isValid = false;
        }
        return isValid;
    };

    const updateJobOffer = (e) => {
        e.preventDefault();
        // Validation
        if (isValid()) {
            props.onClose();
            props.editJobOffer(updatedJobOffer, props.jobOfferInfo.index);
        }
    };

    return (
        <Modal  open={props.open} onClose={props.onClose}>
            <Container>
  
                <Card>
                    <h1>{t('MODIFY_JOB_OFFER')}</h1>
                    {error && <p className="red">{t('PLEASE_FILL_FIELDS')}</p>}
                    <form method='post' onSubmit={updateJobOffer}>
                        <div className='col-5'>
                            <div className="row">
                                <TextField 
                                id="standard-basic" 
                                name="title"
                                label={t('TITLE')}
                                variant="standard" 
                                value={updatedJobOffer.title}
                                onChange={handleChange}
                                />
                            </div>
                            <div className="row">
                                <TextField 
                                multiline
                                maxRows={5}
                                id="standard-basic" 
                                name="description"
                                label={t('DESCRIPTION')} 
                                variant="standard" 
                                value={updatedJobOffer.description}
                                onChange={handleChange}
                                />
                            </div>
                            <div className="row">
                                <p>{t('BEGINNING_DATE')}</p>
                                <TextField
                                type="date"
                                name="beginningDate"
                                label=""
                                value={updatedJobOffer.beginningDate}
                                onChange={handleChange}
                                />
                            </div>
                            <div className="row">
                                <p>{t('ENDING_DATE')}</p>
                                <TextField
                                type="date"
                                name="endingDate"
                                label=""
                                value={updatedJobOffer.endingDate}
                                onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="col-5">
                            <div className="row">
                                <TextField 
                                id="standard-basic" 
                                name="place"
                                label={t('PLACE')}
                                variant="standard"
                                value={updatedJobOffer.place}
                                onChange={handleChange}
                                />
                            </div>
                            <div className="row">
                                <TextField 
                                id="standard-basic" 
                                name="numberPositions"
                                label={t('NUMBER_POSITIONS')}
                                variant="standard" 
                                type="number"
                                value={updatedJobOffer.numberPositions}
                                onChange={handleChange}
                                />
                            </div>
                            <div className="row">
                                <TextField 
                                id="standard-basic"
                                name="remuneration"
                                label={t('REMUNERATION')}
                                variant="standard"
                                type="number"
                                value={updatedJobOffer.remuneration}
                                onChange={handleChange}
                                />
                            </div>
                            <div className="row">
                                <p>{t('PUBLISHING_DATE')}</p>
                                <TextField
                                type="date"
                                name="publishingDate"
                                label=""
                                value={updatedJobOffer.publishingDate}
                                onChange={handleChange}
                                />
                            </div>
                        </div>  
                    </form>
                    <div>
                        <Button onClick={updateJobOffer}>
                            {t('CONFIRM')}
                        </Button>
                        <Button onClick={props.onClose}>
                            {t('CANCEL')}
                        </Button>
                    </div>
                </Card>
               </Container>
        </Modal>
    )
}

export default EditJobOffer;