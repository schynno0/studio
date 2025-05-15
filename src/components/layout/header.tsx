"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, Briefcase, Mail, Image as ImageIcon, Cpu, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './theme-toggle';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/about', label: 'About Me', icon: User },
  { href: '/projects', label: 'Projects', icon: Briefcase },
  { href: '/gallery', label: 'Gallery', icon: ImageIcon },
  { href: '/ai-lab', label: 'AI Lab', icon: Cpu },
  { href: '/contact', label: 'Contact Me', icon: Mail },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavLink = ({ href, label, icon: Icon, onClick }: { href: string, label: string, icon: React.ElementType, onClick?: () => void }) => (
    <Link href={href} passHref>
      <Button
        variant="ghost"
        className={cn(
          "justify-start text-foreground hover:bg-accent hover:text-accent-foreground w-full md:w-auto",
          pathname === href ? "bg-accent text-accent-foreground" : ""
        )}
        onClick={onClick}
      >
        <Icon className="mr-2 h-5 w-5" />
        {label}
      </Button>
    </Link>
  );
  

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" passHref>
          <div className="flex items-center space-x-2 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-primary">
              <path d="M12 .602c1.412.015 2.803.164 4.15.443a政策性银行.054 1.054 0 01.837.847c.144.702.24 1.41.284 2.12.074 1.188-.107 2.375-.52 3.507-.21.574-.507 1.11-.877 1.598-1.05 1.383-2.655 2.21-4.38 2.368a4.368 4.368 0 01-.987-.004c-1.726-.158-3.332-.985-4.382-2.368-.37-.488-.667-1.024-.877-1.598-.413-1.132-.594-2.319-.52-3.507.045-.71.14-1.418.285-2.12a1.054 1.054 0 01.837-.847c1.347-.279 2.738-.428 4.15-.443zm6.532 9.823c1.474-.293 2.806-1.012 3.868-2.035.13-.125.25-.257.364-.394a.75.75 0 00-.996-1.122c-.11.09-.216.185-.317.282-1.24 1.21-2.87 2.016-4.658 2.296a.75.75 0 00.613 1.436.54.54 0 00.126-.022zM5.468 10.425c1.474.293 2.806 1.012 3.868 2.035.13.125.25-.257.364.394a.75.75 0 00.996-1.122c-.11-.09-.216-.185-.317-.282-1.24-1.21-2.87-2.016-4.658-2.296a.75.75 0 00-.613 1.436c.036.008.08.017.126.022a.54.54 0 00.234.013zM12 12.042c.993 0 1.934.119 2.791.343a.75.75 0 00.417-1.444c-.9-.233-1.887-.357-2.91-.357a13.535 13.535 0 00-2.91.357.75.75 0 00.416 1.444A12.028 12.028 0 0112 12.042zm0 1.494c-2.322 0-4.492.428-6.364 1.194a.75.75 0 00.444 1.421c1.78-.723 3.845-1.115 5.92-1.115s4.14.392 5.92 1.115a.75.75 0 00.445-1.42c-1.872-.767-4.042-1.195-6.364-1.195zm0 2.987c-3.634 0-6.956.768-9.603 2.125a.75.75 0 00.586 1.365C5.86 19.276 8.94 18.523 12 18.523s6.14.753 8.983 1.49a.75.75 0 00.586-1.365c-2.647-1.357-5.97-2.125-9.57-2.125z" />
            </svg>
            <span className="text-2xl font-bold text-primary">SCHYN</span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
          <ThemeToggle />
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center"> {/* Added flex items-center */}
          <ThemeToggle /> {/* Added for mobile view, outside sheet for persistent visibility */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2"> {/* Added margin */}
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] p-4 bg-background">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-bold text-primary">Menu</span>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon">
                    <X className="h-6 w-6" />
                  </Button>
                </SheetClose>
              </div>
              <nav className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <NavLink key={item.href} {...item} onClick={() => setIsMobileMenuOpen(false)} />
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
