
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AdminStatsCardProps {
  title: string;
  count: number;
  previousCount: number;
  icon: React.ReactNode;
  path: string;
  index: number;
}

const AdminStatsCard = ({ title, count, previousCount, icon, path, index }: AdminStatsCardProps) => {
  const getPercentageChange = () => {
    if (previousCount === 0) return count > 0 ? 100 : 0;
    return Math.round(((count - previousCount) / previousCount) * 100);
  };

  const percentageChange = getPercentageChange();
  const isPositive = percentageChange > 0;
  const isNeutral = percentageChange === 0;

  const getTrendIcon = () => {
    if (isNeutral) return <Minus size={12} />;
    return isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />;
  };

  const getTrendColor = () => {
    if (isNeutral) return 'text-gray-400';
    return isPositive ? 'text-green-400' : 'text-red-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="bg-brandae-gray border-brandae-green/20 hover:border-brandae-green/40 transition-colors cursor-pointer">
        <Link to={path}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              {title}
            </CardTitle>
            <div className="text-brandae-green">
              {icon}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brandae-green mb-2">{count}</div>
            <div className="flex items-center gap-2">
              <Badge 
                variant="outline" 
                className={`text-xs ${getTrendColor()} border-current`}
              >
                <span className="flex items-center gap-1">
                  {getTrendIcon()}
                  {Math.abs(percentageChange)}%
                </span>
              </Badge>
              <p className="text-xs text-gray-400">
                vs last month ({previousCount})
              </p>
            </div>
          </CardContent>
        </Link>
      </Card>
    </motion.div>
  );
};

export default AdminStatsCard;
