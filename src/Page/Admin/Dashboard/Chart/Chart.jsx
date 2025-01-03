import { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
} from '@mui/material';
import { Select } from 'antd';
import upstashService from "../../../../services/upstashService.js";

const Chart = () => {
  const [chartData, setChartData] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());

  const fetchMonthlyRevenue = async (selectedYear) => {
    try {
      const response = await upstashService.getMonthlyRevenue(selectedYear);
      console.log("API Response:", response);

      if (!response || typeof response !== "object") {
        throw new Error("Invalid data format received from API");
      }

      const formattedData = Object.entries(response).map(([month, amount]) => ({
        month,
        amount: parseFloat(amount) || 0,
      }));
      setChartData(formattedData);
    } catch (error) {
      console.error("Failed to fetch monthly revenue:", error.message);
      setChartData([]);
    }
  };

  useEffect(() => {
    fetchMonthlyRevenue(year);
  }, [year]);

  return (
      <div className='fillininformation '>
        <Card
            sx={{
              width: '100%',
              bgcolor: 'rgba(20,20,32,1)',
              borderRadius: '15px',
              background: 'rgb(49 54 66)',
            }}
        >
          <CardHeader
              title={
                <Box>
                  <Box
                      className="flexs boderbottm"
                      sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}
                  >
                    <Typography variant="h6" className='text-white'>
                      Doanh Thu theo Thang trong nam {year}
                    </Typography>
                    <Select
                        defaultValue={year}
                        style={{ width: 120 }}
                        onChange={setYear}
                        options={[...Array(5).keys()].map(i => ({
                          value: new Date().getFullYear() - i,
                          label: new Date().getFullYear() - i,
                        }))}
                    />
                  </Box>
                </Box>
              }
          />
          <CardContent>
            <Box height={300}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FFD700" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#FFD700" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                      horizontal={true}
                      vertical={false}
                      strokeDasharray="6 6"
                      stroke="rgba(255,255,255,0.1)"
                  />
                  <XAxis
                      dataKey="month"
                      stroke="#718096"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#718096' }}
                      interval={0}
                  />
                  <YAxis
                      stroke="#718096"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#718096' }}
                      domain={['auto', 'auto']}
                      allowDecimals={false}
                  />
                  <Tooltip
                      contentStyle={{
                        backgroundColor: '#2D3748',
                        border: 'none',
                        color: 'white',
                      }}
                  />
                  <Area
                      type="monotone"
                      dataKey="amount"
                      stroke="#FFD700"
                      fillOpacity={1}
                      fill="url(#colorAmount)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </div>
  );
};

export default Chart;
