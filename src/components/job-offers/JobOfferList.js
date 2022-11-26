import JobOffer from "./JobOffer";
import { useTranslation } from "react-i18next";

import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const JobOfferList = (props) => {
    const {t} = useTranslation();
    const onViewModeOnly = props.onViewModeOnly

    return (
        <Box sx={{ width: '100%' }}>
        {props.jobOfferList.length === 0 && (
                <p>{t('NO_JOB_OFFER_AVAILABLE')}</p>
            )}
        <Stack spacing={2} mx={10}>
            {props.jobOfferList.length !== 0 &&
                props.jobOfferList.map((jobOffer, index) => (
                <Item>
                    {!onViewModeOnly && <JobOffer
                        key={jobOffer.idJobOffer}
                        index={index}
                        jobOffer={jobOffer}
                        onViewJobOffer={props.onViewJobOffer}
                        onEditJobOffer={props.onEditJobOffer}
                        onDeleteJobOffer={props.onDeleteJobOffer}
                    />}
                    {onViewModeOnly && <JobOffer
                        key={jobOffer.idJobOffer}
                        index={index}
                        jobOffer={jobOffer}
                        onViewJobOffer={props.onViewJobOffer}
                        onViewModeOnly
                    />}
                </Item>
                ))
            }
            </Stack>
        </Box>
    )
}

export default JobOfferList;