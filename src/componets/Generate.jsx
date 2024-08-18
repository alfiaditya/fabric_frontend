import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import QRCode from 'qrcode.react';

const QRCodeComponent = React.forwardRef(({ sapi }, ref) => (
  <div ref={ref} className="flex flex-col items-center my-4 p-4 border border-gray-300 rounded-lg bg-white">
    <p className="text-xl font-bold mb-4">{sapi.earTag}</p>
    <QRCode value={`http://${window.location.hostname}:${window.location.port}/generate/${sapi.earTag}`} size={256} />
  </div>
));

const Generate = () => {
  const [sapi, setSapi] = useState([]);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSapi, setSelectedSapi] = useState(null);
  const [loading, setLoading] = useState(false); 
  const qrCodeRef = useRef();

  useEffect(() => {
    getSapi();
  }, []);

  const getSapi = async () => {
    try {
      const response = await axios.get('http://localhost:5000/TernakSapi');
      setSapi(response.data);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching data:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredSapi = sapi.filter((sapi) =>
    sapi.earTag.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sapi.jenisSapi.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePrintClick = async (sapi) => {
    setSelectedSapi(sapi);
    setLoading(true); 
    await handlePrint();
    setLoading(false); 
  };

  const handlePrint = useReactToPrint({
    content: () => qrCodeRef.current,
    documentTitle: 'QR Code',
  });

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className='font-bold grid justify-items-center text-3xl mt-6 mb-7'> GENERATE QR CODE </h1>
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex justify-end items-center mt-3 mb-5">
        <div className="relative w-1/2">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#24292F]/50 focus:border-[#24292F]/50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#24292F]/50 dark:focus:border-[#24292F]/50"
            placeholder="Cari Data Sapi..."
            required
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-4 py-2 dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30">Cari</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[100%] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">No</th>
              <th scope="col" className="px-6 py-3">Ear Tag</th>
              <th scope="col" className="px-6 py-3">Jenis Sapi</th>
              <th scope="col" className="px-6 py-3">Tanggal Masuk</th>
              <th scope="col" className="px-6 py-3">Berat Awal</th>
              <th scope="col" className="px-6 py-3">Umur Masuk</th>
              <th scope="col" className="px-6 py-3">Berat sekarang</th>
              <th scope="col" className="px-6 py-3">Umur sekarang</th>
              <th scope="col" className="px-6 py-3">Status Vaksinasi</th>
              <th scope="col" className="px-6 py-3">Status Kelayakan</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSapi.length > 0 ? filteredSapi.map((sapi, index) => (
              <tr key={sapi.earTag} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {index + 1}
                </th>
                <td className="px-4 py-2 text-ellipsis overflow-hidden max-w-xs">
                  <div className="truncate" title={sapi.earTag}>{sapi.earTag}</div>
                </td>
                <td className="px-4 py-2 text-ellipsis overflow-hidden max-w-xs">
                  <div className="truncate" title={sapi.jenisSapi}>{sapi.jenisSapi}</div>
                </td>
                <td className="px-4 py-2 text-ellipsis overflow-hidden max-w-xs">
                  <div className="truncate" title={sapi.tanggalMasuk}>{sapi.tanggalMasuk}</div>
                </td>
                <td className="px-4 py-2 text-ellipsis overflow-hidden max-w-xs">
                  <div className="truncate" title={sapi.beratAwal}>{sapi.beratAwal}</div>
                </td>
                <td className="px-4 py-2 text-ellipsis overflow-hidden max-w-xs">
                  <div className="truncate" title={sapi.umurMasuk}>{sapi.umurMasuk}</div>
                </td>
                <td className="px-4 py-2 text-ellipsis overflow-hidden max-w-xs">
                  <div className="truncate" title={sapi.beratSekarang}>{sapi.beratSekarang}</div>
                </td>
                <td className="px-4 py-2 text-ellipsis overflow-hidden max-w-xs">
                  <div className="truncate" title={sapi.umurSekarang}>{sapi.umurSekarang}</div>
                </td>
                <td className="px-4 py-2 text-ellipsis overflow-hidden max-w-xs">
                  <span className={`truncate px-2 py-1 ${sapi.konfirmasiVaksinasi === 'Belum Dikonfirmasi' ? 'bg-red-700' : 'bg-green-700'} text-white rounded`}>
                    {sapi.konfirmasiVaksinasi}
                  </span>
                </td>
                <td className="px-4 py-2 text-ellipsis overflow-hidden max-w-xs">
                  <span className={`truncate px-2 py-1 ${sapi.konfirmasiKelayakan === 'Belum Dikonfirmasi' ? 'bg-red-700' : 'bg-green-700'} text-white rounded`}>
                    {sapi.konfirmasiKelayakan}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handlePrintClick(sapi)}
                    className={`text-white ${loading ? 'bg-gray-500' : 'bg-blue-700 hover:bg-blue-800'} focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}
                    disabled={loading} 
                  >
                    {loading ? 'Printing...' : 'Print'}
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="11" className="px-4 py-2 text-center text-gray-500">Data tidak ditemukan</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div style={{ display: 'none' }}>
        {selectedSapi && <QRCodeComponent ref={qrCodeRef} sapi={selectedSapi} />}
      </div>
    </div>
  );
};

export default Generate;
