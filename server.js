const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const albumsData = require("./albums.json");
 

app.get("/albums", function (request, response) {
    // let albums = getAlbums();
response.send(albumsData);
  });

//get album by id .....................................

app.get("/album/:albumId",function(request, response){
    const Id = parseInt(request.params.albumId);
    console.log(Id);
    const newAlbum = albumsData.find((element)=>{
      return element.Id ==Id;
    })
    console.log(newAlbum);
      response.json(newAlbum);
    });


//post albums:::::::::::::::::::::::
  app.post("/albums", function(request,response){
    let rawdata = fs.readFileSync('albums.json');
    let allAlbum= JSON.parse(rawdata);
    let newAlbum = request.body; 
    console.log(newAlbum);
    newAlbum.albumId = allAlbum.length.toString();
    //  // add the new quote to the array 
    allAlbum.push(newAlbum); 
    //  // save the whole array to the quotes.json file 
     saveAlbum(allAlbum); 
    response.send(allAlbum);
    ////////
  
  });

  //delet album;;;;;;;;;;;;;;;;;;;;;;;;;

  app.delete("/albums/:albumId", function (req, res) { 

      const id = req.params.albumId
      console.log(id);
      const deleteAlbum  = allAlbum.find((element)=>{
        return element.Id ==Id;
      })
       if(deleteAlbum){ 
           let index = allAlbum.indexOf(deleteAlbum); 
           allAlbum.slice(index, 0); 
           res.send(deleteAlbum);
         } 
           else {
                res.send("This album doesnt exist"); 
            } 

            saveAlbum(allAlbum);  
        });


 /// Aux function:::::::::::::

 const allAlbum = () => {
    // using global variable "fs" ^ defined at the top part of server.js
    let rawdata = fs.readFileSync('albums.json');
    return JSON.parse(rawdata);
};
const saveAlbum = albums => {
    let data = JSON.stringify(albums);
    fs.writeFileSync('albums.json', data);
};

  app.listen(3043, function () {
    console.log("Server is listening on port 3033. Ready to accept requests!");
    }); 