var relaisSrap=require('./relaisScrap');
var restoScrap = require('./restoScrap');
var getChatNameRes = require('./chatResName');
var getIDHotel = require('./recupIDhotel');
var fs = require('fs');
var getPrixHotel = require('./scrapper_prix');



var lireFichier2resto = require('./lire_le_fichier');

var o ={};
var tabinfochateaux = [];
var tabResto = [];
var tabRelaisURL = [];
var tabRestoMich = [];
var tabRestoChat = [];
var mapID = new Map();
var map_2_resto = new Map();
var restaurant_etoile_relais = new Map();



async function Main(){
    //take the 150 URL 

    let promise = new Promise((resolve, reject) =>{relaisSrap(RemplirTabRelaisURL, resolve);})
    let re = await promise;

    //take the 626 restaurants name of Michelin

    let promise2 = new Promise((resolve, reject)=>{restoScrap(RemplirTabRestoMich, resolve);})
    let re2 = await promise2;
    /*
    //scrap the restaurant's names of Relais Chateau
    let promise3 = new Promise((resolve, reject)=>{getChatNameRes(tabRelaisURL,RemplirTabRestoChatName,resolve);})
    let re3 = await promise3;
    */
    //scrap prices of the hotel
    let promise4 = new Promise((resolve, reject)=>getIDHotel(tabRelaisURL,RemplirIDHotel,resolve));
    let re4 = await promise4;
  
    let promise5 = new Promise((resolve,reject)=>getPrixHotel(mapID,remplirInfoChateau,resolve));
    let re5 = await promise5;

    //mapID.forEach((ele,clé)=>console.log(clé+' : '+ele));

    /*

    map_2_resto = lireFichier2resto();
    restaurant_etoile_relais = Comparer_Resto_Michelin_Relais();
    restaurant_etoile_relais.forEach((ele,cle)=>console.log(cle+' : '+ele));
    console.log(restaurant_etoile_relais.size);
    var monJSON = JSON.stringify(mapToJSON(o,restaurant_etoile_relais), null,' ');
    FielderCreation(monJSON);

    

    */

}

function FielderCreation(text){
var path = 'StarredRestaurant.json';
buffer = new Buffer(text);

fs.open(path, 'w', function(err, fd) {
    if (err) {
        throw 'error opening file: ' + err;
    }

    fs.write(fd, buffer, 0, buffer.length, null, function(err) {
        if (err) throw 'error writing file: ' + err;
        fs.close(fd, function() {
            console.log('file written');
        })
    });
});
}

function mapToJSON(o,m){
   
    for (let [k,v] of m)
    {
        o[k] = v;
    }
    return o;
}

function remplirInfoChateau(tab){
    tabinfochateaux = tab;
    tab.forEach(ele=>console.log(ele.prixHotel))
}

function RemplirTabRelaisURL(tab){
tabRelaisURL = tab;
console.log(tab.length);
}

function RemplirIDHotel(map){
    mapID =map;
    mapID.forEach((ele,clé)=>console.log(clé + ' : '+ele));
    console.log('taille map : '+mapID.size);
}

function RemplirTabRestoMich(tab){
    tabRestoMich= tab;
    console.log(tab.length);
}
function RemplirTabRestoChatName(map1resto, map2resto){
    
   map1resto.forEach(element => {console.log(element);})
   
   map2resto.forEach(element => {console.log(element);})
    
   console.log('taille 2 restos : ' +map2resto.size);
   console.log('taille 1 resto : '+ map1resto.size);
       
   
}
 function Comparer_Resto_Michelin_Relais()
 {
     map_2_resto.forEach((ele2,cle)=>{

    
     tabRestoMich.forEach((ele)=>{
         var exp = ''
         var ele_modifier = replaceAll(' ','[ ]',ele.trim().toLowerCase());
         var reg = ele_modifier;
         var Reg = new RegExp(reg);
     if (Reg.test(ele2.trim().toLowerCase()))
     {
         if(ele.trim().toLowerCase() != 'es'&& ele.trim().toLowerCase() !='le m'&& ele.trim().toLowerCase() !='la table')
        restaurant_etoile_relais.set(cle,ele.trim());
     }
     })
    })
     return restaurant_etoile_relais;
 }

 function replaceAll(recherche, remplacement, chaineAModifier)
{

//On effectue le remplacement dans la chaîne
var re = new RegExp(recherche, 'g');
return chaineAModifier.replace(re, remplacement);
}

Main();