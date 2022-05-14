import {PrismaClient} from "@prisma/client";

export default function WaiterService() {

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
        deleteWaiter
        

    }
}
