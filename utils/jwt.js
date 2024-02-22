const jwt = require("jsonwebtoken");

function createToken(data) {
  let token = jwt.sign(data, "secret-key", { expiresIn: "24h" });

  return token;
}

function verifyToken(req, res, next) {
  let func =(req, res ,next)=>{
    console.log(req)
    let authHeader = req.headers.Authorization;
   
    if(authHeader){
      let token = authHeader.split(' ')[1];
      jwt.verify(token, 'secret-key', (err, decoded) => {
        if(err) {
           res.status(400).json({ error: "Invalid Token Provided" });
        } else {
            res.status(200).json({ message: "Success", decoded });
          next();
          return;
        }
      });
    }else{
      res.status(400).json({error:"Auth header missing"})
    }
  }
 
  next()
  
  }
  
module.exports = {
  createToken,
  verifyToken,
};
