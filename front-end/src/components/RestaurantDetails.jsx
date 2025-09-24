function RestaurantDetails() {
    return (
        <div className="restaurant-details">

            <div className="info-section">
                <div className="map-container">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1456.1522347915813!2d21.45671664270639!3d42.46920269393103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1723300766044!5m2!1sen!2s"
                        width="100%" 
                        height="150" 
                        style={{ border: 0 }} 
                        allowFullScreen 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
                <div className="restaurant-info">
                    <h2>Samite Gastro Bar (Monasty Hotel)</h2>
                    <p>231 027 4545</p>
                    <p>Thessaloniki, Central Macedonia 54623</p>
                    <a href="Get Directions" className="directions-button">Get Directions</a>
                    <a href="tel:+302310274545" className="phone-link">+30 231 027 4545</a>
                    <a href="https://www.i-host.gr/reservations/new?re..." className="website-link">Website</a>
                </div>
            </div>
        </div>
    );
}

export default RestaurantDetails;