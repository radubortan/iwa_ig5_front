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
                    {t('MODIFY_JOB_OFFER')}
                </Box>
            </Typography> 
            {error && <p className="red">{t('PLEASE_FILL_FIELDS')}</p>}
            <form method='post' onSubmit={updateJobOffer}>
            <Grid item xs={6}> 
                        <Grid item xs={12} py={1}>
                                <TextField 
                                id="standard-basic" 
                                name="title"
                                label={t('TITLE')}
                                variant="standard" 
                                value={updatedJobOffer.title}
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
                                    value={updatedJobOffer.description}
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
                                    value={updatedJobOffer.beginningDate}
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
                                    value={updatedJobOffer.endingDate}
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
                                value={updatedJobOffer.place}
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
                                value={updatedJobOffer.numberPositions}
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
                                value={updatedJobOffer.remuneration}
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
                                    value={updatedJobOffer.publishingDate}
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
                <Button onClick={updateJobOffer}>
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

export default EditJobOffer;