const bcrypt = require('bcrypt');
const Employee = require('../model/Employee');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send("All fields are required");
        }

        const salt = 10;
        bcrypt.hash(password, salt, async (err, hash) => {
            if (err) {
                return res.status(500).send("Error hashing password");
            }

            const employee = new Employee({ name, email, password: hash });
            await employee.save();
            res.status(201).send(employee);
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const employee = await Employee.findOne({ email });
        if (!employee) {
            return res.status(400).send("Invalid email or password");
        }

        const validPassword = await bcrypt.compare(password, employee.password);
        if (!validPassword) {
            return res.status(400).send("Invalid email or password");
        }

        res.status(200).send("Login successful");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
};

module.exports = {
    register,
    login
};
