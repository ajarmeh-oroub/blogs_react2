import React from 'react'
import BannerArea from './BannerArea'
import PostGrid from './PostGrid'
import PostLatest from './PostLatest'
import PostTrending from './PostTrending'
import { useEffect, useState } from "react";



export default function Landing() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = "http://localhost:8000/api/home";

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const latest = data.latest.slice(1, 5);
  const grid = data.latest.slice(5, 13);




  return (
    <>
      <BannerArea data={data.latest}/>
      {/* <PostTrending trends={data.trends} latest={latest}/> */}
      {/* <PostLatest /> */}
      <PostGrid grid={grid}/>
    </>
  )
}
