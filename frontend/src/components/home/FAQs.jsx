import React, { useEffect, useState } from "react";
import { PiPlusBold } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import axios from 'axios';
function FAQs(){
    const handleAnswer = (e) => {
        const parentNode = e.currentTarget.parentNode;
        let answer = parentNode.querySelector('.answer');
        let icon = parentNode.querySelector('.mark-icon');
        answer.classList.toggle('hidden-answer');
        icon.classList.toggle('rotated');
        let answers = document.querySelectorAll('.answer');
        let icons = document.querySelectorAll('.mark-icon');
        answers.forEach((ans) => {
            if(!ans.classList.contains('hidden-answer') && ans != answer){
                ans.classList.add('hidden-answer');
            }
        })
        icons.forEach((mark) => {
            if(mark.classList.contains('rotated') && icon != mark){
                mark.classList.remove('rotated');
            }
        })
    }
    const [faqs, setFaqs] = useState([]);
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/faqs/top/')
            .then(response => {
                setFaqs(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            });
    },[])
    return (
        <div className="questions-section">
            <h1>Frequently Asked Questions </h1>
            <div className="questions-container">
                {faqs.map(faq => (
                    <div className="question-container" key={faq.id}>
                    <div className="question-title" onClick={(e) => {handleAnswer(e)}}>
                        <p>{faq.questionText}</p>
                        <span className="mark-icon"><PiPlusBold /></span>
                    </div>
                    <p className="answer hidden-answer">
                        {faq.questionRespond}
                    </p>
                    </div>
                ))}
            </div> 
            <div className="ask-us">
                <div>
                <p>have more questions ? </p> 
                <NavLink to="/contact">contact us</NavLink>
                </div>
            </div>
        </div>
    )
}
export default FAQs