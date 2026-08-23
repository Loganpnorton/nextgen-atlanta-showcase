import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight, Globe, Layout, Rocket, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Welcome = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hasDomain, setHasDomain] = useState<string>("no");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    // Add the domain status
    data.hasDomain = hasDomain;

    try {
      const response = await fetch("/api/welcome", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setSubmitted(true);
      toast({
        title: "Welcome to the family!",
        description: "Your onboarding dossier has been received. We're starting the build now!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "There was an error sending your details. Please try again or contact support.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full text-center space-y-6"
          >
            <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <Rocket className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">You're All Set!</h1>
            <p className="text-muted-foreground text-lg">
              Thank you for providing your details. Our team has been notified, and the NextGen Atlanta build process has officially begun.
            </p>
            <div className="pt-4">
              <Button asChild size="lg" className="rounded-full px-8">
                <a href="/">Return Home</a>
              </Button>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="container max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12 space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Welcome to NextGen Atlanta</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                We're thrilled to have you on board. Let's gather everything we need to build your premium digital presence.
              </p>
            </div>

            <Card className="glass-pill border-white/10 shadow-2xl overflow-hidden">
              <div className="h-2 bg-primary w-full" />
              <CardHeader className="pt-8 px-8">
                <CardTitle className="text-2xl">Client Onboarding</CardTitle>
                <CardDescription>Please complete the form below to kick off your project.</CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-12">
                  {/* Section 1: The Basics */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-semibold uppercase tracking-wider text-primary/80">1. The Basics</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="businessName">Official Business Name</Label>
                        <Input id="businessName" name="businessName" placeholder="NextGen Atlanta LLC" required className="bg-white/5" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactPerson">Primary Contact Person</Label>
                        <Input id="contactPerson" name="contactPerson" placeholder="John Doe" required className="bg-white/5" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Contact Email</Label>
                        <Input id="email" name="email" type="email" placeholder="john@example.com" required className="bg-white/5" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" name="phone" type="tel" placeholder="(555) 000-0000" required className="bg-white/5" />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="address">Physical Address & Business Hours</Label>
                        <Textarea id="address" name="address" placeholder="123 Main St, Atlanta, GA 30301&#10;Mon-Fri: 9am - 5pm" required className="bg-white/5 min-h-[100px]" />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: The Brand */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                      <Layout className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-semibold uppercase tracking-wider text-primary/80">2. The Brand</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="brandColors">Brand Colors</Label>
                        <Input id="brandColors" name="brandColors" placeholder="e.g. Navy Blue and Gold" className="bg-white/5" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="socialLinks">Social Media Links</Label>
                        <Input id="socialLinks" name="socialLinks" placeholder="Instagram, Facebook, etc." className="bg-white/5" />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="assetsLink">Assets Link (Google Drive, Dropbox, iCloud)</Label>
                        <Input id="assetsLink" name="assetsLink" placeholder="Paste link to logos and 5-10 business photos" required className="bg-white/5" />
                        <p className="text-xs text-muted-foreground">Please ensure the folder is shared with "Anyone with the link".</p>
                      </div>
                    </div>
                  </div>

                  {/* Section 3: The Pitch */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                      <Rocket className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-semibold uppercase tracking-wider text-primary/80">3. The Pitch</h3>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="elevatorPitch">The 'Elevator Pitch'</Label>
                        <Textarea 
                          id="elevatorPitch" 
                          name="elevatorPitch" 
                          placeholder="In 2-3 sentences, what makes your business the best in town?" 
                          required 
                          className="bg-white/5 min-h-[100px]" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="topServices">Top 3 Services/Products</Label>
                        <Input id="topServices" name="topServices" placeholder="e.g. Web Design, SEO, Hosting" required className="bg-white/5" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ctaGoal">Main Call-to-Action Goal</Label>
                        <Select name="ctaGoal" required>
                          <SelectTrigger className="bg-white/5">
                            <SelectValue placeholder="Select a primary goal" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="call">Call us</SelectItem>
                            <SelectItem value="form">Fill out form</SelectItem>
                            <SelectItem value="visit">Visit store</SelectItem>
                            <SelectItem value="buy">Buy online</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Section 4: Domain & Tech */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                      <Globe className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-semibold uppercase tracking-wider text-primary/80">4. Domain & Tech</h3>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label>Do you already have a domain name (website link)?</Label>
                        <RadioGroup defaultValue="no" onValueChange={setHasDomain} className="flex gap-6">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="domain-yes" />
                            <Label htmlFor="domain-yes" className="font-normal cursor-pointer">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="domain-no" />
                            <Label htmlFor="domain-no" className="font-normal cursor-pointer">No</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {hasDomain === "no" ? (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="space-y-2"
                        >
                          <Label htmlFor="idealDomain">What domain name would you ideally like?</Label>
                          <Input id="idealDomain" name="idealDomain" placeholder="e.g. mybusiness.com" className="bg-white/5" />
                          <p className="text-sm text-primary/80 italic">Don't worry, we will register and set this up for you!</p>
                        </motion.div>
                      ) : (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="space-y-4"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="currentDomain">Current Domain Name</Label>
                              <Input id="currentDomain" name="currentDomain" placeholder="mybusiness.com" className="bg-white/5" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="registrar">Domain Registrar</Label>
                              <Select name="registrar">
                                <SelectTrigger className="bg-white/5">
                                  <SelectValue placeholder="Select registrar" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="godaddy">GoDaddy</SelectItem>
                                  <SelectItem value="namecheap">Namecheap</SelectItem>
                                  <SelectItem value="wix">Wix</SelectItem>
                                  <SelectItem value="squarespace">Squarespace</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="flex items-start gap-2 p-3 bg-white/5 rounded-lg border border-white/10">
                            <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <p className="text-xs text-muted-foreground">
                              For security, never submit registrar credentials through this form. We will provide DNS instructions or coordinate access through an approved secure process.
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full h-14 text-lg font-bold rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] glow-shadow-sm"
                  >
                    {loading ? "Processing..." : "Complete Onboarding"}
                    {!loading && <ChevronRight className="ml-2 w-5 h-5" />}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Welcome;
