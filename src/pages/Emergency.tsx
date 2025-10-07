import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, MapPin, Phone, Navigation } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Emergency() {
  const { toast } = useToast();
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [nearbyPlaces, setNearbyPlaces] = useState<any[]>([]);

  const getCurrentLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude},${longitude}`);
          toast({
            title: "Location obtained",
            description: "Searching for nearby medical facilities...",
          });
          // In a real app, this would call Google Maps API
          setNearbyPlaces([
            {
              name: "City Hospital Emergency",
              address: "123 Medical Center Dr",
              phone: "+1-555-0100",
              distance: "0.5 mi",
            },
            {
              name: "24/7 Medical Clinic",
              address: "456 Health Plaza",
              phone: "+1-555-0200",
              distance: "1.2 mi",
            },
          ]);
          setLoading(false);
        },
        (error) => {
          toast({
            variant: "destructive",
            title: "Location error",
            description: "Unable to get your location. Please enter manually.",
          });
          setLoading(false);
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-destructive/10 via-background to-destructive/5">
      <Header />
      
      <main className="container py-8 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-destructive to-destructive/80 flex items-center justify-center animate-pulse">
              <AlertCircle className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-destructive">
              Emergency Help
            </h1>
          </div>
          <p className="text-muted-foreground">
            Find nearby hospitals and emergency services immediately
          </p>
        </div>

        {/* Emergency Contacts */}
        <Card className="mb-6 shadow-card border-destructive/20">
          <CardHeader className="bg-destructive/5">
            <CardTitle className="text-destructive">Emergency Hotlines</CardTitle>
            <CardDescription>
              Call these numbers for immediate help
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="destructive" className="h-auto py-4 flex-col gap-2" asChild>
                <a href="tel:911">
                  <Phone className="h-5 w-5" />
                  <div>
                    <div className="font-bold">Emergency</div>
                    <div className="text-sm">911</div>
                  </div>
                </a>
              </Button>
              <Button variant="destructive" className="h-auto py-4 flex-col gap-2" asChild>
                <a href="tel:1-800-273-8255">
                  <Phone className="h-5 w-5" />
                  <div>
                    <div className="font-bold">Crisis Line</div>
                    <div className="text-sm">1-800-273-8255</div>
                  </div>
                </a>
              </Button>
              <Button variant="destructive" className="h-auto py-4 flex-col gap-2" asChild>
                <a href="tel:1-800-222-1222">
                  <Phone className="h-5 w-5" />
                  <div>
                    <div className="font-bold">Poison Control</div>
                    <div className="text-sm">1-800-222-1222</div>
                  </div>
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Location Input */}
        <Card className="mb-6 shadow-card">
          <CardHeader>
            <CardTitle>Find Nearby Medical Facilities</CardTitle>
            <CardDescription>
              Share your location or enter it manually
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={getCurrentLocation}
                disabled={loading}
                className="flex-1"
              >
                <MapPin className="mr-2 h-4 w-4" />
                Use Current Location
              </Button>
            </div>
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <Label htmlFor="location">Or enter location manually</Label>
                <Input
                  id="location"
                  placeholder="Enter address or coordinates"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mt-2"
                />
              </div>
              <Button variant="hero">Search</Button>
            </div>
          </CardContent>
        </Card>

        {/* Nearby Places */}
        {nearbyPlaces.length > 0 && (
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Nearby Medical Facilities</CardTitle>
              <CardDescription>
                Sorted by distance from your location
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {nearbyPlaces.map((place, index) => (
                  <Card key={index} className="bg-muted/50">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{place.name}</h3>
                          <p className="text-sm text-muted-foreground">{place.address}</p>
                          <p className="text-sm text-primary font-medium mt-1">
                            {place.distance} away
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="default" size="sm" className="flex-1" asChild>
                          <a href={`tel:${place.phone}`}>
                            <Phone className="mr-2 h-4 w-4" />
                            Call
                          </a>
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1" asChild>
                          <a 
                            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(place.address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Navigation className="mr-2 h-4 w-4" />
                            Directions
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
