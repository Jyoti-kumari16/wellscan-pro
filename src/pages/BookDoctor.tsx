import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar, Stethoscope, Video } from "lucide-react";

export default function BookDoctor() {
  const platforms = [
    {
      name: "Practo",
      description: "Find and book appointments with verified doctors",
      url: "https://www.practo.com",
      icon: Stethoscope,
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "Apollo 24/7",
      description: "Consult with Apollo doctors online or in-person",
      url: "https://www.apollo247.com",
      icon: Video,
      color: "from-green-500 to-green-600",
    },
    {
      name: "Zocdoc",
      description: "Book appointments with local healthcare providers",
      url: "https://www.zocdoc.com",
      icon: Calendar,
      color: "from-purple-500 to-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <Header />
      
      <main className="container py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Book Doctor Appointment
          </h1>
          <p className="text-muted-foreground">
            Connect with healthcare professionals through trusted platforms
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform) => {
            const Icon = platform.icon;
            return (
              <Card key={platform.name} className="shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${platform.color} flex items-center justify-center mb-4`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>{platform.name}</CardTitle>
                  <CardDescription>{platform.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="hero" className="w-full" asChild>
                    <a href={platform.url} target="_blank" rel="noopener noreferrer">
                      Visit Platform
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="mt-8 shadow-card">
          <CardHeader>
            <CardTitle>Why Book Through These Platforms?</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <div>
                  <strong>Verified Doctors:</strong> All healthcare providers are verified and licensed professionals
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-secondary" />
                </div>
                <div>
                  <strong>Flexible Options:</strong> Choose between video consultations or in-person visits
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                </div>
                <div>
                  <strong>Easy Scheduling:</strong> Book appointments instantly based on doctor availability
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <div>
                  <strong>Secure & Private:</strong> Your health data is protected with industry-standard encryption
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
