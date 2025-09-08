const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function Utility() {


    async function hashPassword(plainPassword) {
        const saltRounds = 10; // Cost factor (higher = slower & more secure)
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
        return hashedPassword;
    }

    // Function to compare plain password with hashed password
    async function checkPassword(plainPassword, hashedPassword) {
        const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
        return isMatch; // true if match, false otherwise
    }

    function createWebToken(payload) {
        const token = jwt.sign(
            payload,
           "xyzabc", // keep this in env
            { expiresIn: "1d" }
        );
        return token;
    }



    return {
        hashPassword, 
        checkPassword,
        createWebToken

    }
}

module.exports = Utility;