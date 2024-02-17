import React, { useEffect, useState } from "react";
import { renderChart } from "../utils/chart.js";
import { groupByDay, sortByTime } from "../utils/reading";
import cx from 'classnames'
import { UsageInformation } from "./UsageInformation.jsx";

export const EnergyConsumption = ({ readings }) => {
  const [buttons, setButtons] = useState([{id: 1, name: "Last 30 days", isSelected: true, keyIdentifier: "LAST-30-DAYS" }, {id: 2, name: "Last 24 hours", isSelected: false, keyIdentifier: "LAST-24-HOURS"}]);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);

  const containerId = "usageChart";

  useEffect(() => {
    const isNotLastDay = buttons[selectedButtonIndex].keyIdentifier !== "LAST-24-HOURS"
    const lastThirtyDays = sortByTime(groupByDay(readings)).slice(-30)
    const sinceLastDay = sortByTime(readings).slice(-24)

    renderChart(containerId, isNotLastDay ? lastThirtyDays : sinceLastDay, buttons[selectedButtonIndex].keyIdentifier);
  }, [buttons]);

  const buttonNormal = "h5 inline-block shadow-2 pl2 pr2 pt1 pb1 roundedMore border-grey bg-light-grey light-blue bold";
  
  const handleClick = (_, prevSelectedButtonIndex, currentSelectedButtonIndex) => {
    const clonedButtons = [...buttons];
    if(prevSelectedButtonIndex > -1 && currentSelectedButtonIndex > -1){
      clonedButtons[prevSelectedButtonIndex].isSelected = false;
      clonedButtons[currentSelectedButtonIndex].isSelected = true
      setSelectedButtonIndex(currentSelectedButtonIndex);
      setButtons(clonedButtons);
    }
  }

  let prevIndex = buttons.findIndex(cur => cur.isSelected);

  return (
    <>
      <h1 className="regular darkgray line-height-1 mb3">Energy consumption</h1>
      <section className="mb3">
        {buttons.map(({name, id, isSelected}, index) => {
          prevIndex = isSelected ? index : prevIndex

          return (
            <button
              className={cx(buttonNormal, { "ml2": id === 2, "bg-dark-blue": isSelected === true, "white": isSelected })}
              key={id.toString()}
              onClick={(e) => handleClick(e, prevIndex, index)}
            >
              {name}
            </button>
          )
        })}
      </section>
      <section className="chartHeight mb3">
        <canvas id={containerId} />
      </section>
      <UsageInformation {...{ readings, buttons, selectedButtonIndex}}/>
    </>
  );
};
