import  { useState } from 'react';
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
import { Select, DatePicker } from 'antd';
import dayjs from 'dayjs';

// Tạo dữ liệu mẫu 24 giờ
const generateEmptyData = () => {
  const data = [];
  for (let hour = 0; hour < 24; hour++) {
    const time = `${hour.toString().padStart(2, '0')}:00`;
    data.push({ time, amount: 0 });
  }
  return data;
};

// Nhóm dữ liệu và tính tổng amount theo giờ
const groupDataByHour = (data, emptyData) => {
  const groupedData = { ...Object.fromEntries(emptyData.map(item => [item.time, 0])) };

  data.forEach(item => {
    const hour = dayjs(item.createdAt).format('HH:00');
    if (groupedData[hour] !== undefined) {
      groupedData[hour] += item.amount || 0;
    }
  });

  return Object.entries(groupedData).map(([time, amount]) => ({ time, amount }));
};

const Chart = () => {
  const [status, setStatus] = useState('unstake');
  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));

  // Dữ liệu mẫu
  const liststakes = {
    contents: [
      { createdAt: '2024-12-01T10:15:00Z', amount: 50 },
      { createdAt: '2024-12-01T11:20:00Z', amount: 100 },
      { createdAt: '2024-12-01T13:45:00Z', amount: 75 },
    ],
  };

  // Lọc dữ liệu theo ngày đã chọn
  const filteredListStakes = liststakes?.contents?.filter(item => {
    const itemDate = dayjs(item.createdAt).startOf('day');
    const selected = selectedDate.startOf('day');
    return itemDate.isSame(selected);
  });

  // Tổng amount
  const totalAmount =
    filteredListStakes?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;

  // Xử lý dữ liệu cho biểu đồ
  const emptyData = generateEmptyData();
  const chartData = filteredListStakes
    ? groupDataByHour(filteredListStakes, emptyData)
    : emptyData;

  return (
    <div className='fillininformation '>
      <Card
        sx={{
          width: '100%',
          bgcolor: 'rgba(20,20,32,1)',
          borderRadius: '15px',
          background:'rgb(49 54 66)'
        }}
      >
        <CardHeader
          title={
            <Box>
              <Box
                className="flexs boderbottm"
                sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}
              >
                <Typography variant="h6" className='text-white'>User CTO number stake/unstake</Typography>
                <DatePicker
                  defaultValue={selectedDate}
                  onChange={date => setSelectedDate(date || dayjs(new Date()))}
                  allowClear={false}
                />

              </Box>
              <Box
                className="flexs"
              >
                <Box>
                  <span className="text-xs text-gray-400">TOTAL CT0</span>
                  <Typography variant="h5" fontWeight="bold"  className='text-white'>
                    {totalAmount.toLocaleString()}/CTO
                  </Typography>
                </Box>
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
                  dataKey="time"
                  stroke="#718096"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#718096' }}
                  interval={1}
                  minTickGap={20}
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
