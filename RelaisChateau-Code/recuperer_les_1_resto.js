const rp = require('request-promise');
 
    rp(a.children().next().children().attr('href'))
    .then(function(value){
          var repHtml = cheerio.load(value);
          console.log('fetch3');
          repHtml('h3.mainTitle2').each(function(i, element){
            var a = repHtml(this);
            var newA = a.text().trim();
            console.log('Le nom du resto est ' + newA);
           // myMap.set(ele,newA);
           tab2.push(newA);

            console.log('taille : '+ tab2.length);
          })
        }).catch(err=>console.log(err.statusCode));
      