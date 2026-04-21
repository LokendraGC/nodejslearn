import express from 'express'
import data from '../../data/employee.json' with { type: 'json' }

const router = express.Router()

router.route('/')
    .get((req, res) => {
        res.json(data)
    })
    .post((req, res) => {
        res.json({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname
        })
    })
    .put((req, res) => {
        res.json({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname
        })
    })
    .delete((req, res) => {
        res.json({
            "id": req.params.id
        })
    });


router.route('/:id')
    .get((req, res) => {
        const employee = data.find(emp => emp.id === parseInt(req.params.id))
    });

export default router