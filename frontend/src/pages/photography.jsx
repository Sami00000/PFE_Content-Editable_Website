import React from "react";
import useTextContent from '../hooks/useTextContent';
import useImageContent from '../hooks/useImageContent';
import useHeadingContent from '../hooks/useHeadingContent';
function Photography(){
    useTextContent();
    useImageContent();
    useHeadingContent();
    return (
        <div className="photography-container">
            <div className="photography-header">
                <div className="photography-header-text">
                    <h1 data-page="photography" data-tag="header-title"></h1>
                    <p data-page="photography" data-tag="header-parg"></p>
                </div>
                <img src="src\assets\images\photography\photographer.jpg" alt="photographer" />
            </div>
            <div className="photography-body">
                <div className="photography-geners">
                    <div>
                        <img src="src\assets\images\photography\event.jpg" data-page="photography" data-tag="1st-img"/>
                        <img src="src\assets\images\photography\portrait.webp" data-page="photography" data-tag="2nd-img"/>
                    </div>
                    <div>
                        <img src="src\assets\images\photography\wedding.jpg" data-page="photography" data-tag="3rd-img" />
                        <img src="src\assets\images\photography\commercial-photography.jpg" data-page="photography" data-tag="4th-img" />
                    </div>
                </div>
                <div className="photography-form-container">
                    <form className="photography-form">
                        <div className="fullname">
                            <div>
                                <label data-page="photography" data-tag="firstname-label">First Name </label>
                                <input name="firstname" type="text" placeholder="first name ..." /> 
                            </div>
                            <div>
                                <label data-page="photography" data-tag="lastname-label">Last Name </label>
                                <input name="lastname" type="text" placeholder="last name ..." /> 
                            </div>
                        </div>
                        <div className="tel">
                            <label data-page="photography" data-tag="tel-label"> Tel </label>
                            <input name="tel" type="number" placeholder="numéro tel .."/>
                        </div>
                        <div className="Email">
                            <label data-page="photography" data-tag="email-label"> Email </label>
                            <input name="email" type="email" placeholder="email .."/>
                        </div>
                        <div className="form-location">
                            <label data-page="photography" data-tag="location-label"> Location </label>
                            <input name="location" type="text" placeholder="location .."/>
                        </div>
                        <div className="genre">
                            <label data-page="photography" data-tag="genre-label"> gener </label>
                            <select name="genre">
                                <option value="portrait">portrait</option>
                                <option value="wedding">wedding</option>
                            </select>
                        </div>
                        <div className="date">
                            <div>
                                <label data-page="photography" data-tag="start-date-label">from  </label>
                                <input name="debDate" type="date"  /> 
                            </div>
                            <div>
                                <label data-page="photography" data-tag="end-date-label">to </label>
                                <input name="finDate" type="date" /> 
                            </div>
                        </div>
                        <div className="submit">
                            <button type="submit" data-page="photography" data-tag="btn">submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Photography;