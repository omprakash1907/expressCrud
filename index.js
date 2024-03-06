const express = require('express');
const app = express();

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const { productModel } = require('./schema.js')

app.set('view engine', 'ejs')



app.get('/user', async function (req, res) {
    const books = await productModel.find()
    res.render('./Pages/index', { Employees: Employees })
})

app.get('/', (req, res) => {
    res.render('./Pages/home')
});

app.get('/addemp', function (req, res) {
    res.render('./Pages/form', { Employees: Employees })
})

app.post('/addemp', function (req, res) {
    var newEmployee = req.body;
    var emailExists = Employees.some(function(emp) {
        return emp.email === newEmployee.email;
    });

    if (emailExists) {
        res.render('./Pages/form', { Employees: Employees, error: 'Email already exists' });
    } else {
        Employees.push(newEmployee);
        res.redirect('/user');
    }
});


app.get('/deleteEmp/:id', function (req, res) {
    var id = req.params.id
    Employees.splice(id, 1)
    res.redirect('/user')
})

app.get('/editEmp/:id', function (req, res) {
    var id = req.params.id
    var update = Employees[id]
    console.log(update);
    res.render('./Pages/edit', { emp: update })
})

app.post('/editEmp/:id', (req, res) => {
    var id = req.params.id
    Employees[id] = req.body
    res.redirect('/user')
})

app.listen(3000, () => console.log('Successs'))