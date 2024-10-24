// src/pages/Home.jsx
import React, { useState } from 'react';

function Home() {
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [items, setItems] = useState([{ type: '', weight: '', days: '' }]);
  const [price, setPrice] = useState(0);

  const handleSendToWhatsApp = () => {
    // Validasi nomor WhatsApp
    if (!whatsappNumber.startsWith('62')) {
        alert('Pastikan nomor WhatsApp dimulai dengan kode negara Indonesia (62)');
        return;
    }
    
    const message = `
      Struk Laundry:\n
      ${items.map(item => `Jenis: ${item.type}, Berat: ${item.weight} kg, Hari: ${item.days}`).join('\n')}
      Total Harga: Rp ${price}\n
      Tanggal: ${new Date().toLocaleDateString()}\n
      Jam: ${new Date().toLocaleTimeString()}
    `;
    
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
};

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newItems = [...items];
    newItems[index][name] = value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { type: '', weight: '', days: '' }]);
  };

  const removeItem = (index) => {
    console.log("Removing item at index:", index); // Debug log
    const newItems = items.filter((item, i) => i !== index);
    setItems(newItems);
  };

  const calculatePrice = () => {
    let totalPrice = 0;

    items.forEach(item => {
      const { type, weight, days } = item;
      let basePrice = type === 'selimut' ? 10000 : 5000; // Harga dasar per kilo
      let weightPrice = (parseInt(weight) - 1) * 3000; // Tambahan per kilo
      let urgentPrice = days < 2 ? 1000 : 0; // Tambahan untuk penyelesaian kurang dari 2 hari

      totalPrice += basePrice + weightPrice + urgentPrice;
    });

    setPrice(totalPrice);
  };

  const handlePrint = () => {
    const printContent = `
      <h2 style="text-align: center;">Struk Laundry</h2>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <thead>
          <tr style="background-color: #f2f2f2;">
            <th style="border: 1px solid #dddddd; padding: 8px; text-align: left;">Jenis Pakaian</th>
            <th style="border: 1px solid #dddddd; padding: 8px; text-align: left;">Berat (kg)</th>
            <th style="border: 1px solid #dddddd; padding: 8px; text-align: left;">Hari Penyelesaian</th>
          </tr>
        </thead>
        <tbody>
          ${items.map(item => `
            <tr>
              <td style="border: 1px solid #dddddd; padding: 8px;">${item.type}</td>
              <td style="border: 1px solid #dddddd; padding: 8px;">${item.weight}</td>
              <td style="border: 1px solid #dddddd; padding: 8px;">${item.days}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <h3 style="text-align: center;">Total Harga: Rp ${price}</h3>
      <p style="text-align: center;">Tanggal: ${new Date().toLocaleDateString()}</p>
      <p style="text-align: center;">Jam: ${new Date().toLocaleTimeString()}</p>
    `;

    const printWindow = window.open('', '', 'height=400,width=600');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <header>
      <div
        className="relative h-[400px] overflow-hidden bg-[url('https://images.unsplash.com/photo-1604335398980-ededcadcc37d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-[50%] bg-no-repeat">
        <div
          className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-black/60 bg-fixed">
          <div className="flex h-full items-center justify-center">
            <div className="px-6 text-center text-white md:px-12">
              <h1 className="mb-6 text-5xl font-bold">Rasakan Pengalaman Laundry yang Berbeda!</h1>
              <h3 className="mb-8 text-3xl font-bold">Solusi Mudah untuk Setiap Keluarga</h3>
              <button
                type="button"
                className="inline-block rounded border-2 border-neutral-50 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-300 hover:text-neutral-200 focus:border-neutral-300 focus:text-neutral-200 focus:outline-none focus:ring-0 active:border-neutral-300 active:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600">
                Call to action
              </button>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-3xl mb-4 text-center">Form Input Laundry</h1>
<form className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
  {items.map((item, index) => (
    <div key={index} className="mb-4">
      <select
        name="type"
        value={item.type}
        onChange={event => handleChange(index, event)}
        className="w-full p-2 mb-2 border border-gray-300 rounded"
        required
      >
        <option value="">Pilih Jenis Pakaian</option>
        <option value="baju">Baju</option>
        <option value="celana">Celana</option>
        <option value="selimut">Selimut</option>
      </select>
      <input
        type="number"
        name="weight"
        placeholder="Berat (kg)"
        value={item.weight}
        onChange={event => handleChange(index, event)}
        className="w-full p-2 mb-2 border border-gray-300 rounded"
        min="1"
        required
      />
      <input
        type="number"
        name="days"
        placeholder="Hari Penyelesaian"
        value={item.days}
        onChange={event => handleChange(index, event)}
        className="w-full p-2 mb-2 border border-gray-300 rounded"
        min="1"
        required
      />
      <button type="button" onClick={() => removeItem(index)} className="mt-2 px-4 py-2 bg-red-500 text-white rounded">
        Hapus Pakaian
      </button>
    </div>
  ))}
  <h2 className="mt-10 text-center text-white">Total Harga: Rp {price}</h2>
  <div className="flex justify-between mb-4 mt-10">
    <button type="button" onClick={addItem} className="px-4 py-2 bg-green-500 text-white rounded">
      Tambah Pakaian
    </button>
    <button type="button" onClick={calculatePrice} className="px-4 py-2 bg-blue-500 text-white rounded">
      Cek Harga
    </button>
  </div>
</form>
{price > 0 && (
  <div className="text-center">
    <button onClick={handlePrint} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
      Cetak Struk
    </button>
  </div>
)}
  <div className="text-center mt-4">
    <div className="flex justify-center items-center mb-2">
      <span className="mr-2">62+</span>
      <input
        type="text"
        placeholder="Masukkan Nomor WhatsApp"
        value={whatsappNumber}
        onChange={e => setWhatsappNumber(e.target.value)}
        className="border p-2 rounded"
      />
    </div>
    <button onClick={handleSendToWhatsApp} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
      Kirim Struk ke WhatsApp
    </button>
  </div>

    </header>
  );
}

export default Home;
