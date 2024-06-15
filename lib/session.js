import { getIronSession } from 'iron-session';

export function get(req, res) {
  const session = getIronSession(req,res, {
    password: process.env.SESSION_SECRET_KEY,
    cookieName: 'saes_session'
  });
}

export async function post(req, res){
  const session = getIronSession(req,res,{
    password: process.env.SESSION_SECRET_KEY,
    cookieName: 'saes_session'
  });
  console.log(Object.getOwnPropertyNames(session));
  console.log("Test");
  session.username = req.body.username;
  await session.save();
}
