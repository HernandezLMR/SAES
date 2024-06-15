"use server"
import { sessionOptions, SessionData, defaultSession } from "../../components/lib";
import DB from "../../components/database"
import bcrypt from "bcrypt"

//import jwt from "jsonwebtoken"
//import { get, post } from '../../lib/session';
export default async function handler(req, res) {
  
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  //Establish connection to DB
  const client = await DB();
  const connection = client.db('SAES')
  
  try{
    
    
    
    //Extract user from request
    const matricula = req.body.username;
    const password = req.body.password;
    
    //Check if user and password match database
    const userDB = await connection.collection("Users");
    const dbUser = await userDB.findOne({ "matricula" : matricula });
    
    if (!dbUser){
      res.status(404).json({ message: 'Invalid username'});
    }

    const encripted = dbUser.password;
    
    const pass = await bcrypt.compare(password, encripted);
    

    if(pass === true){
      //Generate JWT token
      /*const secretKey = process.env.JWT_SECRET_KEY;
      const payload = {
        id: matricula,
        user: dbUser.tipo,
      };*/
      //const token = jwt.sign(payload, secretKey, {expiresIn: "2h"});
      
      //req.session.set('token', token);
      //await req.session.save();


      let rdLoc;

      if (dbUser.tipo === "estudiante"){
        rdLoc = 1;
      }
      else if(dbUser.tipo === "maestro"){
        rdLoc = 2;
      }
      else if(dbUser.tipo === "admin"){
        rdLoc = 3;
      }
      
      const tp = dbUser.tipo;
      const nm = dbUser.nombre;
      res.status(200).json({ message: 'Username and password match', rdLoc, tp, nm});
    }
    else{
      res.status(401).json({ message: 'Wrong username or password'});
    }

    
  }
    
  catch (error){
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
  finally {
    // Close the connection to the MongoDB cluster
    await client.close();
  }
}
