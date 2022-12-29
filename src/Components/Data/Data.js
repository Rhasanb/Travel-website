import React, { useState } from 'react'; 
import FakeData from '../../FakeData';
import Cards from '../Cards/Cards';


const Data = () => {
    const first3 = FakeData.slice(0,3);
    console.log(FakeData);
    const [data, setdata]= useState(first3);
    const [card, setcard]= useState([]);


  
  


    const handleClick = (CardId) => {
        const CardsDetails = CardId.id;
        const showDetails = card.find(pd => pd.id === CardsDetails);

       

      
      setcard(showDetails);
        
      


    

      
      
      
  }



    return (
        <div>
            {
                console.log(data)
            }
            {

                data.map( pd=><Cards handleClick={handleClick} pd={pd}></Cards>)
                
            }

            <div>
                <h1> length:{data.length}</h1>
            </div>
        </div>
    );
};

export default Data;