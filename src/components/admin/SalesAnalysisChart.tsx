
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent, 
  ChartLegend, 
  ChartLegendContent 
} from "@/components/ui/chart";

// Vibrant color palette for better distinction
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A172F7', '#FF6B6B', '#36A2EB', '#4BC0C0', '#9966FF', '#FF9F40'];

interface SalesDataItem {
  name: string;
  value: number;
}

interface SalesAnalysisChartProps {
  salesData: SalesDataItem[];
}

const SalesAnalysisChart: React.FC<SalesAnalysisChartProps> = ({ salesData }) => {
  // Calculate total items sold for percentage
  const totalItems = salesData.reduce((sum, item) => sum + item.value, 0);
  
  // Add percentage to formatted data for label
  const formattedData = salesData.map(item => ({
    ...item,
    percentage: totalItems > 0 ? ((item.value / totalItems) * 100).toFixed(1) : 0
  }));
  
  // Custom label renderer
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    name,
    percentage
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    if (Number(percentage) < 5) return null; // Don't show labels for small segments

    return (
      <text
        x={x}
        y={y}
        fill="#fff"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={12}
        fontWeight={500}
      >
        {`${name}: ${percentage}%`}
      </text>
    );
  };

  return (
    <div className="glass-panel p-6 rounded-lg">
      <h2 className="text-xl font-medium mb-4">Sales Analysis</h2>
      <div className="h-[300px]">
        {formattedData.length > 0 && totalItems > 0 ? (
          <ChartContainer className="w-full" config={{
            sales: { theme: { light: "#0088FE", dark: "#0088FE" } },
          }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={formattedData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={renderCustomizedLabel}
                  nameKey="name"
                >
                  {formattedData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                      stroke="#fff"
                      strokeWidth={1}
                    />
                  ))}
                </Pie>
                <ChartTooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0];
                      const value = typeof data.value === 'number' ? data.value : data.value;
                      return (
                        <div className="bg-white dark:bg-slate-900 p-2 rounded shadow border">
                          <p className="font-medium">{data.name}</p>
                          <p className="text-sm">{value} items</p>
                          <p className="text-xs">{data.payload.percentage}% of total items</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend 
                  formatter={(value, entry, index) => {
                    return `${value}: ${formattedData[index]?.percentage}%`;
                  }}
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center" 
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-towel-gray">
            No sales data available
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesAnalysisChart;
