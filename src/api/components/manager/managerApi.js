import express from "express"
import ManagerController from "./ManagerController.js";

const controller = ManagerController();

const router = express.Router()

router.post('/add', async (req, res) => {
    console.log(req.body)
    let waiter = req.body
    let waiterCreate = await controller.addWaiter(waiter)
    // await controller.getWaiters()
    return res.json(waiterCreate)
})

router.get('/shifts', async (req, res) => {
    res.json(await controller.getAllShifts())
})

router.get('/shifts/:year/:month/:day', async (req, res) => {
    let date = new Date(`${req.params.year}-${req.params.month}-${req.params.day}`)
    res.json(await controller.getAllShiftsByDate(date))
})


export default router;
