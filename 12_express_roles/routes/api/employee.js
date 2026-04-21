import express from 'express'
import { createEmployee, deleteEmployee, getAllEmployees, getEmployeeById, updateEmployee } from '../../controllers/employeeController.js';
import { ROLES_LIST } from '../../config/roles_list.js';
import { verifyRoles } from '../../middleware/verifyRoles.js';

const router = express.Router()


router.route('/')
    .get(getAllEmployees)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), createEmployee);

router.route('/:id')
    .get(getEmployeeById)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), updateEmployee)
    .delete(verifyRoles(ROLES_LIST.Admin), deleteEmployee);

export default router   