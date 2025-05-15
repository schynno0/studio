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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { summarizeTopic, SummarizeTopicInput, SummarizeTopicOutput } from "@/ai/flows/summarize-complex-topics";
import { Loader2 } from "lucide-react";

const topicSummarizerSchema = z.object({
  topic: z.string().min(10, { message: "Topic must be at least 10 characters." }),
  userPreferences: z.string().optional(),
});

type TopicSummarizerFormValues = z.infer<typeof topicSummarizerSchema>;

export default function TopicSummarizerTool() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);

  const form = useForm<TopicSummarizerFormValues>({
    resolver: zodResolver(topicSummarizerSchema),
    defaultValues: {
      topic: "",
      userPreferences: "",
    },
  });

  async function onSubmit(data: TopicSummarizerFormValues) {
    setIsLoading(true);
    setSummary(null);
    try {
      const input: SummarizeTopicInput = {
        topic: data.topic,
        userPreferences: data.userPreferences || undefined,
      };
      const result: SummarizeTopicOutput = await summarizeTopic(input);
      setSummary(result.summary);
      toast({
        title: "Summary Generated!",
        description: "The AI has provided a summary for your topic.",
      });
    } catch (error) {
      console.error("Error summarizing topic:", error);
      toast({
        title: "Error",
        description: "Failed to generate summary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl">Topic Summarizer</CardTitle>
        <CardDescription>
          Enter a complex topic and any preferences, and let AI generate a simplified summary for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Complex Topic</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the complex topic here..." {...field} rows={5} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userPreferences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Preferences (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Keep it under 200 words, focus on applications..." {...field} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Summarize Topic
            </Button>
          </form>
        </Form>

        {summary && (
          <Card className="mt-8 bg-secondary/30">
            <CardHeader>
              <CardTitle>AI Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="whitespace-pre-wrap text-foreground/90 bg-background/50 p-4 rounded-md font-sans text-sm">{summary}</pre>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
