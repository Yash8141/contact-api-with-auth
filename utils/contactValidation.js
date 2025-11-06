export const validateContactFields = (name, email, phone, type) => {
  if (!name || !email || !phone || !type) {
    return {
      success: false,
      message: "Please fill all fields",
    };
  }
  const validTypes = ["personal", "professional"];
  if (!validTypes.includes(type.toLowerCase())) {
    return {
      success: false,
      message: "Invalid type Must be one of: Personal, Professional",
    };
  }
  return { success: true };
};
