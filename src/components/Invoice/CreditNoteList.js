import React, { useState } from 'react';
import { transformCurrency } from '../../utils/currency';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function CreditNoteList(props) {
  const { invoices, setinvoices, creditNotes, setCreditNotes, selectedCreditNote, setSelectedCreditNote } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSelectCreditNote = (invoice) => {
    setSelectedCreditNote(invoice);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedCreditNote(null);
    const filteredCreditNotes = creditNotes.filter(invoice => invoice !== selectedCreditNote);
    setCreditNotes(filteredCreditNotes);
    const filteredInvoices = invoices.filter(invoice => invoice.id !== selectedCreditNote.id);
    setinvoices(filteredInvoices);
  };

  return (
    <>
      {creditNotes.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-4">Selecciona una nota de crédito</h2>
          <ul>
            {creditNotes.map((invoice, index) => (
              <li key={index}
                onClick={() => handleSelectCreditNote(invoice)}
                className={`cursor-pointer ${selectedCreditNote === invoice ? 'bg-gray-100' : 'bg-transparent'} p-2 flex justify-between items-center outline outline-2 outline-gray-400 rounded text-lg`}>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="selectedCreditNote"
                    checked={selectedCreditNote === invoice}
                    onChange={() => handleSelectCreditNote(invoice)}
                    className="mr-2"
                  />
                  <span>{`inv_${invoice.invoice_id}`}</span>
                  <span className="text-gray-500">{`(${invoice.organization_id})`}</span>
                </div>
                <span>{transformCurrency(invoice.amount, invoice.currency)}</span>
                <span className="text-gray-500">{`inv_${invoice.invoice_origin_id}`}</span>
              </li>
            ))}
          </ul>
          {selectedCreditNote && (
            <button onClick={showModal} className="mt-4 p-2 bg-blue-500 text-white rounded">
              Asignar
            </button>
          )}
        </div>
      )}
      {isModalVisible && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <CheckCircleIcon style={{ fontSize: 60, color: 'green' }} />
              <div>
                <span>Nota de crédito asignada correctamente</span>
              </div>
              <button onClick={closeModal} className="mt-4 p-2 bg-blue-500 text-white rounded">
                Seguir asignando
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CreditNoteList;