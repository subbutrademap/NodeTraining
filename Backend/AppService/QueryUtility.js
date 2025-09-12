const QueryUtility = {
    // User-related queries
    users: {
        // Get all users with specific columns
        getAllUsers: "SELECT id, firstName, lastName, userName, phoneNumber, email, userRole FROM Users",
        
        // Update user by ID
        updateUser: "UPDATE Users SET firstName = ?, lastName = ?, userName = ?, phoneNumber = ?, email = ?, userRole = ? WHERE id = ?",
        
        // Delete user by ID
        deleteUser: "DELETE FROM Users WHERE id = ?",
        
        // Check if user exists by ID
        checkUserExists: "SELECT id FROM Users WHERE id = ?"
    }
};

module.exports = QueryUtility;
