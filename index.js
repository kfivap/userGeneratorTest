const mongoose = require('mongoose');
const express = require('express');
const app = express();
const Schema = mongoose.Schema;

app.use(express.json());


const userSchema = new Schema({
    name: String,
    age: Number
})
const User = mongoose.model('user', userSchema);

app.post('/', async (req, res)=>{
    for (let i = 0; i<100000; i++){
        await User.create({
            name: `test${i}`,
            age: i
        })
        console.log(i)
    }
    res.send(200)
})

app.get('/', async (req, res)=>{
    const users = await User.find({})
    res.send(users)
})

app.delete('/', async (req, res)=>{
    await User.deleteMany({})
    res.send(200)
})


const start = async () => {
    await mongoose.connect('mongodb://localhost:27017/million', { useUnifiedTopology: true, useNewUrlParser: true });
    app.listen(3000, () => {
        console.log('app ready port 3000');
    });
}
 
start()