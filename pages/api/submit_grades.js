import DB from "../../components/database"
export default async function Submit(req, res){

    if (req.method !== "POST"){
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const client = await DB();
    const connection = client.db('SAES')

    try {
        console.log("Input: " + JSON.stringify(req.body.calif));
        const matriculas = Object.keys(req.body.calif);
        const calificaciones = Object.values(req.body.calif);
        const gID = req.body.gID;
        const periodo = req.body.periodo;
        const parcial = "parcial" + periodo;
        
        
        const materia = req.body.gNom;

        const califDB = connection.collection('Calificaciones');

        for (let i = 0; i < calificaciones.length; i++) {
            
            let update;
            let updatestring = '{ "' + parcial + '" : "' + calificaciones[i] + '" }';
            console.log(updatestring);
            update = JSON.parse(updatestring);
            
            let result = await califDB.updateOne(
                { estudianteID: matriculas[i], grupoID: gID, materiaNombre: materia },
                { $set: update }
            );
        }
        
        
        res.status(200).json({message: 'OK'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }finally{
        client.close();
    }
}