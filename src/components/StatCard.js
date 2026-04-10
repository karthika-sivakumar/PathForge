import {
  Target,
  Video,
  Award,
  TrendingUp
} from "lucide-react";

const iconMap = {
  "Total Paths": Target,
  "Total Videos": Video,
  "Completed": Award,
  "Overall": TrendingUp,
};

const StatCard = ({ title, value }) => {
  const Icon = iconMap[title] || Target;

  return (
    <div className="stat-card">
      <div className="icon-wrap">
        <Icon size={26} />
      </div>

      <p className="stat-title">{title}</p>
      <h2 className="stat-value">{value}</h2>
    </div>
  );
};

export default StatCard;