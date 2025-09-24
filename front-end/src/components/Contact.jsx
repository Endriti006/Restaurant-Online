import React from "react"

export default function Contact(){
    return(
        <div className="contact wrapper-md">
            <div className="contact-left">
                <h1>Contact</h1>
                <div className="contact-container">
                    <div>
                        <h3>General inquires:</h3>
                        <p>Email</p>
                        <a href="">info@resy.com</a>
                    </div>

                    <div>
                        <h3>Resy user inquires:</h3>
                        <p>See our FAQ below. If you have additional questions, email</p>
                        <a href="">help@resy.com</a>
                    </div>

                    <div>
                        <h3>Resy restaurant inquiries:</h3>
                        <p>Visit the Resy Helpdesk. If you have additional questions, email</p>
                        <a href="">support@resy.com</a>
                    </div>

                    <div>
                        <h3>Media inquiries:</h3>
                        <p>Visit the</p>
                        <a href="">Resy Newsroom</a>
                    </div>
                </div>
            </div>

            <div className="contact-right">
                <h1>FAQ</h1>

                <div className="faq-container">

                    <div>
                        <h3>Trying to cancel an existing reservation?</h3>
                        <p>If you are trying to cancel an existing reservation, please refer to the cancelation policy that was provided in your confirmation email, 
                            as policy varies by restaurant and by reservation. (This information is also available in the Resy app and is stated with your reservation.) 
                            If you have any additional questions, email <a href="">help@resy.com.</a></p>
                    </div>

                    <div>
                        <h3>Need help with Resy OS?</h3>
                        <p>If you are a restaurant using Resy OS and need assistance, head to helpdesk.resy.com where you can find articles on how to use the Resy platform. 
                            If you need additional assistance, you can live chat the Resy Support team or email <a href="">support@resy.com</a>.</p>
                    </div>

                    <div>
                        <h3>Interested in joining our Resy restaurant community?</h3>
                        <p>Great, we would love to have you! To learn more about Resy OS and why businesses choose it to power their restaurants, head to <a href="">resy.com/resyos</a>.</p>
                    </div>

                    <div>
                        <h3>Interested in joining our team?</h3>
                        <p>Here at Resy, an American Express company, we back our colleagues with the support they need professionally and personally. We offer a flexible working 
                            model, and roles vary between onsite, hybrid, and completely virtual. We offer the perks of a tech company (restaurant perks, Health & Wellness budget,
                            team meals and events) with the stability and backing of American Express. <a href="">See open roles here</a>.</p>
                    </div>

                </div>
            </div>
        </div>
    )
}