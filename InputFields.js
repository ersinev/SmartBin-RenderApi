import React from "react";

function InputFields({
  schoolName,
  className,
  feedKey,
  capacity,
  setSchoolName,
  setClassName,
  setFeedKey,
  setCapacity,
  saveData,
}) {
  return (
    <div className="input-table">
      <div className="input-row">
        <div className="input-cell">
          <label>School Name</label>
          <input
            type="text"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
          />
        </div>
        <div className="input-cell">
          <label>Class Name</label>
          <input
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          />
        </div>
        <div className="input-cell">
          <label>Feed Key</label>
          <input
            type="text"
            value={feedKey}
            onChange={(e) => setFeedKey(e.target.value)}
          />
        </div>
        <div className="input-cell">
          <label>Capacity</label>
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
          />
        </div>
        <div className="input-cell saveBtn">
          <button onClick={saveData}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default InputFields;
