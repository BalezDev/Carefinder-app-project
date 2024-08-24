// src/pages/__tests__/HospitalInfo.test.tsx
// import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import HospitalInfo from '../HospitalDetails';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('HospitalInfo', () => {
  it('fetches and displays hospital data', async () => {
    // Mock API response
    mockedAxios.get.mockResolvedValue({
      data: {
        data: [
          {
            id: '1',
            name: 'Test Hospital',
            address: '123 Test St',
            location: 'Test City',
            shortDesc: 'Short description',
            description: 'Full description',
            reviews: [],
            avgRating: 0,
            tier_id: 1,
            type_id: 1,
            phone_number: '123-456-7890',
            state: { id: 1, name: 'Test State' },
            type: { id: 1, name: 'Test Type' },
            products: []
          }
        ]
      }
    });

    render(<HospitalInfo />);

    // Check if the data is displayed
    await waitFor(() => {
      expect(screen.getByText('Test Hospital')).toBeInTheDocument();
      expect(screen.getByText('123 Test St')).toBeInTheDocument();
      expect(screen.getByText('Test City')).toBeInTheDocument();
    });
  });

  it('displays an error message when fetching fails', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network error'));

    render(<HospitalInfo />);

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch hospital data. Please try again later.')).toBeInTheDocument();
    });
  });
});
