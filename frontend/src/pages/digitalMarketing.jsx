import React from "react";
import useTextContent from '../hooks/useTextContent';
import useImageContent from '../hooks/useImageContent';
import useHeadingContent from '../hooks/useHeadingContent';

function DigitalMarketing(){
    useTextContent();
    useImageContent();
    useHeadingContent();
    return (
        <div className="digital-marketing-container">
            <div className="digital-marketing-header">
                <div>
                    <h1 data-page="digitalMarketing" data-tag="header-main-text"></h1>
                    <p data-page="digitalMarketing" data-tag="header-secondary-text"></p>
                </div>
                <img
                    data-page="digitalMarketing"
                    data-tag="header-main-image"
                    src="src\assets\images\digitalMarketing\digital_marketing_main.webp" />
            </div>
            <div className="digital-marketing-intro">
                <h1 data-page="digitalMarketing" data-tag="intro-main-text"></h1>
                <p /*data-page="digitalMarketing" data-tag="intro-secondary-text"*/>
                    In today's business world, having a digital presence is crucial. By investing in this area, you open new perspectives for growth and success for your company!

                    Digital marketing allows you to reach a much wider audience than traditional methods, 
                    specifically targeting prospects who are most likely to be interested in your products 
                    or services. Moreover, it often proves to be more cost-effective than conventional 
                    advertising, allowing you to measure and adjust your performance in real time.

                    By ensuring a robust digital presence, your business remains easily accessible to potential
                    customers. Digital communication channels such as email marketing, social media, 
                    and search engine results offer numerous opportunities for your brand to effectively reach and engage its audience.
                </p>
            </div>
            <div className="digital-marketing-section">
                <div>
                    <h1 data-page="digitalMarketing" data-tag="social-media-strategy-title"></h1>
                    <p  data-page="digitalMarketing" data-tag="intro-3rd-text">
                        Beyond simply creating social media accounts, a clear strategy is essential to ensure your business's success. 
                        we meticulously evaluates your online presence and goals to design a customized social media strategy. 
                        We start with a thorough audit, define the objectives to be achieved, identify your target audience, and determine the type of content to publish. 
                        Next, we select the most relevant platforms for your activity, plan the publication times, and detail other key aspects. Our report also includes performance indicators related to your objectives, 
                        guiding your actions and evaluating the strategy's effectiveness. 
                        If you need help implementing this strategy, our Community Management service is here for you!</p>
                </div>
                <img src="src\assets\images\digitalMarketing\social-media-strategy.jpg" data-page="digitalMarketing" data-tag="intro-3rd-img"/>
            </div>
            <div className="digital-marketing-section bg-black">
                <img src="src\assets\images\digitalMarketing\social-media-advertising.jpg" data-page="digitalMarketing" data-tag="intro-4rd-img"/>
                <div>
                    <h1 data-page="digitalMarketing" data-tag="social-media-ads-title"></h1>
                    <p>
                        Social media advertising is essential for quickly reaching new audiences. 
                        Our Digital Communication agency helps you design and execute effective campaigns on platforms such as Facebook, Instagram, and LinkedIn. 
                        We determine your objectives, identify the most relevant networks for your target audience, and create impactful content. 
                        Then, we plan, execute, and analyze the results of your campaigns to ensure their success.</p>
                </div>
            </div>
            <div className="digital-marketing-section">
                <div>
                    <h1 data-page="digitalMarketing" data-tag="video-marketing-title"></h1>
                    <p>
                    If a picture is worth a thousand words, then what is the value of a video?

                    We provide marketing videos to advertise and market your product or service, 
                    boost engagement on your digital and social channels, educate your consumers and customers,
                    and reach your audience. Our Digital Communication agency produces quality marketing videos that deliver the results you want. 
                    We begin with the planning and preparation phase: what is the objective of the video? Who is the target audience? How does this video contribute to your marketing goals? Then, 
                    we create and edit the video, and finally, we analyze its results.</p>
                </div>
                <img src="src\assets\images\digitalMarketing\video-marketing.jpg" data-page="digitalMarketing" data-tag="intro-5rd-img"/>
            </div>
        </div>
    );
}
export default DigitalMarketing;