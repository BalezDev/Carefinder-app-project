import React from 'react';
import HospitalCard from './HospitalCard';
import { Hospital } from '../../typings/Hospital'; // Adjust the path as necessary

interface HospitalListProps {
  data: Hospital[];
}

const HospitalList: React.FC<HospitalListProps> = ({ data }) => {
  return (
    <>
      {data?.map((item) => (
        <HospitalCard item={item} key={item.id} />
      ))}
    </>
  );
};

export default HospitalList;