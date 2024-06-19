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
        
        
        const cursor = await userDB.find(data);
        const result = await cursor.toArray();
        
        for (let doc of result) {
            delete doc._id;
            delete doc.alumnos;
            delete doc.maestro;
        }
        
        
        
        
        
        return res.status(201).json({ message: 'Group found' , groups: result});
        
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
    finally{
        client.close();
    }
    
}