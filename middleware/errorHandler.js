export default function errorHandler(err, req, res, next) {
  console.error(err);
  
  let status = err.status || 500;
  let message = err.message || "Internal server error";
  
  // Handle MongoDB validation errors
  if (err.name === 'ValidationError') {
    status = 400;
    message = Object.values(err.errors).map(e => e.message).join(', ');
  }
  
  // Handle MongoDB duplicate key error
  if (err.code === 11000) {
    status = 400;
    message = "Email already exists";
  }
  
  res.status(status).json({ 
    message,
    success: false 
  });
}
