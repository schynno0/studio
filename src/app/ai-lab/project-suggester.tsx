
"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { suggestProjects, SuggestProjectsInput, SuggestProjectsOutput, ProjectSuggestion } from "@/ai/flows/suggest-projects-flow";
import { Loader2, Lightbulb, TerminalSquare, Layers } from "lucide-react";
import * as z from "zod"; // Import z directly for form schema

// Define the Zod schema for the form within the client component
const projectSuggesterFormSchema = z.object({
  resumeText: z.string().min(50, { message: "Resume/skills text must be at least 50 characters." }),
  interests: z.string().optional(),
  projectCount: z.number().min(1).max(5).default(3).optional(),
});

type ProjectSuggesterFormValues = z.infer<typeof projectSuggesterFormSchema>;


export default function ProjectSuggesterTool() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<ProjectSuggestion[] | null>(null);

  const form = useForm<ProjectSuggesterFormValues>({
    resolver: zodResolver(projectSuggesterFormSchema), // Use the locally defined schema
    defaultValues: {
      resumeText: "",
      interests: "",
      projectCount: 3,
    },
  });

  async function onSubmit(data: ProjectSuggesterFormValues) {
    setIsLoading(true);
    setSuggestions(null);
    try {
      // The 'data' object already matches SuggestProjectsInput type structure
      // Ensure projectCount is a number and provide a default if necessary
      const input: SuggestProjectsInput = {
        ...data,
        interests: data.interests || undefined, // Ensure empty string becomes undefined for optional field
        projectCount: data.projectCount ? Number(data.projectCount) : 3,
      };
      const result: SuggestProjectsOutput = await suggestProjects(input);
      setSuggestions(result.projectSuggestions);
      toast({
        title: "Project Ideas Generated!",
        description: "The AI has suggested some project ideas for you.",
      });
    } catch (error) {
      console.error("Error suggesting projects:", error);
      toast({
        title: "Error",
        description: "Failed to generate project ideas. Please try again. " + (error instanceof Error ? error.message : ""),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const getDifficultyBadgeVariant = (difficulty?: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (difficulty?.toLowerCase()) {
      case "beginner":
        return "default"; 
      case "intermediate":
        return "secondary"; 
      case "advanced":
        return "destructive"; 
      default:
        return "outline";
    }
  };


  return (
    <Card className="max-w-3xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl">AI Project Suggester</CardTitle>
        <CardDescription>
          Provide your resume/skills and optional interests, and let AI brainstorm project ideas for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="resumeText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resume / Skills Summary</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Paste your resume text or a summary of your skills and experience..." {...field} rows={10} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="interests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interests (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Web Development, Machine Learning, Game Design" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Suggestions (1-5)</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" max="5" placeholder="Default: 3" {...field} 
                           onChange={e => field.onChange(e.target.value ? parseInt(e.target.value,10) : undefined)}
                           value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Suggest Projects
            </Button>
          </form>
        </Form>

        {suggestions && suggestions.length > 0 && (
          <div className="mt-8 space-y-6">
            <h2 className="text-xl font-semibold text-primary">Project Ideas:</h2>
            {suggestions.map((project, index) => (
              <Card key={index} className="bg-secondary/30">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2 text-primary" />
                    {project.title}
                  </CardTitle>
                  <CardDescription>
                     <Badge variant={getDifficultyBadgeVariant(project.difficulty)} className="capitalize mt-1">
                        {project.difficulty}
                      </Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/90 mb-3">{project.description}</p>
                  
                  <div className="flex items-center mb-1">
                     <TerminalSquare className="h-4 w-4 mr-2 text-muted-foreground"/> 
                     <h4 className="font-semibold text-sm">Suggested Technologies:</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.suggestedTechnologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline">{tech}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
         {suggestions && suggestions.length === 0 && !isLoading && (
            <Card className="mt-8 bg-secondary/30">
                <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">No project suggestions were generated. Try refining your input.</p>
                </CardContent>
            </Card>
         )}

      </CardContent>
    </Card>
  );
}
