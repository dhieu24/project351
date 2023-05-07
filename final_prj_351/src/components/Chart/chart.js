import React from "react";
import Plot from 'react-plotly.js';
import axios from 'axios'


export default function Chart(){
    const count = 30
    const priceStart = Array(count)
    .fill(150)
    .map((value, index) => value + index);

    const timeStampStart = Array(count)
    .fill(0)
    .map((value, index) => value + index);

    const [data, setData] = React.useState({
        timestamp: timeStampStart,
        price: priceStart
    });

    React.useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 10000);
        return () => {
          clearInterval(interval);
        };
      });

    const fetchData = async () => {
      console.log("? ")
      console.log(data)
      try {
        const res = await axios({
          url: 'http://localhost:8000/api/stock/test/AAPL',
          method: 'get',
        });
    
        const result = res.data;
        console.log(result[0])
        setData(prevData => {    
          const newPriceData = prevData.price.slice(-29).concat(result[0].currentPrice)
          
          return {
            timestamp: prevData.timestamp,
            price: newPriceData,
          };
        });
      } catch (err) {
        console.log(err);
      }
    };

    return(
        <div>
            <Plot
            data={[data]}
            layout={{
                title: "Real-time Stock",
                xaxis: { range: [0, 30] },
                yaxis: { range: [150, 180] }
            }}
            />
    </div>
    );
}