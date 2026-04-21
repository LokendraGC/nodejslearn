import data from '../models/employee.json' with { type: 'json' }


// get all employees
export const getAllEmployees = (req, res) => {
    res.json(data)
}

// create employee
export const createEmployee = (req, res) => {
    const newEmployee = {
        id: data.length ? data[data.length - 1].id + 1 : 1,
        "firstname": req.body.firstname,
        "lastname": req.body.lastname
    };

    if (!newEmployee.firstname || !newEmployee.lastname) {
        return res.status(400).json({ message: 'Firstname and lastname are required' })
    }

    data.push(newEmployee)
    res.status(201).json({ data, 'message': 'Employee created successfully' })
}

// update employee
export const updateEmployee = (req, res) => {

    const employee = data.find(emp => emp.id === parseInt(req.params.id));

    if (!employee) {
        return res.status(404).json({ message: 'Employee not found' })
    }

    if (req.body.firstname) employee.firstname = req.body.firstname;
    if (req.body.lastname) employee.lastname = req.body.lastname;

    res.json({ data, 'message': 'Employee updated successfully' })

}


// delete employee
export const deleteEmployee = (req, res) => {

    const employee = data.find(emp => emp.id === parseInt(req.params.id))

    if (employee === -1) {
        return res.status(404).json({ message: 'Employee not found' })
    }

    const deleteEmployee = data.splice(data.indexOf(employee), 1)

    res.json({ data, 'message': 'Employee deleted successfully' })
}

// get employee
export const getEmployeeById = (req, res) => {
    const employee = data.find(emp => emp.id === parseInt(req.params.id))
    if (!employee) {
        return res.status(404).json({ message: 'Employee not found' })
    }
    res.json({ employee, 'message': 'Employee found successfully' })
}

// JSON.parse() - convert JSON string to JavaScript object
// JSON.stringify() - convert JavaScript object to JSON string
