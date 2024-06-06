import React from "react";
import Service from "../components/home/Service";
import Reviews from "../components/home/Reviews";
import FAQs from "../components/home/FAQs";
import useTextContent from '../hooks/useTextContent';
import useImageContent from '../hooks/useImageContent';
import useHeadingContent from '../hooks/useHeadingContent';

function Home(){
    useTextContent();
    useImageContent();
    useHeadingContent();
    

    return (
        <div className="homepage-wrapper">

                        {/* about-Page-Header start */}
                        <div className="homepage-header homepage-header-s">
                <h1 className="header-text" data-page="homepage" data-tag="Hero Header">
                </h1>
               
              
                <p data-page="homepage" data-tag="hero quote" ></p>
           
              
            </div>
            {/* about-Page-Header end */}
            <div className="about-page-wrapper">
<br/><br/><br/><br/>
          </div>
            <Service />
            <Reviews />
            <FAQs />
        </div>
    );
}
export default Home;