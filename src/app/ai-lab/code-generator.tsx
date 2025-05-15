
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
import { useToast } from "@/hooks/use-toast";
import { generateCode, GenerateCodeInput, GenerateCodeOutput } from "@/ai/flows/generate-code-flow";
import { Loader2, Copy } from "lucide-react";

const codeGeneratorSchema = z.object({
  prompt: z.string().min(10, { message: "Prompt must be at least 10 characters." }),
  language: z.string().min(1, { message: "Programming language is required." }),
});

type CodeGeneratorFormValues = z.infer<typeof codeGeneratorSchema>;

export default function CodeGeneratorTool() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);

  const form = useForm<CodeGeneratorFormValues>({
    resolver: zodResolver(codeGeneratorSchema),
    defaultValues: {
      prompt: "",
      language: "python",
    },
  });

  async function onSubmit(data: CodeGeneratorFormValues) {
    setIsLoading(true);
    setGeneratedCode(null);
    try {
      const input: GenerateCodeInput = data;
      const result: GenerateCodeOutput = await generateCode(input);
      setGeneratedCode(result.generatedCode);
      toast({
        title: "Code Generated!",
        description: "The AI has generated the code based on your prompt.",
      });
    } catch (error) {
      console.error("Error generating code:", error);
      toast({
        title: "Error",
        description: "Failed to generate code. Please try again. " + (error instanceof Error ? error.message : String(error)),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleCopyCode = () => {
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode).then(() => {
        toast({ title: "Code Copied!", description: "The generated code has been copied to your clipboard." });
      }).catch(err => {
        toast({ title: "Copy Failed", description: "Could not copy code to clipboard.", variant: "destructive" });
        console.error('Failed to copy code: ', err);
      });
    }
  };

  return (
    <Card className="max-w-3xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl">AI Code Generator</CardTitle>
        <CardDescription>
          Describe the code you need and the programming language, and let AI generate it for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Describe what you want to code</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., a Python function to sort a list of numbers, a React component for a button..." {...field} rows={5} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Programming Language</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Python, JavaScript, Java, C++, HTML" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Generate Code
            </Button>
          </form>
        </Form>

        {generatedCode && (
          <Card className="mt-8 bg-secondary/30">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Generated Code</CardTitle>
              <Button variant="ghost" size="icon" onClick={handleCopyCode} aria-label="Copy code">
                <Copy className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent>
              <pre className="whitespace-pre-wrap text-foreground/90 bg-background/50 p-4 rounded-md font-mono text-sm overflow-x-auto">{generatedCode}</pre>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
