export const MetricsCard = ({ title, value, icon }: { title: string; value: string | number; icon: React.ReactNode; }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};
