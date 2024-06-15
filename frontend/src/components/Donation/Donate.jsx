import React from 'react';

const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
    {children}
  </label>
);

const Input = ({ id, type = 'text', placeholder }) => (
  <input
    id={id}
    type={type}
    placeholder={placeholder}
    className="block w-full border py-2 px-2 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
  />
);

const Button = ({ type, className, children }) => (
  <button
    type={type}
    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${className}`}
  >
    {children}
  </button>
);

const Donate = () => {
  return (
    <>
    <section className=" py-12 px-4 md:px-6 md:py-24 ">
      <div className="container mx-auto max-w-3xl space-y-6">
        <div>
          <h2 className="text-5xl font-libre-franklin font-bold mb-2">Donate Food</h2>
          <p className="text-gray-600">Help reduce food waste by donating your surplus food to those in need.</p>
        </div>
        <form className="grid gap-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="food-type">Food Type</Label>
              <Input id="food-type" placeholder="Enter food type" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input id="quantity" placeholder="Enter quantity" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="Enter location" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pickup-time">Pickup Time</Label>
              <Input id="pickup-time" type="datetime-local" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
            <Label htmlFor="pickup-time">Expiry Date</Label>
            <Input id="pickup-time" type="datetime-local" />
            </div>
            <div className="grid gap-2">
            <Label htmlFor="photos">Photos</Label>
            <Input id="photos" type="file" multiple />
          </div>
          </div>
          <Button type="submit" className="justify-self-start">
            Donate Food
          </Button>
        </form>
      </div>
    </section>
    </>
  );
};

export default Donate;
