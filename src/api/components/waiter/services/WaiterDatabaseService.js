import { PrismaClient } from "@prisma/client";

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

    async function addShift(){
        try {
            const createdWaiter = await prisma.waiter.create({
                data: {
                    firstname: waiter.firstname,
                    lastname: waiter.lastname,
                    email: waiter.email,
                    password: waiter.password
                }
            })
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
                    AND: [
                        {
                            id: waiter.id
                        },
                        {
                            year: year
                        }
                    ]
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



    return {
        getWaiter,
        getWaiterShifts


    }
}

