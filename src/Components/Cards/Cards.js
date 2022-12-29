import React from "react";
import FakeData from "../../FakeData";

import "./Cards.css";

const Cards = ({handleClick}) => {
   return (
    <div className="bt"> 

      <div className="container text-center">
        <div className="row">
          {
            FakeData.map((item,k)=> ( 
              <div className="col" key={k}> 
              <div className="card">
                <img
                  onClick={() => handleClick(item)}
                  src={item.image}
                  className="card-img-top"
                  alt="..."
                />
                


              </div>
              
            </div>
            )  )
          }
         
          {/* <div className="col">
            <div className="card">
              <img
                onClick={() => props.handleClick(props.CardId)}
                src={''}
                className="card-img-top"
                alt="..."
              />
              <h3>Sreemangal</h3>
            </div>{" "}
          </div>
          <div className="col">
            <div className="card">
              <img
                onClick={() => props.handleClick(props.CardId)}
                src={sun}
                className="card-img-top"
                alt="..."
              />
              <h3>Sundarban</h3>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Cards;
