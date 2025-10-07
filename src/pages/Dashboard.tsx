import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  FileText, 
  Heart, 
  Calendar,
  TrendingUp,
  Clock
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const { toast } = useToast();
  const [stats, setStats] = useState({
    checkupsCount: 0,
    lastCheckup: null as string | null,
    monitoringCount: 0,
    appointmentsCount: 0,
  });

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setStats({
        checkupsCount: 0,
        lastCheckup: null,
        monitoringCount: 0,
        appointmentsCount: 0,
      });
    } catch (error) {
      console.error("Error loading dashboard stats:", error);
      toast({
        variant: "destructive",
        title: "Error loading dashboard",
        description: "Failed to load dashboard statistics",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <Header />
      
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Health Dashboard
          </h1>
          <p className="text-muted-foreground">
            Monitor your health, analyze symptoms, and get AI-powered insights
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-card hover:shadow-glow transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Checkups
              </CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.checkupsCount}</div>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-glow transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Health Records
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">{stats.monitoringCount}</div>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-glow transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Appointments
              </CardTitle>
              <Calendar className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{stats.appointmentsCount}</div>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-glow transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Last Checkup
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium">
                {stats.lastCheckup
                  ? new Date(stats.lastCheckup).toLocaleDateString()
                  : "No checkups yet"}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/checkup">
            <Card className="cursor-pointer shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105 h-full">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mb-4">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Health Checkup</CardTitle>
                <CardDescription>
                  Analyze current and previous symptoms with AI-powered insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="hero" className="w-full">
                  Start Checkup
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link to="/monitoring">
            <Card className="cursor-pointer shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105 h-full">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Health Monitoring</CardTitle>
                <CardDescription>
                  Track your vitals and get real-time health recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="secondary" className="w-full">
                  View Monitoring
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link to="/book-doctor">
            <Card className="cursor-pointer shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105 h-full">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Book Doctor</CardTitle>
                <CardDescription>
                  Schedule appointments with healthcare professionals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  Book Appointment
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  );
}
