const express = require('express');
const { connectToDB } = require('./db/db.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const { userRouter } = require('./routes/auth.routes.js');
const path = require('path');
const { Users } = require('./models/models.js');
const {
    Faculty,
    WorkExperience,
    Courses,
    PhDDetails,
    ResearchStudents,
    FacultyPhDResearchStudents,
    Books,
    BooksPublished,
    Conferences,
    Memberships,
    Committees,
    AttendedWorkshops,
    ConductedWorkshops,
    FundedProjects,
    TrainingDevelopment,
    Interests,
    OtherInformation,
} = require('./structure');

const tables = {
    'Users':Users,
    'Faculty': Faculty,
    'WorkExperience': WorkExperience,
    'Courses': Courses,
    'PhDDetails': PhDDetails,
    'ResearchStudents': ResearchStudents,
    'FacultyPhDResearchStudents': FacultyPhDResearchStudents,
    'Books': Books,
    'BooksPublished': BooksPublished,
    'Conferences': Conferences,
    'Memberships': Memberships,
    'Committees': Committees,
    'AttendedWorkshops': AttendedWorkshops,
    'ConductedWorkshops': ConductedWorkshops,
    'FundedProjects': FundedProjects,
    'TrainingDevelopment': TrainingDevelopment,
    'Interests': Interests,
    'OtherInformation': OtherInformation
}

const successResponse = { "status": "success" };
const failureResponse = { "status": "fail" };
const notFoundResponse = { "status": "not found" };

const app = express();

const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
app.get('/amogh',async (req,res)=>{
    // res.setHeader('Keep-Alive','timeout=20');
    const result = await Users.find();
    console.log(result);
    res.end('Hey');
})
app.use('/api/auth',userRouter);
app.use('/',express.static('build'));
for (let modelName in tables) {
    let routeName = modelName.toLowerCase();

    app.put(`/update/${routeName}/:keys/:values`, async (req, res) => {
        try {
            const keys = req.params.keys.split(',');
            const values = req.params.values.split(',');
            //console.log(req.body)
    
            if (keys.length !== values.length) {
                return res.status(400).send({ "error": "Number of keys and values should match" });
            }
    
            let query = {};
            keys.forEach((key, index) => {
                query[key] = values[index];
            });

            //console.log(query);
    
            const updatedData = await tables[modelName].findOneAndUpdate(query, req.body);
            //console.log(updatedData)
            if (!updatedData) {
                return res.status(404).send(notFoundResponse);
            }
            res.send(successResponse);
        } catch (error) {
            const err = failureResponse;
            err.reason = error;
            res.status(500).send(err);
        }
    });
    
    app.delete(`/delete/${routeName}/:keys/:values`, async (req, res) => {
        try {
            const keys = req.params.keys.split(',');
            const values = req.params.values.split(',');
    
            if (keys.length !== values.length) {
                return res.status(400).send({ "error": "Number of keys and values should match" });
            }
    
            let query = {};
            keys.forEach((key, index) => {
                query[key] = values[index];
            });
    
            const deletedData = await tables[modelName].deleteOne(query);
            if (!deletedData.deletedCount) {
                return res.status(404).send(notFoundResponse);
            }
            res.send(successResponse);
        } catch (error) {
            const err = failureResponse;
            err.reason = error;
            res.status(500).send(err);
        }
    });    
    
    app.get(`/fetch/${routeName}`, async (req, res) => {
        try {
            const allData = await tables[modelName].find({}, { password: 0 });
            //console.log(allData);
            res.json(allData);
        } catch (error) {
            const err=failureResponse;
            err.reason=error;
            res.status(500).send(err);
        }
    });

    app.get(`/fetch/${routeName}/:keys/:values`, async (req, res) => {
        try {
            const keys = req.params.keys.split(',');
            const values = req.params.values.split(',');
            // console.log(keys);
            // console.log(values);
            if (keys.length !== values.length) {
                return res.status(400).send({ "error": "Number of keys and values should match" });
            }
    
            let query = {};
            keys.forEach((key, index) => {
                query[key] = values[index];
            });
    
            const filteredData = await tables[modelName].find(query, { password: 0 });
            // console.log('Filtered data');
            // console.log(filteredData);
            res.json(filteredData);
        } catch (error) {
            console.log(error);
            const err = failureResponse;
            err.reason = error;
            res.status(500).send(err);
        }
    });
    
    app.post(`/insert/${routeName}`, async (req, res) => {
        try {
            //console.log(req.body)
            const newData = new tables[modelName](req.body);
            //console.log(newData)
            await newData.save();
            res.send(successResponse);
        } catch (error) {
            const err=failureResponse;
            err.reason=error;
            res.status(500).send(err);
        }
    });
}
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
    await connectToDB("mongodb+srv://kletech:kletech1234@kledatabase.t7xh5su.mongodb.net/mydb?retryWrites=true&w=majority");
    console.log('Connected to DB');
})();

app.listen(PORT,'localhost',function(){
    console.log(`Server is running on port ${PORT}`);
});