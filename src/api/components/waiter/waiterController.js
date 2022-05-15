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

    async function addShifts(waiter, shifts){
        let waiter_res = await waiterService.getWaiter(waiter);

        for(let shift of shifts){
            let workday = await waiterService.getWorkday(shift);
            if( workday === null || workday === undefined){
                workday = await waiterService.addWorkday(shift)
            }
            let bookedShift = await waiterService.getShift(waiter_res, workday)
            if(bookedShift === null ||  bookedShift === undefined){
                bookedShift = await waiterService.addShift(waiter_res, workday)
            } 
        }    
    }
    

    async function getWaiterShiftsByYear(waiter, year){
        let waiter_result = await waiterService.getWaiter(waiter);
        let shifts = await waiterService.getWaiterShifts(waiter_result, year)

        return shifts
    }

    async function deleteShifts(waiter, shifts){
        let waiter_res = await waiterService.getWaiter(waiter);

        for(let shift of shifts){
            let workday = await waiterService.getWorkday(shift);
            let shiftToDelete = await waiterService.getShift(waiter_res, workday)
            let deletedShift = await waiterService.deleteShift(shiftToDelete)

        } 
        
    }

    return {
        getWaiter,
        getWaiterShiftsByYear,
        addShifts,
        deleteShifts
    }
}

