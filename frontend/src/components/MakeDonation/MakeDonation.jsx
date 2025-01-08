import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { login } from '../Redux/userSlice';
import Header from '../Home/Header';

const MakeDonation = () => {
    const user = useSelector(state => state.user);
    const id = user.user._id;
    console.log('frontend', id);

    const [formData, setFormData] = useState({
        foodType: '',
        quantity: '',
        expirationDate: '',
        pickupLocation: '',
        status: 'available',
        image: '',
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    };
    const token=localStorage.getItem('token');
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        
        try {
            let imageUrl = '';

            if (imageFile) {
                const cloudName = 'dpaiv8jqy'; // replace with your Cloudinary cloud name
                const uploadPreset = 'hgwj7soa'; // replace with your Cloudinary upload preset

                const formData = new FormData();
                formData.append('file', imageFile);
                formData.append('upload_preset', uploadPreset);

                const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, formData);
                imageUrl = response.data.secure_url;
            }

            const donationData = {
                ...formData,
                image: imageUrl,
            };

            const response = await axios.post(`http://localhost:5000/api/donate/${id}`, donationData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            setSuccess('Donation submitted successfully!');
            setError(null);
            console.log(response.data);
        } catch (err) {
            setSuccess(null);
            setError('Error submitting donation. Please try again.');
            console.error(err);
        }
    };

    return (
        <>
        <Header />
        <section className="bg-white py-12 md:py-20" id="donate">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Make a Donation</h2>
                <div className="bg-white rounded-lg shadow-md p-8">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="grid gap-2">
                                <label htmlFor="foodType" className="block text-sm font-medium text-gray-700">Food Type</label>
                                <input
                                    id="foodType"
                                    type="text"
                                    value={formData.foodType}
                                    onChange={handleChange}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Enter food type"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                                <input
                                    id="quantity"
                                    type="number"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Enter quantity"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">Expiration Date</label>
                                <input
                                    id="expirationDate"
                                    type="date"
                                    value={formData.expirationDate}
                                    onChange={handleChange}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700">Pickup Location</label>
                                <input
                                    id="pickupLocation"
                                    type="text"
                                    value={formData.pickupLocation}
                                    onChange={handleChange}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Enter pickup location"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                                <select
                                    id="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    required
                                >
                                    <option value="available">Available</option>
                                    <option value="claimed">Claimed</option>
                                    <option value="picked_up">Picked Up</option>
                                </select>
                            </div>
                            <div className="grid gap-2">
                                <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload Image</label>
                                <input
                                    id="image"
                                    type="file"
                                    onChange={handleFileChange}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    accept="image/*"
                                />
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button
                                type="submit"
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow-sm"
                            >
                                Donate
                            </button>
                        </div>
                    </form>
                    {error && <div className="mt-4 text-red-500">{error}</div>}
                    {success && <div className="mt-4 text-green-500">{success}</div>}
                </div>
            </div>
        </section>
        </>
    );
};

export default MakeDonation;
