//import axios from "axios";
const axios = require('axios');
const { MongoClient } = require('mongodb');
const uri = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(uri);

async function getUserData() {
		await client.connect();
      const db = client.db("local");
      const collection1 = db.collection("tryDB");
      response1 = await axios.get("https://jsonplaceholder.typicode.com/users/");
      for (i = 0; i < response1.data.length; i++) {
         let data = response1.data[i];
         let options = { upsert: true };
         data.updatedAt = new Date();
         let updateSpecs = {
            $set: data , 
            $setOnInsert: { createdAt: new Date() }
         };
         let filter = {id: response1.data[i].id};
         await collection1.updateOne ( filter, updateSpecs, options );
      }
      await client.close();
}

getUserData();
