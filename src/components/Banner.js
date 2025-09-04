import React, { useEffect, useState } from 'react';

const Banner = () => {
  const [bannerUrl, setBannerUrl] = useState('');

  useEffect(() => {
    const fetchBannerImage = async () => {
      const url = '/bg.jpg';
      setBannerUrl(url);
    };
    fetchBannerImage();
  }, []);

  useEffect(() => {
    const img = document.querySelector('.banner-image');
    const onScroll = () => {
      if (img) img.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="banner">
      <div
        className="banner-image"
        style={{
          backgroundImage: `url(${bannerUrl})`,
        }}
      />
      <div className="banner-content">
        <h1>Ideas</h1>
        <p>Where all our great things begin</p>
      </div>
      <svg className="banner-angle" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polygon points="0,100 100,0 100,100" />
      </svg>
    </section>
  );
};

export default Banner;
