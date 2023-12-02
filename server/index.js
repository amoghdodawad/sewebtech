const express = require('express');
const { connectToDB } = require('./db/db.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const { userRouter } = require('./routes/auth.routes.js');
const path = require('path');

const app = express();

const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());
app.get('/amogh',(req,res)=>{
    res.setHeader('Keep-Alive','timeout=20');
    res.end('Hey');
})
app.use('/api/auth',userRouter);
app.use(express.static('build'));
app.use((req, res, next) => {
    if (/(.ico|.js|.css|.jpg|.png|.map)$/i.test(req.path)) {
        next();
    } else {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    }
});
(async ()=>{
    await connectToDB('sewebtech');
    console.log('Connected to DB');
})();

app.listen(PORT,function(){
    console.log(`Server is running on port ${PORT}`);
});