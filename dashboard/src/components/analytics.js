import React, { useEffect, useRef, useState } from "react";
import Tabs from "./tabs";
import Chart from "chart.js/auto";
import axios from "axios";

function Analytics() {
  const pieChartRef = useRef(null);
  const donutChartRef = useRef(null);
  const pieChartInstance = useRef(null);
  const donutChartInstance = useRef(null);

  const [labels, setLabels] = useState([]);
  const [counts, setCounts] = useState([]);

  const [labels2, setLabels2] = useState([]);
  const [counts2, setCounts2] = useState([]);

  useEffect(() => {
    const callAnalyticsPage = async () => {
      try {
        const org_info = JSON.parse(localStorage.getItem("organization"))
          .Organization;

        let data = {
          category: org_info.category.toString(),
        };

        const response = await axios.post(
          "https://citycare.onrender.com/api_complaint_category_count",
          data
        );

        const { labels, counts } = response.data;

        setLabels(labels);
        setCounts(counts);
      } catch (err) {
        console.error(`Error! ${err}`);
      }
    };

    callAnalyticsPage();
  }, []);


  useEffect(() => {
    const callAnalyticsPage2 = async () => {
      try {
        const org_info = JSON.parse(localStorage.getItem("organization"))
          .Organization;

        let data = {
          category: org_info.category.toString(),
        };

        const response = await axios.post(
          "https://citycare.onrender.com/api_complaint_pincode_count",
          data
        );

        const { labels, counts } = response.data;

        setLabels2(labels);
        setCounts2(counts);

      } catch (err) {
        console.error(`Error fetching data for donut chart: ${err}`);
        // Optionally, you can set default values for labels2 and counts2
        // to prevent rendering issues when data fetching fails.
        setLabels2([]);
        setCounts2([]);
      }
    };

    callAnalyticsPage2();
  }, []);



  useEffect(() => {
    // Function to generate random colors
    const generateColors = (numColors) => {
      const colors = [];
      for (let i = 0; i < numColors; i++) {
        const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
          Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)})`;
        colors.push(color);
      }
      return colors;
    };
  
    // Create or update Pie Chart
    if (pieChartInstance.current) {
      pieChartInstance.current.data.labels = labels;
      pieChartInstance.current.data.datasets[0].data = counts;
      pieChartInstance.current.data.datasets[0].backgroundColor = generateColors(labels.length);
      pieChartInstance.current.update();
    } else {
      const pieChartCtx = pieChartRef.current.getContext("2d");
      pieChartInstance.current = new Chart(pieChartCtx, {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              data: counts,
              backgroundColor: generateColors(labels.length),
            },
          ],
        },
      });
    }
  }, [labels, counts]);
  

  useEffect(() => {
    // Function to generate random colors
    const generateColors = (numColors) => {
      const colors = [];
      for (let i = 0; i < numColors; i++) {
        const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
          Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)})`;
        colors.push(color);
      }
      return colors;
    };
  
    // Create or update Donut Chart
    if (donutChartInstance.current) {
      donutChartInstance.current.data.labels = labels2;
      donutChartInstance.current.data.datasets[0].data = counts2;
      donutChartInstance.current.data.datasets[0].backgroundColor = generateColors(labels2.length);
      donutChartInstance.current.update();
    } else {
      const donutChartCtx = donutChartRef.current.getContext("2d");
      donutChartInstance.current = new Chart(donutChartCtx, {
        type: "doughnut",
        data: {
          labels: labels2,
          datasets: [
            {
              data: counts2,
              backgroundColor: generateColors(labels2.length),
            },
          ],
        },
        options: {
          cutout: 70,
        },
      });
    }
  }, [labels2, counts2]);
  
  return (
    <>
      <Tabs />
      <section
        className="flex justify-center items-center h-[550px]"
        style={{
          backgroundColor: "#D9AFD9",
          backgroundImage:
            "linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%)",
        }}
      >
        <div className="mx-20">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                Complaints Categorization According to Status
            </h2>
          <canvas ref={pieChartRef} style={{height:"400px", width:"400px"}}
            />
        </div>
        <div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                Complaints Categorization According to Pin Code
            </h2>
          <canvas ref={donutChartRef} style={{height:"400px", width:"400px"}} />
        </div>
      </section>
    </>
  );
}

export default Analytics;
