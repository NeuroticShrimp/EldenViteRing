
// EldenDataWrapper.tsx
import React, { useState, useEffect } from 'react';
import { transformEldenData } from './dataTransformUtils';
import ShowEldenElements from './ShowEldenElements';
import fetchDataFromApi from './api'; // Assuming this is your API call function

const EldenDataWrapper: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchDataFromApi(); // Fetch data from API
      const transformedData = transformEldenData(response.data); // Transform data
      setData(transformedData);
    };

    fetchData();
  }, []);

  return <ShowEldenElements data={data} />;
};

export default EldenDataWrapper;
