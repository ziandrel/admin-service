import User from "../model/userModel.js";
import bcrypt from "bcryptjs";

export const getUsers = async (req, res) => {
  try {
    const users = await User.get();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      passwordhash,
      phone,
      role,
      street,
      city,
      province,
      zip,
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(passwordhash, salt);

    const newUser = await User.create({
      name,
      email,
      passwordhash: hashedPassword,
      phone,
      role,
      street,
      city,
      province,
      zip,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.update(id, req.body);
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.delete(id);
    res.json({ message: "User deleted" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};

export const changeUserPassword = async (req, res) => {
  const userid = req.params.id;
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.getById(userid);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const validPassword = await bcrypt.compare(
      currentPassword,
      user.passwordhash
    );
    if (!validPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Current password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await User.updatePassword(userid, hashedPassword);

    res.json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
