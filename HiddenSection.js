import React, { useEffect, useState } from "react";
import Chart from "./Chart";
import WeightData from "./WeightData";
import GarbageAnimation from "./GarbageAnimation";

function HiddenSection({
  section,
  index,
  fetchChartData,
  toggleChart,
  setHiddenSections,
  hiddenSectionsRef,
}) {
  const [isHidden, setIsHidden] = useState(true);
  const [emailSent, setEmailSent] = useState({});
  const percentage = section.latestData
    ? (section.latestData.weight / section.data.capacity) * 100
    : 0;

  // -------------------------------WARNING / EMAIL PART --------------------------------------------------
  useEffect(() => {
    if (percentage > 80) {
      setIsHidden(false);

      // Check if an email has already been sent for this feedKey
      if (!emailSent[section.data.feedKey]) {
        // Trigger API call to send an email
        const emailData = {
          to: section.data.email,
          subject:"Garbage Fill Warning",
          text:`${section.data.schoolName} / ${section.data.className}` 
         
        };

        fetch("https://smartbin-cf8d.onrender.com/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Successfully sent email:", data);

            // Mark the email as sent
            setEmailSent((prevEmailSent) => ({
              ...prevEmailSent,
              [section.data.feedKey]: true,
            }));
          })
          .catch((error) => {
            console.error("There was an error sending the email", error);
          });
      }
    }
  }, [
    percentage,
    section.data.feedKey,
    section.data.email,
    section.data.schoolName,
    section.data.className,
    emailSent,
  ]);

  return (
    <div key={index} className="hidden-section">
      <div className="section-header">
        <div className="section-header-school">
          <span>{section.data.schoolName}</span>
        </div>
        <div className="section-header-class">{section.data.className}</div>
        <div className="section-header-buttons">
          <button
            className="chart-button"
            onClick={() => {
              toggleChart(index);
              if (!section.showChart) {
                fetchChartData(section.data, index);
              }
            }}
          >
            {section.showChart ? "Chart" : "Bin"}
          </button>
          <button
            className="close-button"
            onClick={() =>
              setHiddenSections((prevHiddenSections) =>
                prevHiddenSections.filter((_, i) => i !== index)
              )
            }
          >
            X
          </button>
        </div>
      </div>

      {section.latestData?.weight !== undefined && (
        <WeightData weight={section.latestData.weight} />
      )}

      {section.showChart ? (
        <>
          <GarbageAnimation
            fillPercentage={
              (section.latestData?.weight / section.data.capacity) * 100
            }
          />
        </>
      ) : (
        <div className={`chart-container visible`}>
          <Chart
            data={section.chartData}
            capacity={section.data.capacity}
            style={{ width: "100%", height: "100%" }}
          />
          {!section.showChart && section.chartData.length > 0 && (
            <div className="latest-chart-value">
              Latest Value: {section.chartData[0].value}
            </div>
          )}
        </div>
      )}

      {section.latestData?.weight !== undefined && (
        <div ref={hiddenSectionsRef}>
          Garbage Fill Percentage:{" "}
          <span style={{ fontSize: "larger", fontWeight: "bolder" }}>
            {Math.floor(
              (section.latestData.weight / section.data.capacity) * 100
            )}
            %
          </span>
          <p style={{ color: "red" }} hidden={isHidden}>
            <span style={{ fontWeight: "bolder" }}>WARNING!!!</span> Please
            empty the trash.
          </p>
        </div>
      )}
    </div>
  );
}

export default HiddenSection;
