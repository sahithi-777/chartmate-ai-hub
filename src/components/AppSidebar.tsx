import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { AreaChart, Bot, HelpCircle, Lightbulb, LineChart, LogOut, Settings, Zap, BookOpen, Archive, Wand2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { icon: Bot, label: "Summary", href: "#" },
  { icon: Lightbulb, label: "Insights", href: "#" },
  { icon: HelpCircle, label: "Quiz", href: "#" },
  { icon: LineChart, label: "Forecast", href: "#" },
  { icon: Zap, label: "Anomalies", href: "#" },
];

export function AppSidebar() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link to="/" className="flex items-center gap-2">
          <AreaChart className="text-primary h-8 w-8" />
          <h1 className="text-2xl font-semibold">ChartMate</h1>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel>Analysis</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <Button asChild variant="ghost" className="w-full justify-start gap-2 text-base font-normal text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                    <a href={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </a>
                  </Button>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 flex flex-col gap-2">
        <Separator />
        <SidebarMenu>
          <SidebarMenuItem>
            <Button asChild variant={isActive('/surprise-me') ? 'secondary' : 'ghost'} className="w-full justify-start gap-2 text-base font-normal">
              <Link to="/surprise-me">
                <Wand2 className="h-5 w-5" />
                <span>Surprise Me</span>
              </Link>
            </Button>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Button asChild variant={isActive('/history') ? 'secondary' : 'ghost'} className="w-full justify-start gap-2 text-base font-normal">
              <Link to="/history">
                <Archive className="h-5 w-5" />
                <span>History</span>
              </Link>
            </Button>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Button asChild variant={isActive('/profile') ? 'secondary' : 'ghost'} className="w-full justify-start gap-2 text-base font-normal">
              <Link to="/profile">
                <Settings className="h-5 w-5" />
                <span>Profile</span>
              </Link>
            </Button>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Button asChild variant={isActive('/guide') ? 'secondary' : 'ghost'} className="w-full justify-start gap-2 text-base font-normal">
              <Link to="/guide">
                <BookOpen className="h-5 w-5" />
                <span>Guide</span>
              </Link>
            </Button>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Button onClick={handleSignOut} variant="ghost" className="w-full justify-start gap-2 text-base font-normal text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
