import {
    Modal,
    Card,
    Box,
    Container,
    Table,
    TableBody,
    TableContainer,
    TableRow,
    TableCell,
    Typography
} from '@mui/material';

import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
const JobOfferDetail = (props) => {
    const {t} = useTranslation();
    const jobOffer = props.jobOffer
    return (
        <Modal open={props.open} onClose={props.onClose}>
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
                <h1>{jobOffer.title}</h1>
                <Container maxWidth="md">    
                    <Box sx={{ mt: 3}}>
                    <Typography
                        variant="body2"
                        align="center"
                        style={{ wordWrap: "break-word"}}
                        sx={{mt:3}}
                    >
                        {jobOffer.description}
                    </Typography>
                    </Box>
                </Container>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                {t('BEGINNING_DATE')}
                                </TableCell>
                                <TableCell>
                                {jobOffer.beginningDate}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                {t('ENDING_DATE')}
                                </TableCell>
                                <TableCell>
                                {jobOffer.endingDate}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                {t('PLACE')}
                                </TableCell>
                                <TableCell>
                                {jobOffer.place}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                {t('NUMBER_POSITIONS')}
                                </TableCell>
                                <TableCell>
                                {jobOffer.numberPositions}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                {t('REMUNERATION')}
                                </TableCell>
                                <TableCell>
                                {jobOffer.remuneration}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                {t('PUBLISHING_DATE')}
                                </TableCell>
                                <TableCell>
                                {jobOffer.publishingDate}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                <p>Nom Employeur</p>
                                </TableCell>
                                <TableCell>
                                
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                </TableContainer>
            </Box>
            </Container>                    
        </Modal>
    )
}

export default JobOfferDetail;