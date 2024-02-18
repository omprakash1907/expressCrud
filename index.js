const express = require('express');
const app = express();

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.get('/', function(req,res){
//     res.send('Hellow...')
// })

app.set('view engine', 'ejs')

var Employees = [
    { name: 'om', email: 'om@gmail.com', post: 'Front-end Developer', password: '123456', gender: 'male', date: '2001-07-19', address: 'jaipur' },
    { name: 'vikas', email: 'vikas@gmail.com', post: 'Back-end Developer', password: '123456', gender: 'male', date: '1996-01-15', address: 'pune' },
    { name: 'kashyap', email: 'kashyap@gmail.com', post: 'UI/UX Developer', password: '123456', gender: 'male', date: '2002-07-21', address: 'surat' }
]

app.get('/user', function (req, res) {
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