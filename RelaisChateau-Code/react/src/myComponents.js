import React from 'react'
var fs = require('fs');


export function ReadJson()
{
    var obj;
    var myBuffer = fs.readFile('StarredRestaurant.json',(err,content)=>{
        obj = JSON.parse(myBuffer.toString())
    });

    return obj.map((value)=>{
        return (<div>
            <p>Chateaux étoilés : </p>
        <td >{value}</td>
        </div>)
    })
    
}