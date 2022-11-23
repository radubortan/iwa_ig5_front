import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Rating from './Rating';
import { Button } from '@mui/material';
import AddRatingModal from './AddRatingModal';
import StarIcon from '@mui/icons-material/Star';
import { useUser } from '../../context/UserContext';
import ViewRatingModal from './ViewRatingModal';
import ratingService from '../../services/ratingService';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { convertDate } from '../../util/date';

const RatingsContainer = (props) => {
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const user = useUser();
    const { id } = useParams();
    const [ratings, setRatings] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [myRating, setMyRating] = useState(null);

    const fetchRatings = async () => {
        let response;
        if (props.role === 'ROLE_CANDIDATE') {
            response = await ratingService.getCandidateRatings(
                id,
                user.accessToken
            );
            const finalRatings = response.filter(
                (rating) => rating.sender.id !== user.accountId
            );
            setRatings(finalRatings);
        } else {
            response = await ratingService.getEmployerRatings(
                id,
                user.accessToken
            );
            const finalRatings = response.filter(
                (rating) => rating.sender.id !== user.accountId
            );
            setRatings(finalRatings);
        }
    };

    const fetchMyRating = async () => {
        const rating = await ratingService.getRatingByIdSenderAndIdReceiver(
            user.accountId,
            id,
            user.accessToken
        );
        setMyRating(rating);
    };

    const handleAddRating = async (rating) => {
        const generatedId = uuidv4();
        const finalRating = { ...rating, id: generatedId };

        //the date is a Date object
        ratingService.addRating(finalRating, user.accessToken);

        //we set the date to be a string of format yyyy-mm-dd so it's the same format as the date we receive when fetching the rating from the database
        setMyRating({ ...finalRating, date: convertDate(finalRating.date) });
    };

    const handleDeleteRating = async () => {
        setMyRating(null);
        ratingService.deleteRating(myRating.id, user.accessToken);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };

    const handleCloseRatingModal = () => {
        setShowRatingModal(false);
    };

    //computes the average rating
    const computeAverage = () => {
        let sum = 0;
        let numRatings = 0;
        if (ratings.length !== 0) {
            sum = ratings.reduce(
                (accumulator, currentValue) => accumulator + currentValue.value,
                0
            );
            numRatings += ratings.length;
        }
        if (myRating) {
            sum += myRating.value;
            numRatings += 1;
        }
        if (numRatings !== 0) {
            return (sum / numRatings).toPrecision(2);
        }
        return null;
    };

    //fetch the data when the component first loads
    useEffect(() => {
        fetchRatings();
        fetchMyRating();
    }, [id]);

    //when a new rating is added, recompute the average
    useEffect(() => {
        setAverageRating(computeAverage());
    }, [ratings, myRating]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                width: '100%',
            }}
        >
            {showRatingModal && (
                <ViewRatingModal
                    open={showRatingModal}
                    onClose={handleCloseRatingModal}
                    onDelete={handleDeleteRating}
                    rating={myRating}
                />
            )}

            {showAddModal && (
                <AddRatingModal
                    open={showAddModal}
                    onClose={handleCloseAddModal}
                    onSubmit={handleAddRating}
                />
            )}

            <Box sx={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                <Typography variant='h4' sx={{ alignSelf: 'flex-start' }}>
                    Ratings
                </Typography>
                {ratings.length !== 0 && !myRating && (
                    <Box
                        sx={{
                            px: '10px',
                            borderRadius: '5px',
                            boxShadow: '0px 1px 1px gray',
                        }}
                    >
                        <Typography variant='h5' sx={{ display: 'flex' }}>
                            {`${averageRating} / 5`}
                            <StarIcon sx={{ color: '#ffcc00' }} />
                        </Typography>
                    </Box>
                )}

                {/* only to be shown if the i have worked for the user or if they've worked for me */}
                {myRating ? (
                    <Button
                        variant='contained'
                        onClick={() => {
                            setShowRatingModal(true);
                        }}
                    >
                        My rating
                    </Button>
                ) : (
                    <Button
                        variant='contained'
                        onClick={() => {
                            setShowAddModal(true);
                        }}
                    >
                        Add rating
                    </Button>
                )}
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '50px',
                }}
            >
                {ratings.map((rating) => {
                    return (
                        <Rating
                            rating={rating}
                            role={props.role}
                            key={rating.id}
                        />
                    );
                })}
            </Box>
        </Box>
    );
};

export default RatingsContainer;
