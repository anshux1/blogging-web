export default function page(){
  return (
    <>
      <section className="container mx-auto px-4 py-12 animate-pulse">
        <div className="text-center mb-12">
          <div className="h-4 bg-gray-200 rounded w-24 mx-auto mb-4"></div>
          <div className="h-10 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
        </div>
        <div className="relative aspect-[16/9] max-w-6xl mx-auto md:aspect-[21/9] rounded-lg bg-gray-200 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-300 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 w-full">
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
            <div className="flex gap-2">
              <div className="h-6 bg-gray-300 rounded w-16"></div>
              <div className="h-6 bg-gray-300 rounded w-20"></div>
              <div className="h-6 bg-gray-300 rounded w-24"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
