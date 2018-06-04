const axios = require('axios');

axios.get('https://localhost:2018/api/v1/workspaces')
    .then(response =>  console.log(response.data.workspaces))
    .catch(err => console.log(err));
