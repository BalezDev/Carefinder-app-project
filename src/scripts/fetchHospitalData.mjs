import axios from 'axios';
import { writeFileSync } from 'fs';

const fetchHospitalData = async () => {
  try {
    const response = await axios.get('https://api.reliancehmo.com/v3/providers');
    const data = response.data;

    writeFileSync('public/hospitalData.json', JSON.stringify(data, null, 2));
    console.log('Data saved to hospitalData.json');
  } catch (error) {
    console.error('Error fetching hospital data:', error);
  }
};

fetchHospitalData();
