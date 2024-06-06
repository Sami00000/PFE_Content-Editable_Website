import React from 'react';
import useTextContent from '../hooks/useTextContent';
import useImageContent from '../hooks/useImageContent';
import useHeadingContent from '../hooks/useHeadingContent';
import useCookie from '../hooks/useCookie';
function About() {
    useTextContent();
    useImageContent();
    useHeadingContent();
    const simpleCookie = useCookie('simple_cookie');
    
    return (
        <div className="about-page-wrapper">
            {/* about-Page-Header start */}
            <div className="about-header about-header-s">
                <h1 className="header-text" data-page="about" data-tag="header">
                </h1>
                <h1 className="header-text" data-page="about" data-tag="testttt">
                </h1>
                <p data-page="about" data-tag="header"></p>
                <p data-page="about" data-tag="arrow"></p>
            </div>
            {/* about-Page-Header end */}
          
            {/* flexbox content start */}
            <div className="about-flexbox">
                <div className="about-content">
                    <h1 data-page="about" data-tag="about-us-header"></h1>
                    <p data-page="about" data-tag="about-us"></p>
                </div>
                <div className="about-image-container">
                    <img data-page="about" data-tag="about-us-img" src="" alt="Description" />
                </div>
            </div>
            {/* flexbox content end */}
         
            {/* flexbox content start */}
            <div className="about-flexbox">
                <div className="about-image-container">
                    <img data-page="about" data-tag="mission-img" src="" alt="Description" />
                </div>
                <div className="about-content">
                    <h1 data-page="about" data-tag="mission-header"></h1>
                    <p data-page="about" data-tag="mission"></p>
                </div>
            </div>
            {/* flexbox content end */}

            {/* flexbox content start */}
            <div className="about-flexbox">
                <div className="about-content">
                    <h1 data-page="about" data-tag="story-header"></h1>
                    <p data-page="about" data-tag="story"></p>
                </div>
                <div className="about-image-container">
                    <img data-page="about" data-tag="story-img" src="" alt="Description" />
                </div>
            </div>
            {/* flexbox content end */}

            {/* page separator start */}
            <div className="about-page-separator"></div>
            {/* page separator end */}

            {/* flexbox team start */}
            <div className="about-container-block about-container">
                <p className="about-text-blk about-team-head-text" data-page="about" data-tag="team-head"></p>
                <div className="about-responsive-container-block about-teamcard-container">
                    {/* team member start */}
                    <div className="about-responsive-cell-block wk-desk-3 wk-mobile-12 wk-tab-4 wk-ipadp-4 about-team-card-container">
                        <div className="about-team-card">
                            <div className="about-team-img-wrapper">
                                <img className="about-team-img" data-page="about" data-tag="team-member-1-img" src="" />
                            </div>
                            <div className="about-team-card-content">
                                <p className="about-text-blk about-name" data-page="about" data-tag="team-member-1-name"></p>
                                <p className="about-text-blk about-position" data-page="about" data-tag="team-member-1-position"></p>
                            </div>
                        </div>
                    </div>
                    {/* team member end */}

                    {/* team member start */}
                    <div className="about-responsive-cell-block wk-desk-3 wk-mobile-12 wk-tab-4 wk-ipadp-4 about-team-card-container">
                        <div className="about-team-card">
                            <div className="about-team-img-wrapper">
                                <img className="about-team-img" data-page="about" data-tag="team-member-2-img" src="" />
                            </div>
                            <div className="about-team-card-content">
                                <p className="about-text-blk about-name" data-page="about" data-tag="team-member-2-name"></p>
                                <p className="about-text-blk about-position" data-page="about" data-tag="team-member-2-position"></p>
                            </div>
                        </div>
                    </div>
                    {/* team member end */}

                    {/* team member start */}
                    <div className="about-responsive-cell-block wk-desk-3 wk-mobile-12 wk-tab-4 wk-ipadp-4 about-team-card-container">
                        <div className="about-team-card">
                            <div className="about-team-img-wrapper">
                                <img className="about-team-img" data-page="about" data-tag="team-member-3-img" src="" />
                            </div>
                            <div className="about-team-card-content">
                                <p className="about-text-blk about-name" data-page="about" data-tag="team-member-3-name"></p>
                                <p className="about-text-blk about-position" data-page="about" data-tag="team-member-3-position"></p>
                            </div>
                        </div>
                    </div>
                    {/* team member end */}

                    {/* team member start */}
                    <div className="about-responsive-cell-block wk-desk-3 wk-mobile-12 wk-tab-4 wk-ipadp-4 about-team-card-container">
                        <div className="about-team-card">
                            <div className="about-team-img-wrapper">
                                <img className="about-team-img" data-page="about" data-tag="team-member-4-img" src="" />
                            </div>
                            <div className="about-team-card-content">
                                <p className="about-text-blk about-name" data-page="about" data-tag="team-member-4-name"></p>
                                <p className="about-text-blk about-position" data-page="about" data-tag="team-member-4-position"></p>
                            </div>
                        </div>
                    </div>
                    {/* team member end */}

                    {/* team member start */}
                    <div className="about-responsive-cell-block wk-desk-3 wk-mobile-12 wk-tab-4 wk-ipadp-4 about-team-card-container">
                        <div className="about-team-card">
                            <div className="about-team-img-wrapper">
                                <img className="about-team-img" data-page="about" data-tag="team-member-5-img" src="" />
                            </div>
                            <div className="about-team-card-content">
                                <p className="about-text-blk about-name" data-page="about" data-tag="team-member-5-name"></p>
                                <p className="about-text-blk about-position" data-page="about" data-tag="team-member-5-position"></p>
                            </div>
                        </div>
                    </div>
                    {/* team member end */}

                    {/* team member start */}
                    <div className="about-responsive-cell-block wk-desk-3 wk-mobile-12 wk-tab-4 wk-ipadp-4 about-team-card-container">
                        <div className="about-team-card">
                            <div className="about-team-img-wrapper">
                                <img className="about-team-img" data-page="about" data-tag="team-member-6-img" src="" />
                            </div>
                            <div className="about-team-card-content">
                                <p className="about-text-blk about-name" data-page="about" data-tag="team-member-6-name"></p>
                                <p className="about-text-blk about-position" data-page="about" data-tag="team-member-6-position"></p>
                            </div>
                        </div>
                    </div>
                    {/* team member end */}

                    {/* team member start */}
                    <div className="about-responsive-cell-block wk-desk-3 wk-mobile-12 wk-tab-4 wk-ipadp-4 about-team-card-container">
                        <div className="about-team-card">
                            <div className="about-team-img-wrapper">
                                <img className="about-team-img" data-page="about" data-tag="team-member-7-img" src="" />
                            </div>
                            <div className="about-team-card-content">
                                <p className="about-text-blk about-name" data-page="about" data-tag="team-member-7-name"></p>
                                <p className="about-text-blk about-position" data-page="about" data-tag="team-member-7-position"></p>
                            </div>
                        </div>
                    </div>
                    {/* team member end */}
                </div>
            </div>
            {/* flexbox team end */}

            {/* about-Page-Header-v2 start */}
            <div className="about-header about-header-box">
                <h1 className="header-text" data-tag="got-talent">
                    </h1>
                    <h1 className="header-text" data-page="about" data-tag="join-team-header"></h1>
            
                <p data-page="about" data-tag="join-team"></p>
            </div>
            {/* about-Page-Header end */}
           
        </div>

        
    );
}

export default About;
