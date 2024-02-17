import React, { useEffect, useState } from "react";
import { accumulateConsumption, groupByDay, sortByTime } from "../utils/reading";

export const UsageInformation = ({ readings, buttons, selectedButtonIndex }) => {
  const [ usageInfo, setUsageInfo] = useState([])  

  useEffect(() => {
      const thirtyDaysUsage = accumulateConsumption(sortByTime(groupByDay(readings)).slice(-30));
      const lastDayUsage = accumulateConsumption(sortByTime(readings).slice(-24));
    
      const usage = {
        "LAST-30-DAYS": [{ label:"Cost 💰", data: Math.round(thirtyDaysUsage * 0.138), unit: "$"}, { label: "Consumption ⚡", data: thirtyDaysUsage, unit: "kWh"}, { label:"Footprint 👟", data: (thirtyDaysUsage * 0.0002532).toFixed(4), unit: "tonnes"}],
        "LAST-24-HOURS": [{ label:"Cost 💰", data: Math.round(lastDayUsage * 0.138), unit: "$"}, { label: "Consumption ⚡", data: lastDayUsage, unit: "kWh"}, { label:"Footprint 👟", data: (lastDayUsage * 0.0002532).toFixed(4), unit: "tonnes"}]
      };
      setUsageInfo(usage[buttons[selectedButtonIndex].keyIdentifier])

  }, [buttons])

  return (
    <section className="grid-arrangement mt3 darkgray">
        {usageInfo.map(({label, data, unit}, idx) => {
            return (
            <section className="flex flex-column px2 py1 bg-super-light-grey roundedMore shadow-2" key={idx.toString()}>
                <p className="h5 bold">{label}</p>
                <p className="h3">{data}</p>
                <p className="h5">{unit}</p>
            </section>
            )
        })}
    </section>
  );
};
