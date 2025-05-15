
"use client"; 

import { useState } from 'react';
import { resumeData, type ProjectEntry } from '@/lib/resume-data';
import ProjectCard from '@/components/project-card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Tag } from 'lucide-react';

export default function ProjectsPage() {
  const techProjects = resumeData.projects.filter(p => p.category === 'tech');
  const managerialProjects = resumeData.projects.filter(p => p.category === 'managerial');

  const [selectedProject, setSelectedProject] = useState<ProjectEntry | null>(null);

  const handleViewDetails = (project: ProjectEntry) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  }

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-5xl font-extrabold mb-3">
          My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Projects</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A showcase of my technical and managerial endeavors. Click on a project card to view details.
        </p>
      </header>

      <Accordion type="single" collapsible defaultValue="technical" className="w-full">
        <AccordionItem value="technical">
          <AccordionTrigger className="text-2xl font-semibold hover:no-underline">
            Technical Projects
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {techProjects.map((project) => (
                <ProjectCard 
                  key={project.title} 
                  project={project}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="managerial">
          <AccordionTrigger className="text-2xl font-semibold hover:no-underline">
            Managerial Projects
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {managerialProjects.map((project) => (
                <ProjectCard 
                  key={project.title} 
                  project={project} 
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {selectedProject && (
        <Dialog open={!!selectedProject} onOpenChange={(isOpen) => { if (!isOpen) handleCloseModal(); }}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col">
            <DialogHeader>
              <DialogTitle className="text-2xl text-primary">{selectedProject.title}</DialogTitle>
              <div className="flex items-center text-sm text-muted-foreground pt-1">
                <CalendarDays className="h-4 w-4 mr-2" /> {selectedProject.duration}
                <Badge variant={selectedProject.category === 'tech' ? 'default' : 'secondary'} className="capitalize bg-accent text-accent-foreground ml-4">
                  {selectedProject.category}
                </Badge>
              </div>
            </DialogHeader>
            <div className="py-4 overflow-y-auto flex-grow">
              <DialogDescription className="text-base text-foreground/90">
                <ul className="list-disc list-inside space-y-2">
                  {selectedProject.description.map((desc, index) => (
                    <li key={index}>{desc}</li>
                  ))}
                </ul>
              </DialogDescription>
              
              {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold text-lg mb-2 flex items-center">
                    <Tag className="h-5 w-5 mr-2 text-primary" />
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-sm">{tech}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
