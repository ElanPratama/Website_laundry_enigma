import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";

const ModalDetailTransaction = (props) => {
  const [detailTransaction, setDetailTransaction] = useState([]);
  const [customer, setCustomer] = useState(null);

  const token = localStorage.getItem("token");

  const fetchDetailTransaction = async () => {
    try {
      const { id } = props;
      const headers = { Authorization: `Bearer ${token}` };
      const { data } = await axiosInstance.get(`/bills/${id}`, { headers });
      
      // Set customer data and bill details
      setCustomer(data.data.customer);
      setDetailTransaction(data.data.billDetails || []);
    } catch (error) {
      console.error(error.response);
    }
  };

  useEffect(() => {
    fetchDetailTransaction();
  }, [props.id]);

  return (
    <>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Transaction Details</ModalHeader>
            <ModalBody>
              {customer && (
                <div className="mb-4">
                  <p><strong>Kode Pelanggan:</strong> {customer.id}</p>
                  <p><strong>Nama:</strong> {customer.name}</p>
                </div>
              )}
              {detailTransaction.length > 0 ? (
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left">Select Product</th>
                      <th className="px-4 py-2 text-left">Qty</th>
                      <th className="px-4 py-2 text-left">Price</th>
                      <th className="px-4 py-2 text-left">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detailTransaction.map((transaction, index) => (
                      <tr key={index} className="border-b">
                        <td className="px-4 py-2 text-center">{transaction.product.name || 'N/A'}</td>
                        <td className="px-4 py-2 text-center">{transaction.qty || '0'}</td>
                        <td className="px-4 py-2 text-center">{transaction.price || '0'}</td>
                        <td className="px-4 py-2 text-center">{transaction.qty * transaction.price || '0'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="px-4 py-2 text-center">No transactions found</div>
              )}
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
    </>
  );
};

export default ModalDetailTransaction;
