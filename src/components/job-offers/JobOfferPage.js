import JobOfferEmployerPage from "./JobOfferEmployerPage";
import JobOfferCandidatePage from "./JobOfferCandidatePage";
import { Fragment } from "react";
const JobOfferPage = (props) => {
    //const role = props.role
    const role = 'ROLE_EMPLOYER'

    return (
        <Fragment>
            {role == 'ROLE_EMPLOYER' && <JobOfferEmployerPage/>}
            {role == 'ROLE_CANDIDATE' && <JobOfferCandidatePage/>}
        </Fragment>
    )
}

export default JobOfferPage;


