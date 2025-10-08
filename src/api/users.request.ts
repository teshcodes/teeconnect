import axios from "axios";
import type { User } from "../types/User.ts";

const baseUrl = "https://api.freeapi.app";

// === Get Users ===
export const getUsers = async () => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/v1/public/randomusers?page=1&limit=500`,
      {
        maxBodyLength: Infinity,
        headers: {
          Accept: "application/json",
        },
      }
    );
    console.log(response, "This is response");
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error, "this is error here====");
    throw new Error("Failed to fetch users");
  }
};

// === Delete User ===
export const deleteUser = async (userId: string) => {
  try {
    const response = await axios.delete(`${baseUrl}/api/v1/public/randomusers/${userId}`, {
      headers: {
        Accept: "application/json",
      },
    });
    console.log(response, "User deleted successfully");
    return response.data;
  } catch (error) {
    console.error(error, "Error deleting user");
    throw new Error("Failed to delete user");
  }
};

// === Edit / Update User ===
export const updateUser = async (userId: string, updatedData: Partial<User>) => {
  try {
    const response = await axios.put(
      `${baseUrl}/api/v1/public/randomusers/${userId}`,
      updatedData,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response, "User updated successfully");
    return response.data;
  } catch (error) {
    console.error(error, "Error updating user");
    throw new Error("Failed to update user");
  }
};
