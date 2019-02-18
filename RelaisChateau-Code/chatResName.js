const cheerio = require('cheerio');
const fetch = require('node-fetch');
const rp = require('request-promise');

var where = 0;
var nameRestaurant = new Map();
var tab2 = [];
var myMap1resto = new Map();
var myMap2resto = new Map();

var where=0;

var getResto = function (tab, callback,resolve){

    tab.forEach(ele => {
        fetch(ele, 
        {"credentials":"include","headers":{"accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        "accept-language":"fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7","cache-control":"max-age=0",
        "upgrade-insecure-requests":"1"},
        "referrerPolicy":"no-referrer-when-downgrade",
        "body":null,
        "method":"GET",
        "mode":"cors"})
        .then(response => response.text())
        .then(function(value){
            where++;
            console.log('Compt : ' + where)
            var repHtml = cheerio.load(value);
            var nameHotel;
            repHtml('h3.mainTitle2').each(function(i, element){
                nameHotel = repHtml(this).text().trim();
            })
            
            repHtml('body > div.jsSecondNav.will-stick > ul.jsSecondNavSub').each(function(i, element){
            var a = repHtml(this).text().trim();
            var newA = a.replace(/\s{2,}/gi,';');
            myMap2resto.set(nameHotel,newA);
           // console.log('2resto:');
           // console.log(newA);
            })
           
            repHtml('body > div.jsSecondNav.will-stick > ul.jsSecondNavMain > li:nth-child(2) > a').each(function(i,ele2){
            var a = repHtml(this);
            console.log(a.attr('href'));
           //     console.log(a.children().next().children().attr('href'));
            myMap1resto.set(nameHotel,(a.attr('href')));
            })
            
            if (where ==150)
            {
                callback(myMap1resto,myMap2resto);
                resolve('ok');
            }

            }).catch(function(err){
                console.log(err.statusCode);
                if (where ==150)
                {
                    callback(myMap1resto,myMap2resto);
                    resolve('ok');
                    
                }
            });
        })
    }
module.exports = getResto;

         
