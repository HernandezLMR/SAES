import DB from "../../components/database"
export default async function Submit(req, res){

    if (req.method !== "POST"){
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const client = await DB();
    const connection = client.db('SAES')

    try {
        //MOst probably very wrong, but tired
        
        
        res.status(200).json({message: 'OK'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }finally{
        client.close();
    }
}