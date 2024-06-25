import DB from "../../components/database"
export default async function Submit(req, res){

    if (req.method !== "POST"){
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const client = await DB();
    const connection = client.db('SAES')

    try {
        const califDB = connection.collection('Calificaciones');
        const result = await califDB.updateMany({"completed" : false}, {$set: { "completed" : true}});
        
        res.status(200).json(ids);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }finally{
        client.close();
    }
}