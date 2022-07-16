const express = require('express');
const app = express();
const port = 8005;

// use express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        //console.log('Error: ', err);

        //Interpolation technique instead of using , and + to add strings 
        console.log(`Error in running a server : ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});