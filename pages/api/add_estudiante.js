"use server"
import DB from "../../components/database"

export default async function addUser(req,res){
    if (req.method !== 'POST'){
        return res.status(405).json({ message: 'Method not allowed' });
    }
    const client = await DB();
    const connection = client.db('SAES');
    try{
        const groupDB = await connection.collection("Grupos");
        const califDB = await connection.collection("Calificaciones");
        const GrupoID = req.body.id;
        const EstudianteNombre = req.body.nombre;
        const EstudianteID = req.body.estudianteID;
        const materia = req.body.materia;

        const res1 = await groupDB.findOne({ "id" : GrupoID });
        const alumnos = res1.alumnos;
        const existe = alumnos.includes(EstudianteNombre);

        if(existe){
            return res.status(400).json({ message: 'Student already exists' });
        }
        
        //Add student to group
        const result = await groupDB.updateOne({ "id" : GrupoID }, { $push: {alumnos: EstudianteNombre} });

        //Create entry in calificaciones
        const response = await califDB.insertOne({
            estudianteID: EstudianteID,
            grupoID: GrupoID,
            materiaNombre: materia,
            parcial1: "",
            parcial2: "",
            parcial3: "",
            final: "",
            completed: false
        });
        
        return res.status(201).json({ message: 'Student added' });
        
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
    finally{
        client.close();
    }
    
}