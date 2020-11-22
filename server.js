const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const albumsData = require("./albums.json");
 

app.get("/albums", function (request, response) {
response.send(albumsData);
  });

//get album by id .....................................

app.get("/albums/:albumId",function(request, response){
    const Id = request.params.albumId
    console.log(Id);
    const newAlbum = albumsData.find((element)=>{
      return element.albumId ==Id;
    })
    console.log(newAlbum);
      response.send(newAlbum);
    });


//post albums:::::::::::::::::::::::
  app.post("/albums/addnew", function(request,response){
    // let rawdata = fs.readFileSync('albums.json');
     let allAlbum = JSON.parse(fs.readFileSync('albums.json')); 
    let newAlbum = request.body; 
    console.log(newAlbum);
    newAlbum.albumId = allAlbum.length.toString();
    //  // add the new quote to the array 
    allAlbum.push(newAlbum); 
    //  // save the whole array to the quotes.json file 
     saveAlbum(allAlbum); 
    response.send(allAlbum);
  
  });

  //delete album;;;;;;;;;;;;;;;;;;;;;;;;;

  app.delete("/albums/:albumId", function (request, response) {

      const Id = request.params.albumId
      console.log(Id);
      const deleteAlbum  = albumsData.find((element)=>{
        return element.albumId ==Id;
      })
       if(deleteAlbum){ 
           let index = albumsData.indexOf(deleteAlbum); 
           albumsData.splice(index, 1); 
           response.send(deleteAlbum);
         } 
           else {
                response.send("This album doesnt exist"); 
            } 

            saveAlbum(albumsData);  
        });


 /// Aux function:::::::::::::

//  const allAlbum = () => {
//     // using global variable "fs" ^ defined at the top part of server.js
//     let rawdata = fs.readFileSync('albums.json');
//     return JSON.parse(rawdata);
// };
const saveAlbum = albumsData => {
    let data = JSON.stringify(albumsData);
    fs.writeFileSync('albums.json', data);
};

  app.listen(3043, function () {
    console.log("Server is listening on port 3043. Ready to accept requests!");
    }); 