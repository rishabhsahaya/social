const express = require('express');
const app = express();
const port = 8005;

// use express router
app.use('/', require('./routes'));


//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.listen(port, function(err){
    if(err){
        //console.log('Error: ', err);

        //Interpolation technique instead of using , and + to add strings 
        console.log(`Error in running a server : ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});