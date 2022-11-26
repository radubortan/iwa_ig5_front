import JobOfferEmployerPage from "./JobOfferEmployerPage";
import JobOfferCandidatePage from "./JobOfferCandidatePage";
import { useUser } from '../../context/UserContext';
import { Fragment } from "react";
const JobOfferPage = (props) => {

    //const role = props.role
    const user = useUser();
    const role = user.accountType

    return (
        <Fragment>
            {role == 'ROLE_EMPLOYER' && 
            <JobOfferEmployerPage 
                role={role}
                accountId={user.accountId}
            />}
            {role == 'ROLE_CANDIDATE' && 
            <JobOfferCandidatePage
                role={role}
                accountId={user.accountId}
            />}
        </Fragment>
    )
}

export default JobOfferPage;


