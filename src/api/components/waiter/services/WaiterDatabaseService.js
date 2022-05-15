import { PrismaClient, WeekDay } from "@prisma/client";

export default function WaiterService() {

    const prisma = new PrismaClient();

    async function getWaiter(waiter) {
        try {
            let result = await prisma.waiter.findUnique({
                where: {
                    email: waiter.email
                }
            })
            return result;
        }
        catch (error) {
            console.log(error)
        }
        finally {
            (async () => {
                await prisma.$disconnect()
            })
        }
    }

    async function getWaiterByEmail(waiterEmail) {
        try {
            let result = await prisma.waiter.findUnique({
                where: {
                    email: waiterEmail
                }
            })
            return result;
        }
        catch (error) {
            console.log(error)
        }
        finally {
            (async () => {
                await prisma.$disconnect()
            })
        }
    }

    async function getWaiterById(waiter_id) {
        try {
            let result = await prisma.waiter.findUnique({
                where: {
                    waiter_id: waiter_id
                }
            })
            return result;
        }
        catch (error) {
            console.log(error)
        }
        finally {
            (async () => {
                await prisma.$disconnect()
            })
        }
    }

    async function getWorkday(date) {
        try {
            let result = await prisma.workday.findFirst({
                where: {
                    date:date
                },
                
            })
            return result;
        }
        catch (error) {
            console.log(error)
        }
        finally {
            (async () => {
                await prisma.$disconnect()
            })
        }
    }

    async function addWorkday(date){
        try {
            let day = getDay(date)
            let month = getMonth(date)
            let week = calculateWeek(date).toString() 
            let year = date.getFullYear().toString()
            
            const createdWorkday = await prisma.workday.create({
                data: {
                    date: date,
                    day: day,
                    month: month,
                    week: week,
                    year: year
                }
            })
            return createdWorkday;
        }
        catch(error){
            console.log(error)
        }
        finally{
            (async () => {
                await prisma.$disconnect()
            })
        }
    }

    async function addShift(waiter, workday){
        console.log(waiter.id + " " + workday.id)
        try {
            const addedShift = await prisma.shift.create({
                data: {
                    waiter_id: waiter.id,
                    workday_id: workday.id
                },
                include:{waiter:true, workday:true}
            })
            return addedShift;
        }
        catch(error){
            console.log(error)
        }
        finally{
            (async () => {
                await prisma.$disconnect()
            })
        }
    }

    async function getShift(waiter, workday){
        try {
            const getShift = await prisma.shift.findFirst({
                where: {
                    waiter_id: waiter.id,
                    workday_id: workday.id
                },
                include:{waiter:true, workday:true}
            })
            return getShift;
        }
        catch(error){
            console.log(error)
        }
        finally{
            (async () => {
                await prisma.$disconnect()
            })
        }
    }



    async function getWaiterShifts(waiter, year) {
        try {
            let result = await prisma.shift.findMany({
                where: {
                    waiter_id:waiter.id,
                    workday:{
                        year:year
                    } 
                },
                include:{waiter:true, workday:true}
                
            })
            return result;
        }
        catch (error) {
            console.log(error)
        }
        finally {
            (async () => {
                await prisma.$disconnect()
            })
        }
    }

    async function deleteShift(shift){

        try{
            let deletedShift = await prisma.shift.delete({
                where: {
                    id:shift.id
                }
            });
            return deletedShift
        }
        catch(error){
            console.log(error)
        }
        finally{
            (async () => {
                await prisma.$disconnect()
            })
        }

    }



    return {
        getWaiter,
        getWaiterByEmail,
        getWaiterById,
        getWaiterShifts,
        addWorkday,
        getWorkday,
        addShift,
        getShift,
        deleteShift,



    }
}

function getDay(date){
    switch(date.getDay()){
        case 0: return "sunday" 
        case 1: return "monday" 
        case 2: return "tuesday" 
        case 3: return "wednesday" 
        case 4: return "thursday" 
        case 5: return "friday" 
        case 6: return "saturday" 
    }
}

function getMonth(date){
    switch(date.getMonth()){
        case 0: return "january" 
        case 1: return "february" 
        case 2: return "march" 
        case 3: return "april" 
        case 4: return "may" 
        case 5: return "june" 
        case 6: return "july"
        case 7: return "august" 
        case 8: return "september" 
        case 9: return "october" 
        case 10: return "november" 
        case 11: return "december"  
    }
}

function calculateWeek(currentDate){
    var startDate = new Date(currentDate.getFullYear(), 0, 1);
    var days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
    var weekNumber = Math.ceil((currentDate.getDay() + 1 + days) / 7);
    return weekNumber;

}
