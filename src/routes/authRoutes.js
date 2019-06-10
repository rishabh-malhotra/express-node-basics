const express = require("express");
const authRouter = express.Router();
const { MongoClient } = require("mongodb");
const debug = require("debug")("app:authRoute");
function Router() {
  authRouter.route('/signUp')
    .post((req, res) => {
      debug(req.body);
      const { username, password } = req.body;
      const url = "mongodb://localhost:27017";
      const dbName = "LibraryApp";
      (async function addUser() {
        let client;
        try {
          client=await MongoClient.connect(url);
          debug('Connected Successfully to the server')
          const db=client.db(dbName);  
          const col=await db.collection("users");
          const user={username,password};
          const results=await col.insertOne(user);
          req.login(results.ops[0],()=>{
            res.redirect('/auth/profile')
          });
        // const response=col.insertOne({'username':username,'password':password});
        // res.render("index", {
        //   nav,
        //   title: "Library"
        // });
        } catch (err) {
          debug(err.stack);
        }
      })();
      
     
    });
    authRouter.route('/profile')
      .get((req,res)=>{
        res.json(req.user)
      })
  return authRouter;
}

module.exports=Router;
