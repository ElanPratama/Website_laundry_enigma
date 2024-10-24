import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate dari react-router-dom

function Admin() {
    const [userData, setUserData] = useState([]);
    const [productData, setProductData] = useState([]);
    const [transactionData, setTransactionData] = useState([]);
    const [activeTab, setActiveTab] = useState('customers'); // Tab aktif default
    const [showCreateCustomerForm, setShowCreateCustomerForm] = useState(false); // State untuk menampilkan form create customer
    const [showCreateProductForm, setShowCreateProductForm] = useState(false); // State untuk menampilkan form add product
    const [showCreateTransactionForm, setShowCreateTransactionForm] = useState(false); // State untuk menampilkan form add transaction
    const navigate = useNavigate(); // Inisialisasi useNavigate

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        // Cek apakah token ada dan apakah role adalah 'admin'
        if (!token || role !== 'admin') {
            window.location.href = '/login'; // Ganti '/login' dengan path yang sesuai untuk halaman login Anda
            return; // Menghentikan eksekusi lebih lanjut jika tidak ada token atau role tidak sesuai
        }

        // Fetch user data
        const fetchUserData = async () => {
            const sampleUserData = [
                { id: 1, name: 'User 1', phone: '123456789', address: 'Address 1' },
                { id: 2, name: 'User 2', phone: '987654321', address: 'Address 2' },
                { id: 3, name: 'User 3', phone: '456789123', address: 'Address 3' },
            ];
            setUserData(sampleUserData);
        };

        // Fetch product data
        const fetchProductData = async () => {
            const sampleProductData = [
                { id: 1, name: 'Product 1', price: 100, type: 'Type A' },
                { id: 2, name: 'Product 2', price: 200, type: 'Type B' },
                { id: 3, name: 'Product 3', price: 300, type: 'Type C' },
            ];
            setProductData(sampleProductData);
        };

        // Fetch transaction data
        const fetchTransactionData = async () => {
            const sampleTransactionData = [
                { id: 1, customerCode: 'C001', customerName: 'User 1', transactionLabel: 'Transaction 1' },
                { id: 2, customerCode: 'C002', customerName: 'User 2', transactionLabel: 'Transaction 2' },
                { id: 3, customerCode: 'C003', customerName: 'User 3', transactionLabel: 'Transaction 3' },
            ];
            setTransactionData(sampleTransactionData);
        };

        fetchUserData();
        fetchProductData();
        fetchTransactionData();
    }, []);

    function handleLogout() {
        console.log('Logging out...');
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.href = '/';  // Redirect ke halaman utama setelah logout
    }

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white">
                <div className="p-4">
                    <h2 className="text-2xl font-bold">Admin Dashboard</h2>
                </div>
                <ul className="mt-6">
                    <li 
                        className={`p-4 hover:bg-gray-700 cursor-pointer ${activeTab === 'customers' ? 'bg-gray-600' : ''}`}
                        onClick={() => setActiveTab('customers')}
                    >
                        Customers
                    </li>
                    <li 
                        className={`p-4 hover:bg-gray-700 cursor-pointer ${activeTab === 'products' ? 'bg-gray-600' : ''}`}
                        onClick={() => setActiveTab('products')}
                    >
                        Products
                    </li>
                    <li 
                        className={`p-4 hover:bg-gray-700 cursor-pointer ${activeTab === 'transactions' ? 'bg-gray-600' : ''}`}
                        onClick={() => setActiveTab('transactions')}
                    >
                        Transactions
                    </li>
                    <li className="p-4 hover:bg-gray-700 cursor-pointer" onClick={handleLogout}>Logout</li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-gray-100 p-6">
                <h1 className="text-3xl font-bold mb-6">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Data</h1>

                {/* Tabel Data Pelanggan */}
                {activeTab === 'customers' && (
                    <div className="bg-white p-4 rounded-lg shadow mb-6">
                        <button className="bg-green-500 text-white px-4 py-2 rounded mb-4" onClick={() => setShowCreateCustomerForm(true)}>Create Customer</button>
                        
                        {showCreateCustomerForm && (
                            <div className="mb-4 p-4 border rounded">
                                <h3 className="text-lg font-semibold mb-2">Create Customer</h3>
                                <input type="text" placeholder="Name" className="border p-2 mb-2 w-full" />
                                <input type="text" placeholder="Phone" className="border p-2 mb-2 w-full" />
                                <input type="text" placeholder="Address" className="border p-2 mb-2 w-full" />
                                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => {/* Logic to save customer */}}>Save</button>
                                <button className="bg-red-500 text-white px-4 py-2 rounded ml-2" onClick={() => setShowCreateCustomerForm(false)}>Cancel</button>
                            </div>
                        )}

                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="px-4 py-2 text-center">#</th>
                                    <th className="px-4 py-2 text-center">Name</th>
                                    <th className="px-4 py-2 text-center">Phone</th>
                                    <th className="px-4 py-2 text-center">Address</th>
                                    <th className="px-4 py-2 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userData.length > 0 ? (
                                    userData.map((item, index) => (
                                        <tr key={item.id} className="border-b">
                                            <td className="px-4 py-2 text-center">{index + 1}</td>
                                            <td className="px-4 py-2 text-center">{item.name}</td>
                                            <td className="px-4 py-2 text-center">{item.phone}</td>
                                            <td className="px-4 py-2 text-center">{item.address}</td>
                                            <td className="px-4 py-2 text-center">
                                                <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                                                <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4">No data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Tabel Data Produk */}
                {activeTab === 'products' && (
                    <div className="bg-white p-4 rounded-lg shadow mb-6">
                        <button className="bg-green-500 text-white px-4 py-2 rounded mb-4" onClick={() => setShowCreateProductForm(true)}>Add Product</button>
                        
                        {showCreateProductForm && (
                            <div className="mb-4 p-4 border rounded">
                                <h3 className="text-lg font-semibold mb-2">Add Product</h3>
                                <input type="text" placeholder="Product Name" className="border p-2 mb-2 w-full" />
                                <input type="number" placeholder="Price" className="border p-2 mb-2 w-full" />
                                <input type="text" placeholder="Type" className="border p-2 mb-2 w-full" />
                                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => {/* Logic to save product */}}>Save</button>
                                <button className="bg-red-500 text-white px-4 py-2 rounded ml-2" onClick={() => setShowCreateProductForm(false)}>Cancel</button>
                            </div>
                        )}

                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="px-4 py-2 text-center">#</th>
                                    <th className="px-4 py-2 text-center">Name</th>
                                    <th className="px-4 py-2 text-center">Price</th>
                                    <th className="px-4 py-2 text-center">Type</th>
                                    <th className="px-4 py-2 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productData.length > 0 ? (
                                    productData.map((item, index) => (
                                        <tr key={item.id} className="border-b">
                                            <td className="px-4 py-2 text-center">{index + 1}</td>
                                            <td className="px-4 py-2 text-center">{item.name}</td>
                                            <td className="px-4 py-2 text-center">Rp.{item.price}</td>
                                            <td className="px-4 py-2 text-center">{item.type}</td>
                                            <td className="px-4 py-2 text-center">
                                                <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                                                <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4">No data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Tabel Data Transaksi */}
                {activeTab === 'transactions' && (
                    <div className="bg-white p-4 rounded-lg shadow">
                        <button className="bg-green-500 text-white px-4 py-2 rounded mb-4" onClick={() => setShowCreateTransactionForm(true)}>Add Transaction</button>
                        
                        {showCreateTransactionForm && (
                            <div className="mb-4 p-4 border rounded">
                                <h3 className="text-lg font-semibold mb-2">Add Transaction</h3>
                                <input type="text" placeholder="Customer Code" className="border p-2 mb-2 w-full" />
                                <input type="text" placeholder="Customer Name" className="border p-2 mb-2 w-full" />
                                <input type="text" placeholder="Transaction Label" className="border p-2 mb-2 w-full" />
                                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => {/* Logic to save transaction */}}>Save</button>
                                <button className="bg-red-500 text-white px-4 py-2 rounded ml-2" onClick={() => setShowCreateTransactionForm(false)}>Cancel</button>
                            </div>
                        )}

                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="px-4 py-2 text-center">#</th>
                                    <th className="px-4 py-2 text-center">Customer Code</th>
                                    <th className="px-4 py-2 text-center">Customer Name</th>
                                    <th className="px-4 py-2 text-center">Transaction Label</th>
                                    <th className="px-4 py-2 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactionData.length > 0 ? (
                                    transactionData.map((item, index) => (
                                        <tr key={item.id} className="border-b">
                                            <td className="px-4 py-2 text-center">{index + 1}</td>
                                            <td className="px-4 py-2 text-center">{item.customerCode}</td>
                                            <td className="px-4 py-2 text-center">{item.customerName}</td>
                                            <td className="px-4 py-2 text-center">{item.transactionLabel}</td>
                                            <td className="px-4 py-2 text-center">
                                                <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                                                <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4">No data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Admin;
