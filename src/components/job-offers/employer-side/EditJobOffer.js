import { useState } from "react";
import { Modal,
    Grid,
    Card,
    TextField,
    Button
 } from "@mui/material";

const EditJobOffer = (props) => {
    const [updatedJobOffer, setUpdatedJobOffer] = useState({
        title: props.jobOfferInfo.jobOffer.title,
        description: props.jobOfferInfo.jobOffer.description,
        beginningDate: props.jobOfferInfo.jobOffer.beginningDate,
        endingDate: props.jobOfferInfo.jobOffer.endingDate,
        place: props.jobOfferInfo.jobOffer.place,
        numberPositions: props.jobOfferInfo.jobOffer.numberPositions,
        remuneration: props.jobOfferInfo.jobOffer.remuneration,
        publishingDate: props.jobOfferInfo.jobOffer.publishingDate,
        idEmployer: 'props.idEmployer'
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
            <Grid
                container
                spacing={24}
                justify="center"
                style={{ minHeight: '100vh', maxWidth: '100%' }}
                >
                    <Grid item xs={3} align="center">
  
                <Card>
                    <h1>Création d'une offre d'emploi</h1>
                    {error && <p className="red">Veuillez remplir tous les champs</p>}
                    <form method='post' onSubmit={updateJobOffer}>
                        <div className='col-5'>
                            <div className="row">
                                <TextField 
                                id="standard-basic" 
                                name="title"
                                label="Titre" 
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
                                label="Description" 
                                variant="standard" 
                                value={updatedJobOffer.description}
                                onChange={handleChange}
                                />
                            </div>
                            <div className="row">
                                <p>Date de début</p>
                                <TextField
                                type="date"
                                name="beginningDate"
                                label=""
                                value={updatedJobOffer.beginningDate}
                                onChange={handleChange}
                                />
                            </div>
                            <div className="row">
                                <p>Date de fin</p>
                                <TextField
                                type="date"
                                name="endingDate"
                                label=""
                                value={updatedJobOffer.endingDate}
                                onChange={handleChange}
                                />
                            </div>
                            <div className="row">
                                <TextField 
                                id="standard-basic" 
                                name="place"
                                label="Lieu" 
                                variant="standard"
                                value={updatedJobOffer.place}
                                onChange={handleChange}
                                />
                            </div>
                            <div className="row">
                                <TextField 
                                id="standard-basic" 
                                name="numberPositions"
                                label="Nombre de postes" 
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
                                label="Rémunération"
                                variant="standard"
                                type="number"
                                value={updatedJobOffer.remuneration}
                                onChange={handleChange}
                                />
                            </div>
                            <div className="row">
                                <p>Date de publication</p>
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
                            Confirmer
                        </Button>
                        <Button onClick={props.onClose}>
                            Annuler
                        </Button>
                    </div>
                </Card>
                </Grid>
            </Grid>
        </Modal>
    )
}

export default EditJobOffer;