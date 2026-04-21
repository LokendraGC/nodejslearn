import express from 'express'
import { createEmployee, deleteEmployee, getAllEmployees, getEmployeeById, updateEmployee } from '../../controllers/employeeController.js';

const router = express.Router()


router.route('/')
    .get(getAllEmployees)
    .post(createEmployee);

router.route('/:id')
    .get(getEmployeeById)
    .put(updateEmployee)
    .delete(deleteEmployee);

export default router   