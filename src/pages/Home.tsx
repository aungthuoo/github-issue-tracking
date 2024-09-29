import * as React from 'react';


export const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 max-w-sm bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900">Hello, Tailwind CSS!</h1>
        <p className="mt-4 text-gray-600">
          You are now using React.js with TypeScript and Tailwind CSS.
        </p>
      </div>
    </div>
  );
};
