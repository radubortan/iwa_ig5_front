
function JobOffer(props) {
    return (
      <li
        onClick={() => {
          props.onViewJobOffer(props.jobOffer);
        }}
      >
        <div>
          <h3 >{props.jobOffer.title} - {props.jobOffer.place}</h3>
        </div>
      </li>
    );
  }
  
  export default JobOffer;