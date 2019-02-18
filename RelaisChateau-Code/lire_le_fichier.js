const fs = require("fs");
let contenu;

let lireFichier = function(){
contenu = fs.readFileSync("nomR.txt", "UTF-8");

var tab_resto = new Map();

var nouveau_contenu = contenu.split(':');

for(var i = 0; i<nouveau_contenu.length;i=i+2)
{
tab_resto.set(nouveau_contenu[i].trim(),nouveau_contenu[i+1]);
}

return tab_resto;

}

module.exports = lireFichier;