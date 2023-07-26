import React from "react";
import './Section.css'
import { Chart } from "react-google-charts";
function Section6_a(){
    const data = [
        ["Element", "Density", { role: "style" }],
        ["Customer1", 8.94, "#b87333"], // RGB value
        ["Customer2", 10.49, "silver"], // English color name
        ["Customer3", 19.3, "gold"],
        ["Customer4", 21.45, "color: #e5e4e2"], // CSS-style declaration
      ];
    return(
   <>
   <div className="mainA">
   <Chart chartType="ColumnChart" width="100%" height="400px" data={data} />
   </div>
   </>
    )
}
export default Section6_a;