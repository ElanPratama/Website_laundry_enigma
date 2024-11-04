import React from 'react';

const ProductTable = ({ productData, showCreateProductForm, setShowCreateProductForm, productName, setProductName, productPrice, setProductPrice, productType, setProductType, handleCreateProduct }) => (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
        <button className="bg-green-500 text-white px-4 py-2 rounded mb-4" onClick={() => setShowCreateProductForm(true)}>Create Product</button>
        
        {showCreateProductForm && (
            <div className="mb-4">
                {/* Input fields for creating a product */}
                <input type="text" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} className="border p-2 mb-2 w-full" />
                <input type="number" placeholder="Product Price" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} className="border p-2 mb-2 w-full" />
                <input type="text" placeholder="Product Type" value={productType} onChange={(e) => setProductType(e.target.value)} className="border p-2 mb-2 w-full" />
                <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={handleCreateProduct}>Submit</button>
                <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setShowCreateProductForm(false)}>Cancel</button>
            </div>
        )}
        
        <table className="w-full table-auto">
            {/* Table to display product data */}
            {/* Similar structure as original code */}
        </table>
    </div>
);

export default ProductTable;
