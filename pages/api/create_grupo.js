"use server"
import DB from "../../components/database"

export default async function addUser(req,res){
    if (req.method !== 'POST'){
        return res.status(405).json({ message: 'Method not allowed' });
    }
    const client = await DB();
    const connection = client.db('SAES');
    try{
        const userDB = await connection.collection("Grupos");
        const data = req.body;
        
        const result = await userDB.insertOne(data);
        
        return res.status(201).json({ message: 'Group created' });
        
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
    finally{
        client.close();
    }
    
}