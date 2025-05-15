
"use client";

import type { ProjectEntry } from '@/lib/resume-data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: ProjectEntry;
  onViewDetails: (project: ProjectEntry) => void;
}

export default function ProjectCard({ project, onViewDetails }: ProjectCardProps) {
  return (
    <Card 
      className="flex flex-col h-full shadow-lg hover:shadow-primary/10 transition-shadow duration-300 cursor-pointer"
      onClick={() => onViewDetails(project)}
    >
      <CardHeader>
        <div>
          <CardTitle className="text-xl md:text-2xl text-primary">{project.title}</CardTitle>
          <CardDescription className="flex items-center text-muted-foreground mt-1">
            <CalendarDays className="h-4 w-4 mr-2" /> {project.duration}
          </CardDescription>
          <div className="mt-2">
            <Badge variant={project.category === 'tech' ? 'default' : 'secondary'} className="capitalize bg-accent text-accent-foreground">
              {project.category}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      {/* Full description will be shown in the modal, not here */}
      {/* CardContent can be used for a very brief summary if needed in the future, or removed */}
      <CardContent className="flex-grow pt-0">
        {/* Optionally, a very short snippet of the description could go here, or just keep it for spacing */}
        <p className="text-sm text-muted-foreground line-clamp-3">
          {project.description[0]} {/* Show first line of description as a teaser */}
        </p>
      </CardContent>
      
      <CardFooter className={cn("flex flex-wrap gap-2 pt-4 mt-auto border-t")}>
         <Tag className="h-4 w-4 mr-1 text-muted-foreground" />
        {project.technologies && project.technologies.length > 0 ? (
          project.technologies.map((tech, index) => (
            <Badge key={index} variant="outline" className="text-sm">{tech}</Badge>
          ))
        ) : (
          <span className="text-sm text-muted-foreground">No specific technologies listed.</span>
        )}
      </CardFooter>
    </Card>
  );
}
