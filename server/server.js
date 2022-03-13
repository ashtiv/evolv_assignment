import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import users from './user.js'
import trainers from './trainer.js';
const app = express();
app.use(express.json());
app.use(cors({ credentials: true }))
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
})
const port = process.env.PORT || 5000;
const connection_url = 'mongodb+srv://ashtiv:3iQSdBEL2n5dNiGt@cluster0.ujyjr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(connection_url, {
    // useCreateIndex: true,
    // useNewUrlParser: true,
    // useUnifiedTopology: true
});
const db = mongoose.connection;
app.get('/', (req, res) => { res.send('Welcome to server') })
app.post('/regthisuser', (req, res) => {
    const obj = new users(req.body)
    // console.log(obj, " oobbjj"); 
    obj.save();
    console.log("user added dd", req.body.trainerRef)
    var userRefs = [];
    trainers.find({ _id: req.body.trainerRef }, (err, data) => {
        if (err) {
            res.send("2");
        } else {
            console.log("user added2", data);
            userRefs = data[0].userRefs;
            userRefs.push(obj._id);
            res.send(userRefs)
        }
    })
})
app.post('/regthistrainer', (req, res) => {
    const obj = new trainers(req.body)
    // console.log(obj, " oobbjj"); 
    obj.save();
    console.log("trainer added")
    res.send("1")
})
app.get('/gettrainers', (req, res) => {
    trainers.find((err, data) => {
        if (err) {
            res.send(err)
        } else {
            console.log(data);
            res.send(data);
        }
    })
})
app.post('/updatetrainer', (req, res) => {
    const obj = req.body;
    console.log(obj.trainerid, obj.userRefs, " obj id refs")
    trainers.findOneAndUpdate({ _id: obj.trainerid }, { userRefs: obj.userRefs }, (err, data) => {
        if (err) {
            res.send(err)
        } else {
            console.log(data)
            res.send("1");
        }
    })
})
app.listen(port, () => console.log(`Listening on localhost:${port}`));

