import * as React from 'react';
import { motion } from 'motion/react';
import { Camera, CameraOff, Maximize2, Settings, Scan } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function LiveFeed() {
  const [isActive, setIsActive] = React.useState(true);
  const [isScanning, setIsScanning] = React.useState(true);

  return (
    <Card className="border-none shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="flex items-center gap-2">
            <div className={cn("h-2 w-2 rounded-full", isActive ? "bg-emerald-500 animate-pulse" : "bg-muted")} />
            Live Monitoring
          </CardTitle>
          <CardDescription>Real-time AI posture analysis</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-2" onClick={() => setIsActive(!isActive)}>
            {isActive ? <Camera className="h-4 w-4" /> : <CameraOff className="h-4 w-4" />}
            {isActive ? 'Stop' : 'Start'}
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative aspect-video bg-black/90 flex items-center justify-center overflow-hidden">
          {isActive ? (
            <>
              {/* Simulated Camera Feed */}
              <img 
                src="https://picsum.photos/seed/posture/1280/720" 
                alt="Live Feed" 
                className="w-full h-full object-cover opacity-60 grayscale-[0.5]"
                referrerPolicy="no-referrer"
              />
              
              {/* AI Overlays */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <Badge variant="secondary" className="bg-black/50 text-white backdrop-blur-md border-white/20 px-3 py-1">
                      <Scan className="h-3 w-3 mr-2 text-primary" />
                      Tracking: Active
                    </Badge>
                    <div className="text-white/80 text-[10px] font-mono bg-black/40 p-2 rounded backdrop-blur-sm border border-white/10">
                      FPS: 30.2<br />
                      LATENCY: 12ms<br />
                      MODEL: PostureNet-v2
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-emerald-400 font-bold text-xl drop-shadow-lg">98% CONFIDENCE</div>
                    <div className="text-white/60 text-xs">SKELETON DETECTED</div>
                  </div>
                </div>

                {/* Simulated Skeleton Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.02, 1],
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-1/3 h-2/3 border-2 border-primary/30 rounded-[40px] relative"
                  >
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-2 border-primary/50" />
                    <div className="absolute top-12 left-1/2 -translate-x-1/2 w-0.5 h-32 bg-primary/30" />
                    <div className="absolute top-16 left-1/2 -translate-x-1/2 w-32 h-0.5 bg-primary/30" />
                  </motion.div>
                </div>

                <div className="flex justify-between items-end">
                  <div className="flex gap-2">
                    <div className="h-10 w-10 rounded-full border-2 border-white/20 flex items-center justify-center text-white/40">
                      <Maximize2 className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                    <p className="text-emerald-400 text-xs font-bold tracking-widest uppercase">Posture: Optimal</p>
                  </div>
                </div>
              </div>

              {/* Scanning Line */}
              {isScanning && (
                <motion.div 
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-[2px] bg-primary/50 shadow-[0_0_15px_rgba(var(--primary),0.5)] z-10"
                />
              )}
            </>
          ) : (
            <div className="text-center space-y-4">
              <div className="h-20 w-20 rounded-full bg-muted/20 flex items-center justify-center mx-auto">
                <CameraOff className="h-10 w-10 text-muted-foreground" />
              </div>
              <div>
                <p className="text-lg font-semibold text-white">Camera is Off</p>
                <p className="text-sm text-muted-foreground">Enable camera to start posture monitoring</p>
              </div>
              <Button onClick={() => setIsActive(true)}>Enable Camera</Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
