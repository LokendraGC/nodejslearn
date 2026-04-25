import Employee from '../models/Employee.js';

// get all employees
export const getAllEmployees = async (req, res) => {
    const employees = await Employee.find().lean().exec();
    if (!employees) {
        return res.status(404).json({ message: 'No employees found' })
    }
    res.json(employees)
}

// create employee
export const createEmployee = async (req, res) => {
    if (!req.body.firstname || !req.body.lastname) {
        return res.status(400).json({ message: 'Firstname and lastname are required' })
    }

    const employee = await Employee.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname
    });
    res.status(201).json({ message: 'Employee created successfully', employee })
}

// update employee
export const updateEmployee = async (req, res) => {

    const employee = await Employee.findById(req.params.id).exec();

    if (!employee) {
        return res.status(404).json({ message: 'Employee not found' })
    }

    employee.firstname = req.body.firstname || employee.firstname;
    employee.lastname = req.body.lastname || employee.lastname;

    const updatedEmployee = await employee.save();
    res.json({ message: 'Employee updated successfully', employee: updatedEmployee })

}


// delete employee
export const deleteEmployee = async (req, res) => {

    const employee = await Employee.findById(req.params.id).exec();

    if (!employee) {
        return res.status(404).json({ message: 'Employee not found' })
    }

    await employee.deleteOne();

    res.json({ message: 'Employee deleted successfully' })
}

// get employee
export const getEmployeeById = async (req, res) => {
    const employee = await Employee.findById(req.params.id).exec();
    if (!employee) {
        return res.status(404).json({ message: 'Employee not found' })
    }
    res.json({ message: 'Employee found successfully', employee })
}

// JSON.parse() - convert JSON string to JavaScript object
// JSON.stringify() - convert JavaScript object to JSON string
