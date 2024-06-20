import DB from "../../components/database"
import { ObjectId } from "mongodb";

export default async function handler(req, res) {

    if (req.method === "GET"){

        const client = await DB();
        const connection = client.db('SAES')

        try {
            const periodDB = await connection.collection('Periodo');

            const data = "6673ccf2a43693d4b060243b"
            const objID = new ObjectId(data);
            
            const result = await periodDB.findOne({"_id" : objID});
            
            console.log(result);
            
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal server error' });
        }finally{
            client.close;
        }
    }
    
    if (req.method === "POST"){
        const client = await DB();
        const connection = client.db('SAES')
        try{
            if (req.body.active === true){
                const period = req.body.period; 
                const periodDB = await connection.collection('Periodo');

                const data = "6673ccf2a43693d4b060243b"
                const objID = new ObjectId(data);

                const result = await periodDB.findOneAndUpdate(
                    { "_id": objID },
                    { $set: { "active": true, "period": period } },
                    { returnDocument: "after" }
                  );
                res.status(200).json(result);
            }
            else if (req.body.active === false){
                const period = req.body.period; 
                const periodDB = await connection.collection('Periodo');
                const data = "6673ccf2a43693d4b060243b"
                const objID = new ObjectId(data);

                const result = await periodDB.findOneAndUpdate({"_id" : objID}, { $set: {"active" : false}});
                res.status(200).json(result);
            }
        }
        catch(error){
            console.log(error);
            return res.status(500).json({ message: 'Internal server error' });
        }finally{
            client.close;
        }
    }
    else{
        res.status(405).json({ message: 'Method not allowed' });
    }
}