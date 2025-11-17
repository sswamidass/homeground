import { useState, FormEvent } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="contact">
      <section className="contact-hero">
        <div className="container">
          <h1>Get In Touch</h1>
          <p className="contact-lead">
            Have questions, feedback, or just want to say hello? We'd love to hear from you!
            Our team is here to help make your Homeground experience exceptional.
          </p>
        </div>
      </section>

      <section className="contact-main section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Let's Connect</h2>
              <p>
                Whether you're a current subscriber, considering joining our community, or interested in
                partnering with us, we're here to help. We typically respond within 24 hours on business days.
              </p>

              <div className="info-cards">
                <div className="info-card">
                  <div className="info-icon">📧</div>
                  <h3>Email</h3>
                  <p>hello@homeground.com</p>
                  <span className="info-note">General inquiries & support</span>
                </div>

                <div className="info-card">
                  <div className="info-icon">📞</div>
                  <h3>Phone</h3>
                  <p>(555) 123-4567</p>
                  <span className="info-note">Mon-Fri, 9am-5pm EST</span>
                </div>

                <div className="info-card">
                  <div className="info-icon">📍</div>
                  <h3>Address</h3>
                  <p>
                    123 Lakeshore Drive<br/>
                    Traverse City, MI 49684
                  </p>
                  <span className="info-note">Visit by appointment</span>
                </div>
              </div>

              <div className="social-connect">
                <h3>Follow Our Journey</h3>
                <div className="social-links">
                  <a href="#" aria-label="Facebook">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" aria-label="Instagram">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="#" aria-label="Pinterest">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a href="#" aria-label="Twitter">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-form-container">
              <h2>Send Us a Message</h2>
              {submitted ? (
                <div className="form-success">
                  <div className="success-icon">✓</div>
                  <h3>Thank You!</h3>
                  <p>We've received your message and will get back to you soon.</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Smith"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="subscription">Subscription Question</option>
                      <option value="shipping">Shipping Inquiry</option>
                      <option value="product">Product Question</option>
                      <option value="partnership">Partnership Opportunity</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Tell us how we can help..."
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary btn-large">Send Message</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="partnerships section" style={{ backgroundColor: 'var(--sandy-beige)' }}>
        <div className="container">
          <h2>Partnership Opportunities</h2>
          <p className="partnerships-intro">
            Are you a Great Lakes author, illustrator, or coffee roaster? We'd love to hear from you!
            We're always looking to collaborate with talented creators who share our passion for the region.
          </p>
          <div className="partnerships-grid">
            <div className="partnership-card">
              <h3>Authors & Illustrators</h3>
              <p>Share your Great Lakes stories with families across the region. We publish original works and feature established titles.</p>
              <a href="mailto:creators@homeground.com" className="btn btn-outline">Contact Our Editorial Team</a>
            </div>
            <div className="partnership-card">
              <h3>Coffee Roasters</h3>
              <p>Showcase your craft to our community of coffee-loving families. We feature one roaster each month.</p>
              <a href="mailto:roasters@homeground.com" className="btn btn-outline">Partner With Us</a>
            </div>
            <div className="partnership-card">
              <h3>Retailers & Organizations</h3>
              <p>Interested in offering Homeground at your store or organization? Let's discuss bulk and wholesale options.</p>
              <a href="mailto:partnerships@homeground.com" className="btn btn-outline">Explore Wholesale</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
