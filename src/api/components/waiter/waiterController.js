import WaiterService from "./services/WaiterDatabaseService.js"

export default function WaiterController() {

    const waiterService = WaiterService();

    async function getWaiter(waiter) {
        let result = JSON.stringify(await waiterService.getWaiter(waiter), (key, value) => {
            if (key === "password" || key === "waiter_id") {
                return undefined
            }
            return value;
        })
        return JSON.parse(result);
    }

    async function addShift(){
        let shift = new Date()
        console.log(shift)
    }

    async function getWaiterShiftsByYear(waiter, year){
        let waiter_result = await waiterService.getWaiter(waiter);
        let shifts = await waiterService.getWaiterShifts(waiter, year)

        return shifts
    }

    return {
        getWaiter,
        getWaiterShiftsByYear
    }
}