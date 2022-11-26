import { 
    Button,
    ListItem,
    MdModeEdit,
    Card,
    Grid,
    Typography
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Fragment } from "react";

function JobOffer(props) {
    const {t} = useTranslation();
    const onViewModeOnly = props.onViewModeOnly
    return (
      <ListItem onClick={() => {
        props.onViewJobOffer(props.jobOffer);
      }}>
        <Grid container spacing={2}>
          <Grid xs={8}>
          <Typography component='h1' variant='h5'>
          <Box fontWeight="bold" display='inline'>
          {props.jobOffer.title}

            </Box>
          </Typography>
          <Typography component='h4' variant='h5'>
            {props.jobOffer.place}
          </Typography>
          </Grid>
          <Grid xs={4}>
          {!onViewModeOnly && <Fragment>
            <Button
              className='addButton'
              onClick={(e) => {
                e.stopPropagation();
                props.onEditJobOffer(props.jobOffer, props.index);
              }}
            >
                {t('EDIT')}
            </Button>
            <Button
              className='addButton'
              onClick={(e) => {
                e.stopPropagation();
                props.onDeleteJobOffer(props.index, props.jobOffer);
              }}
            >
                {t('DELETE')}
            </Button>
            </Fragment>
         }
          </Grid>
        </Grid>
      </ListItem>
    );
  }
  
  export default JobOffer;