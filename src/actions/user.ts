"use server";
import db from "@/db"

export const uniqueUsername = async (username: string) => {
  try {
    const isUserExistWithUsername = await db.user.findUnique({
      where: { username }
    })
    return {
      success: isUserExistWithUsername ? false : true,
      message: isUserExistWithUsername ? "Username already taken" : "Username is unique",
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,
    }
  }
}
