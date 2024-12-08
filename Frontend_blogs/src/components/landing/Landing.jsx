import React, { useEffect, useState } from 'react';
import BannerArea from './BannerArea';
import PostGrid from './PostGrid';
import PostTrending from './PostTrending';
import { fetchHomeData, fetchFavorites, toggleFavorite as toggleFavoriteApi } from '../../Services/Api.jsx';

export default function Landing() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(new Set()); // Set to manage favorites

  const userId = 1; // Replace with the actual user ID

  useEffect(() => {
    const fetchData = async () => {
      try {
        const homeData = await fetchHomeData();
        const favoriteIds = await fetchFavorites(userId);

        setData(homeData);
        setFavorites(favoriteIds);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleFavorite = async (blogId) => {
    try {
      const isFavorite = favorites.has(blogId);
      await toggleFavoriteApi(userId, blogId, isFavorite);

      setFavorites((prev) => {
        const updated = new Set(prev);
        if (isFavorite) {
          updated.delete(blogId);
        } else {
          updated.add(blogId);
        }
        return updated;
      });
    } catch (err) {
      console.error("Error toggling favorite:", err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (loading) return (
    <div className="preloader" id="preloader">
      <div className="preloader-inner">
        <div className="spinner">
          <div className="dot1"></div>
          <div className="dot2"></div>
        </div>
      </div>
    </div>
  );
  if (error) return <div>Error: {error}</div>;

  const latest = data.latest.slice(1, 5);
  const grid = data.latest.slice(5, 13);

  return (
    <>
      <BannerArea 
        data={data.latest} 
        favorites={favorites} 
        toggleFavorite={toggleFavorite} 
      />
      <PostTrending 
        trends={data.trends} 
        latest={latest} 
        favorites={favorites} 
        toggleFavorite={toggleFavorite} 
      />
      <PostGrid 
        grid={grid} 
        favorites={favorites} 
        toggleFavorite={toggleFavorite} 
      />
    </>
  );
}
