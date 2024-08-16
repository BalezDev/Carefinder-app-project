// import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import HospitalDetails from '../HospitalDetails';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('HospitalDetails', () => {
  it('fetches and displays hospital details', async () => {
    // Mock API response
    mockedAxios.get.mockResolvedValue({
      data: [
        {
          id: '1',
          name: 'Test Hospital',
          address: '123 Test St',
          location: 'Test City',
          phone_number: '123-456-7890',
          type: { id: 1, name: 'Test Type' },
          state: { id: 1, name: 'Test State' },
          description: 'Full description',
          reviews: []
        }
      ]
    });

    render(
      <Router>
        <HospitalDetails />
      </Router>
    );

    // Check if the data is displayed
    await waitFor(() => {
      expect(screen.getByText('Test Hospital')).toBeInTheDocument();
      expect(screen.getByText('123 Test St')).toBeInTheDocument();
      expect(screen.getByText('Test City')).toBeInTheDocument();
      expect(screen.getByText('123-456-7890')).toBeInTheDocument();
    });
  });

  it('displays an error message when fetching fails', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network error'));

    render(
      <Router>
        <HospitalDetails />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText("We couldn't find the hospital you're looking for.")).toBeInTheDocument();
    });
  });
});
