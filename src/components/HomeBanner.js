import React from "react";
import BannerImage from '../assets/images/home-banner.jpg';
import BannerMobileImage from '../assets/images/home-banner-mobile.jpg';

function HomeBanner() {
    return (
        <div className="main_home_banner page_banner position-relative">
            <picture>
                <source media="(max-width: 645px)" srcSet={BannerMobileImage} />
                <img src={BannerImage} alt="Logo" />
            </picture>
            <div className="main_home_banner_content position-absolute w-100 h-100">
            </div>
            <div className="bannerbox">
                {/* <img src={BannerImage} alt="Logo" style={{ width: '100%', position: "absolute", height:  }} /> */}
                <div className="home_banner_bottom text-light position-relative">
                    <h1 className="text-white m-0 text-center">branding, design, dev for luxury brands</h1>
                </div>
            </div>
        </div>
    );
}

export default HomeBanner;