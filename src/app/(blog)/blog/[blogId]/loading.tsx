export default function loading(){
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 rounded-md max-w-7xl mt-10 mb-6 w-3/4"></div>
        <div className="bg-gray-200 max-w-6xl max-h-96 rounded-md mb-6"></div>
        <div className="h-8 bg-gray-200 rounded-md mb-4 w-1/4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded-md w-full"></div>
          <div className="h-4 bg-gray-200 rounded-md w-full"></div>
          <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded-md w-full"></div>
          <div className="h-4 bg-gray-200 rounded-md w-5/6"></div>
        </div>
      </div>
    </div>
  )
}
