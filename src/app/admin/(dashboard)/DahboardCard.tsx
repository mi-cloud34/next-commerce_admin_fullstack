type DashboardCardProps = {
  title: string;
  value: string | number;
};

const DashboardCard = ({ title, value }: DashboardCardProps) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold text-gray-600">{title}</h2>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default DashboardCard;
