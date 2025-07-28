import { ReactNode } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Package } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => navigate("/")}
              >
                <div className="bg-primary p-2 rounded-lg">
                  <Package className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">
                    Fortran
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Inventory Management
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {!isHomePage && (
                <Button 
                  variant="ghost" 
                  onClick={() => navigate("/")}
                >
                  Search Parts
                </Button>
              )}
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="min-h-[calc(100vh-80px)]">
        {children}
      </main>

      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Fortran Inventory Management. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};