const fetch = require('node-fetch');
const cheerio = require('cheerio');

var tab = [];
var compteur = 0;
var where =1;

var relaisTab = function relaisFor(callback,resolve){
  for (page = 1;page<9;page++)
  {
  fetch("https://www.relaischateaux.com/fr/update-destination-results", 
    {"credentials":"include",
    "headers":{"accept":"*/*",
    "accept-language":"fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
    "content-type":"application/x-www-form-urlencoded; charset=UTF-8",
    "x-requested-with":"XMLHttpRequest"},
    "referrer":"https://www.relaischateaux.com/fr/destinations/europe/france",
    "referrerPolicy":"origin-when-cross-origin",
    "body":"page="+page+"&areaId=78",
    "method":"POST",
    "mode":"cors"})
  .then((response) => response.json())
  .then(function(value){
      where++;
      var repHtml = value.html;
      var repHtml_c = cheerio.load(repHtml);
      repHtml_c('h3').each(function(i, element){
      var a = repHtml_c(this);
      tab[compteur] = a.children().attr('href');
      compteur++;
      
     // console.log(compteur);
     // console.log(page);
      });
      if (where==9)
      {
        callback(tab);
        resolve('ok');
      }
    })
  .catch(err=> console.log(err));
}
}

//scratch des premiers sites web


module.exports=relaisTab;
//noms et adresses web des restos



