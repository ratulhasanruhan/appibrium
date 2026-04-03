export function RouteFallback() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"
      role="status"
      aria-busy="true"
      aria-label="Loading page"
    >
      <div className="h-9 w-9 rounded-full border-2 border-gray-300 border-t-[#1DD1A1] dark:border-gray-600 dark:border-t-[#1DD1A1] animate-spin" />
    </div>
  )
}
