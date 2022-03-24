
const Users = []

module.export = () => {

    async function add(user){
        Users.push(user)
    }

    async function getUserByUsername(username){
        return Users.find(user => user.username === username);
        }
    

}