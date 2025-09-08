const {dataRepo} = require("../DataContainer");
const Utility = require("./Utility")();

class UserService {

    async authenticateUser(loginPayload) {
        try {

            const user = await dataRepo.getQueryResult(`select userName,firstName, lastName, password from Users where userName = '${loginPayload.userName}'`);
            if (user.length ==1) {
                const isPasswordMatch = await Utility.checkPassword(loginPayload.password,user[0].password);
                if (isPasswordMatch) {
                    delete user[0].password;
                    const token = Utility.createWebToken(user[0])
                    return {
                        error : null, 
                        data : {token}
                    }
                } else {
                    throw new Error("Invalid Password")
                }

            } else {
                throw new Error("User not found on the system");
            }

        } catch (e) {
            throw e;
        }
    }
    
    async addUser(userPayload) {
        //check if user already exists 
        try {
            const users = await dataRepo.getQueryResult(`Select userName , email from Users where userName = '${userPayload.userName}' or email = '${userPayload.email}'`);
            if (users.length == 0) {
                //user does not exists and add to DB
                userPayload.password = await Utility.hashPassword(userPayload.password);
                const result = await dataRepo.InsertRowFromData("Users", userPayload);
                if (result.affectedRows > 0) {
                    return {
                        error : null,
                        message : "User Registered Successfully"
                    }
                }

             } else {
                if (users[0].userName === userPayload.userName) {
                    throw new Error("userName already Exists");
                } else {
                    throw new Error("Email already Registered");
                }
             }

        } catch(e) {
            throw e
        }

    }
    
}

module.exports = UserService;