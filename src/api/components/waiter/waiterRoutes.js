import express from "express"
import WaiterController from "./waiterController.js";

const controller = WaiterController();

const router = express.Router()

router.get('/', async (req, res) => {
    let waiter = { firstname: "nathri", lastname: "jacobs", email: "nathrjacobs@email.com", password: "1234" }
    return res.json(await controller.getWaiter(waiter))
})

router.post('/shifts/add', async (req, res) => {
    console.log(req.body.shifts)
})

router.get('/shifts/:year', async (req, res) => {
    let waiter = { firstname: "nathri", lastname: "jacobs", email: "nathrjacobs@email.com", password: "1234" }
    let shifts = await controller.getWaiterShiftsByYear(waiter, req.params.year)
    return res.json(shifts)
})

router.get('/shifts/:year/:week', async (req, res) => {
    console.log(req.params.year)
    console.log(req.params.week)
    return res.json("stuffer")
})


export default router;
