import { Button } from '@/components/ui/button';
import { resumeData } from '@/lib/resume-data';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[calc(100vh-10rem)]">
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full bg-primary opacity-10 blur-2xl animate-pulse -z-10"></div>
        <Image
          src="https://i.ibb.co/ksqRy9f6/Whats-App-Image-2025-05-14-at-2-57-13-PM.jpg" // Updated to the new direct link
          alt="Sachin Yadav"
          width={200}
          height={200}
          className="rounded-full shadow-2xl border-4 border-primary object-cover animate-float"
          data-ai-hint="profile picture" // Kept the hint, can be removed if image is final
        />
         <div 
          className="absolute -top-5 -left-5 w-16 h-16 rounded-full bg-accent opacity-50 animate-float" 
          style={{animationDelay: '0.5s'}}
        />
        <div 
          className="absolute -bottom-5 -right-5 w-20 h-20 rounded-lg bg-secondary opacity-40 animate-float" 
          style={{animationDelay: '1s', transform: 'rotate(45deg)'}}
        />
      </div>

      <h1 className="text-5xl md:text-7xl font-extrabold mb-4">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
          {resumeData.name}
        </span>
      </h1>
      <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl">
        {resumeData.title}. Aspiring engineer with a passion for technology, AI, and problem-solving. Currently pursuing minors in Computer Science and AI & Data Science.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/projects" passHref>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            View My Projects <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        <div className="p-6 border border-border rounded-lg shadow-lg hover:shadow-primary/20 transition-shadow duration-300 animate-float" style={{animationDelay: '0.2s'}}>
          <h3 className="text-2xl font-semibold text-primary mb-2">Innovative Projects</h3>
          <p className="text-muted-foreground">Explore a diverse range of projects showcasing my skills in AI, engineering, and software development.</p>
        </div>
        <div className="p-6 border border-border rounded-lg shadow-lg hover:shadow-accent/20 transition-shadow duration-300 animate-float" style={{animationDelay: '0.4s'}}>
          <h3 className="text-2xl font-semibold text-accent mb-2">AI-Powered Tools</h3>
          <p className="text-muted-foreground">Discover helpful AI utilities designed for students and professionals in the AI Lab.</p>
        </div>
        <div className="p-6 border border-border rounded-lg shadow-lg hover:shadow-primary/20 transition-shadow duration-300 animate-float" style={{animationDelay: '0.6s'}}>
          <h3 className="text-2xl font-semibold text-primary mb-2">Academic Excellence</h3>
          <p className="text-muted-foreground">Learn about my academic journey, achievements, and dual minor specialization.</p>
        </div>
      </div>
    </div>
  );
}
