import React, { useState } from 'react';
import axios from 'axios';
function Contact(){
    const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
    });
const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value
    });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await axios.post('http://localhost:8000/api/question/add', {
            question: formData.message,
            senderemail: formData.email,
            senderfirstname: formData.firstName,
            senderlastname: formData.lastName
        });

        if (response.status === 201) {
          //setSubmissionStatus('Question was created successfully!');
            setFormData({
            firstName: '',
            lastName: '',
            email: '',
            message: ''
        });
        } else {
          //setSubmissionStatus('Failed to submit the question.');
        }
        } catch (error) {
        console.error('Error submitting form:', error);
        //setSubmissionStatus('An error occurred while submitting the form.');
        }
    };
    return (
        <div className="contact-container">
            <section className="form-section">
                <div className="contact-title">
                    <h1>Contact Us</h1>
                    <img src="src\assets\location.PNG" alt="location"  className="location-img"/>
                </div>
                <div className="form-container">
                    <p className="contact-text">               
                        We value your connection and look forward to hearing from you. Our doors are always open for collaboration, questions, or simply to chat about how we can bring your ideas to fruition. Feel free to reach out through the contact form below or connect with us via phone or email. Whether you’re interested in our services, seeking advice, or just want to say hello, our dedicated team is here to assist you. Let’s start a conversation and explore the possibilities together. Your message matters to us, and we’re eager to be a part of your journey. Reach out today, and let’s create something exceptional.
                    </p>
                    <form className="contact-us-form" onSubmit={handleSubmit}>
                        <div className="firstandlast">
                        <div className="first-name">
                            <label>First Name <span>(required)</span></label>
                            <input 
                            type="text" 
                            name="firstName"
                            placeholder="Enter your first name" 
                            value={formData.firstName} 
                            onChange={handleChange}
                            />
                        </div>
                        <div className="last-name">
                            <label>Last Name <span>(required)</span></label>
                            <input 
                            type="text" 
                            name="lastName"
                            placeholder="Enter your last name" 
                            value={formData.lastName} 
                            onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="email">
                        <label>Email <span>(required)</span></label>
                        <input 
                        type="email" 
                        name="email"
                        placeholder="Enter your email" 
                        value={formData.email} 
                        onChange={handleChange}/>
                    </div>
                    <div className="message">
                        <label>Message <span>(required)</span></label>
                        <textarea name="message"  cols="30" rows="10" placeholder="how can we help ?" value={formData.message} onChange={handleChange}></textarea>
                    </div>
                    <div className="submit-btn-container">
                        <button type="submit" className="submit-btn"> submit</button>
                    </div>
                    </form>
                    
                </div>
            </section>
        </div>
    )
}
export default Contact;