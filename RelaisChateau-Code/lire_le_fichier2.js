const fs = require("fs");
const rp = require('request-promise');
const cheerio = require('cheerio');
let contenu;

contenu = fs.readFileSync("addunR.txt", "UTF-8");

var tab_resto = new Map();
var tab_resto2 = new Map();
var nouveau_contenu = contenu.split(';');

console.log('taille : ' + nouveau_contenu.length);



for(var i = 0; i<nouveau_contenu.length;i=i+2)
{
tab_resto.set(nouveau_contenu[i].trim(),nouveau_contenu[i+1]);
}

var where =1;

tab_resto.forEach((ele,cle)=>{
    const url = ele;
        rp(url)
        .then(function(value){
            where++;
            console.log(where)
            var repHtml = cheerio.load(value);
            repHtml('h3.mainTitle2').each(function(i, element3){
                var a = repHtml(this);
                var newA = a.text().trim();
                tab_resto2.set(cle,newA);
              })
            if(where == tab_resto.size)
            {
                tab_resto2.forEach((ele2,cle2)=>console.log(cle2+' : '+ele2))
            }
        }).catch(err=>{console.log(err.statusCode)
        where++;
        })
})



/*
tab_resto.forEach(function(val, cle){
console.log(cle+' : '+val);
})
*/
