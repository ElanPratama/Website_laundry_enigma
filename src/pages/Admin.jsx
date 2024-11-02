import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../lib/axios';
import { user } from '@nextui-org/react';

function Admin() {
    const [userData, setUserData] = useState([]);
    const [productData, setProductData] = useState([]);
    const [transactionData, setTransactionData] = useState([]);
    const [activeTab, setActiveTab] = useState('customers');
    const [showCreateCustomerForm, setShowCreateCustomerForm] = useState(false);
    const [showCreateProductForm, setShowCreateProductForm] = useState(false);
    const [showCreateTransactionForm, setShowCreateTransactionForm] = useState(false);
    const [transactionProductId, setTransactionProductId] = useState('');
    const [transactionQuantity, setTransactionQuantity] = useState('');
    const [transactionCustomerId, setTransactionCustomerId] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productType, setProductType] = useState('');
    const [responseMessage, setResponseMessage] = useState(null);
    const navigate = useNavigate();
    

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // Fetch user data
    const fetchUserData = async () => {
        try {
            const headers = { Authorization: `Bearer ${token}` };
            const { data } = await axiosInstance.get('/customers', { headers });
            setUserData(data.data);
        } catch (error) {
            console.error('Error fetching user data:', error.response);
        }
    };

    // Fetch product data
    const fetchProductData = async () => {
        try {
            const headers = { Authorization: `Bearer ${token}` };
            const { data } = await axiosInstance.get('/products', { headers });
            setProductData(data.data);
        } catch (error) {
            console.error('Error fetching product data:', error.response);
        }
    };

    // Create a new product
    const handleCreateProduct = async () => {
        if (!productName || !productPrice || !productType) {
            setResponseMessage('Please fill out all product fields.');
            return;
        }

        try {
            const headers = { Authorization: `Bearer ${token}` };
            const response = await axiosInstance.post('/products', {
                name: productName,
                price: Number(productPrice),
                type: productType,
            }, { headers });

            if (response.status === 201) {
                setResponseMessage('Product created successfully!');
                setProductData(prevData => [...prevData, response.data.data]);
                setProductName('');
                setProductPrice('');
                setProductType('');
                setShowCreateProductForm(false);
            }
        } catch (error) {
            console.error('Error creating product:', error.response);
            setResponseMessage(`Failed to create product: ${error.response?.data?.message || error.message}`);
        }
    };

    // Fetch transaction data
    const fetchTransactionData = async () => {
        try {
            const headers = { Authorization: `Bearer ${token}` };
            const { data } = await axiosInstance.get('/bills', { headers });
            console.log(data.data)
            setTransactionData(data.data);
        } catch (error) {
            console.error('Error fetching transaction data:', error.response);
        }
    };

    // Component lifecycle hook
    useEffect(() => {
        if (!token || role !== 'admin') {
            navigate('/login');
            return;
        }

        fetchUserData();
        fetchProductData();
        fetchTransactionData();
    }, [navigate, role, token]);

    // Create a new customer
    const handleCreateCustomer = async () => {
        if (!name || !phoneNumber || !address) {
            setResponseMessage('Please fill out all fields.');
            return;
        }

        try {
            const headers = { Authorization: `Bearer ${token}` };
            const response = await axiosInstance.post('/customers', { name, phoneNumber, address }, { headers });

            if (response.status === 201) {
                setResponseMessage('Customer created successfully!');
                setUserData(prevData => [...prevData, response.data.data]);
                setName('');
                setPhoneNumber('');
                setAddress('');
                setShowCreateCustomerForm(false);
            }
        } catch (error) {
            console.error('Error creating customer:', error.response);
            setResponseMessage(`Failed to create customer: ${error.response?.data?.message || error.message}`);
        }
    };

    // Delete a customer
    const handleDeleteCustomer = async (id) => {
        try {
            const headers = { Authorization: `Bearer ${token}` };
            await axiosInstance.delete(`/customers/${id}`, { headers });
            setUserData(prevData => prevData.filter(user => user.id !== id));
            setResponseMessage('Customer deleted successfully.');
        } catch (error) {
            console.error('Error deleting customer:', error.response);
        }
    };

    // Create a new transaction
    
    const handleCreateTransaction = async () => {
        if (!transactionProductId || !transactionQuantity) {
            setResponseMessage('Please fill out all transaction fields.');
            return;
        }

        try {
            const body =  {
                customerId: transactionCustomerId,
                billDetails:[
                    {
                        product : {
                            id: transactionProductId,
                        },
                        qty: Number(transactionQuantity),                    
                    }
                ]
            }


            const headers = { Authorization: `Bearer ${token}` };
            console.log(body)
            const response = await axiosInstance.post('/bills', body , { headers });

            if (response.status === 201) {
                setResponseMessage('Transaction created successfully!');
                setTransactionData(prevData => [...prevData, response.data.data]);
                setTransactionProductId('');
                setTransactionQuantity('');
                setShowCreateTransactionForm(false);
            }
        } catch (error) {
            console.error('Error creating transaction:', error.response);
            setResponseMessage(`Failed to create transaction: ${error.response?.data?.message || error.message}`);
        }
    };

    // Navigate to transaction detail page
    const handleTransactionDetail = (id) => {
        navigate(`/transaction/${id}`);
    };

    // Logout function
    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate('/');
    }

    return (
        <div className="min-h-screen flex">
            <div className="w-64 bg-gray-800 text-white">
                <div className="p-4">
                    <h2 className="text-2xl font-bold">Admin Dashboard</h2>
                </div>
                <ul className="mt-6">
                    <li className={`p-4 hover:bg-gray-700 cursor-pointer ${activeTab === 'customers' ? 'bg-gray-600' : ''}`} onClick={() => setActiveTab('customers')}>
                        Customers
                    </li>
                    <li className={`p-4 hover:bg-gray-700 cursor-pointer ${activeTab === 'products' ? 'bg-gray-600' : ''}`} onClick={() => setActiveTab('products')}>
                        Products
                    </li>
                    <li className={`p-4 hover:bg-gray-700 cursor-pointer ${activeTab === 'transactions' ? 'bg-gray-600' : ''}`} onClick={() => setActiveTab('transactions')}>
                        Transactions
                    </li>
                    <li className="p-4 hover:bg-gray-700 cursor-pointer" onClick={handleLogout}>Logout</li>
                </ul>
            </div>

            <div className="flex-1 bg-gray-100 p-6">
                <h1 className="text-3xl font-bold mb-6">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Data</h1>

                {responseMessage && <p className="text-red-500">{responseMessage}</p>}

                {activeTab === 'customers' && (
                    <div className="bg-white p-4 rounded-lg shadow mb-6">
                        <button className="bg-green-500 text-white px-4 py-2 rounded mb-4" onClick={() => setShowCreateCustomerForm(true)}>Create Customer</button>

                        {showCreateCustomerForm && (
                            <div className="mb-4">
                                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 mb-2 w-full" />
                                <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="border p-2 mb-2 w-full" />
                                <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} className="border p-2 mb-2 w-full" />
                                <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={handleCreateCustomer}>Submit</button>
                                <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setShowCreateCustomerForm(false)}>Cancel</button>
                            </div>
                        )}

                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="px-4 py-2 text-center">#</th>
                                    <th className="px-4 py-2 text-center">Name</th>
                                    <th className="px-4 py-2 text-center">Phone</th>
                                    <th className="px-4 py-2 text-center">Address</th>
                                    <th className="px-4 py-2 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userData.length > 0 ? (
                                    userData.map((user, index) => (
                                        <tr key={user.id} className="border-b">
                                            <td className="px-4 py-2 text-center">{index + 1}</td>
                                            <td className="px-4 py-2 text-center">{user.name}</td>
                                            <td className="px-4 py-2 text-center">{user.phoneNumber}</td>
                                            <td className="px-4 py-2 text-center">{user.address}</td>
                                            <td className="px-4 py-2 text-center">
                                                <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                                                <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDeleteCustomer(user.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-4 py-2 text-center">No customers found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

{activeTab === 'products' && (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
        <button className="bg-green-500 text-white px-4 py-2 rounded mb-4" onClick={() => setShowCreateProductForm(true)}>Create Product</button>

        {showCreateProductForm && (
            <div className="mb-4">
                <input type="text" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} className="border p-2 mb-2 w-full" />
                <input type="number" placeholder="Product Price" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} className="border p-2 mb-2 w-full" />
                <input type="text" placeholder="Product Type" value={productType} onChange={(e) => setProductType(e.target.value)} className="border p-2 mb-2 w-full" />
                <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={handleCreateProduct}>Submit</button>
                <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setShowCreateProductForm(false)}>Cancel</button>
            </div>
        )}

        <table className="w-full table-auto">
            <thead>
                <tr className="bg-gray-200">
                    <th className="px-4 py-2 text-center">#</th>
                    <th className="px-4 py-2 text-center">Name</th>
                    <th className="px-4 py-2 text-center">Price</th>
                    <th className="px-4 py-2 text-center">Type</th>
                    <th className="px-4 py-2 text-center">Action</th>
                </tr>
            </thead>
            <tbody>
                {productData.length > 0 ? (
                    productData.map((product, index) => (
                        <tr key={product.id} className="border-b">
                            <td className="px-4 py-2 text-center">{index + 1}</td>
                            <td className="px-4 py-2 text-center">{product.name}</td>
                            <td className="px-4 py-2 text-center">{product.price}</td>
                            <td className="px-4 py-2 text-center">{product.type}</td>
                            <td className="px-4 py-2 text-center">
                                <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                                <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" className="px-4 py-2 text-center">No products found</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
)}

{activeTab === 'transactions' && (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
        <button className="bg-green-500 text-white px-4 py-2 rounded mb-4" onClick={() => setShowCreateTransactionForm(true)}>
            Create Transaction
        </button>

        {showCreateTransactionForm && (
            <div className="mb-4">
                <select onChange={(e) => setTransactionProductId(e.target.value)} className="border p-2 mb-2 w-full">
                    <option value="">Select Product</option>
                    {productData.map(product => (
                        <option key={product.id} value={product.id}>{product.name}</option>
                    ))}
                </select>
                <select onChange={(e) => setTransactionCustomerId(e.target.value)} className="border p-2 mb-2 w-full">
                    <option value="">Select Customer</option>
                    {userData.map(user => (
                        <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                </select>
                <input type="number" placeholder="Quantity" value={transactionQuantity} onChange={(e) => setTransactionQuantity(e.target.value)} className="border p-2 mb-2 w-full" />
                <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={handleCreateTransaction}>Submit</button>
                <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setShowCreateTransactionForm(false)}>Cancel</button>
            </div>
        )}

        <table className="w-full table-auto mt-4">
            <thead>
                <tr className="bg-gray-200">
                    <th className="px-4 py-2 text-center">#</th>
                    <th className="px-4 py-2 text-center">Kode Pelanggan</th>
                    <th className="px-4 py-2 text-center">Nama Pelanggan</th>
                    <th className="px-4 py-2 text-center">Label Transaksi</th>
                </tr>
            </thead>
            <tbody>
                {transactionData.length > 0 ? (
                    transactionData.map((transaction, index) => (
                        <tr key={transaction.id} className="border-b">
                            <td className="px-4 py-2 text-center">{index + 1}</td>
                            <td className="px-4 py-2 text-center">{transaction.customer.id || 'N/A'}</td>
                            <td className="px-4 py-2 text-center">{transaction.customer.name || 'Customer Name'}</td>
                            <td className="px-4 py-2 text-center">
                            <Button onPress={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <p> 
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                  dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. 
                  Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. 
                  Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur 
                  proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" className="px-4 py-2 text-center">No transactions found</td>
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
