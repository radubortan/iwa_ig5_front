import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import axios from 'axios';
import { useState } from 'react';

const Upload = () => {

    const [loading, setLoading] = useState(false);
    const [uploaded, setUploaded] = useState(false);

    const handleChangeFile = (event) => {
        event.preventDefault();
        setLoading(true);

        var formData = new FormData();
        const file = event.target.files[0];
        formData.append("file", file);

        axios.post(`http://localhost:8080/cv-upload`, formData)
            .then(res => {
                console.log(res);
                console.log(res.data);
                if(res.data) {
                    setLoading(false);
                    setUploaded(true);
                }
            })
    }


    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '8em' }}>
                <CircularProgress />
            </Box>
        )
    } else {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <div style={{ marginTop: '8em' }}>
                    {uploaded === false ? <Button variant="contained" component="label">
                        Importer mon CV
                        <input onChange={handleChangeFile} hidden accept="*" multiple type="file" />
                    </Button> : <p style={{color: 'green', fontSize: '20px'}}>Le téléchargement de votre CV a réussi !</p>} 
                    <p style={{ color: 'grey', fontSize: '15px', marginTop: '30px' }}>Fichier PDF uniquement</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px' }}>
                    <p style={{ fontSize: '20px', width: '60%' }}>Pour pouvoir obtenir des offres d'emploi pertinentes, veuillez choisir <strong>3 mots-clés</strong> qui définissent au mieux votre CV :</p>
                    <TextField style={{ marginTop: '30px' }} id="outlined-basic" label="Mot-clé" variant="outlined" />
                </div>
            </div>
        )
    }
}

export default Upload;