import ProductPieChart from "../charts/piechart";
import SalesChart from "../charts/barchart";

function GraphReport() {
  return (
    <div>
      <h1>Graph Report</h1>
      <ProductPieChart />
      <SalesChart />
    </div>
  );
}  

export default GraphReport;