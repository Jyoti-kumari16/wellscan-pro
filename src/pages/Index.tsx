import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Activity, Heart, Shield, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/dashboard");
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      {/* Hero Section */}
      <section className="container py-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center justify-center">
            <Activity className="h-16 w-16 text-primary animate-pulse" />
          </div>
          <h1 className="mb-6 text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Smart Health Diagnostics Platform
          </h1>
          <p className="mb-8 text-xl text-muted-foreground max-w-2xl mx-auto">
            Your AI-powered health companion for symptom analysis, continuous monitoring, and emergency support
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" onClick={() => navigate("/auth")}>
              Get Started Free
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate("/auth")}>
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Comprehensive Health Management
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-lg border bg-card p-6 shadow-card hover:shadow-glow transition-all duration-300">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-glow">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">AI Health Analysis</h3>
              <p className="text-muted-foreground">
                Advanced AI analyzes your symptoms and medical history to provide accurate health insights and recommendations
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6 shadow-card hover:shadow-glow transition-all duration-300">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-secondary to-secondary/80">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Continuous Monitoring</h3>
              <p className="text-muted-foreground">
                Track vital signs in real-time with smart alerts and personalized health recommendations
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6 shadow-card hover:shadow-glow transition-all duration-300">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-destructive to-destructive/80">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">SOS Emergency</h3>
              <p className="text-muted-foreground">
                Quick access to emergency services with location-based hospital and pharmacy finder
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20">
        <div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-r from-primary to-secondary p-12 text-center text-white shadow-glow">
          <Zap className="mx-auto mb-6 h-12 w-12" />
          <h2 className="mb-4 text-3xl font-bold">
            Start Your Health Journey Today
          </h2>
          <p className="mb-8 text-lg opacity-90">
            Join thousands of users taking control of their health with AI-powered insights
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate("/auth")}
            className="bg-white text-primary hover:bg-white/90"
          >
            Create Free Account
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
