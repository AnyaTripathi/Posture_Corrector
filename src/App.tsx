import * as React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import DashboardLayout from './components/DashboardLayout';
import PostureStatus from './components/PostureStatus';
import WeeklyChart from './components/WeeklyChart';
import AlertHistory from './components/AlertHistory';
import LiveFeed from './components/LiveFeed';
import SettingsView from './components/SettingsView';
import Login from './components/Login';
import { PostureAlert, PostureStatus as StatusType } from './types';
import { postureService } from './services/postureService';
import { cn } from './lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './components/ui/card';
import { Button } from './components/ui/button';
import { Activity, Shield, Zap, Target } from 'lucide-react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('home');
  const [user, setUser] = React.useState<{ name: string; email: string } | null>(null);
  
  // Real data state
  const [status, setStatus] = React.useState<StatusType>('good');
  const [duration, setDuration] = React.useState(0);
  const [score, setScore] = React.useState(92);
  const [alerts, setAlerts] = React.useState<PostureAlert[]>([]);
  const [sessions, setSessions] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (!isAuthenticated) return;

    // Load initial data
    setAlerts(postureService.getAlerts());
    setSessions(postureService.getSessions());

    const unsubscribe = postureService.subscribeToPosture((newStatus) => {
      setStatus(newStatus);
      
      if (newStatus === 'bad') {
        const newAlert: PostureAlert = {
          id: Math.random().toString(36).substr(2, 9),
          timestamp: Date.now(),
          type: 'slouching',
          duration: 5,
          severity: 'medium'
        };
        const updatedAlerts = postureService.saveAlert(newAlert);
        setAlerts(updatedAlerts);
      }
    });

    const durationInterval = setInterval(() => {
      setDuration(d => d + 1);
    }, 1000);

    return () => {
      unsubscribe();
      clearInterval(durationInterval);
    };
  }, [isAuthenticated]);

  const handleLogin = (email: string) => {
    setUser({ name: email.split('@')[0], email });
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name}!</h2>
                <p className="text-muted-foreground">Here's your posture overview for today.</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">Download Report</Button>
                <Button size="sm">Start Session</Button>
              </div>
            </div>

            <PostureStatus status={status} duration={duration} score={score} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <WeeklyChart />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-none shadow-md bg-primary/5 border-primary/10">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary" />
                        Protection Active
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">98.2%</p>
                      <p className="text-xs text-muted-foreground mt-1">+2.4% from last week</p>
                    </CardContent>
                  </Card>
                  <Card className="border-none shadow-md bg-amber-500/5 border-amber-500/10">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Zap className="h-4 w-4 text-amber-500" />
                        Alerts Today
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">12</p>
                      <p className="text-xs text-muted-foreground mt-1">-5 from yesterday</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="lg:col-span-1">
                <AlertHistory alerts={alerts} />
              </div>
            </div>
          </div>
        );
      case 'live':
        return (
          <div className="space-y-8">
            <LiveFeed />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>AI Insights</CardTitle>
                  <CardDescription>Real-time analysis of your workspace setup</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <Activity className="h-5 w-5 text-emerald-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-emerald-700">Optimal Lighting</p>
                      <p className="text-xs text-emerald-600/80">Your environment lighting is perfect for reducing eye strain.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <Target className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-amber-700">Screen Height</p>
                      <p className="text-xs text-amber-600/80">Consider raising your monitor by 2 inches for better neck alignment.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Session Stats</CardTitle>
                  <CardDescription>Metrics for the current active session</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase">Good Posture</p>
                    <p className="text-xl font-bold text-emerald-500">84%</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase">Focus Level</p>
                    <p className="text-xl font-bold text-blue-500">High</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase">Blinks/Min</p>
                    <p className="text-xl font-bold">18</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase">Micro-breaks</p>
                    <p className="text-xl font-bold">3</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="space-y-8">
            <WeeklyChart />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Avg. Score', value: '88%', trend: '+4%', color: 'text-emerald-500' },
                { label: 'Total Alerts', value: '64', trend: '-12%', color: 'text-amber-500' },
                { label: 'Active Time', value: '42h', trend: '+2h', color: 'text-blue-500' },
              ].map((stat, i) => (
                <Card key={i} className="border-none shadow-md">
                  <CardContent className="pt-6">
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                    <div className="flex items-baseline justify-between mt-2">
                      <p className="text-3xl font-bold">{stat.value}</p>
                      <span className={cn("text-xs font-bold", stat.trend.startsWith('+') ? "text-emerald-500" : "text-destructive")}>
                        {stat.trend}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      case 'history':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <AlertHistory alerts={alerts} />
            </div>
            <div className="lg:col-span-1 space-y-6">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Session History</CardTitle>
                  <CardDescription>Summary of your last 5 sessions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} className="flex items-center justify-between p-3 rounded-lg bg-accent/30">
                      <div>
                        <p className="text-sm font-medium">Session #{1024 - s}</p>
                        <p className="text-xs text-muted-foreground">April {9 - s}, 2026</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold">4h 20m</p>
                        <p className="text-[10px] text-emerald-500 font-bold">92% Score</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case 'settings':
        return <SettingsView />;
      default:
        return <div>Section under construction</div>;
    }
  };

  return (
    <DashboardLayout 
      activeSection={activeSection} 
      setActiveSection={setActiveSection}
      user={user || undefined}
      onLogout={handleLogout}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {renderSection()}
        </motion.div>
      </AnimatePresence>
    </DashboardLayout>
  );
}
