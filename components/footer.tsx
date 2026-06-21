export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-10 sm:flex-row sm:px-6">
        <span className="text-lg font-bold tracking-tight text-gradient">EF</span>
        <p className="font-mono text-xs text-muted-foreground">
          © {year} Enrique Ferreiro
        </p>
        <p className="font-mono text-xs text-muted-foreground">
          Built with Next.js + Vercel
        </p>
      </div>
    </footer>
  )
}
