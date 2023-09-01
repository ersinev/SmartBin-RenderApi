import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import SearchBar from "./SearchBar";
import DataTable from "./DataTable";
import InputFields from "./InputFields";
import HiddenSection from "./HiddenSection";
import Compare from "./Compare";

function App() {
  const [feedKey, setFeedKey] = useState("");

  const [schoolName, setSchoolName] = useState("");
  const [className, setClassName] = useState("");
  const [email, setEmail] = useState("");
  const [capacity, setCapacity] = useState(1000);
  const [fetchingData, setFetchingData] = useState(false);
  const [savedData, setSavedData] = useState([]);
  const [hiddenSections, setHiddenSections] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const hiddenSectionsRef = useRef(null);
  useEffect(() => {
    const storedData = localStorage.getItem("savedData");
    if (storedData) {
      setSavedData(JSON.parse(storedData));
    }
  }, []);

  const handleWeightChange = (dataIndex, newWeight) => {
    setHiddenSections((prevHiddenSections) =>
      prevHiddenSections.map((section, index) =>
        index === dataIndex ? { ...section, weight: newWeight } : section
      )
    );
  };

  const handleCapacityChange = (index, newCapacity) => {
    setSavedData((prevSavedData) =>
      prevSavedData.map((data, dataIndex) =>
        dataIndex === index ? { ...data, capacity: newCapacity } : data
      )
    );
  };

  const fetchChartData = async (section, index) => {
    try {
      // Fetch data from the new API
      const response = await fetch(
        `https://smartbin-cf8d.onrender.com/fetch-weights/${section.feedKey}`
      );
      const chartData = await response.json();

      if (chartData.length > 0) {
        const latestData = chartData[chartData.length - 1];
        // console.log(latestData)
        // console.log(index)
        // console.log(hiddenSections)

        setHiddenSections((prevHiddenSections) => {
          return prevHiddenSections.map((s, i) =>
            s.data.feedKey === section.feedKey
              ? {
                  ...s,
                  chartData,
                  latestData,
                  showChart: s.showChart !== undefined ? s.showChart : true,
                }
              : s
          );
        });

        //setcounter((a)=> a+2)
      }
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  const toggleChart = (index) => {
    setHiddenSections((prevHiddenSections) =>
      prevHiddenSections.map((section, i) =>
        i === index ? { ...section, showChart: !section.showChart } : section
      )
    );
  };

  const startFetching = async (data, index) => {
    fetchChartData(data, index);

    setFetchingData(true);
    setSchoolName(data.schoolName);
    setClassName(data.className);
    setEmail(data.email);
    setFeedKey(data.feedKey);
    setCapacity(data.capacity);

    setHiddenSections((prevHiddenSections) => [
      ...prevHiddenSections,
      {
        data: { ...data },
        latestData: { weight: 0 },
        showChart: true,
        chartData: [],
      },
    ]);

    if (hiddenSectionsRef.current) {
      hiddenSectionsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const saveData = () => {
    const newData = {
      schoolName,
      className,
      email,
      feedKey,

      capacity,
    };
    const updatedSavedData = [...savedData, newData];

    setSavedData(updatedSavedData);
    setSchoolName("");
    setClassName("");
    setEmail("");
    setFeedKey("");

    setCapacity(1000);

    localStorage.setItem("savedData", JSON.stringify(updatedSavedData));
  };

  const deleteSavedData = (index) => {
    const newSavedData = savedData.filter((_, i) => i !== index);
    setSavedData(newSavedData);

    setHiddenSections((prevHiddenSections) =>
      prevHiddenSections.filter((_, i) => i !== index)
    );

    localStorage.setItem("savedData", JSON.stringify(newSavedData));
  };

  const renderCapacityInput = (data, index) => {
    return (
      <input
        type="number"
        value={data.capacity}
        onChange={(e) => handleCapacityChange(index, Number(e.target.value))}
      />
    );
  };

  return (
    <Container
      fluid
      className="justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="text-center my-4">
        <img
          src={require("./garbage3.png")}
          alt="Garbage"
          style={{
            maxWidth: "100%",
            height: "200px",
            borderRadius: "40px",
            transform: "rotate(-10deg)",
          }}
        />
        <img
          src={require("./logo.png")}
          alt="Logo"
          style={{ maxWidth: "100%", height: "auto" }}
        />
        <img
          src={require("./garbage3.png")}
          alt="Garbage"
          style={{
            maxWidth: "100%",
            height: "200px",
            borderRadius: "40px",
            transform: "rotate(10deg)",
          }}
        />
      </div>

      <div className="app">
        <h1>Smart Bin Project</h1>
        <InputFields
          schoolName={schoolName}
          className={className}
          email={email}
          feedKey={feedKey}
          capacity={capacity}
          setEmail={setEmail}
          setSchoolName={setSchoolName}
          setClassName={setClassName}
          setFeedKey={setFeedKey}
          setCapacity={setCapacity}
          saveData={saveData}
        />

        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <Container fluid>
          <DataTable
            savedData={savedData}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            startFetching={startFetching}
            renderCapacityInput={renderCapacityInput}
            deleteSavedData={deleteSavedData}
            compareButton={<Compare savedData={savedData} />}
          />
        </Container>

        <div className="hidden-sections-container">
          {hiddenSections.map((section, index) => (
            <HiddenSection
              hiddenSectionsRef={hiddenSectionsRef}
              key={index}
              section={section}
              index={index}
              fetchChartData={fetchChartData}
              toggleChart={toggleChart}
              handleWeightChange={handleWeightChange}
              fetchingData={fetchingData}
              setHiddenSections={setHiddenSections}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}

export default App;
