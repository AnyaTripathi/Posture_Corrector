import * as React from 'react';
import { Bell, Shield, Eye, Moon, Sun, Smartphone, Laptop, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { postureService } from '@/services/postureService';
import { UserProfile } from '@/types';

export default function SettingsView() {
  const [user, setUser] = React.useState<UserProfile | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);

  React.useEffect(() => {
    const storedUser = postureService.getUser();
    if (storedUser) {
      setUser(storedUser);
    } else {
      // Default settings
      setUser({
        uid: 'default',
        displayName: 'User',
        email: '',
        settings: {
          alertThreshold: 5,
          notificationsEnabled: true,
          dailyGoal: 480
        }
      });
    }
  }, []);

  const handleSave = () => {
    if (!user) return;
    setIsSaving(true);
    postureService.saveUser(user);
    setTimeout(() => setIsSaving(false), 1000);
  };

  const updateSettings = (key: keyof UserProfile['settings'], value: any) => {
    if (!user) return;
    setUser({
      ...user,
      settings: {
        ...user.settings,
        [key]: value
      }
    });
  };

  if (!user) return null;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">Manage your account and app preferences.</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="gap-2">
          {isSaving ? <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="h-4 w-4" />}
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Configure how you want to be alerted about your posture.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Desktop Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive alerts on your computer when posture is bad.</p>
                </div>
                <Button 
                  variant={user.settings.notificationsEnabled ? "default" : "outline"} 
                  size="sm"
                  onClick={() => updateSettings('notificationsEnabled', !user.settings.notificationsEnabled)}
                >
                  {user.settings.notificationsEnabled ? 'Enabled' : 'Disabled'}
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Alert Threshold</Label>
                  <p className="text-sm text-muted-foreground">Seconds of bad posture before triggering an alert.</p>
                </div>
                <div className="flex items-center gap-2">
                  {[5, 10, 30].map((t) => (
                    <Button 
                      key={t}
                      variant={user.settings.alertThreshold === t ? "secondary" : "ghost"} 
                      size="sm"
                      onClick={() => updateSettings('alertThreshold', t)}
                    >
                      {t}s
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Privacy & Security</CardTitle>
              <CardDescription>Control your data and camera access.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Local Processing Only</Label>
                  <p className="text-sm text-muted-foreground">All AI analysis happens on your device. No video is ever uploaded.</p>
                </div>
                <Shield className="h-5 w-5 text-emerald-500" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Data Retention</Label>
                  <p className="text-sm text-muted-foreground">How long to keep your posture history.</p>
                </div>
                <Button variant="outline" size="sm">30 Days</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base text-destructive">Reset Application</Label>
                  <p className="text-sm text-muted-foreground">Clear all local data and settings.</p>
                </div>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Reset All
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the look of your dashboard.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" className="flex-col h-20 gap-2">
                  <Sun className="h-5 w-5" />
                  <span className="text-[10px]">Light</span>
                </Button>
                <Button variant="secondary" className="flex-col h-20 gap-2">
                  <Moon className="h-5 w-5" />
                  <span className="text-[10px]">Dark</span>
                </Button>
                <Button variant="outline" className="flex-col h-20 gap-2">
                  <Laptop className="h-5 w-5" />
                  <span className="text-[10px]">System</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle>Premium Plan</CardTitle>
              <CardDescription className="text-primary-foreground/70">Unlock advanced AI features and unlimited history.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" className="w-full">Manage Subscription</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
