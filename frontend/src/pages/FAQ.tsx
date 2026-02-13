import { useState } from 'react';
import './FAQ.css';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const faqs: FAQItem[] = [
    {
      category: 'subscription',
      question: 'When will my first box ship?',
      answer: 'Orders placed before the 15th of the month will ship that same month. Orders placed after the 15th will ship the following month. You\'ll receive a tracking email as soon as your box ships!'
    },
    {
      category: 'subscription',
      question: 'Can I pause or cancel my subscription?',
      answer: 'Absolutely! You can pause your subscription for up to 3 months or cancel anytime from your account dashboard. There are no cancellation fees or penalties. If you pause, you\'ll keep your subscriber benefits and can resume anytime.'
    },
    {
      category: 'subscription',
      question: 'How does billing work?',
      answer: 'Monthly subscriptions are billed on the same day each month. 3-month and 6-month subscriptions are billed upfront for the entire period. All subscriptions automatically renew unless you cancel before the renewal date.'
    },
    {
      category: 'subscription',
      question: 'Can I change my subscription plan?',
      answer: 'Yes! You can upgrade or downgrade your plan anytime. Changes will take effect at your next billing cycle. Contact our support team if you need help making changes.'
    },
    {
      category: 'shipping',
      question: 'Where do you ship?',
      answer: 'We ship throughout the United States and Canada. Shipping is free for addresses in the Great Lakes states (Michigan, Wisconsin, Illinois, Indiana, Ohio, Pennsylvania, Minnesota, New York) and Ontario. A small shipping fee applies for other regions.'
    },
    {
      category: 'shipping',
      question: 'How long does shipping take?',
      answer: 'Most boxes arrive within 5-7 business days of shipping. Great Lakes region typically receives boxes in 3-5 business days. You\'ll receive tracking information via email.'
    },
    {
      category: 'shipping',
      question: 'Can I ship to multiple addresses?',
      answer: 'Each subscription ships to one address, but you can update your shipping address anytime from your account. If you want to send boxes to multiple addresses, you\'ll need separate subscriptions for each.'
    },
    {
      category: 'shipping',
      question: 'What if my box is damaged or lost?',
      answer: 'We package everything carefully, but accidents happen. If your box arrives damaged or goes missing, contact us within 7 days and we\'ll send a replacement at no charge.'
    },
    {
      category: 'products',
      question: 'What age are the books appropriate for?',
      answer: 'Most books are designed for ages 4-12, though many families enjoy reading them together regardless of age. Each month\'s book listing includes a specific age range recommendation. The stories are engaging for young listeners and early readers alike.'
    },
    {
      category: 'products',
      question: 'Is the coffee decaf available?',
      answer: 'Currently, we feature the roaster\'s standard roast each month, which is typically caffeinated. However, we\'re working on offering decaf options in the future. Contact us if you have specific dietary needs.'
    },
    {
      category: 'products',
      question: 'Can I preview upcoming boxes?',
      answer: 'We love to keep some surprise and delight in each box! However, we do share sneak peeks and themes on our social media channels about 2 weeks before boxes ship. Follow us to get early hints!'
    },
    {
      category: 'products',
      question: 'Are the books hardcover or paperback?',
      answer: 'All Homeground books are high-quality hardcover editions with beautiful illustrations. We believe books should be treasured keepsakes that can be enjoyed for years to come.'
    },
    {
      category: 'gifting',
      question: 'How do gift subscriptions work?',
      answer: 'Select the 3 or 6-month gift option at checkout, provide the recipient\'s address and your gift message. We\'ll include a beautiful greeting card in the first box. Gift subscriptions don\'t auto-renew, but recipients can continue their subscription if they wish.'
    },
    {
      category: 'gifting',
      question: 'Can I choose when a gift subscription starts?',
      answer: 'Yes! During checkout, you can select the month you want the first box to arrive. This is perfect for birthdays, holidays, or special occasions.'
    },
    {
      category: 'gifting',
      question: 'Will the recipient see the price?',
      answer: 'No, gift boxes don\'t include any pricing information. The recipient will receive their box with your gift card and can manage their delivery schedule through their own account.'
    },
    {
      category: 'account',
      question: 'How do I update my account information?',
      answer: 'Log into your account dashboard to update your shipping address, payment method, subscription preferences, and contact information. Changes to shipping addresses must be made before the 15th to apply to that month\'s box.'
    },
    {
      category: 'account',
      question: 'I forgot my password. How do I reset it?',
      answer: 'Click "Forgot Password" on the login page. We\'ll send a password reset link to your email. If you don\'t receive it within a few minutes, check your spam folder or contact support.'
    },
    {
      category: 'account',
      question: 'Can I have multiple subscriptions?',
      answer: 'Yes! Many grandparents, aunts, uncles, and teachers maintain multiple subscriptions for different households or classrooms. Each subscription can ship to a different address.'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'subscription', label: 'Subscription' },
    { id: 'shipping', label: 'Shipping' },
    { id: 'products', label: 'Products' },
    { id: 'gifting', label: 'Gifting' },
    { id: 'account', label: 'Account' }
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filteredFAQs = activeCategory === 'all'
    ? faqs
    : faqs.filter(faq => faq.category === activeCategory);

  return (
    <div className="faq">
      <section className="faq-hero">
        <div className="container">
          <h1>Frequently Asked Questions</h1>
          <p className="faq-lead">
            Find answers to common questions about Homeground subscriptions, shipping, products, and more.
            Can't find what you're looking for? We're here to help!
          </p>
        </div>
      </section>

      <section className="faq-content section">
        <div className="container">
          <div className="faq-categories">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="faq-list">
            {filteredFAQs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                onClick={() => toggleFAQ(index)}
              >
                <div className="faq-question">
                  <h3>{faq.question}</h3>
                  <span className="faq-icon">{activeIndex === index ? '−' : '+'}</span>
                </div>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-contact section" style={{ backgroundColor: 'var(--sandy-beige)' }}>
        <div className="container">
          <div className="contact-box">
            <h2>Still Have Questions?</h2>
            <p>
              Our friendly customer support team is here to help! We typically respond within 24 hours
              on business days.
            </p>
            <div className="contact-methods">
              <div className="contact-method">
                <div className="method-icon">📧</div>
                <h3>Email Us</h3>
                <p>hello@homeground.com</p>
              </div>
              <div className="contact-method">
                <div className="method-icon">💬</div>
                <h3>Live Chat</h3>
                <p>Available Mon-Fri, 9am-5pm EST</p>
              </div>
              <div className="contact-method">
                <div className="method-icon">📞</div>
                <h3>Call Us</h3>
                <p>(555) 123-4567</p>
              </div>
            </div>
            <a href="/contact" className="btn btn-primary">Contact Support</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FAQ;
