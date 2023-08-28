import React from "react";
import './Section.css'
import { Chart } from "react-google-charts";

function Section5_a(){
    const data = [
        ["Task", " Service rate"],
        ["Tella1", 11],
        ["Tella2", 2],
        ["Tella3", 2],
        ["Tella4", 2],
        
      ];
      
       const options = {
        title: " Service Rate",
        is3D: true,
      };

    return(
   <>
 <div className="mainA">
 <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
 </div>
   </>
    )
}
export default Section5_a;