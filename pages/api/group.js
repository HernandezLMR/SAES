import DB from "../../components/database"

export default async function handler(req, res) {

    if (req.method !== "POST"){
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const client = await DB();
    const connection = client.db('SAES')

    try {
        //Get group from ID
        const id = req.body;
        const groupDB = await connection.collection("Grupos");
        const result = await groupDB.findOne({"id" : id });

        //Extract students from result
        const data = result.alumnos;
        const ids = [];
        //Get student ids
        const userDB = await connection.collection("Users");
        for (let i = 0; i < data.length; i++) {
            let response = await userDB.findOne({"nombre" : data[i]});
            ids.push({ id: response.matricula, name: data[i] });
        }

        
        res.status(200).json(ids);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }finally{
        client.close();
    }
}