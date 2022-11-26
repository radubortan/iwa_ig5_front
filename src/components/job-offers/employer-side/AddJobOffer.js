import { useState } from "react";
import { Modal,
    Grid,
    Card,
    TextField,
    Button,
    Container
 } from "@mui/material";

const AddJobOffer = (props) => {
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
                                label="Description" 
                                variant="standard" 
                                value={newJobOffer.description}
                                onChange={handleChange}
                                />
                            </div>
                            <div className="row">
                                <p>Date de début</p>
                                <TextField
                                type="date"
                                name="beginningDate"
                                label=""
                                value={newJobOffer.beginningDate}
                                onChange={handleChange}
                                />
                            </div>
                            <div className="row">
                                <p>Date de fin</p>
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
                                label="Lieu" 
                                variant="standard"
                                value={newJobOffer.place}
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
                                value={newJobOffer.numberPositions}
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
                                value={newJobOffer.remuneration}
                                onChange={handleChange}
                                />
                            </div>
                            <div className="row">
                                <p>Date de publication</p>
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
                            Confirmer
                        </Button>
                        <Button onClick={props.onClose}>
                            Annuler
                        </Button>
                    </div>
                </Card>
                </Container>

        </Modal>
    )
}

export default AddJobOffer;