import * as React from 'react';
import { format } from 'date-fns';
import { AlertTriangle, Clock, Info, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { PostureAlert } from '../types';

const mockAlerts: PostureAlert[] = [
  { id: '1', timestamp: Date.now() - 1000 * 60 * 5, type: 'slouching', duration: 45, severity: 'medium' },
  { id: '2', timestamp: Date.now() - 1000 * 60 * 30, type: 'neck_tilt', duration: 120, severity: 'high' },
  { id: '3', timestamp: Date.now() - 1000 * 60 * 60 * 2, type: 'leaning_forward', duration: 30, severity: 'low' },
  { id: '4', timestamp: Date.now() - 1000 * 60 * 60 * 5, type: 'slouching', duration: 15, severity: 'low' },
  { id: '5', timestamp: Date.now() - 1000 * 60 * 60 * 24, type: 'leaning_back', duration: 60, severity: 'medium' },
];

interface AlertHistoryProps {
  alerts: PostureAlert[];
}

export default function AlertHistory({ alerts }: AlertHistoryProps) {
  const displayAlerts = alerts.length > 0 ? alerts : mockAlerts;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'medium': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'low': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'slouching': return <AlertTriangle className="h-4 w-4" />;
      case 'neck_tilt': return <Clock className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  return (
    <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm h-full flex flex-col">
      <CardHeader>
        <CardTitle>Recent Alerts</CardTitle>
        <CardDescription>Detailed log of posture violations</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-[400px] px-6">
          <div className="space-y-4 pb-6">
            {displayAlerts.map((alert) => (
              <div 
                key={alert.id}
                className="group flex items-center justify-between p-4 rounded-xl border bg-card hover:bg-accent/50 transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={cn("p-2 rounded-lg border", getSeverityColor(alert.severity))}>
                    {getAlertIcon(alert.type)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold capitalize">{alert.type.replace('_', ' ')}</p>
                    <p className="text-xs text-muted-foreground">
                      {format(alert.timestamp, 'MMM d, h:mm a')} • {alert.duration}s duration
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className={cn("capitalize text-[10px] px-2 py-0", getSeverityColor(alert.severity))}>
                    {alert.severity}
                  </Badge>
                  <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
