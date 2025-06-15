
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-10 flex h-[57px] items-center gap-4 border-b bg-background px-4">
      <SidebarTrigger className="lg:hidden" />
      <h1 className="flex-1 text-xl font-semibold">{title}</h1>
      {user ? (
        <Button variant="ghost" size="icon" className="rounded-full" onClick={signOut}>
          <LogOut className="h-5 w-5" />
          <span className="sr-only">Logout</span>
        </Button>
      ) : (
        <Button variant="ghost" size="icon" className="rounded-full">
          <User className="h-5 w-5" />
          <span className="sr-only">User Profile</span>
        </Button>
      )}
    </header>
  );
}
