//scratch des restaurants étoilés
const cheerio = require('cheerio');
const fetch = require('node-fetch');

var compteur = 0;
var tab = [];
var where = 1;


var nomResto = function (callback,resolve) {
for(var page = 1;page<36;page++)
{
fetch("https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-"+page, 
  {"credentials":"include",
  "headers":{"accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
  "accept-language":"fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7","if-none-match":"\"1548777813-0\"","upgrade-insecure-requests":"1"},
  "referrerPolicy":"no-referrer-when-downgrade",
  "body":null,
  "method":"GET",
  "mode":"cors"})
  	.then(res => res.text())
    .then(function(value){
      where++;
      var rep = cheerio.load(value);
      rep('div.poi_card-display-title').each(function(i,element){
    	var a = rep(this);
    	tab[compteur] = a.text();
      compteur++;
    });
    if(where==36)
    {
      callback(tab);
      resolve('ok');
    }
    }).catch(err=>console.log(err));
  } 
}
module.exports = nomResto;

