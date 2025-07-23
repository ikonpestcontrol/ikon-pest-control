'use client'
import { Button } from "@/components/ui/button"
import axios from "axios"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, MapPin, Clock, MessageCircle, Star, Shield, Radius } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    serviceType: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('/api/send-mail', formData); // Adjust endpoint as needed
      alert("Your request has been submitted!");
    } catch (error) {
      console.error("Error sending form:", error);
      alert("There was a problem. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white lg:py-16 py-5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-ikontext mb-4">Get Your Free Pest Inspection</h1>
            <p className="text-xl text-ikontext mb-8">
              Ready to solve your pest problem? Contact us today for a free inspection and customized treatment plan.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm text-ikontext text-center sm:text-left">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-ikongold" />
                Fast Response Guaranteed
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-ikongold" />
                Your Data is Safe With Us
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="p-8">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl">Book Your Free Inspection</CardTitle>
                <p className="text-ikontext">Fill out the form below and we'll contact you within 24 hours</p>
              </CardHeader>
              <CardContent className="p-0">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-ikontext mb-2">Full Name *</label>
                      <Input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter your full name" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ikontext mb-2">Phone Number *</label>
                      <Input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="Phone Number" pattern="[0-9]{10}"
                        onInput={(e) => {
                          const input = e.target as HTMLInputElement;
                          input.value = input.value.replace(/\D/g, ''); // Only digits
                        }}
                        required />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ikontext mb-2">Email Address</label>
                    <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="email@example.com" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ikontext mb-2">Service Type *</label>
                    <select name="serviceType" value={formData.serviceType} onChange={(e) =>
                      setFormData((prev) => ({ ...prev, serviceType: e.target.value }))
                    }
                      className="w-full px-3 py-2 border border-ikontext rounded-md focus:outline-none focus:ring-2 focus:ring-ikongold"
                      required
                    >
                      <option value="general">General Pest Control</option>
                      <option value="termites">Termite Control</option>
                      <option value="bedbugs">Bed Bug Treatment</option>
                      <option value="rodents">Rodent Control</option>
                      <option value="mosquitoes">Mosquito Control</option>
                      <option value="emergency">Emergency Service</option>
                      <option value="commercial">Commercial Service</option>
                      <option value="commercial">Corperate Office Service</option>
                      <option value="commercial">Hotels</option>
                      <option value="commercial">Godowns</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ikontext mb-2">Describe Your Pest Problem</label>
                    <Textarea name="description" value={formData.description} onChange={(e) =>
                      setFormData((prev) => ({ ...prev, description: e.target.value }))
                    }
                      placeholder="Tell us about the pests..." rows={4}
                    />
                  </div>

                  <Button className="w-full bg-ikongold text-xl text-ikontext hover:bg-ikontext hover:text-ikongold" size="lg">
                    <Phone className="mr-2 h-5 w-5" />
                    Book Free Inspection
                  </Button>

                  <p className="text-xs text-ikontext text-center">
                    By submitting this form, you agree to receive communications from PestGuard. We respect your
                    privacy and will never share your information.
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Quick Contact */}
              <Card className="p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-xl">Prefer Talking to a Human?</CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-ikongold" />
                    <div>
                      <p className="font-semibold text-ikontext">Call Us Now</p>
                      <a href="tel:9892865620">
                        <p className="text-ikongold font-bold text-lg">98928 65620</p>
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-5 w-5 text-ikongold" />
                    <div>
                      <p className="font-semibold text-ikontext">WhatsApp</p>
                      <a href="https://wa.me/+919892865620" target="_blank" rel="noopener noreferrer">
                        <p className="text-ikontext">98928 65620</p>
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-ikongold" />
                    <div>
                      <p className="font-semibold text-ikontext">Email</p>
                      <p className="text-ikontext">ikonpestcontrolservice@gmail.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Operating Hours */}
              <Card className="p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Clock className="h-5 w-5 text-ikongold" />
                    Operating Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-ikontext">Monday - Friday</span>
                    <span className="font-semibold">24 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ikontext">Saturday - Sunday</span>
                    <span className="font-semibold">24 hours</span>
                  </div>
                  <div className="pt-2 border-t">
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-100">24/7 Emergency Service Available</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Office Location */}
              <Card className="p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-ikongold" />
                    Ikon Pest Control
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-2 mb-4">
                    <p className="text-ikontext">
                      Bhairav Darshan, Shop no.7, opposite Pious buds School, Pooja Nagar, Cabin Cross Rd, Bhayandar (E) Thane, Maharashtra 401105
                    </p>
                    <p className="text-sm text-ikontext">Free parking available</p>
                  </div>
                  <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1882.7549671792858!2d72.85574086536325!3d19.303666452096408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b1c271d1344f%3A0x93fbde5b42813f22!2sIKON%20Pest%20Control%20Services!5e0!3m2!1sen!2sin!4v1751455254568!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ borderRadius: 15, }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </CardContent>
              </Card>

              {/* Service Area */}
              <Card className="p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-xl">Service Area</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-ikontext mb-4">
                    We proudly serve the entire metropolitan area and surrounding communities:
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {[
                      "Mira Road East",
                      "Bhayandar East & West",
                      "Thane District",
                      "Residential Societies",
                      "Commercial Complexes",
                      "Industrial Areas",
                    ].map((area, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <MapPin className="h-3 w-3 text-ikongold" />
                        <span className="text-ikontext">{area}</span>
                      </div>
                    ))}
                  </div>
                  <a href="tel:9892865620">
                    <Button variant="outline" className="w-full text-xl mt-4 bg-transparent">
                      Check Service Availability
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-ikontext mb-4">What Our Customers Say</h2>
            <div className="flex items-center justify-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-ikontext ml-2">4.8/5 from 20+ reviews</span>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-ikontext mb-4">
                  "Nicee work every thing was covered properly with proper technician experience"
                </p>
                <p className="font-semibold text-ikontext">Mitesh Roge</p>
                <p className="text-sm text-ikontext">Residential Customer</p>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-ikontext mb-4">
                  "The best Services provider ikon technician mr.rajesh and pankaj Termite treatment save my furnicher  best.quality."
                </p>
                <p className="font-semibold text-ikontext">Divyanshi</p>
                <p className="text-sm text-ikontext">Residential Customer</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-12 bg-red-50 border-t border-red-200">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-ikontext mb-4">Need Emergency Pest Control?</h2>
            <p className="text-ikontext mb-6">We provide 24/7 emergency pest control services for urgent situations</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:9892865620">
                <Button size="lg" className="bg-red-600 text-xl hover:bg-red-700">
                  <Phone className="mr-2 h-5 w-5" />
                  Emergency: 98928 65620
                </Button>
              </a>
              <a href="http://wa.me/919892865620">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-red-600 text-xl text-red-600 hover:bg-red-600 hover:text-white bg-transparent"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Emergency WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
