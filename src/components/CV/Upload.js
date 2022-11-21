import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';

import axios from 'axios';
import { useEffect, useState } from 'react';

const Upload = () => {

    const [loading, setLoading] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    const [displayError, setDisplayError] = useState(false);

    //If a job seeker already uploaded a CV
    const [nameFileCV, setNameFileCV] = useState("");
    const [cvExist, setCvExist] = useState(false);
    const [fileURLCV, setFileURLCV] = useState();

    useEffect(() => {
        //A changer avec un appel d'un service qui retourne le nom du fichier associé à l'id du profil
        setNameFileCV("CV_Vincent_Baret.pdf");
        fetchCV(nameFileCV);
    }, [nameFileCV])

    const handleChangeFile = (event) => {
        event.preventDefault();
        setLoading(true);

        var formData = new FormData();
        const file = event.target.files[0];
        formData.append("file", file);

        axios.post(`http://localhost:8080/cv-upload`, formData)
            .then(res => {
                if (res.data) {
                    setLoading(false);
                    setDisplayError(false);
                    setUploaded(true);
                    setCvExist(true);
                    fetchCV(file.name);
                }
            })
            .catch(err => {
                setLoading(false);
                setDisplayError(true);
            })
    }

    function fetchCV(fileName){
        axios.get(`http://localhost:8080/cv-view?fileName=${fileName}`, {responseType: 'blob'})
            .then(res => {
                const blob = new Blob(
                    [res.data],
                    {type: 'application/pdf'}
                );
                var fileURL = URL.createObjectURL(blob);
                setFileURLCV(fileURL);
                setCvExist(true);
            })
            .catch(err => {
                console.log(err);
            })
    }

    function deleteCV() {
        console.log(nameFileCV);
        axios.get(`http://localhost:8080/cv-delete?fileName=${nameFileCV}`)
            .then(res => {
                console.log(res.data);
                setUploaded(false);
                setCvExist(false);
            })
            .catch(err => {
                console.log(err);
            })
    }

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '8em' }}>
                <CircularProgress />
            </Box>
        )
    } else if (cvExist === false) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <div style={{ marginTop: '8em' }}>
                    {uploaded === false ? <Button variant="contained" component="label">
                        Importer mon CV
                        <input onChange={handleChangeFile} hidden accept="application/pdf" multiple type="file" />
                    </Button> : <p style={{ color: 'green', fontSize: '20px' }}>Le téléchargement de votre CV a réussi !</p>}

                    {displayError === true && <p style={{ color: 'red', fontSize: '20px' }}>Une erreur est survenue, merci de réessayer.</p>}

                    <p style={{ color: 'grey', fontSize: '15px', marginTop: '30px' }}>Fichier PDF uniquement</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px' }}>
                    <p style={{ fontSize: '20px', width: '60%' }}>Pour pouvoir obtenir des offres d'emploi pertinentes, veuillez choisir <strong>3 mots-clés</strong> qui définissent au mieux votre CV :</p>
                    <TextField style={{ marginTop: '30px' }} id="outlined-basic" label="Mot-clé" variant="outlined" />
                </div>

            </div>
        )
    } else {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Button onClick={() => {window.open(fileURLCV)}} style={{ marginTop: '8em' }} variant="contained" component="label">Voir mon CV</Button>
                <Button 
                    onClick={() => deleteCV()}
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    style={{marginTop: '4em', color: 'red', borderColor: 'red'}}
                    >
                        Supprimer mon CV
                </Button>
            </div>
        )
    }
}

export default Upload;