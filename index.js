const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.send('home')
})

const PORT = process.env.PORT || 3000;
app.listen(()=>{
    console.log(`Server is up on port: ${PORT}`)
},PORT)