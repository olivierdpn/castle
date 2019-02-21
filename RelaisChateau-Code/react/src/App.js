import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Card, CardTitle, CardText, CardImg, CardImgOverlay } from 'reactstrap';
import CardChateau from './CarteChateau';
import './App.css';
import starredRestaurant from './StarredRestaurant';
import ScrollArea from 'react-scrollbar';


class App extends Component {
  constructor()
  {
    super();
    this.state={
      items: []
    }
  }
onClick(){
 
  const listItems = Object.entries(starredRestaurant).map((d)=>{
    
    const ele = this.state.items;
    ele.push(d);
    this.setState(
      {
        items: ele
      }

    )
      
    
    

  })
}


  render() {
  
    return (

      <div>
     
         <div>
      <Card inverse>
        <CardImg width="100%" src="https://source.unsplash.com/Yui3DZiX7yM" alt="Card image cap" />
        <CardImgOverlay>
          <CardTitle className="text-center">
          <h2 className="text-center text-muted" >Comparator Relais Chateau and Michelin</h2>
          <br></br>  <br></br>  <br></br> 
          <h4 className="text-center text-muted">You can discover on click our results of relais chateau's hotel combined with starred restaurant</h4>
          <br></br>  <br></br>  
          <Button onClick={this.onClick.bind(this)} color="secondary" size="lg" className="text-center">View deals</Button>
          </CardTitle>
          
 
          <ScrollArea
            speed={0.8}
            className="area"
            contentClassName="content"
            horizontal={false}
            >
            <div>
          <CardText>
          
          <br></br>  <br></br> 
          {this.state.items.map((d)=>{
            const[cal, key]= d;
            return(
              <div>
                <br></br>   
                <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                <CardTitle>Relais et chateau : {cal}</CardTitle>
                <CardText>Stared restaurant associated : {key}</CardText>
                </Card>
                </div>
            );
          })}
          
          </CardText>
          </div>
          </ScrollArea>
        
        </CardImgOverlay>
      </Card>
    </div>
        
       
        
        <br></br>
      
       
      </div>
   
    );
  }
}



export default App;
