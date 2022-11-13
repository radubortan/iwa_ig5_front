import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import axios from 'axios';

const Upload = () => {

    const handleChangeFile = (event) => {
        event.preventDefault();

        var formData = new FormData();
        const file = event.target.files[0];
        formData.append("file", file);

        axios.post(`http://localhost:8080/cv-upload`, formData)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }


    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <div style={{marginTop: '8em'}}>
                <Button style={{ alignSelf: 'center' }} variant="contained" component="label">
                    Importer mon CV
                    <input onChange={handleChangeFile} hidden accept="*" multiple type="file" />
                </Button>
                <p style={{ color: 'grey', fontSize: '15px', marginTop: '30px'}}>Fichier PDF uniquement</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px'}}>
                <p style={{ fontSize: '20px', width: '60%'}}>Pour pouvoir obtenir des offres d'emploi pertinentes, veuillez choisir <strong>3 mots-clés</strong> qui définissent au mieux votre CV :</p>
                <TextField style={{ marginTop: '30px'}} id="outlined-basic" label="Mot-clé" variant="outlined" />
            </div>
        </div>
    )
}

export default Upload;