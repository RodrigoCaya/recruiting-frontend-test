import React, { useEffect, useState } from 'react';
import { fetchInvoices } from '../../api/Invoice/invoiceApi';
import InvoiceList from './InvoiceList';
import CreditNoteList from './CreditNoteList';

function Invoice() {
  const [invoices, setinvoices] = useState(null);
  const [selectedCreditNote, setSelectedCreditNote] = useState(null);
  const [creditNotes, setCreditNotes] = useState([]);

  useEffect(() => {
    fetchInvoices().then(
      invoices => {
        setinvoices(invoices.map((invoice, index) => ({ ...invoice, invoice_id: index })))
      }
    );
  }, []);

  return (
    <div className="mx-20 p-10">
      <h1 className="text-xl font-bold mb-4">Selecciona una factura</h1>
      <InvoiceList
        invoices={invoices}
        setCreditNotes={setCreditNotes}
        setSelectedCreditNote={setSelectedCreditNote}
      />
      <CreditNoteList
        invoices={invoices}
        setinvoices={setinvoices}
        creditNotes={creditNotes}
        setCreditNotes={setCreditNotes}
        selectedCreditNote={selectedCreditNote}
        setSelectedCreditNote={setSelectedCreditNote}
      />
    </div >
  );
}

export default Invoice;