import React from "react";

const GarbageAnimation = ({ fillPercentage }) => {
  const parentHeight = 300; 
  const parentWidth = 250; 
  const capsuleMargin = 2; 
  const capsuleCount = 10; 
  const capsuleHeight =
    (parentHeight - capsuleMargin * (capsuleCount - 1)) / capsuleCount;

  const colors = [
    "#7F0000",
    "#A70000",
    "#D40000",
    "#FF0000",
    "#FF2525",
    "#FF5252",
    "#FF7B7B",
    "#FF7F7F",
    "#FF9C9C",
    "#FFBABA",
  ];
  const capsules = [];
  for (let i = 0; i < capsuleCount; i++) {
    const capsuleColor =
      i >= capsuleCount - Math.floor(fillPercentage / (100 / capsuleCount))
        ? colors[i]
        : "white";

    capsules.push(
      <div
        key={i}
        className="capsule"
        style={{
          width: `${parentWidth}px`,
          height: `${capsuleHeight}px`,
          backgroundColor: capsuleColor,
          marginBottom: i < capsuleCount - 1 ? capsuleMargin : 0,
          marginTop: i > 0 ? capsuleMargin : 0,
        }}
      />
    );
  }

  return (
    <div
      className="garbage-container"
      style={{
        height: `${parentHeight + capsuleHeight}px`,
        width: `${parentWidth}px`,
        overflow: "hidden",
        padding: "5px",
      }}
    >
      <div className="capsules-container">{capsules}</div>
    </div>
  );
};

export default GarbageAnimation;
