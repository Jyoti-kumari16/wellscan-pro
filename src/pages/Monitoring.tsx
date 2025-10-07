import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Activity, Droplet, Thermometer } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function Monitoring() {
  const [vitals, setVitals] = useState({
    heartRate: 72,
    bloodPressure: "120/80",
    oxygenLevel: 98,
    temperature: 98.6,
  });

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setVitals({
        heartRate: 70 + Math.floor(Math.random() * 10),
        bloodPressure: `${118 + Math.floor(Math.random() * 5)}/${78 + Math.floor(Math.random() * 5)}`,
        oxygenLevel: 97 + Math.floor(Math.random() * 3),
        temperature: (98.4 + Math.random() * 0.4).toFixed(1) as any,
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getHeartRateStatus = (hr: number) => {
    if (hr < 60) return { color: "text-blue-500", message: "Resting" };
    if (hr < 100) return { color: "text-green-500", message: "Normal" };
    return { color: "text-yellow-500", message: "Elevated" };
  };

  const hrStatus = getHeartRateStatus(vitals.heartRate);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <Header />
      
      <main className="container py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Health Monitoring
          </h1>
          <p className="text-muted-foreground">
            Track your vitals in real-time
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-card hover:shadow-glow transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Heart Rate</CardTitle>
              <Heart className={`h-6 w-6 ${hrStatus.color}`} />
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">{vitals.heartRate}</span>
                <span className="text-muted-foreground">bpm</span>
              </div>
              <p className={`text-sm mt-2 ${hrStatus.color}`}>{hrStatus.message}</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-glow transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Blood Pressure</CardTitle>
              <Activity className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">{vitals.bloodPressure}</span>
                <span className="text-muted-foreground">mmHg</span>
              </div>
              <p className="text-sm text-green-500 mt-2">Normal range</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-glow transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Oxygen Level</CardTitle>
              <Droplet className="h-6 w-6 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">{vitals.oxygenLevel}</span>
                <span className="text-muted-foreground">%</span>
              </div>
              <p className="text-sm text-green-500 mt-2">Healthy</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-glow transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Temperature</CardTitle>
              <Thermometer className="h-6 w-6 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">{vitals.temperature}</span>
                <span className="text-muted-foreground">°F</span>
              </div>
              <p className="text-sm text-green-500 mt-2">Normal</p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Health Recommendations</CardTitle>
            <CardDescription>
              Based on your current vitals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2" />
                <span>Your vitals are within normal range. Keep up the good work!</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-secondary mt-2" />
                <span>Stay hydrated - drink at least 8 glasses of water daily</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-accent mt-2" />
                <span>Continue regular physical activity for optimal heart health</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
