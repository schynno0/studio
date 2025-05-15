import { resumeData, EducationEntry, SkillCategory } from '@/lib/resume-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Lightbulb, BookOpen } from 'lucide-react';

const SectionCard: React.FC<{ title: string; icon: React.ElementType; children: React.ReactNode; className?: string }> = ({ title, icon: Icon, children, className }) => (
  <Card className={`shadow-lg hover:shadow-primary/10 transition-shadow duration-300 ${className}`}>
    <CardHeader className="flex flex-row items-center space-x-3 pb-3">
      <Icon className="h-6 w-6 text-primary" />
      <CardTitle className="text-2xl">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      {children}
    </CardContent>
  </Card>
);

const EducationItem: React.FC<{ entry: EducationEntry }> = ({ entry }) => (
  <div className="mb-4 p-4 border-l-4 border-primary bg-secondary/20 rounded-r-md">
    <h3 className="text-lg font-semibold text-primary-foreground">{entry.examination}</h3>
    <p className="text-muted-foreground">{entry.institute} ({entry.university})</p>
    <p className="text-sm text-muted-foreground">{entry.year} | {entry.grade}</p>
  </div>
);

const SkillBadge: React.FC<{ skill: string }> = ({ skill }) => (
  <Badge variant="secondary" className="mr-2 mb-2 text-sm py-1 px-3 bg-primary/20 text-primary-foreground hover:bg-primary/30 transition-colors">{skill}</Badge>
);

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-3">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{resumeData.name}</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {resumeData.title}
        </p>
        <p className="text-lg text-muted-foreground mt-2">
          {resumeData.auxiliaryDegree}
        </p>
      </header>

      <SectionCard title="Education" icon={GraduationCap}>
        {resumeData.education.map((edu, index) => (
          <EducationItem key={index} entry={edu} />
        ))}
      </SectionCard>

      <SectionCard title="Technical Skills" icon={Lightbulb}>
        {resumeData.technicalSkills.map((category: SkillCategory, index: number) => (
          <div key={index} className="mb-4">
            <h3 className="text-lg font-semibold mb-2 text-primary">{category.name}</h3>
            <div className="flex flex-wrap">
              {category.skills.map((skill, skillIndex) => (
                <SkillBadge key={skillIndex} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </SectionCard>

      <SectionCard title="Relevant Coursework" icon={BookOpen}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {Object.entries(resumeData.relevantCoursework).map(([category, courses]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-2 text-primary">{category}</h3>
              <ul className="list-disc list-inside space-y-1 text-foreground/90">
                {courses.map((course, index) => (
                  <li key={index}>{course}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
