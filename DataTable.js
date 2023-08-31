import React, { useState } from "react";
import MonthlyChart from "./MonthlyChart";
import { VscDebugStart } from "react-icons/vsc";
import { MdDelete } from "react-icons/md";
import { BsPieChart } from "react-icons/bs";
import { Button } from "react-bootstrap";

function DataTable({
  savedData,
  searchTerm,
  startFetching,
  renderCapacityInput,
  deleteSavedData,
  compareButton,
  setSavedData2,
}) {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const [selectedData, setSelectedData] = useState(null);

  return (
    <div className="data-table">
      <div className="table-responsive">
        <table className="table scrollable-table">
          <thead className="sticky-header">
            <tr>
              <th>School Name</th>
              <th>Class Name</th>
              <th>Feed Key</th>
              <th>Email</th>
              <th>Capacity</th>
              <th className="actions-header">
                Actions
                <div className="compare-button-container">{compareButton}</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {savedData
              .filter(
                (data) =>
                  data.schoolName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  data.className
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
              )
              .map((data, index) => (
                <tr key={index}>
                  <td>{data.schoolName}</td>
                  <td>{data.className}</td>
                  <td>{data.feedKey}</td>
                  <td>{data.email}</td>
                  <td>{renderCapacityInput(data, index)}</td>
                  <td className="button-container">
                    <Button
                      className="table-button"
                      onClick={() => startFetching(data)}
                    >
                      <VscDebugStart />
                    </Button>
                    <Button
                      className="table-button"
                      style={{ backgroundColor: "#f2d516" }}
                      onClick={() => {
                        setSelectedData(data);
                        setShowModal(true);
                      }}
                    >
                      <BsPieChart />
                    </Button>
                    <Button
                      className="table-button"
                      style={{ backgroundColor: "#fc3f4c" }}
                      onClick={() => deleteSavedData(index)}
                    >
                      <MdDelete />
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <MonthlyChart
        data={selectedData}
        showModal={showModal}
        handleClose={handleClose}
      />
    </div>
  );
}

export default DataTable;
