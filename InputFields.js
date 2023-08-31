import React from "react";

function InputFields({
  schoolName,
  className,
  email,
  feedKey,
  capacity,
  setSchoolName,
  setClassName,
  setFeedKey,
  setCapacity,
  setEmail,
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
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
