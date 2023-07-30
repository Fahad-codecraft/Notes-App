import User from "../models/User.js";
import bcrypt from "bcrypt";

/* READ */
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

/*EDIT*/
export const editUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { firstName, lastName, password, confirmPassword } = req.body;
  
      // Find the user by ID
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Update firstName and lastName if provided
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
  
      // Check if both password and confirmPassword are provided
      if (password && confirmPassword) {
        // Check if the new password matches the confirmation
        if (password !== confirmPassword) {
          return res.status(400).json({ message: "Passwords do not match" });
        }
  
        // Hash the new password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }
  
      // Save the updated user object
      const updatedUser = await user.save();
  
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
