
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, Linkedin, Github, Phone } from "lucide-react"; // Added Phone icon
import { resumeData } from "@/lib/resume-data";

export default function ContactPage() {
  return (
    <div className="space-y-12">
      <header className="text-center">
        <h1 className="text-5xl font-extrabold mb-3">
          Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Touch</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Have a question, project idea, or just want to connect? Feel free to reach out!
        </p>
      </header>

      <div className="flex justify-center">
        <Card className="shadow-lg w-full md:max-w-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Contact Information</CardTitle>
            <CardDescription>Ways to connect with me.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-3 p-4 rounded-lg hover:bg-secondary/50 transition-colors">
              <Mail className="h-7 w-7 text-primary" />
              <div>
                <h3 className="font-semibold text-lg">Email</h3>
                <a href={`mailto:${resumeData.contact.email}`} className="text-foreground hover:text-primary transition-colors text-base">
                  {resumeData.contact.email}
                </a>
              </div>
            </div>
            {resumeData.contact.phone && (
              <div className="flex items-center space-x-3 p-4 rounded-lg hover:bg-secondary/50 transition-colors">
                <Phone className="h-7 w-7 text-primary" />
                <div>
                  <h3 className="font-semibold text-lg">Phone</h3>
                  <a href={`tel:${resumeData.contact.phone}`} className="text-foreground hover:text-primary transition-colors text-base">
                    {resumeData.contact.phone}
                  </a>
                </div>
              </div>
            )}
            <div className="flex items-center space-x-3 p-4 rounded-lg hover:bg-secondary/50 transition-colors">
              <Linkedin className="h-7 w-7 text-primary" />
              <div>
                <h3 className="font-semibold text-lg">LinkedIn</h3>
                <a href="https://www.linkedin.com/in/sachin-yadav-04a710298/" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors text-base">
                  linkedin.com/in/sachin-yadav-04a710298
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 rounded-lg hover:bg-secondary/50 transition-colors">
              <Github className="h-7 w-7 text-primary" />
              <div>
                <h3 className="font-semibold text-lg">GitHub</h3>
                <a href="https://github.com/schynno0" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors text-base">
                  github.com/schynno0
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
