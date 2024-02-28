import { ResponsiveCalendar } from '@nivo/calendar';

const CalendarChart = ({ chartData }) => {
  let lastDataPerDay = {};

  // Loop through the chartData and organize the data by date
  chartData.forEach((item) => {
    lastDataPerDay[item.date] = item.uv;
  });

  // Convert the organized data into an array of objects with day and value properties
  const transformedData = Object.keys(lastDataPerDay).map((date) => ({
    day: date,
    value: lastDataPerDay[date],
  }));

  // Get the current year
  const currentYear = new Date().getFullYear();

  // Get the last year
  const lastYear = currentYear - 1;

  // Find the index of December in last year's data
  const decemberIndex = transformedData.findIndex(item => item.day.startsWith(`${lastYear}-12`));

  // Move December data from last year to the beginning
  const reorderedData = decemberIndex !== -1
    ? transformedData.slice(decemberIndex).concat(transformedData.slice(0, decemberIndex))
    : transformedData;

  // Set the minimum date to December of the previous year
  const minDate = `${lastYear}-12-01`;

  // Calculate the 'to' date based on the current date
  const toDate = new Date();

  return (
    <div style={{ height: '300px' }}>
      <h3>Yearly Data (2023-2024)</h3>
      <ResponsiveCalendar
        data={reorderedData}
        from={minDate}
        to={toDate}
        emptyColor="#eeeeee"
        colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
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
