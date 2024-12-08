import React from 'react';
import BannerArea from './BannerArea';
import PostGrid from './PostGrid';
import PostLatest from './PostLatest';
import PostTrending from './PostTrending';
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
      <BannerArea data={data.latest} />
      <PostTrending trends={data.trends} latest={latest} />
      <DiscountSection />
      <CreateWithAISection />
      <PostGrid grid={grid} />
    </>
  );
}



function CreateWithAISection() {
  return (
    <section className="create-with-ai-section" style={{ padding: '50px 0', backgroundColor: '#102950', height: '600px' }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <img
              src="https://images.unsplash.com/photo-1728755696561-f8fd6ff03630?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Create with AI"
              className="img-fluid rounded"
              style={{ width: '100%', borderRadius: '8px' }}
            />
          </div>
          <div className="col-lg-6">
            <h2 style={{ color: 'white' }}>Create with <span style={{ color: '#FFBE00' }}>AI</span></h2>
            <p style={{ color: 'white' }}>
              At <span style={{ color: '#FFBE00' }}>Next</span> Page, we empower you to unleash your creativity. Write insightful articles and generate stunning images using our AI-powered tools.
            </p>
            <p style={{ marginBottom: '15px', color: 'white' }}>
              Whether you are a seasoned writer or just starting, our platform provides the resources you need to share your thoughts and visuals with the world.
            </p>
            <p style={{ marginBottom: '15px', color: 'white' }}>
              Our AI tools make it easy to create professional-quality content and eye-catching images effortlessly. Join our community and start creating today!
            </p>
            <a href="/create" className="btn btn-base" style={{ padding: '', fontSize: '16px' }}>Start Creating</a>
          </div>
        </div>
      </div>
    </section>
  );
}
function DiscountSection() {
  return (
    <section className="discount-section" style={{ padding: '50px 0', backgroundColor: '#2C3E50', color: '#ffffff' , height:'175px' }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <h2 style={{ color: '#FFBE00' }}>Special Discount</h2>
            <p style={{ color: '#ffffff' }}>Get 50% off on your first article submission. Join us now and start creating with our AI-powered tools!</p>
          </div>
          <div className="col-lg-6">
            <img
              src="https://images.unsplash.com/photo-1581092919534-9d2e7cd20050?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Special Discount"
              className="img-fluid rounded"
              style={{ width: '100%', borderRadius: '8px' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
