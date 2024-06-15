import React from 'react';
import { CiFilter } from "react-icons/ci";

const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
    {children}
  </label>
);

const Input = ({ id, type = 'text', placeholder, className }) => (
  <input
    id={id}
    type={type}
    placeholder={placeholder}
    className={`block w-full border py-2 px-2 rounded-md border-gray-300 shadow-sm  sm:text-sm ${className}`}
  />
);

const Button = ({ type = 'button', variant = 'solid', className, children }) => {
  const baseClasses = 'inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    solid: 'text-white bg-green-600 hover:bg-green-700 border-transparent focus:ring-green-500',
    outline: 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50 focus:ring-green-500'
  };
  return (
    <button
      type={type}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const Card = ({ imageUrl, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    {imageUrl && (
      <div className="mb-4">
        <img src={imageUrl} alt="Food" className="w-full h-40 object-cover rounded-md" />
      </div>
    )}
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="mb-4">
    {children}
  </div>
);

const CardTitle = ({ children }) => (
  <h3 className="text-lg font-bold">{children}</h3>
);

const CardDescription = ({ children }) => (
  <p className="text-gray-600">{children}</p>
);

const CardContent = ({ children }) => (
  <div>
    {children}
  </div>
);

const ReceiveFoodSection = () => {
  return (
    <section className="bg-white py-8 px-4 md:px-6">
      <div className="container mx-auto max-w-3xl space-y-6">
        <div>
          <h2 className="text-3xl font-libre-franklin font-bold mb-2">Receive Food</h2>
          <p className="text-gray-600">Browse available food donations and claim them for pickup.</p>
        </div>
        <div className="grid gap-4">
          <div className="flex items-center mb-2 gap-2">
            <Input type="search" placeholder="Search donations..." className="flex-1" />
            <Button variant="outline">
              <CiFilter size={20} />
            </Button>
          </div>
          <div className="grid gap-4">
          <Card imageUrl="https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
              <CardHeader>
                <CardTitle>Apples</CardTitle>
                <CardDescription>20 lbs available</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-600">Location: Uptown</p>
                    <p className="text-gray-600">Pickup Time: 3pm</p>
                  </div>
                  <Button>Claim</Button>
                </div>
              </CardContent>
            </Card>
            <Card imageUrl="https://images.unsplash.com/photo-1590234245591-d63394021d19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxvYWYlMjBvZiUyMGJyZWFkfGVufDB8fDB8fHww">
              <CardHeader>
                <CardTitle>Bread Loaves</CardTitle>
                <CardDescription>10 loaves available</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-600">Location: Downtown</p>
                    <p className="text-gray-600">Pickup Time: 5pm</p>
                  </div>
                  <Button>Claim</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReceiveFoodSection;
