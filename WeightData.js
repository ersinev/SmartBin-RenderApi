import React, { useEffect } from "react";

const WeightData = ({ weight }) => {
  useEffect(() => {}, [weight]);

  return (
    <div className="weight-data">
      <h2>
        <span style={{ color: "#3498db" }}>Weight:</span> {weight} gr
      </h2>
    </div>
  );
};

export default WeightData;
