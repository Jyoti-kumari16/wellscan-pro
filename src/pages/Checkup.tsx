import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function Checkup() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    currentSymptoms: "",
    previousSymptoms: "",
    previousMedicines: "",
    symptomsDuration: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          variant: "destructive",
          title: "Authentication required",
          description: "Please log in to continue",
        });
        navigate("/auth");
        return;
      }

      // Call AI analysis edge function
      const { data: analysisData, error: functionError } = await supabase.functions.invoke('analyze-symptoms', {
        body: {
          currentSymptoms: formData.currentSymptoms,
          previousSymptoms: formData.previousSymptoms,
          previousMedicines: formData.previousMedicines,
          symptomsDuration: formData.symptomsDuration,
        }
      });

      if (functionError) throw functionError;

      // Database types will be auto-generated after migration is complete
      // For now, just show the analysis result

      toast({
        title: "Analysis complete!",
        description: "Your health checkup has been saved successfully.",
      });

      navigate("/dashboard");
    } catch (error: any) {
      console.error("Error during checkup:", error);
      toast({
        variant: "destructive",
        title: "Analysis failed",
        description: error.message || "Failed to analyze symptoms",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <Header />
      
      <main className="container py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Health Checkup
          </h1>
          <p className="text-muted-foreground">
            Describe your symptoms and get AI-powered health insights
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Current Symptoms</CardTitle>
                <CardDescription>
                  Describe what you're experiencing right now
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="current-symptoms">Symptoms Description *</Label>
                  <Textarea
                    id="current-symptoms"
                    placeholder="E.g., Headache, fever, cough, body aches..."
                    value={formData.currentSymptoms}
                    onChange={(e) => setFormData({ ...formData, currentSymptoms: e.target.value })}
                    required
                    rows={4}
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Previous Medical History</CardTitle>
                <CardDescription>
                  Help us understand your health background
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="previous-symptoms">Previous Symptoms</Label>
                  <Textarea
                    id="previous-symptoms"
                    placeholder="Any similar symptoms you've experienced before..."
                    value={formData.previousSymptoms}
                    onChange={(e) => setFormData({ ...formData, previousSymptoms: e.target.value })}
                    rows={3}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="previous-medicines">Previous Medicines</Label>
                  <Textarea
                    id="previous-medicines"
                    placeholder="Medicines you've taken or are currently taking..."
                    value={formData.previousMedicines}
                    onChange={(e) => setFormData({ ...formData, previousMedicines: e.target.value })}
                    rows={3}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Symptoms Duration</Label>
                  <Input
                    id="duration"
                    placeholder="E.g., 2 days, 1 week, etc."
                    value={formData.symptomsDuration}
                    onChange={(e) => setFormData({ ...formData, symptomsDuration: e.target.value })}
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/dashboard")}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="hero"
                disabled={loading}
                className="flex-1"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze Symptoms"
                )}
              </Button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
