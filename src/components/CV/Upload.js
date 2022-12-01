import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import { useUser } from '../../context/UserContext';


import axios from 'axios';
import { useEffect, useState } from 'react';

const Upload = () => {

    const user = useUser();
    const role = user.accountType

    const [loading, setLoading] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    const [displayError, setDisplayError] = useState(false);
    const [listKeywords, setListKeywords] = useState([]);
    const [keyword, setKeyword] = useState("")

    //If a job seeker already uploaded a CV
    const [nameFileCV, setNameFileCV] = useState("");
    const [cvExist, setCvExist] = useState(false);
    const [fileURLCV, setFileURLCV] = useState();
    const [emptyKeyword, setEmptyKeyword] = useState(false)
    const [wasSendKeyword, setWasSendKeyword] = useState(false)
    const [keywordStatus, setKeywordStatus] = useState(false)

    useEffect(() => {
        //A changer avec un appel d'un service qui retourne le nom du fichier associé à l'id du profil
        fetchFileName();
        fetchCV(nameFileCV);
        fetchKeywords();
    }, [nameFileCV])

    function fetchFileName() {
        axios.get(`http://localhost:8080/api/cvs/get-filename/${user.accountId}`)
            .then(res => {
                setNameFileCV(res.data)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleChangeFile = (event) => {
        event.preventDefault();
        setLoading(true);

        var formData = new FormData();
        const file = event.target.files[0];
        formData.append("file", file);

        // ID à remplacer
        axios.post(`http://localhost:8080/api/cvs/cv-upload/${user.accountId}`, formData)
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

    const addKeywords = (event) => {
        if(keyword.length !== 0 && keyword.trim().length !== 0) {
            event.preventDefault()
            setKeyword("")
            let list = [...listKeywords]
            list.push(keyword)
            console.log(list)
            setListKeywords(list)
        } else {
            setEmptyKeyword(true)
        }
    }

    const suppressKeyword = (name) => {
        let list = [...listKeywords]
        let index = listKeywords.indexOf(name)
        list.splice(index, 1)
        setListKeywords(list)
    }

    const sendKeywords = () => {
        setLoading(true)
        let data = listKeywords.join(";")
        console.log(data)
        axios.post(`http://localhost:8080/api/cvs/cv-keywords/${user.accountId}?keywords=${data}`)
            .then(res => {
                if(res.data){
                    setLoading(false)
                    console.log("success")
                    setKeywordStatus(true)
                }
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
                setKeywordStatus(false)
            })
        setWasSendKeyword(true)
    } 

    function fetchKeywords() {
        setLoading(true)
        axios.get(`http://localhost:8080/api/cvs/get-cv-keywords/${user.accountId}`)
            .then(res => {
                if(res.data) {
                    console.log("success")
                    const dataKeywords = res.data
                    const list = dataKeywords.split(";")
                    setListKeywords(list)
                    setLoading(false)
                } 
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

    function fetchCV(fileName) {
        axios.get(`http://localhost:8080/api/cvs/cv-view?fileName=${fileName}`, { responseType: 'blob' })
            .then(res => {
                const blob = new Blob(
                    [res.data],
                    { type: 'application/pdf' }
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
        fetchFileName();
        // Changer l'ID
        axios.get(`http://localhost:8080/api/cvs/cv-delete/${user.accountId}?fileName=${nameFileCV}`)
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
            </div>
        )
    } else {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Button onClick={() => { window.open(fileURLCV) }} style={{ marginTop: '8em' }} variant="contained" component="label">Voir mon CV</Button>
                <Button
                    onClick={() => deleteCV()}
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    style={{ marginTop: '4em', color: 'red', borderColor: 'red' }}
                >
                    Supprimer mon CV
                </Button>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px' }}>
                    <p style={{ fontSize: '20px', width: '60%' }}>Pour pouvoir obtenir des offres d'emploi pertinentes, veuillez choisir des <strong>mots-clés</strong> qui définissent au mieux votre CV :</p>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <TextField value={keyword} onChange={(event) => { setKeyword(event.target.value); setEmptyKeyword(false) }} style={{ marginTop: '30px' }} id="outlined-basic" label="Mot-clé" variant="outlined" />
                        <Button style={{ marginTop: '25px' }} variant="contained" onClick={addKeywords}>Envoyer</Button>
                    </div>
                    {emptyKeyword === true && <p style={{color: 'red'}}>Cannot be empty</p>}
                    <ul style={{ display: 'flex', flexDirection: 'column', marginTop: '30px', gap: '10px', listStyleType: 'none' }}>
                        {listKeywords.map(function (name, index) {
                            return (
                                <div key={index} style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
                                    <li style={{fontSize: '20px'}}>{name}</li>
                                    <Button onClick={() => suppressKeyword(name)} style={{color: 'red', borderColor: 'red'}} variant="outlined" startIcon={<DeleteIcon />}>
                                        Supprimer
                                    </Button>
                                </div>
                            )
                        })}
                    </ul>
                    {listKeywords.length > 0 && 
                        <div>
                            <div>
                            <Button onClick={sendKeywords}>Submit</Button>
                            </div>
                            {wasSendKeyword && <div>
                                {keywordStatus ? <p style={{color: 'green'}}>Keywords successfully sent</p> 
                                : <p style={{color: 'red'}}>Error while sending keywords</p>}
                            </div>}
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default Upload;