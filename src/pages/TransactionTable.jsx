import React from 'react';
import { Modal, Button } from "@nextui-org/react";
import ModalDetailTransaction from '../components/ModalDetailTransaction';

const TransactionTable = ({ transactionData, showCreateTransactionForm, setShowCreateTransactionForm, productData, userData, transactionProductId, setTransactionProductId, transactionQuantity, setTransactionQuantity, transactionCustomerId, setTransactionCustomerId, handleCreateTransaction, showModalDetail, setShowModalDetail, selectedTransactionId, handleClickDetail }) => (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
        <button className="bg-green-500 text-white px-4 py-2 rounded mb-4" onClick={() => setShowCreateTransactionForm(true)}>Create Transaction</button>
        
        {showCreateTransactionForm && (
            <div className="mb-4">
                {/* Input fields for creating a transaction */}
                {/* Similar structure as original code */}
            </div>
        )}
        
        <table className="w-full table-auto">
            {/* Table to display transaction data */}
            {/* Similar structure as original code */}
        </table>
        
        <Modal isOpen={showModalDetail} onClose={() => setShowModalDetail(false)}>
            <ModalDetailTransaction id={selectedTransactionId} />
        </Modal>
    </div>
);

export default TransactionTable;
