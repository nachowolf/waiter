import {PrismaClient} from "@prisma/client";

export default function ManagerService() {

    const prisma = new PrismaClient();

    async function addWaiter(waiter){
        try {
            const createdWaiter = await prisma.waiter.create({
                data: {
                    firstname: waiter.firstname,
                    lastname: waiter.lastname,
                    email: waiter.email,
                    password: waiter.password
                }
            })
            return createdWaiter
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

    async function getWaiters(){

        try{
            let waiters = await prisma.waiter.findMany();
            console.log(waiters)
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

    async function getAllShifts(){
        try{
            let shifts = await prisma.shift.findMany({
                select:{
                    waiter:{
                        select:{
                            firstname:true,
                            lastname:true
                        }
                    }, 
                    // workday:{
                    //     select:{
                    //         date:true
                    //     }
                    // }
                    workday:true
                }
                })
            return shifts
        }
        catch(error){
            console.error(error)
        }
        finally{
            await prisma.$disconnect
        }
    }

    async function getAllShiftsByDate(date){
        try{
            let shifts = await prisma.shift.findMany({
                where:{
                    workday:{
                        date:date
                    }
                },
                select:{
                    waiter:{
                        select:{
                            firstname:true,
                            lastname:true
                        }
                    }, 
                    workday:{
                        select:{
                            date:true
                        }
                    }
                }
                })
            return shifts
        }
        catch(error){
            console.error(error)
        }
        finally{
            await prisma.$disconnect
        }
    }

    async function deleteWaiter(waiter){

        try{
            let deleteWaiter = await prisma.waiter.delete({
                where: {
                    email: waiter.email
                }
            });
            
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
        addWaiter,
        getWaiters,
        deleteWaiter,
        getAllShifts,
        getAllShiftsByDate,
        getWaiter
        

    }
}
