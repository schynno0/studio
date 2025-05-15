
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { gradeResume, GradeResumeInput, GradeResumeOutput } from "@/ai/flows/grade-resume-flow";
import { Loader2, CheckCircle, AlertTriangle } from "lucide-react";
import * as z from "zod"; // Import z directly for form schema

// Define the Zod schema for the form within the client component
const resumeGraderFormSchema = z.object({
  resumeText: z.string().min(100, { message: "Resume text must be at least 100 characters." }),
  targetDomain: z.string().min(3, { message: "Target domain must be at least 3 characters."}),
});


type ResumeGraderFormValues = z.infer<typeof resumeGraderFormSchema>;

export default function ResumeGraderTool() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GradeResumeOutput | null>(null);

  const form = useForm<ResumeGraderFormValues>({
    resolver: zodResolver(resumeGraderFormSchema), // Use the locally defined schema
    defaultValues: {
      resumeText: "",
      targetDomain: "",
    },
  });

  async function onSubmit(data: ResumeGraderFormValues) {
    setIsLoading(true);
    setResult(null);
    try {
      // The 'data' object already matches GradeResumeInput type structure
      const output: GradeResumeOutput = await gradeResume(data);
      setResult(output);
      toast({
        title: "Resume Graded!",
        description: "The AI has provided feedback on your resume.",
      });
    } catch (error) {
      console.error("Error grading resume:", error);
      toast({
        title: "Error",
        description: "Failed to grade resume. Please try again. " + (error instanceof Error ? error.message : ""),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="max-w-3xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl">AI Resume Grader</CardTitle>
        <CardDescription>
          Paste your resume text and specify your target domain. The AI will provide a score and feedback.
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
                  <FormLabel>Resume Text</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Paste your full resume text here..." {...field} rows={15} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="targetDomain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Domain</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Software Engineering, Data Science, Product Management" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Grade My Resume
            </Button>
          </form>
        </Form>

        {result && (
          <Card className="mt-8 bg-secondary/30">
            <CardHeader>
              <CardTitle>AI Feedback</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-primary">Overall Score: {result.overallScore}/100</h3>
                <Progress value={result.overallScore} className="w-full" />
              </div>

              <div>
                <h3 className="text-lg font-semibold flex items-center text-primary mb-2">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-500" /> Strengths
                </h3>
                <ul className="list-disc list-inside space-y-1 text-foreground/90 bg-background/50 p-4 rounded-md">
                  {result.strengths.map((strength, index) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold flex items-center text-primary mb-2">
                  <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" /> Areas for Improvement
                </h3>
                <ul className="list-disc list-inside space-y-1 text-foreground/90 bg-background/50 p-4 rounded-md">
                  {result.areasForImprovement.map((area, index) => (
                    <li key={index}>{area}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">Detailed Feedback</h3>
                <pre className="whitespace-pre-wrap text-foreground/90 bg-background/50 p-4 rounded-md font-sans text-sm">{result.detailedFeedback}</pre>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
