import { useState } from "react";
import { Modal,
    Grid,
    Card,
    TextField,
    Button
 } from "@mui/material";
import { Fragment } from "react";
import jobOfferService from "../../../services/jobOfferService";

const AddJobOffer = (props) => {
    const [newJobOffer, setNewJobOffer] = useState({
        title: '',
        description: '',
        beginningDate: '',
        endingDate: '',
        place: '',
        numberPositions: 0,
        remuneration: 0,
        publishingDate: '',
        idEmployer: 'props.idEmployer'
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
                    <form method='post' onSubmit={saveJobOffer}>
                        <div className='col-5'>
                            <div className="row">
                                <TextField 
                                id="standard-basic" 
                                name="title"
                                label="Titre" 
                                variant="standard" 
                                value={jobOfferService.title}
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
                                value={jobOfferService.description}
                                onChange={handleChange}
                                />
                            </div>
                            <div className="row">
                                <p>Date de début</p>
                                <TextField
                                type="date"
                                name="beginningDate"
                                label=""
                                value={jobOfferService.beginningDate}
                                onChange={handleChange}
                                />
                            </div>
                            <div className="row">
                                <p>Date de fin</p>
                                <TextField
                                type="date"
                                name="endingDate"
                                label=""
                                value={jobOfferService.endingDate}
                                onChange={handleChange}
                                />
                            </div>
                            <div className="row">
                                <TextField 
                                id="standard-basic" 
                                name="place"
                                label="Lieu" 
                                variant="standard"
                                value={jobOfferService.place}
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
                                value={jobOfferService.numberPositions}
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
                                value={jobOfferService.remuneration}
                                onChange={handleChange}
                                />
                            </div>
                            <div className="row">
                                <p>Date de publication</p>
                                <TextField
                                type="date"
                                name="publishingDate"
                                label=""
                                value={jobOfferService.publishingDate}
                                onChange={handleChange}
                                />
                            </div>
                        </div>  
                    </form>
                    <div>
                        <Button onClick={saveJobOffer}>
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

export default AddJobOffer;