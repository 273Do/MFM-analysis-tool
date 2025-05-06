import type {
  ArrayType1D,
  ArrayType2D,
} from "node_modules/danfojs/dist/danfojs-base/shared/types";

async function convertToLineChartData(groupedData: ArrayType1D | ArrayType2D) {
  const uniqueCategories = [...new Set(groupedData.map((item) => item[1]))];

  // Create a map for all months in the data range
  const months = {};

  // Initialize with all months from March 2024 to December 2024
  const startMonth = 3; // March
  const startYear = 2024;
  const endMonth = 12; // December
  const endYear = 2024;

  // Create all month entries to ensure we have data for every month
  for (let year = startYear; year <= endYear; year++) {
    const monthStart = year === startYear ? startMonth : 1;
    const monthEnd = year === endYear ? endMonth : 12;

    for (let month = monthStart; month <= monthEnd; month++) {
      const monthKey = `${year}-${month.toString().padStart(2, "0")}`;
      const monthName = getMonthName(month);
      months[monthKey] = {
        month: monthName,
        year: year.toString(),
      };

      // Initialize all categories with 0
      uniqueCategories.forEach((category) => {
        months[monthKey][category] = 0;
      });
    }
  }

  // Now process the actual data
  groupedData.forEach((item) => {
    const amount = Math.abs(item[0]); // Convert negative to positive for expenses
    const category = item[1];
    const date = item[2];

    const [year, month] = date.split("/").slice(0, 2);
    const monthKey = `${year}-${month}`;

    if (months[monthKey]) {
      months[monthKey][category] += amount;
    }
  });

  // Convert to array and sort by date
  return Object.entries(months)
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map(([_, value]) => value);
}

const getMonthName = (month) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[month - 1];
};

export default convertToLineChartData;
