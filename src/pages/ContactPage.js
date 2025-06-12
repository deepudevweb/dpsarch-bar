import React, { useState } from 'react';
import './ContactPage.css'; // We will create this CSS file next

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would handle form submission here (e.g., send data to a backend)
    console.log('Contact Form Submitted:', formData);
    alert('Thank you for your message! (This is a demo - no email was sent)');
    setFormData({ name: '', email: '', message: '' }); // Reset form
  };

  return (
    <div className="contact-page-container">
      <h2>Contact Us</h2>
      <p className="intro-text">Have a question or feedback? Fill out the form below to get in touch with us.</p> {/* Added class */}
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="6"
            required
          ></textarea>
        </div>
        <div className="submit-button-wrapper"> {/* Added wrapper */}
          <button type="submit" className="btn btn-primary">Send Message</button>
        </div>
      </form>
    </div>
  );
}

export default ContactPage;
