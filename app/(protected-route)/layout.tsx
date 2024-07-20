import { Nav } from "@/components/common/nav"
import { ProtectedRoute } from "@/components/common/protected-route"

export default function Layout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <Nav />
      {children}
    </ProtectedRoute>
  )
}