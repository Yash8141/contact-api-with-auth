import mongoose from "mongoose";

export async function connectDB(url, dbName) {
  try {
    await mongoose.connect(url, {
      dbName: dbName,
    //   useNewUrlParser: true, // deprecated
    //   useUnifiedTopology: true, // deprecated
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("MongoDB Connection error", error);
    process.exit(1);
  }
}

/*
dbName: dbName: This specifies the name of the database to connect to. If the database does not exist, MongoDB will create it when you 
                first write data to it.

useNewUrlParser: true: This ensures that Mongoose uses the new URL string parser for MongoDB connection URIs. 
                 This option was introduced because MongoDB's URL parser was deprecated and replaced with a more robust parser.

useUnifiedTopology: true: This enables the new topology engine for MongoDB, which provides better handling of the connection lifecycle 
                    (and is the recommended option).

*/
