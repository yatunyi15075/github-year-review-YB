interface Props {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  color?: 'indigo' | 'purple' | 'amber' | 'emerald' | 'rose' | 'cyan';
}

const colorClasses = {
  indigo: 'bg-indigo-100 text-indigo-600',
  purple: 'bg-purple-100 text-purple-600',
  amber: 'bg-amber-100 text-amber-600',
  emerald: 'bg-emerald-100 text-emerald-600',
  rose: 'bg-rose-100 text-rose-600',
  cyan: 'bg-cyan-100 text-cyan-600',
};

export default function StatsCard({ title, value, icon, color = 'indigo' }: Props) {
  const colorClass = colorClasses[color];
  const [bgClass, textClass] = colorClass.split(' ');

  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <p className="text-slate-600 text-sm font-medium">{title}</p>
        {icon && (
          <div className={`${bgClass} p-2 rounded-lg ${textClass}`}>
            {icon}
          </div>
        )}
      </div>
      <p className={`text-3xl font-bold ${textClass}`}>{value}</p>
    </div>
  );
}