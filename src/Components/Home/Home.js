import React, { useState } from "react";




import Cards from "../Cards/Cards";

import "./Home.css";

const Home = () => {
 
  const [visibleItem , setvisibleItem]= useState({});
  //  const [handle, sethandle]= useState(false);
  const handleClick = (item) => {

    setvisibleItem(item);

    



   

    
    
  };
  return (
    <div>
       
     
       <Cards handleClick={handleClick}></Cards>

       <div className="home">
       
       <h2 className="green">{visibleItem.title}</h2>
       <p>{visibleItem.body}</p>
       
       
       </div>
       
       

      
     
    </div>
  );
};

export default Home;
