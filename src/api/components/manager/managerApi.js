import express from "express"
import WaiterService from "./ManagerDatabaseService.js"



const waiterService = WaiterService();

const router = express.Router()

router.get('/add', async (req, res) => {
    let waiter = { firstname: "nathri", lastname: "jacobs", email: "nathrjacobs@email.com", password: "1234" }
    await waiterService.addWaiter(waiter)
    await waiterService.getWaiters()
    return res.json({ "hello": "world" })
})


export default router;
