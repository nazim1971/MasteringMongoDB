import app from "./app";
import connectDB from "./db/db";

const port = process.env.PORT || 5000;


// Define a function to start the server
const startServer = async () => {
    try {
      // Connect to the database
      await connectDB();
      

      
      app.listen(port, () => {
        console.log(` Server is running on port ${port}`);
      });
    } catch (error) {
      console.error("Failed to connect to the database:", error);
    }
  };
  
  // Call the function to start the server
  startServer();


