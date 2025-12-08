interface Props {
  title: string;
  value: number | string;
}

export default function StatsCard({ title, value }: Props) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg border">
      <p className="text-gray-600">{title}</p>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
