import './Chart.css'
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Label,
  Legend,
  PieChart,
  Pie
} from "recharts";

const Chart = ({title, xLabel, data, chartType}) => {
  return (
    <div className='chart'>
      <h3>Number of Breweries by {title}</h3>
      {
        chartType === 'bar' ? (
          <BarChart width={690} height={360} data={data} margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 30,
                }}>
            <XAxis dataKey="name">
              <Label value={xLabel} offset={-10} position={'insideBottom'} fill='black' />
            </XAxis>
            <YAxis label={{ value: 'Number of Breweries', angle: -90, position: 'insideLeft', fill: 'black'}} />
            <Tooltip />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        ) : chartType === 'pie' ? (
          <PieChart width={690} height={360}>
            <Pie data={data} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#82ca9d" />
            <Tooltip />
          </PieChart>
        ) : ""
      }
    </div>
  )
}

export default Chart;