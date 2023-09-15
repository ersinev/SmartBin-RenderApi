import { ResponsiveCalendar } from '@nivo/calendar';

const CalendarChart = ({ chartData }) => {
  let lastDataPerDay = {};

  chartData.forEach((item) => {
    lastDataPerDay[item.date] = item.uv;
  });

  const transformedData = Object.keys(lastDataPerDay).map((date) => ({
    day: date,
    value: lastDataPerDay[date],
  }));

  const minDate = 
    transformedData.length > 0 
    ? transformedData.reduce((min, item) => (item.day < min ? item.day : min), transformedData[0].day) 
    : new Date().toISOString().split("T")[0];
  
  const toDate = new Date(minDate);
  toDate.setFullYear(toDate.getFullYear());

  return (
    <div style={{ height: '300px' }}>
      <ResponsiveCalendar
        data={transformedData}
        from={minDate}
        to={toDate}
      emptyColor="#eeeeee"
      colors={[ '#61cdbb', '#97e3d5', '#e8c1a0', '#f47560' ]}
      
      yearSpacing={40}
      monthBorderColor="#ffffff"
      dayBorderWidth={2}
      dayBorderColor="#ffffff"
      
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'row',
          translateY: 36,
          itemCount: 4,
          itemWidth: 42,
          itemHeight: 36,
          itemsSpacing: 14,
          itemDirection: 'right-to-left'
        }
      ]}
    
    />
    </div>
  );
}

export default CalendarChart;
