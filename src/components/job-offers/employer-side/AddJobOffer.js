import { useState } from "react";
import { Modal,
    Grid,
    Card,
    TextField,
    Button,
    Container,
    Box,
    Typography
 } from "@mui/material";
import { useTranslation } from "react-i18next";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

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
        console.log(e)
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
        if(newJobOffer.numberPositions > 0){
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
            <Container component='main' maxWidth='xs'>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: "whitesmoke"
                }}
            >             
                <Typography component='h1' variant='h5'>
                    <Box fontWeight="bold" display='inline' mt={3}>
                        {t('CREATE_JOB_OFFER')}
                    </Box>
                </Typography>

                    {error && <p className="red">{t('PLEASE_FILL_FIELDS')}</p>}
                    <form method='post' onSubmit={saveJobOffer}>
                    <Grid item xs={6}> 
                        <Grid item xs={12} py={1}>
                                <TextField 
                                id="standard-basic" 
                                name="title"
                                label={t('TITLE')}
                                variant="standard" 
                                value={newJobOffer.title}
                                onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} py={1}>
                                <TextField 
                                    multiline
                                    maxRows={4}
                                    id="standard-basic" 
                                    name="description"
                                    label={t('DESCRIPTION')}
                                    variant="standard" 
                                    value={newJobOffer.description}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} py={1}>
                            <LocalizationProvider
                                dateAdapter={AdapterDayjs}
                            >
                                <DatePicker
                                    inputFormat='DD/MM/YYYY'
                                    label={t('BEGINNING_DATE')}
                                    name="beginningDate"
                                    value={newJobOffer.beginningDate}
                                    onChange={(newDate) => {
                                        const e = {
                                            target : {
                                                name: "beginningDate",
                                                value: newDate
                                            }
                                        }
                                        handleChange(e)
                                    }}
                                        
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            fullWidth
                                            style={{
                                                borderRadius: '5px'
                                            }}
                                        />
                                    )}
                                />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} py={1}>
                            <LocalizationProvider
                                dateAdapter={AdapterDayjs}
                            >
                                <DatePicker
                                    inputFormat='DD/MM/YYYY'
                                    label={t('ENDING_DATE')}
                                    name="endingDate"
                                    value={newJobOffer.endingDate}
                                    onChange={(newDate) => {
                                        const e = {
                                            target : {
                                                name: "endingDate",
                                                value: newDate
                                            }
                                        }
                                        handleChange(e)
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            fullWidth
                                            style={{
                                                borderRadius: '5px'
                                            }}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid item xs={12} py={1}>
                            <TextField 
                                id="standard-basic" 
                                name="place"
                                label={t('PLACE')}
                                variant="standard"
                                value={newJobOffer.place}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} py={1}>
                            <TextField 
                                id="standard-basic" 
                                name="numberPositions"
                                label={t('NUMBER_POSITIONS')}
                                variant="standard" 
                                type="number"
                                value={newJobOffer.numberPositions}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} py={1}>
                            <TextField 
                                id="standard-basic"
                                name="remuneration"
                                label={t('REMUNERATION')}
                                variant="standard"
                                type="number"
                                value={newJobOffer.remuneration}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} py={1}>
                            <LocalizationProvider
                                dateAdapter={AdapterDayjs}
                            >
                                <DatePicker
                                    inputFormat='DD/MM/YYYY'
                                    label={t('PUBLISHING_DATE')}
                                    name="publishingDate"
                                    value={newJobOffer.publishingDate}
                                    onChange={(newDate) => {
                                        const e = {
                                            target : {
                                                name: "publishingDate",
                                                value: newDate
                                            }
                                        }
                                        handleChange(e)
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            fullWidth
                                            style={{
                                                borderRadius: '5px'
                                            }}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>    
                    </form>
                    <div>
                        <Button onClick={saveJobOffer}>
                            {t('CONFIRM')}
                        </Button>
                        <Button onClick={props.onClose}>
                            {t('CANCEL')}
                        </Button>
                    </div>
                </Box>
                </Container>
        </Modal>
    )
}

export default AddJobOffer;