
interface RequestProps {
  message: string
}
const ErrorComponent: React.FC<RequestProps> = ({message}) => {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Error: {message}</p>
      </div>
    </>
  );
};

export default ErrorComponent;