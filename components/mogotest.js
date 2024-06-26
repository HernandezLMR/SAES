const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');

async function main() {
    const uri = "mongodb+srv://aldofloreshrz:PObEZ1A9b0hSsqpR@cluster.i582fnp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster"; // Replace with your MongoDB connection string

    // Create a new MongoClient
    const client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Specify the database name (it will be created lazily)
        const database = await client.db("SAES");

        // Optionally, you can create a collection in the new database to ensure it's created
        const collection = database.collection("Periodo");

        //const hash = await bcrypt.hash("adminpassword456", 10);
        

        /*
        Test student
        2022710195
        20227101

        Test teacher
        1234567890
        password123

        Test admin
        0987654321
        adminpassword456
        
        */
       

               

        
        const data = { '1122334455': '7', '2022710195': '8' };
        const groupID = "4IV1";

        const keys = Object.keys(data);
        const values = Object.values(data);

        console.log(keys[0]);
        
        
        // Insert a document into the collection
        let result = await collection.findOne({"estudianteID" : keys[1], "grupoID" : groupID});
        console.log(result);
        
        
       

    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);
