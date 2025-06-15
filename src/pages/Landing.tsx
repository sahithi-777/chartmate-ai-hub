
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { AreaChart, Bot, FileText, Lightbulb, Zap } from "lucide-react";
import { Link, Navigate } from "react-router-dom";

const LandingPage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        {/* You can add a spinner here */}
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="px-4 lg:px-6 h-16 flex items-center">
        <Link to="#" className="flex items-center justify-center">
          <AreaChart className="h-6 w-6 text-primary" />
          <span className="ml-2 text-xl font-semibold">ChartMate++</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            to="/auth"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Login
          </Link>
          <Button asChild>
            <Link to="/auth">Get Started</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Unlock Insights from Your Charts with AI
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    ChartMate++ uses advanced AI to analyze your charts and
                    data visualizations, providing summaries, insights, and
                    even quizzes to test your understanding.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link to="/auth">Upload Your First Chart</Link>
                  </Button>
                </div>
              </div>
              <img
                src="/placeholder.svg"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Features to Supercharge Your Analysis
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From instant summaries to anomaly detection, we have you covered.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="grid gap-1 text-center">
                <FileText className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-xl font-bold">AI Summaries</h3>
                <p className="text-muted-foreground">
                  Get concise, AI-generated summaries of your charts instantly.
                </p>
              </div>
              <div className="grid gap-1 text-center">
                <Lightbulb className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-xl font-bold">Deep Insights</h3>
                <p className="text-muted-foreground">
                  Discover hidden trends and patterns you might have missed.
                </p>
              </div>
              <div className="grid gap-1 text-center">
                <Bot className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-xl font-bold">Interactive Quizzes</h3>
                <p className="text-muted-foreground">
                  Test your knowledge with AI-generated quizzes about your data.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2025 ChartMate++. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;

