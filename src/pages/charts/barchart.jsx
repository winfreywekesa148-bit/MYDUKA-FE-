import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { product: "Store_1", sales: 150 },
  { product: "Store_2", sales: 100 },
  { product: "Store_3", sales: 80 },
  { product: "Store_4", sales: 120 },
  { product: "Store_5", sales: 90 },
  { product: "Store_6", sales: 60 }
];

function SalesChart() {
  return (
    <div>
      <h2>Progress Of Stores</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="product" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sales" fill="#f8f8fa"/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalesChart;
