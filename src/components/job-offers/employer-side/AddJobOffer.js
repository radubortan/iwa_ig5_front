import { useState } from "react";
import { Modal,
    Grid,
    Card,
    TextField,
    Button,
    Container
 } from "@mui/material";
 import { useTranslation } from "react-i18next";

const AddJobOffer = (props) => {
    const {t} = useTranslation();
    const [newJobOffer, setNewJobOffer] = useState({
        title: '',
        description: '',
        beginningDate: '',
        endingDate: '',
        place: '',
        numberPositions: 0,
        remuneration: 0,
        publishingDate: ''
    });

    
    const handleChange = (e) => {
        const value = e.target.value;
        setNewJobOffer({
            ...newJobOffer,
            [e.target.name]: value,
        });
    };

    const [error, setError] = useState(false)

    const isValid = () => {
        setError(false)
        let isValid = true;

        if (newJobOffer.title.trim() === '') {
            setError(true)
            isValid = false;
        }
        if (newJobOffer.description.trim() === '') {
            setError(true)
            isValid = false;
        }
        if(newJobOffer.beginningDate == ''){
            setError(true)
            isValid = false;
        }
        if(newJobOffer.endingDate == ''){
            setError(true)
            isValid = false;
        }
        if(newJobOffer.place.trim() == ''){
            setError(true)
            isValid = false;
        }
        if(newJobOffer.numberPositions == ''){
            setError(true)
            isValid = false;
        }
        if(newJobOffer.remuneration == ''){
            setError(true)
            isValid = false;
        }
        if(newJobOffer.publishingDate == ''){
            setError(true)
            isValid = false;
        }
        return isValid;
    };

    const saveJobOffer = (e) => {
        e.preventDefault();
        // Validation
        if (isValid()) {
            props.onClose();
            props.addJobOffer(newJobOffer);
        }
    };

    return (
        <Modal  open={props.open} onClose={props.onClose}>

            <Container>

                <Card>
                    <h1>{"CREATE_JOB_OFFER"}</h1>
                    {error && <p className="red">{t('PLEASE_FILL_FIELDS')}</p>}
                    <form method='post' onSubmit={saveJobOffer}>
                        <div className='col-5'>
                            <div className="row">
                                <TextField 
                                id="standard-basic" 
                                name="title"
                                label={t('TITLE')}
                                variant="standard" 
                                value={newJobOffer.title}
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
                                value={newJobOffer.description}
                                onChange={handleChange}
                                />
                            </div>
                            <div className="row">
                                <p>{t('BEGINNING_DATE')}</p>
                                <TextField
                                type="date"
                                name="beginningDate"
                                label=""
                                value={newJobOffer.beginningDate}
                                onChange={handleChange}
                                />
                            </div>
                            <div className="row">
                                <p>{t('ENDING_DATE')}</p>
                                <TextField
                                type="date"
                                name="endingDate"
                                label=""
                                value={newJobOffer.endingDate}
                                onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className='col-5'>
                            <div className="row">
                                <TextField 
                                id="standard-basic" 
                                name="place"
                                label={t('PLACE')}
                                variant="standard"
                                value={newJobOffer.place}
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
                                value={newJobOffer.numberPositions}
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
                                value={newJobOffer.remuneration}
                                onChange={handleChange}
                                />
                            </div>
                            <div className="row">
                                <p>{t('PUBLISHING_DATE')}</p>
                                <TextField
                                type="date"
                                name="publishingDate"
                                label=""
                                value={newJobOffer.publishingDate}
                                onChange={handleChange}
                                />
                            </div>
                        </div>  
                    </form>
                    <div>
                        <Button onClick={saveJobOffer}>
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

export default AddJobOffer;