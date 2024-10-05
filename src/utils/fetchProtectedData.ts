import axios from 'axios';

/**
 * Generalized function to fetch protected data from the backend.
 * @param {string} url - The URL of the protected endpoint.
 * @param {string} method - The HTTP method (GET, POST, etc.). Default is GET.
 * @param {Object} [data] - Optional data to send with POST, PUT, PATCH requests.
 * @returns {Object} - The response data from the server.
 */

type AxiosConfigTypes = {
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH'
}

export const fetchProtectedData = async ({url, method = 'GET'}: AxiosConfigTypes) => {
  try {
    const config = {
      method,
      url: `http://localhost:5000${url}`,
      withCredentials: true,
    };

    // if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
    //   config.data = data;
    // }

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(`Error fetching protected data from ${url}`, error);
    throw error;
  }
};
