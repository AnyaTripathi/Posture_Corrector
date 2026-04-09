import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Video, 
  BarChart3, 
  History, 
  Settings, 
  LogOut, 
  Bell,
  User,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface NavItemProps {
  key?: string;
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  onClick: () => void;
  collapsed?: boolean;
}

const NavItem = ({ icon: Icon, label, isActive, onClick, collapsed }: NavItemProps) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center w-full gap-3 px-3 py-2 rounded-lg transition-all duration-200 group relative",
      isActive 
        ? "bg-primary text-primary-foreground shadow-md" 
        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
    )}
  >
    <Icon className={cn("h-5 w-5 shrink-0", isActive ? "text-white" : "group-hover:scale-110 transition-transform")} />
    {!collapsed && (
      <span className="font-medium text-sm truncate">{label}</span>
    )}
    {isActive && !collapsed && (
      <motion.div
        layoutId="active-pill"
        className="absolute right-2 h-1.5 w-1.5 rounded-full bg-white"
      />
    )}
    {collapsed && (
      <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap">
        {label}
      </div>
    )}
  </button>
);

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeSection: string;
  setActiveSection: (section: string) => void;
  user?: { name: string; email: string; image?: string };
  onLogout: () => void;
}

export default function DashboardLayout({ 
  children, 
  activeSection, 
  setActiveSection,
  user,
  onLogout
}: DashboardLayoutProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'live', label: 'Live Feed', icon: Video },
    { id: 'analytics', label: 'Weekly Analytics', icon: BarChart3 },
    { id: 'history', label: 'Total Monitoring', icon: History },
  ];

  const bottomNavItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <aside 
        className={cn(
          "hidden md:flex flex-col border-right bg-card transition-all duration-300 ease-in-out border-r",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        <div className="p-6 flex items-center justify-between">
          {!isCollapsed && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary"
            >
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white">
                <LayoutDashboard className="h-5 w-5" />
              </div>
              <span>PostureGuard</span>
            </motion.div>
          )}
          {isCollapsed && (
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white mx-auto">
              <LayoutDashboard className="h-5 w-5" />
            </div>
          )}
        </div>

        <ScrollArea className="flex-1 px-4">
          <div className="space-y-2 py-4">
            {navItems.map((item) => (
              <NavItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                isActive={activeSection === item.id}
                onClick={() => setActiveSection(item.id)}
                collapsed={isCollapsed}
              />
            ))}
          </div>
          
          <Separator className="my-4 opacity-50" />
          
          <div className="space-y-2">
            {bottomNavItems.map((item) => (
              <NavItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                isActive={activeSection === item.id}
                onClick={() => setActiveSection(item.id)}
                collapsed={isCollapsed}
              />
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 mt-auto">
          <div className={cn(
            "flex items-center gap-3 p-2 rounded-xl bg-accent/50",
            isCollapsed ? "justify-center" : "px-3"
          )}>
            <Avatar className="h-8 w-8 border-2 border-background shadow-sm">
              <AvatarImage src={user?.image} />
              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                {user?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{user?.name || 'User'}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email || 'user@example.com'}</p>
              </div>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onLogout}
            className={cn(
              "w-full mt-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10",
              isCollapsed ? "px-0" : "justify-start gap-3"
            )}
          >
            <LogOut className="h-4 w-4" />
            {!isCollapsed && <span>Logout</span>}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full mt-4 hidden md:flex"
          >
            <ChevronRight className={cn("h-4 w-4 transition-transform", !isCollapsed && "rotate-180")} />
          </Button>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-card border-r z-50 md:hidden flex flex-col"
            >
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-xl text-primary">
                  <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white">
                    <LayoutDashboard className="h-5 w-5" />
                  </div>
                  <span>PostureGuard</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="h-6 w-6" />
                </Button>
              </div>
              
              <ScrollArea className="flex-1 px-4">
                <div className="space-y-2 py-4">
                  {navItems.map((item) => (
                    <NavItem
                      key={item.id}
                      icon={item.icon}
                      label={item.label}
                      isActive={activeSection === item.id}
                      onClick={() => {
                        setActiveSection(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                    />
                  ))}
                </div>
                <Separator className="my-4" />
                <div className="space-y-2">
                  {bottomNavItems.map((item) => (
                    <NavItem
                      key={item.id}
                      icon={item.icon}
                      label={item.label}
                      isActive={activeSection === item.id}
                      onClick={() => {
                        setActiveSection(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                    />
                  ))}
                </div>
              </ScrollArea>
              
              <div className="p-6 border-t">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.image} />
                    <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full gap-2" onClick={onLogout}>
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b bg-card/50 backdrop-blur-md flex items-center justify-between px-4 md:px-8 shrink-0 z-30">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-lg font-semibold capitalize hidden md:block">
              {navItems.find(i => i.id === activeSection)?.label || bottomNavItems.find(i => i.id === activeSection)?.label || 'Dashboard'}
            </h1>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive border-2 border-background" />
            </Button>
            <Separator orientation="vertical" className="h-6 hidden md:block" />
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium leading-none">{user?.name || 'Guest'}</p>
                <p className="text-xs text-muted-foreground mt-1">Premium Plan</p>
              </div>
              <Avatar className="h-8 w-8 ring-2 ring-primary/20 ring-offset-2 ring-offset-background">
                <AvatarImage src={user?.image} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-accent/20 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
