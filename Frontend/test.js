const axios =require('axios');

axios.post('http://localhost:5001/api_citizen_login', {
  
email:'aashu2348154@gmail.com',
password:'aashutosh'

})
.then(response => {
    console.log(response.data);
})
.catch(error => {
    console.error('There was an error!');
});
