export default function LoadingSkeleton({ type = 'card', count = 1 }) {
  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div className="card p-4">
            <div className="skeleton h-8 w-3/4 mb-4"></div>
            <div className="skeleton h-4 w-full mb-2"></div>
            <div className="skeleton h-4 w-5/6 mb-2"></div>
            <div className="skeleton h-4 w-4/6"></div>
          </div>
        );
      case 'text':
        return (
          <div className="space-y-2">
            <div className="skeleton h-6 w-3/4"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-5/6"></div>
          </div>
        );
      case 'avatar':
        return (
          <div className="flex items-center space-x-4">
            <div className="skeleton h-12 w-12 rounded-full"></div>
            <div className="space-y-2">
              <div className="skeleton h-4 w-24"></div>
              <div className="skeleton h-3 w-16"></div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid gap-4">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div key={index}>{renderSkeleton()}</div>
        ))}
    </div>
  );
} 