import { cn } from './../lib/utils';

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathName = window.location.pathname
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <a
        href="/dashboard"
        className={cn("text-muted-foreground text-sm font-medium transition-colors hover:text-primary", pathName == "/dashboard" ? "dark:text-white text-black" : "")}
      >
        Dashboard
      </a>
      <a
        href="/settings"
        className={cn("text-muted-foreground text-sm font-medium transition-colors hover:text-primary", pathName == "/settings" ? "dark:text-white text-black" : "")}
      >
        Settings
      </a>
    </nav>
  )
}
