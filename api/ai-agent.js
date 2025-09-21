export default async function handler(req,res){
  try{
    const prompt=req.body.prompt;
    const API_KEY=process.env.GOOGLE_API_KEY;
    const response = await fetch("https://gemini.api.google.com/v1/completions", {
      method:"POST",
      headers:{
        "Authorization":`Bearer ${API_KEY}`,
        "Content-Type":"application/json"
      },
      body: JSON.stringify({prompt})
    });
    const data = await response.json();
    res.status(200).json({output:data.choices[0].text||""});
  } catch(e){ res.status(500).json({error:e.message}); }
}
