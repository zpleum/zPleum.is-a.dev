"use client"

import { useState, FormEvent, useRef } from "react"
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Facebook, AlertCircle } from "lucide-react"
import { FaDiscord } from "react-icons/fa";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { AnimatedSection } from "@/components/animated-section"
import emailjs from '@emailjs/browser';
import { emailConfig } from "@/lib/email-config";

// Initialize EmailJS
emailjs.init(emailConfig.publicKey);

// Form field names must match the template variables in EmailJS
type FormData = {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
}

type FieldError = {
  from_name?: string;
  from_email?: string;
  subject?: string;
  message?: string;
}

export function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    from_name: "",
    from_email: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)
  const [errors, setErrors] = useState<FieldError>({})
  const [touched, setTouched] = useState<{[key: string]: boolean}>({})
  
  // Create a reference to the form element
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name as keyof FieldError]) {
      setErrors(prev => ({...prev, [name]: undefined}))
    }
  }

  const validateField = (name: string, value: string): string | undefined => {
    if (!value.trim()) {
      return `Please enter your ${name.replace('from_', '')}`
    }
    
    if (name === 'from_email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Please enter a valid email address"
    }
    
    return undefined
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFocused(null)
    setTouched(prev => ({...prev, [name]: true}))
    
    const error = validateField(name, value)
    if (error) {
      setErrors(prev => ({...prev, [name]: error}))
    }
  }

  const handleFocus = (name: string) => {
    setFocused(name)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Validate all fields
    const newErrors: FieldError = {}
    let hasErrors = false
    
    Object.entries(formData).forEach(([field, value]) => {
      const error = validateField(field, value)
      if (error) {
        newErrors[field as keyof FieldError] = error
        hasErrors = true
      }
    })
    
    if (hasErrors) {
      setErrors(newErrors)
      // Mark all fields as touched
      const allTouched = Object.keys(formData).reduce(
        (acc, key) => ({...acc, [key]: true}), 
        {}
      )
      setTouched(allTouched)
      return
    }
    
    setIsSubmitting(true)

    try {
      // Log detailed information for debugging
      console.log('Attempting to send form via EmailJS...');
      console.log('Service ID:', emailConfig.serviceId);
      console.log('Template ID:', emailConfig.templateId);
      console.log('Form data:', formData);
      
      // Verify that the form reference exists
      if (!formRef.current) {
        throw new Error('Form reference is missing');
      }

      // Using sendForm method with debug logging
      const result = await emailjs.sendForm(
        emailConfig.serviceId,
        emailConfig.templateId,
        formRef.current,
        { publicKey: emailConfig.publicKey } // Explicitly passing public key
      );
      
      console.log('EmailJS Response:', result);
      
      // Show success message and clear form
      toast.success(
        "Message sent successfully!", 
        {
          id: "contact-form-success",
          description: "Thank you for reaching out. I'll get back to you as soon as possible.",
          icon: <Send className="h-5 w-5 text-primary" />
        }
      );
      
    } catch (error) {
      // Log detailed error information
      console.error('Error sending email:', error);
      
      // Show error toast
      toast.error(
        "Failed to send message", 
        {
          id: "contact-form-error",
          description: "Please try again or contact me directly via email.",
          icon: <AlertCircle className="h-5 w-5 text-destructive" />
        }
      );
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      className="py-20 md:py-24 overflow-x-hidden"
    >
      <div className="container px-4 md:px-6">
        <AnimatedSection direction="up">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Get in Touch
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Let's Work Together
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Have a project in mind or want to discuss an opportunity? I'd love to hear from you.
              </p>
            </div>
          </div>
        </AnimatedSection>

        <div className="mx-auto max-w-6xl mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <AnimatedSection direction="left" delay={100} className="h-full">
              <Card className="border-0 shadow-md transition-all duration-300 hover:shadow-lg h-full flex flex-col">
                <CardHeader className="pb-4">
                  <CardTitle>Send a Message</CardTitle>
                  <CardDescription>Fill out the form and I'll get back to you as soon as possible.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 h-full flex flex-col" noValidate>
                    <div className="space-y-2">
                      <label htmlFor="from_name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Name
                      </label>
                      <div className="relative">
                        <input
                          id="from_name"
                          name="from_name"
                          type="text"
                          value={formData.from_name}
                          onChange={handleChange}
                          onFocus={() => handleFocus('from_name')}
                          onBlur={handleBlur}
                          className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 ${
                            touched.from_name && errors.from_name 
                              ? 'border-destructive' 
                              : focused === 'from_name' 
                                ? 'border-primary shadow-sm' 
                                : 'border-input'
                          }`}
                          placeholder="Example Name"
                        />
                        {touched.from_name && errors.from_name && (
                          <div className="flex items-center gap-1 mt-1.5 text-destructive text-xs">
                            <AlertCircle className="h-3.5 w-3.5" />
                            <span>{errors.from_name}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="from_email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Email
                      </label>
                      <div className="relative">
                        <input
                          id="from_email"
                          name="from_email"
                          type="email"
                          value={formData.from_email}
                          onChange={handleChange}
                          onFocus={() => handleFocus('from_email')}
                          onBlur={handleBlur}
                          className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 ${
                            touched.from_email && errors.from_email 
                              ? 'border-destructive' 
                              : focused === 'from_email' 
                                ? 'border-primary shadow-sm' 
                                : 'border-input'
                          }`}
                          placeholder="example@example.com"
                        />
                        {touched.from_email && errors.from_email && (
                          <div className="flex items-center gap-1 mt-1.5 text-destructive text-xs">
                            <AlertCircle className="h-3.5 w-3.5" />
                            <span>{errors.from_email}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Subject
                      </label>
                      <div className="relative">
                        <input
                          id="subject"
                          name="subject"
                          type="text"
                          value={formData.subject}
                          onChange={handleChange}
                          onFocus={() => handleFocus('subject')}
                          onBlur={handleBlur}
                          className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 ${
                            touched.subject && errors.subject 
                              ? 'border-destructive' 
                              : focused === 'subject' 
                                ? 'border-primary shadow-sm' 
                                : 'border-input'
                          }`}
                          placeholder="Project Inquiry"
                        />
                        {touched.subject && errors.subject && (
                          <div className="flex items-center gap-1 mt-1.5 text-destructive text-xs">
                            <AlertCircle className="h-3.5 w-3.5" />
                            <span>{errors.subject}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2 flex-grow flex flex-col min-h-0">
                      <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Message
                      </label>
                      <div className="relative flex-grow flex flex-col min-h-0">
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          onFocus={() => handleFocus('message')}
                          onBlur={handleBlur}
                          className={`flex-grow min-h-[120px] w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 ${
                            touched.message && errors.message 
                              ? 'border-destructive' 
                              : focused === 'message' 
                                ? 'border-primary shadow-sm' 
                                : 'border-input'
                          }`}
                          placeholder="Let me know how I can help..."
                        />
                        {touched.message && errors.message && (
                          <div className="flex items-center gap-1 mt-1.5 text-destructive text-xs">
                            <AlertCircle className="h-3.5 w-3.5" />
                            <span>{errors.message}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        className="w-full transition-all duration-300 hover:shadow-md" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-1">
                            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-background" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <Send className="h-4 w-4" />
                            Send Message
                          </span>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Contact Information */}
            <AnimatedSection direction="right" delay={200} className="h-full flex flex-col">
              <div className="grid grid-rows-[auto_minmax(400px,1fr)] gap-6 h-full">
                <Card className="border-0 shadow-md transition-all duration-300 hover:shadow-lg">
                  <CardHeader className="pb-4">
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>Feel free to reach out through any of these channels.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-4 group transition-all duration-300 hover:bg-muted/50 p-2 rounded-md">
                      <Mail className="h-5 w-5 mt-0.5 text-primary group-hover:scale-110 transition-transform duration-300" />
                      <div>
                        <h3 className="font-medium">Email</h3>
                        <p className="text-sm text-muted-foreground">wiraphat.makwong@gmail.com</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4 group transition-all duration-300 hover:bg-muted/50 p-2 rounded-md">
                      <Phone className="h-5 w-5 mt-0.5 text-primary group-hover:scale-110 transition-transform duration-300" />
                      <div>
                        <h3 className="font-medium">Phone</h3>
                        <p className="text-sm text-muted-foreground">+66 (65) 457-1069</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4 group transition-all duration-300 hover:bg-muted/50 p-2 rounded-md">
                      <MapPin className="h-5 w-5 mt-0.5 text-primary group-hover:scale-110 transition-transform duration-300" />
                      <div>
                        <h3 className="font-medium">Location</h3>
                        <p className="text-sm text-muted-foreground">Tak, Thailand</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4 flex justify-start gap-4">
                    <Button asChild variant="ghost" size="icon" className="hover:bg-primary/10 transition-all duration-300">
                      <a href="https://github.zpleum.dev" target="_blank" rel="noopener noreferrer">
                        <Github className="h-5 w-5 transition-transform duration-300 hover:scale-110" />
                        <span className="sr-only">GitHub</span>
                      </a>
                    </Button>
                    <Button asChild variant="ghost" size="icon" className="hover:bg-primary/10 transition-all duration-300">
                      <a href="https://facebook.zpleum.dev" target="_blank" rel="noopener noreferrer">
                        <Facebook className="h-5 w-5 transition-transform duration-300 hover:scale-110" />
                        <span className="sr-only">Facebook</span>
                      </a>
                    </Button>
                    <Button asChild variant="ghost" size="icon" className="hover:bg-primary/10 transition-all duration-300">
                      <a href="https://linkedin.zpleum.dev" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-5 w-5 transition-transform duration-300 hover:scale-110" />
                        <span className="sr-only">LinkedIn</span>
                      </a>
                    </Button>
                    <Button asChild variant="ghost" size="icon" className="hover:bg-primary/10 transition-all duration-300">
                      <a href="https://discord.zpleum.dev" target="_blank" rel="noopener noreferrer">
                        <FaDiscord className="h-5 w-5 fill-current text-primary transition-transform duration-300 hover:scale-110" />
                        <span className="sr-only">Discord</span>
                      </a>
                    </Button>
                  </CardFooter>
                </Card>

                <AnimatedSection delay={300} className="h-full flex-grow">
                  <Card className="border-0 shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col">
                    <CardHeader className="pb-2">
                      <CardTitle>My Location</CardTitle>
                      <CardDescription>Based in Tak, Thailand</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 flex-1 min-h-[350px] relative overflow-hidden">
                      <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241638.90900355248!2d98.95168955499088!3d16.873912136852414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30dda5df16e7e5a3%3A0x10346fe2e6c3e3f0!2sTak!5e0!3m2!1sen!2sth!4v1717239631387!5m2!1sen!2sth" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen={false} 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        className="absolute inset-0 transition-transform duration-700 hover:scale-110"
                      />
                    </CardContent>
                  </Card>
                </AnimatedSection>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  )
}
