
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { AreaChart, Bot, FileText, Lightbulb, Loader2 } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LandingPage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="px-4 lg:px-6 h-16 flex items-center sticky top-0 z-50 w-full border-b bg-background">
        <Link to="#" className="flex items-center justify-center">
          <AreaChart className="h-6 w-6 text-primary" />
          <span className="ml-2 text-xl font-semibold">ChartMate++</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link
            to="/auth"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Login
          </Link>
          <Button asChild>
            <Link to="/auth">Get Started</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                    Unlock Insights from Your Charts with AI
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    ChartMate++ uses advanced AI to analyze your charts and
                    data visualizations, providing summaries, insights, and
                    even quizzes to test your understanding.
                  </p>
                </div>
                <div className="flex flex-col gap-4 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link to="/auth">Upload Your First Chart</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="/photo-1460925895917-afdab827c52f"
                  width="550"
                  height="550"
                  alt="Hero"
                  className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Features to Supercharge Your Analysis
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From instant summaries to anomaly detection, we have you covered.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:grid-cols-3">
              <Card className="shadow-md hover:shadow-lg transition-shadow bg-background">
                <CardHeader className="flex flex-row items-center gap-4 p-4">
                  <FileText className="h-8 w-8 text-primary" />
                  <CardTitle className="text-lg">AI Summaries</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground">
                    Get concise, AI-generated summaries of your charts instantly.
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow-md hover:shadow-lg transition-shadow bg-background">
                <CardHeader className="flex flex-row items-center gap-4 p-4">
                  <Lightbulb className="h-8 w-8 text-primary" />
                  <CardTitle className="text-lg">Deep Insights</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground">
                    Discover hidden trends and patterns you might have missed.
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow-md hover:shadow-lg transition-shadow bg-background">
                <CardHeader className="flex flex-row items-center gap-4 p-4">
                  <Bot className="h-8 w-8 text-primary" />
                  <CardTitle className="text-lg">Interactive Quizzes</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground">
                    Test your knowledge with AI-generated quizzes about your data.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2025 ChartMate++. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link to="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link to="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default LandingPage;
