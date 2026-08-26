import {
  PieChart,
  Pie,
  Tooltip,
  Legend
} from "recharts";

const data = [
  { name: "Sugar", value: 85 },
  { name: "Milk", value: 70 },
  { name: "Bread", value: 80 },
  { name: "Eggs", value: 50 },
  { name: "Cheese", value: 30 },
  { name: "Fruits", value: 90 },
  { name: "Vegetables", value: 60 },
  { name: "Meat", value: 40 },
  { name: "Pastries", value: 20 },
  { name: "Beverages", value: 75 }

];

function ProductPieChart() {
  return (
    <div>
      <h2>Product Sales Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
    <PieChart width={400} height={300}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#09fb3d"
        label
      />
      <Tooltip />
      <Legend />
    </PieChart>
    </ResponsiveContainer>
    </div>
  );
}

export default ProductPieChart;