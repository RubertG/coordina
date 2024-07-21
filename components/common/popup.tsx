export const Popup = ({ 
  children, className 
}: { 
  children: React.ReactNode 
  className?: string
}) => {
  return (
    <section className={`fixed top-0 left-0 z-50 w-full h-full flex flex-col items-center justify-center bg-gray-950/95 entry ${className} gap-3`}>
      {
        children
      }
    </section>
  )
}