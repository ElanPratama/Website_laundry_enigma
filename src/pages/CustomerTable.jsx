import React from 'react';

const CustomerTable = ({
    userData,
    showCreateCustomerForm,
    setShowCreateCustomerForm,
    name,
    setName,
    phoneNumber,
    setPhoneNumber,
    address,
    setAddress,
    handleCreateCustomer,
    handleDeleteCustomer
}) => (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
        <button
            className="bg-green-500 text-white px-4 py-2 rounded mb-4"
            onClick={() => setShowCreateCustomerForm(true)}
        >
            Create Customer
        </button>
        
        {showCreateCustomerForm && (
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="border p-2 mb-2 w-full"
                />
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                    onClick={handleCreateCustomer}
                >
                    Submit
                </button>
                <button
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                    onClick={() => setShowCreateCustomerForm(false)}
                >
                    Cancel
                </button>
            </div>
        )}
        
        {userData.length > 0 ? (
            <table className="w-full table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Phone Number</th>
                        <th className="px-4 py-2">Address</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map((user) => (
                        <tr key={user.id}>
                            <td className="border px-4 py-2">{user.name}</td>
                            <td className="border px-4 py-2">{user.phoneNumber}</td>
                            <td className="border px-4 py-2">{user.address}</td>
                            <td className="border px-4 py-2">
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                    onClick={() => handleDeleteCustomer(user.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ) : (
            <p className="text-center mt-4">No customers available.</p>
        )}
    </div>
);

export default CustomerTable;
