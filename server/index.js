
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const employeeRoutes = require('./router/employeerouter');
const taskRoutes=require('./router/taskRoutes');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/employee", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Could not connect to MongoDB:", err));

app.use('/', employeeRoutes);
app.use('/api', taskRoutes);
app.listen(3001, () => {
        console.log("Server is running on port 3001");
    });

