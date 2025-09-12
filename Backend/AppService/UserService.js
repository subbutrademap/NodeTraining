const {dataRepo} = require("../DataContainer");
const Utility = require("./Utility")();
const QueryUtility = require("./QueryUtility");

class UserService {

    async authenticateUser(loginPayload) {
        try {

            const user = await dataRepo.getQueryResult(`select userName,firstName, lastName, userRole, password from Users where userName = '${loginPayload.userName}'`);
            if (user.length ==1) {
                const isPasswordMatch = await Utility.checkPassword(loginPayload.password,user[0].password);
                if (isPasswordMatch) {
                    delete user[0].password;
                    const token = Utility.createWebToken(user[0])
                    return {
                        error : null, 
                        data : {token , userDetails : user[0]}
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

    async getUsers() {
        try {
            const users = await dataRepo.getQueryResult(QueryUtility.users.getAllUsers);
            return {
                error: null,
                data: users
            };
        } catch (e) {
            throw e;
        }
    }

    async updateUser(userPayload) {
        try {
            const result = await dataRepo.executeQuery(
                QueryUtility.users.updateUser,
                [
                    userPayload.firstName,
                    userPayload.lastName,
                    userPayload.userName,
                    userPayload.phoneNumber,
                    userPayload.email,
                    userPayload.userRole,
                    userPayload.id
                ]
            );

            if (result.affectedRows > 0) {
                return {
                    error: null,
                    message: "User updated successfully"
                };
            } else {
                return {
                    error: "No user found with the given ID",
                    message: null
                };
            }
        } catch (e) {
            throw e;
        }
    }

    async deleteUser({id}) {
        try {
            // First check if user exists
            const existingUser = await dataRepo.executeQuery(QueryUtility.users.checkUserExists, [id]);
            if (existingUser.length === 0) {
                throw new Error("User not found");
            }

            // Delete the user
            const result = await dataRepo.executeQuery(QueryUtility.users.deleteUser, [id]);

            if (result.affectedRows > 0) {
                return {
                    error: null,
                    message: "User deleted successfully"
                };
            } else {
                throw new Error("Failed to delete user");
            }
        } catch (e) {
            throw e;
        }
    }
    
}

module.exports = UserService;