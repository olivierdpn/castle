import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Card, CardTitle, CardText, CardImg, CardImgOverlay } from 'reactstrap';
import './App.css';
import starredRestaurant from './StarredRestaurant';


var fs = require('fs');

class CardChateau extends Component {

    render(){
        const listItems = Object.entries(starredRestaurant).map((d)=>{
            const[cal, key]= d;
       
            
            return(<div>
                <br></br>   
                <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                <CardTitle>Relais et chateau : {cal}</CardTitle>
                <CardText>Stared restaurant associated : {key}</CardText>
                </Card>
                </div>
               
                 );
            
          })
          return(
              <div>
                  {listItems}
              </div>
          )
      
    }
}

export default CardChateau;