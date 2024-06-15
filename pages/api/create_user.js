"use server"
import DB from "../../components/database"
import bcrypt from "bcrypt"

export default async function addUser(req,res){
    if (req.method !== 'POST'){
        return res.status(405).json({ message: 'Method not allowed' });
    }
    const client = await DB();
    const connection = client.db('SAES');
    try{
        const userDB = await connection.collection("Users");
        const data = req.body;
        
        data.password = await bcrypt.hash(data.password,10);
        
        const result = await userDB.insertOne(data);
        
        return res.status(201).json({ message: 'User created' });
        
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
    finally{
        client.close();
    }
    
}