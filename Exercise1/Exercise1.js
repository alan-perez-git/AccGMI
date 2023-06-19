const axios = require('axios');
const { MongoClient } = require('mongodb');
const express = require('express');

const uri = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(uri);
const app = express();
const port = 3000;


app.get("/users/:id", async (req, res) => {
   await client.connect();
   const db = client.db("local");
   const collection1 = db.collection("tryDB");

   response = await axios.get("https://jsonplaceholder.typicode.com/users/",
   {
      params: {
         id: req.params.id
      }
   }
   );
   let data = response.data[0];
   let options = { upsert: true };
   data.updatedAt = new Date();
   let updateSpecs = {
      $set: data , 
      $setOnInsert: { createdAt: new Date() }
   };
   let filter = {id: data.id};
   await collection1.updateOne ( filter, updateSpecs, options );
   await client.close();

   res.send(response.data[0]);
});

app.listen(port);
