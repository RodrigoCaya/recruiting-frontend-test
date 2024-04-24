import { api } from '../index';
import { apiEndpoints } from '../endpoints';

export const fetchInvoices = async () => {
  try {
    const response = await api.get(apiEndpoints.invoice)
    return response.data
  } catch (error) {
    console.log(error)
    return []
  }
};
