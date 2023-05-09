import React from "react";
import Plot from 'react-plotly.js';
import axios from 'axios'


export default function Chart(props){   
    const count = 30
    const priceStart = Array(count)
    .fill(150)
    .map((value, index) => value + index);

    const timeStampStart = Array(count)
    .fill(0)
    .map((value, index) => value + index);

    const { stock } = props;
    const [data, setData] = React.useState({
        timestamp: timeStampStart,
        price: priceStart
    });

    React.useEffect(() => {
      const fetchData = async () => {
        console.log("? ")
        console.log(data)
  
        try {
          const res = await axios({
            url: `http://localhost:8000/api/stock/test/${stock}`,
            method: 'get',
          });
      
          const result = res.data;
          setData(prevData => {    
            const newPriceData = 
            result[0] != null ? prevData.price.slice(1).concat(result[0].currentPrice) : prevData.price
            
            return {
              timestamp: prevData.timestamp,
              price: newPriceData,
            };
          });
        } catch (err) {
          console.log(err);
        }
      };
        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => {
          clearInterval(interval);
        };
      }, [stock]);

    return(
        <div>
            <div></div>
            <Plot
            data={[{ x: data.timestamp, y: data.price, type: 'scatter', mode: 'lines' }]}
            layout={{
                title: "Real-time Stock",
                xaxis: { range: [0, 30] },
                yaxis: { range: [data.price * 0.8, data.price * 1.2] }
            }}
            />
    </div>
    );
}