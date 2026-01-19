// Simple skeleton component replacement for MUI Skeleton
export const Skeleton = ({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div 
      className={`animate-pulse bg-gray-200 rounded ${className}`} 
      {...props}
    />
  );
};

export const Box = ({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={className} {...props}>{children}</div>;
};

export default Skeleton;

