import Button from '@mui/material/Button';
import axios from 'axios';

const Upload = () => {

    const handleChangeFile = (event) => {
        event.preventDefault();

        var formData = new FormData();
        const file = event.target.files[0];
        formData.append("file", file);

        axios.post(`http://localhost:8080/cv-upload`, formData)   
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
    }    
        

    return (
        <Button variant="contained" component="label">
        Upload
        <input onChange={handleChangeFile} hidden accept="*" multiple type="file" />
      </Button>
    )
}

export default Upload;