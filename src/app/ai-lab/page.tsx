
import CodeExplainerTool from "./code-explainer";
import TopicSummarizerTool from "./topic-summarizer";
import ResumeGraderTool from "./resume-grader";
import ProjectSuggesterTool from "./project-suggester";
import CodeGeneratorTool from "./code-generator";
import { Code, Lightbulb, FileScan, Sparkles, Code2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const aiTools = [
  { value: "code-explainer", label: "Code Explainer", icon: Code, component: <CodeExplainerTool /> },
  { value: "topic-summarizer", label: "Topic Summarizer", icon: Lightbulb, component: <TopicSummarizerTool /> },
  { value: "resume-grader", label: "Resume Grader", icon: FileScan, component: <ResumeGraderTool /> },
  { value: "project-suggester", label: "Project Ideas", icon: Sparkles, component: <ProjectSuggesterTool /> },
  { value: "code-generator", label: "Code Generator", icon: Code2, component: <CodeGeneratorTool /> },
];

export default function AILabPage() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-5xl font-extrabold mb-3">
          AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Lab</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore AI-powered tools designed to assist students and professionals. Select a tool from the list below.
        </p>
      </header>

      <Tabs defaultValue={aiTools[0].value} className="w-full">
        <div className="flex flex-col md:flex-row gap-x-6 gap-y-4">
          <TabsList 
            className="
              flex flex-col space-y-1 
              w-full md:w-auto md:min-w-[200px] lg:min-w-[250px] xl:min-w-[280px]
              p-2 h-fit self-start shrink-0
              rounded-lg border bg-card shadow-sm
            "
            aria-orientation="vertical"
          >
            {aiTools.map(tool => (
              <TabsTrigger 
                key={tool.value} 
                value={tool.value} 
                className="
                  w-full justify-start px-4 py-2.5 
                  text-sm font-normal
                  hover:bg-muted 
                  data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:font-medium data-[state=active]:shadow-sm
                  transition-colors duration-150 rounded-md
                "
              >
                <tool.icon className="mr-3 h-5 w-5" /> {tool.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="flex-grow min-w-0">
            {aiTools.map(tool => (
              <TabsContent key={tool.value} value={tool.value} className="mt-0">
                {tool.component}
              </TabsContent>
            ))}
          </div>
        </div>
      </Tabs>
    </div>
  );
}
