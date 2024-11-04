import React, { useState } from "react";
import { axiosInstance } from "../../lib/axios"; // Sesuaikan path ini dengan yang benar

const CreateCustomer = ({
  HandleDataCustomer,
  setResponseMessage,
  setUserData,
  setShowCreateCustomerForm,
}) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const handleCreateCustomer = async () => {
    if (!name || !phoneNumber || !address) {
      setResponseMessage("Please fill out all fields.");
      return;
    }

    try {
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axiosInstance.post(
        "/customers",
        { name, phoneNumber, address },
        { headers }
      );

      if (response.status === 201) {
        setResponseMessage("Customer created successfully!");
        setUserData((prevData) => [...prevData, response.data.data]);
        HandleDataCustomer();
        setShowCreateCustomerForm(false); // Tutup modal setelah berhasil
      }
    } catch (error) {
      console.error("Error creating customer:", error.response);
      setResponseMessage(
        `Failed to create customer: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
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
    </div>
  );
};

export default CreateCustomer;



// import React from 'react'


// const CreateCustomer = (HandleDataCustomer, setResponseMessage, setUserData) => {

//     const handleCreateCustomer = async (name, phoneNumber, address) => {
//         if (!name || !phoneNumber || !address) {
//             setResponseMessage('Please fill out all fields.');
//             return;
//         }
    
//         try {
//             const headers = { Authorization: `Bearer ${token}` };
//             const response = await axiosInstance.post('/customers', { name, phoneNumber, address }, { headers });
    
//             if (response.status === 201) {
//                 setResponseMessage('Customer created successfully!');
//                 setUserData(prevData => [...prevData, response.data.data]);
//                 HandleDataCustomer()
//             }
//         } catch (error) {
//             console.error('Error creating customer:', error.response);
//             setResponseMessage(`Failed to create customer: ${error.response?.data?.message || error.message}`);
//         }

//   return (
//     <div>
//       <div className="bg-white p-4 rounded-lg shadow mb-6">

        
//             <div className="mb-4">
//                 <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 mb-2 w-full" />
//                 <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="border p-2 mb-2 w-full" />
//                 <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} className="border p-2 mb-2 w-full" />
//                 <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={handleCreateCustomer}>Submit</button>
//                 <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setShowCreateCustomerForm(false)}>Cancel</button>
//             </div>
        

//         <table className="w-full table-auto">
//             <thead>
//                 <tr className="bg-gray-200">
//                     <th className="px-4 py-2 text-center">#</th>
//                     <th className="px-4 py-2 text-center">Name</th>
//                     <th className="px-4 py-2 text-center">Phone</th>
//                     <th className="px-4 py-2 text-center">Address</th>
//                     <th className="px-4 py-2 text-center">Action</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {userData.length > 0 ? (
//                     userData.map((user, index) => (
//                         <tr key={user.id} className="border-b">
//                             <td className="px-4 py-2 text-center">{index + 1}</td>
//                             <td className="px-4 py-2 text-center">{user.name}</td>
//                             <td className="px-4 py-2 text-center">{user.phoneNumber}</td>
//                             <td className="px-4 py-2 text-center">{user.address}</td>
//                             <td className="px-4 py-2 text-center">
//                                 <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
//                                 <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDeleteCustomer(user.id)}>Delete</button>
//                             </td>
//                         </tr>
//                     ))
//                 ) : (
//                     <tr>
//                         <td colSpan="5" className="px-4 py-2 text-center">No customers found</td>
//                     </tr>
//                 )}
//             </tbody>
//         </table>
//     </div>
//     </div>
//   )
// }
// }

// export default CreateCustomer;
