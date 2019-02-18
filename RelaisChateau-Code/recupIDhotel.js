var cheerio = require('cheerio');
var request = require('request');

var mapId=new Map();
var compteur=0;

var IdHotel=function(TableauURLHotel,callback, resolve)
{
    
        TableauURLHotel.forEach(element => {               
            request(element, function (error, response, html) {
                if (response.statusCode == 200) { 
                    compteur++;                  
                    var $ = cheerio.load(html);                    
                    var texte=$('#tabProperty');
                    var texte1=texte.attr('data-gtm-datalayer'); 
                   try{
                        var nombre=/[0-9]{5}/.exec(texte1);                                            
                        var id=nombre[0];
                        var nom=$('body > div.hotelHeader > div.headings > h1').text().trim();                  
                        mapId.set(nombre[0],nom); 
                    }       
                    catch(error){
                        
                    }                                                 
                }
                else{
                    console.log("erreur");
                    compteur++;
                };
                if(compteur==150)
                {
                   callback(mapId);
                   resolve('ok');
                }
                
            });
        });    
}
module.exports=IdHotel;