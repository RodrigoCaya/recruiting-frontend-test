import React, { useState } from 'react';
import { transformCurrency } from '../../utils/currency';

function InvoiceList(props) {
  const { invoices, setCreditNotes, setSelectedCreditNote } = props;
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const handleSelectInvoice = (selectedInvoice) => {
    setSelectedInvoice(selectedInvoice);
    const filteredInvoices = invoices
      .filter(invoice => invoice.type === 'credit_note' && invoice.reference === selectedInvoice.id)
      .map(invoice => ({ ...invoice, invoice_origin_id: selectedInvoice.invoice_id }));
    setCreditNotes(filteredInvoices);
    setSelectedCreditNote(null);
  };

  return (
    <ul>
      {invoices && invoices
        .filter(invoice => invoice.type === 'received')
        .map((invoice, index) => (
          <li key={index}
            onClick={() => handleSelectInvoice(invoice)}
            className={`cursor-pointer ${selectedInvoice === invoice ? 'bg-gray-100' : 'bg-transparent'} p-2 flex justify-between items-center outline outline-2 outline-gray-400 rounded text-lg`}>
            <div className="flex items-center">
              <input
                type="radio"
                name="selectedInvoice"
                checked={selectedInvoice === invoice}
                onChange={() => handleSelectInvoice(invoice)}
                className="mr-2"
              />
              <span>{`inv_${invoice.invoice_id}`}</span>
              <span className="text-gray-500">{`(${invoice.organization_id})`}</span>
            </div>
            <span>{transformCurrency(invoice.amount, invoice.currency)}</span>
            <span>{invoice.type === 'received' ? 'Recibida' : ''}</span>
          </li>
        ))}
    </ul>
  );
}

export default InvoiceList;