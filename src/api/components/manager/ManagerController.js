import ManagerService from "./services/ManagerDatabaseService.js"

export default function ManagerController() {

    const managerService = ManagerService();

    async function getAllShifts(){
        let shifts = await managerService.getAllShifts()
        return shifts
    }

    async function getAllShiftsByDate(date){
        let shifts = await managerService.getAllShiftsByDate(date)
        // console.log(shifts[0].workday.date.getDay() + " " + shifts[0].workday.date.getMonth() +" "+ shifts[0].workday.date.getFullYear())
        return shifts
    }

    async function addWaiter(waiter){
        let waiterCheck = await managerService.getWaiter(waiter)
        if(waiterCheck === null){
            return await managerService.addWaiter(waiter)
        }
        else{
             return {error:"waiter already exists"}
        }
        
    }

    

    return {
        getAllShifts,
        addWaiter,
        getAllShiftsByDate
    }
}

