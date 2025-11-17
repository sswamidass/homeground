import { useState } from 'react';
import './Subscription.css';

function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState<string>('monthly');

  const plans = [
    {
      id: 'monthly',
      name: 'Monthly',
      price: '$42',
      billing: 'per month',
      savings: null,
      features: [
        'One book + one bag of coffee',
        'Educational fact card',
        'Family activity or craft',
        'Free shipping in Great Lakes region',
        'Cancel anytime'
      ],
      popular: false
    },
    {
      id: '3-month',
      name: '3-Month',
      price: '$115',
      billing: 'billed quarterly',
      savings: 'Save $11',
      features: [
        'Everything in Monthly',
        '$38.33 per box',
        'Priority customer support',
        'Exclusive seasonal extras',
        'Flexible delivery schedule'
      ],
      popular: true
    },
    {
      id: '6-month',
      name: '6-Month',
      price: '$220',
      billing: 'billed semi-annually',
      savings: 'Save $32',
      features: [
        'Everything in 3-Month',
        '$36.67 per box',
        'Bonus welcome gift',
        'Exclusive roaster discounts',
        'Gift one box to a friend'
      ],
      popular: false
    }
  ];

  const testimonials = [
    {
      quote: 'Homeground has become our favorite family tradition. The books are exceptional and the coffee keeps me going through bedtime stories!',
      author: 'Rachel K.',
      location: 'Chicago, IL',
      plan: '6-Month Subscriber'
    },
    {
      quote: 'I gifted this to my sister and her kids. They absolutely love it! The educational content is top-notch.',
      author: 'David M.',
      location: 'Toronto, ON',
      plan: '3-Month Gift'
    },
    {
      quote: 'As a teacher and parent, I appreciate the quality and thoughtfulness of every box. Worth every penny!',
      author: 'Amanda S.',
      location: 'Grand Rapids, MI',
      plan: 'Monthly Subscriber'
    }
  ];

  return (
    <div className="subscription">
      <section className="subscription-hero">
        <div className="container">
          <h1>Choose Your Adventure</h1>
          <p className="subscription-lead">
            Select the plan that works best for your family. All subscriptions include the same high-quality
            books, artisan coffee, and educational content—just choose your commitment level.
          </p>
        </div>
      </section>

      <section className="pricing-section section">
        <div className="container">
          <div className="plans-grid">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`plan-card ${selectedPlan === plan.id ? 'selected' : ''} ${plan.popular ? 'popular' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && <div className="popular-badge">Most Popular</div>}
                <h3>{plan.name}</h3>
                <div className="plan-price">
                  <span className="price-amount">{plan.price}</span>
                  <span className="price-billing">{plan.billing}</span>
                </div>
                {plan.savings && <div className="plan-savings">{plan.savings}</div>}
                <ul className="plan-features">
                  {plan.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <button className="btn btn-primary plan-button">
                  {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                </button>
              </div>
            ))}
          </div>

          <div className="subscription-note">
            <p>All plans automatically renew. You can pause or cancel anytime from your account dashboard.</p>
          </div>
        </div>
      </section>

      <section className="value-section section" style={{ backgroundColor: 'var(--sandy-beige)' }}>
        <div className="container">
          <h2>What You're Really Getting</h2>
          <div className="value-breakdown">
            <div className="value-item">
              <div className="value-amount">$22</div>
              <p>Hardcover children's book<br/>(Retail value)</p>
            </div>
            <div className="value-plus">+</div>
            <div className="value-item">
              <div className="value-amount">$16</div>
              <p>12 oz artisan coffee<br/>(Retail value)</p>
            </div>
            <div className="value-plus">+</div>
            <div className="value-item">
              <div className="value-amount">$8</div>
              <p>Activities & educational materials</p>
            </div>
            <div className="value-equals">=</div>
            <div className="value-item total">
              <div className="value-amount">$46</div>
              <p>Total retail value<br/><strong>You pay $42/month</strong></p>
            </div>
          </div>
          <p className="value-note">
            Plus, you're supporting local Great Lakes authors, illustrators, and roasters with every box!
          </p>
        </div>
      </section>

      <section className="gifting-section section">
        <div className="container">
          <div className="gifting-content">
            <div className="gifting-text">
              <h2>Give the Gift of Adventure</h2>
              <p>
                Homeground makes a perfect gift for families, grandchildren, teachers, or anyone who loves
                the Great Lakes. Choose a 3 or 6-month gift subscription and we'll include a beautiful
                greeting card with your personalized message.
              </p>
              <ul className="gifting-benefits">
                <li>Delivered with a custom greeting card</li>
                <li>Flexible start date—choose when first box arrives</li>
                <li>Gift recipient can manage their own delivery schedule</li>
                <li>No automatic renewal on gift subscriptions</li>
                <li>Perfect for birthdays, holidays, or just because</li>
              </ul>
              <button className="btn btn-secondary">Give a Gift Subscription</button>
            </div>
            <div className="gifting-visual">
              <img
                src="https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Gift wrapped subscription box"
                className="gifting-image"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-section section" style={{ backgroundColor: 'var(--off-white)' }}>
        <div className="container">
          <h2>What Subscribers Are Saying</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-stars">★★★★★</div>
                <p className="testimonial-quote">"{testimonial.quote}"</p>
                <div className="testimonial-author">
                  <strong>{testimonial.author}</strong>
                  <span>{testimonial.location}</span>
                  <span className="testimonial-plan">{testimonial.plan}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-preview section">
        <div className="container">
          <h2>Common Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>When will my first box ship?</h3>
              <p>Orders placed before the 15th of the month ship that month. Orders after the 15th ship the following month.</p>
            </div>
            <div className="faq-item">
              <h3>Can I pause my subscription?</h3>
              <p>Absolutely! You can pause for up to 3 months or cancel anytime from your account dashboard with no penalties.</p>
            </div>
            <div className="faq-item">
              <h3>What age are the books appropriate for?</h3>
              <p>Most books are designed for ages 4-12. Each month's book includes an age range recommendation.</p>
            </div>
            <div className="faq-item">
              <h3>Do you ship outside the Great Lakes region?</h3>
              <p>Yes! We ship anywhere in the US and Canada. Shipping is free for Great Lakes states/provinces.</p>
            </div>
          </div>
          <p className="faq-link">Have more questions? <a href="/faq">Visit our FAQ page</a></p>
        </div>
      </section>
    </div>
  );
}

export default Subscription;
