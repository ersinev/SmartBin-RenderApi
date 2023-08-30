import React, { useEffect} from "react";

const WeightData = ({
  weight
}) => {

  useEffect(() => {
   
  }, [weight]); // Removed adafruitUsername and adafruitIoKey, as they are not required anymore

  return (
    <div className="weight-data">
    
      <h2>
        <span style={{ color: "#3498db" }}>Weight:</span> {weight} gr
      </h2>
    </div>
  );
};

export default WeightData;
