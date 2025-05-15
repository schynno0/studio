"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { explainCode, ExplainCodeInput, ExplainCodeOutput } from "@/ai/flows/explain-code";
import { Loader2 } from "lucide-react";

const codeExplainerSchema = z.object({
  codeSnippet: z.string().min(10, { message: "Code snippet must be at least 10 characters." }),
  programmingLanguage: z.string().min(1, { message: "Programming language is required." }),
  userLevel: z.enum(["Beginner", "Intermediate", "Advanced"], { required_error: "User level is required." }),
});

type CodeExplainerFormValues = z.infer<typeof codeExplainerSchema>;

export default function CodeExplainerTool() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);

  const form = useForm<CodeExplainerFormValues>({
    resolver: zodResolver(codeExplainerSchema),
    defaultValues: {
      codeSnippet: "",
      programmingLanguage: "",
      userLevel: "Beginner",
    },
  });

  async function onSubmit(data: CodeExplainerFormValues) {
    setIsLoading(true);
    setExplanation(null);
    try {
      const input: ExplainCodeInput = {
        codeSnippet: data.codeSnippet,
        programmingLanguage: data.programmingLanguage,
        userLevel: data.userLevel,
      };
      const result: ExplainCodeOutput = await explainCode(input);
      setExplanation(result.explanation);
      toast({
        title: "Explanation Generated!",
        description: "The AI has provided an explanation for your code.",
      });
    } catch (error) {
      console.error("Error explaining code:", error);
      toast({
        title: "Error",
        description: "Failed to generate explanation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl">Code Explainer</CardTitle>
        <CardDescription>
          Paste your code snippet, specify the language and your experience level, and let AI explain it to you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="codeSnippet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code Snippet</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Paste your code here..." {...field} rows={8} className="font-mono text-sm"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="programmingLanguage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Programming Language</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Python, JavaScript, Java" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Experience Level</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Explain Code
            </Button>
          </form>
        </Form>

        {explanation && (
          <Card className="mt-8 bg-secondary/30">
            <CardHeader>
              <CardTitle>AI Explanation</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="whitespace-pre-wrap text-foreground/90 bg-background/50 p-4 rounded-md font-sans text-sm">{explanation}</pre>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
