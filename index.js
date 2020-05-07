const express = require("express");
const shortid = require("shortid");

const server = express();
server.use(express.json());

let hubs = [{
    message:"Hello@@"
}];
let lessons = [];

server.get('/',(req,res) => {
  res.json(hubs);
})


//Create
server.post("/api/hubs", (req, res) => {
      const hubInfo = req.body;

      hubInfo.id = shortid.generate();
      hubs.push(hubInfo);
      res.status(201).json(hubInfo);
})

//Read 
server.get("/api/hubs",(req, res) => {
    res.status(200).json(hubs);
})

//Delete
server.delete("/api/hubs/:id",(req,res) => {
  const {id} = req.params
  const found = hubs.find(hub => hub.id === id);

  if(found){
      hubs = hubs.filter(hub => hub.id !== id);
      res.status(200).json(found);
  }else{
      res.status(404).json({message:"hub not found"});
  }
  
})

//Update - patch
server.patch("/api/hubs/:id",(req,res) => {
  const {id} = req.params;
  const changes = req.body;

  let found = hubs.find(hub => hub.id === id );

  if(found) {
      Object.assign(found, changes);
      res.status(200).json(found);
  }else{
      res.status(404).json({message:"hub not found"})
  }
})

//update - put
server.put("/api/hubs/:id",(req,res) => {
    server.patch("/api/hubs/:id",(req,res) => {
        const {id} = req.params;
        const changes = req.body;
      
        let index = hubs.findIndex(hub => hub.id === id);
      
        if(index !== -1) {
            changes.id = id;
            hubs[index] = changes;
            res.status(200).json(hubs[index]);
        }else{
            res.status(404).json({message:"hub not found"})
        }
      })
})

const PORT = 5000;

server.listen(PORT,() => {
    console.log(`listing on http://localhost:$(PORT)`)
});