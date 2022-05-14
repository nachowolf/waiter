import bcrypt from 'bcrypt';


export default (db) =>{

async function addWaiter(waiter){
 
    try{
        return db.addWaiter({
            'firstname': waiter.firstname.toLowerCase(),
            'lastname': waiter.lastname.toLowerCase(),
            'email': waiter.email,
            'password': await bcrypt.hash(sauce, await bcrypt.genSalt())
        })
    }
    catch(error){
        console.log(error);
    }
}

async function loginCheck(user){
    const currentUser = users.find(u => user.username === u.username)
    if(currentUser == null){
        return "no user";
    }
    try{
        if (await bcrypt.compare(currentUser.password, user.password)){
            return "match";
        }
        else{
            return "no mwatch";
        }
    }

    catch(error){
        return "error";
    }
}

async function getUsers(){
    try{
        return users;
    }
    catch(error){
        console.log(error);
    }

}

return {
    addWaiter,
    getUsers,
    loginCheck
}


}