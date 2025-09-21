import { kv } from '@vercel/kv'; // install @vercel/kv

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});

  const { username, password } = req.body;

  try {
    // fetch user from KV
    const user = await kv.get(`user:${username}`);

    if(!user || user.password !== password){
      return res.status(200).json({success:false, error:'Invalid username or password'});
    }

    // success
    return res.status(200).json({success:true});
  } catch(e){
    console.error(e);
    return res.status(500).json({error:'Server error'});
  }
}
