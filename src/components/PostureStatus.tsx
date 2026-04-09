import * as React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, AlertCircle, Timer, Activity } from 'lucide-react';
import { cn } from '../lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { PostureStatus as StatusType } from '../types';

interface PostureStatusProps {
  status: StatusType;
  duration: number; // seconds in current status
  score: number; // 0-100
}

export default function PostureStatus({ status, duration, score }: PostureStatusProps) {
  const formatDuration = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = () => {
    switch (status) {
      case 'good': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      case 'bad': return 'text-destructive bg-destructive/10 border-destructive/20';
      default: return 'text-muted-foreground bg-muted border-muted-foreground/20';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'good': return <CheckCircle2 className="h-8 w-8" />;
      case 'bad': return <AlertCircle className="h-8 w-8" />;
      default: return <Activity className="h-8 w-8" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="overflow-hidden border-none shadow-lg bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Current Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <motion.div 
              animate={{ 
                scale: status === 'bad' ? [1, 1.1, 1] : 1,
                rotate: status === 'bad' ? [0, -5, 5, 0] : 0
              }}
              transition={{ repeat: status === 'bad' ? Infinity : 0, duration: 2 }}
              className={cn("p-3 rounded-2xl border", getStatusColor())}
            >
              {getStatusIcon()}
            </motion.div>
            <div>
              <p className={cn("text-2xl font-bold capitalize", status === 'good' ? "text-emerald-600" : "text-destructive")}>
                {status === 'good' ? 'Perfect Posture' : 'Correction Needed'}
              </p>
              <p className="text-sm text-muted-foreground">Real-time detection active</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none shadow-lg bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Session Duration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
              <Timer className="h-8 w-8" />
            </div>
            <div>
              <p className="text-2xl font-bold tabular-nums">{formatDuration(duration)}</p>
              <p className="text-sm text-muted-foreground">Current session time</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none shadow-lg bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Posture Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="relative h-14 w-14 flex items-center justify-center">
              <svg className="h-14 w-14 -rotate-90">
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="text-muted/20"
                />
                <motion.circle
                  cx="28"
                  cy="28"
                  r="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeDasharray={150}
                  initial={{ strokeDashoffset: 150 }}
                  animate={{ strokeDashoffset: 150 - (150 * score) / 100 }}
                  className={cn(
                    score > 80 ? "text-emerald-500" : score > 50 ? "text-amber-500" : "text-destructive"
                  )}
                />
              </svg>
              <span className="absolute text-xs font-bold">{score}%</span>
            </div>
            <div>
              <p className="text-2xl font-bold">Health Index</p>
              <p className="text-sm text-muted-foreground">Daily average score</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
