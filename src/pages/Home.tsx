import { Link } from 'react-router-dom';
import './Home.css';
import heroImage from '../assets/pexels-125322096-9990576 copy.jpg';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <img
          src={heroImage}
          alt="Great Lakes beach and lifeguard tower"
          className="hero-background"
        />
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Hand-Picked. Personalized. Delivered.</h1>
            <p className="hero-subtitle">Great Lakes Stories.</p>
            <div className="hero-cta">
              <Link to="/subscription" className="btn btn-hero">Start Your Adventure</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="features section">
        <div className="container">
          <h2>What Makes Homeground Special</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="10" y="15" width="30" height="40" fill="#4a90c7" rx="2"/>
                  <rect x="15" y="20" width="20" height="25" fill="#7eb3d8"/>
                  <path d="M20 30 L30 35 L20 40" fill="#1e5a7d"/>
                </svg>
              </div>
              <h3>Beautifully Illustrated Books</h3>
              <p>Each month features a captivating children's book set in or inspired by the Great Lakes, teaching kids about local wildlife, history, and adventure.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="15" y="20" width="30" height="35" fill="#4a7c59" rx="3"/>
                  <circle cx="30" cy="35" r="8" fill="#8ba888"/>
                  <path d="M25 30 Q30 25 35 30" stroke="white" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <h3>Artisan Coffee</h3>
              <p>Discover specialty coffee from Great Lakes roasters, carefully selected to bring warmth and comfort to your reading time.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="30" cy="30" r="25" stroke="#4a90c7" strokeWidth="3" fill="none"/>
                  <circle cx="30" cy="30" r="5" fill="#1e5a7d"/>
                  <path d="M30 15 L30 5 M30 55 L30 45 M15 30 L5 30 M55 30 L45 30" stroke="#4a90c7" strokeWidth="3"/>
                </svg>
              </div>
              <h3>Educational Adventures</h3>
              <p>Every box includes a fact card about the featured Great Lakes location and family activities to inspire curiosity and connection.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works section" style={{ backgroundColor: 'var(--white)' }}>
        <div className="container">
          <h2>How It Works</h2>
          <div className="steps-grid">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Choose Your Plan</h3>
              <p>Select monthly, 3-month, or 6-month subscription options that fit your family's needs.</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Receive Your Box</h3>
              <p>Each month, a carefully curated box arrives at your doorstep with a new book, coffee, and surprises.</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Explore Together</h3>
              <p>Share stories with your children while enjoying your coffee, and discover the Great Lakes as a family.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials section">
        <div className="container">
          <h2>What Families Are Saying</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p>"My kids look forward to Homeground box day every month! The books are beautifully written and the coffee is outstanding. It's become our special family tradition."</p>
              <div className="testimonial-author">
                <strong>Sarah M.</strong>
                <span>Michigan</span>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p>"As a teacher and a coffee lover, this subscription is perfect. The books are educational and engaging, and I love supporting local Great Lakes roasters."</p>
              <div className="testimonial-author">
                <strong>James T.</strong>
                <span>Wisconsin</span>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p>"Homeground has taught our family so much about the Great Lakes region. The combination of reading time and coffee time is genius!"</p>
              <div className="testimonial-author">
                <strong>Emily R.</strong>
                <span>Minnesota</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Adventure?</h2>
            <p>Join families across the Great Lakes region in discovering local stories and flavors.</p>
            <Link to="/subscription" className="btn btn-primary btn-large">Subscribe Now</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
