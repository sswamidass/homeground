import './Books.css';

function Books() {
  const books = [
    {
      title: 'The Lighthouse Keeper\'s Secret',
      author: 'Emily Waters',
      illustrator: 'Michael Torres',
      ageRange: '6-10 years',
      theme: 'Lake Superior History & Bravery',
      description: 'Maya discovers the mysterious history of Split Rock Lighthouse and learns about the brave keepers who saved countless ships from fierce storms.',
      features: ['28 pages', 'Full-color illustrations', 'Historical facts section']
    },
    {
      title: 'Penny the Piping Plover',
      author: 'Marcus Johnson',
      illustrator: 'Sofia Chen',
      ageRange: '4-8 years',
      theme: 'Michigan Wildlife & Conservation',
      description: 'Join Penny, a brave little piping plover, on her journey along Michigan\'s sandy shores as she learns about protecting endangered species.',
      features: ['24 pages', 'Watercolor illustrations', 'Wildlife guide included']
    },
    {
      title: 'The Edmund Fitzgerald Mystery',
      author: 'Sarah Mitchell',
      illustrator: 'David Park',
      ageRange: '8-12 years',
      theme: 'Maritime History & Weather',
      description: 'An age-appropriate adventure story inspired by the famous Great Lakes shipwreck, teaching about maritime history and nature\'s power.',
      features: ['32 pages', 'Detailed illustrations', 'Weather science facts']
    },
    {
      title: 'Mackinac Island Magic',
      author: 'Robert Chen',
      illustrator: 'Lisa Anderson',
      ageRange: '5-9 years',
      theme: 'Island Life & History',
      description: 'Experience the wonder of car-free Mackinac Island through the eyes of twins exploring historic forts, riding horses, and discovering unique ecology.',
      features: ['28 pages', 'Vibrant illustrations', 'Island map included']
    },
    {
      title: 'Sturgeon River Adventure',
      author: 'Jennifer Williams',
      illustrator: 'Alex Martinez',
      ageRange: '6-10 years',
      theme: 'River Ecosystems & Fish',
      description: 'Follow Sammy the sturgeon on an incredible journey through Great Lakes rivers, learning about ancient fish species and water conservation.',
      features: ['26 pages', 'Educational diagrams', 'Ecosystem poster']
    },
    {
      title: 'Winter Waves of Lake Erie',
      author: 'Thomas Brown',
      illustrator: 'Rachel Kim',
      ageRange: '4-8 years',
      theme: 'Seasons & Lake Effect Weather',
      description: 'Discover how Lake Erie transforms through the seasons and why lake effect snow creates winter wonderlands in nearby communities.',
      features: ['24 pages', 'Seasonal illustrations', 'Weather tracking chart']
    },
    {
      title: 'The Ice Breaker\'s Journey',
      author: 'Patricia Davis',
      illustrator: 'James Wilson',
      ageRange: '7-11 years',
      theme: 'Ships & Winter Navigation',
      description: 'Climb aboard with Captain Kate as her ice breaker clears shipping lanes through frozen Great Lakes, keeping commerce moving all winter long.',
      features: ['30 pages', 'Technical illustrations', 'Ship diagram poster']
    },
    {
      title: 'Dunes of Indiana',
      author: 'Kevin Martinez',
      illustrator: 'Emma Thompson',
      ageRange: '5-9 years',
      theme: 'Sand Dunes & Geology',
      description: 'Explore the magical Indiana Dunes where forests meet beaches, and learn how wind and water sculpted these towering sand mountains.',
      features: ['26 pages', 'Nature illustrations', 'Dune formation guide']
    }
  ];

  return (
    <div className="books">
      <section className="books-hero">
        <div className="container">
          <h1>Great Lakes Stories for Young Explorers</h1>
          <p className="books-lead">
            Every Homeground book is carefully crafted to inspire curiosity, celebrate the Great Lakes region,
            and create meaningful moments between parents and children.
          </p>
        </div>
      </section>

      <section className="books-philosophy section">
        <div className="container">
          <div className="philosophy-content">
            <div className="philosophy-text">
              <h2>Our Book Philosophy</h2>
              <p>
                We believe children's books should do more than entertain—they should educate, inspire, and
                connect young readers to the world around them. Each Homeground book:
              </p>
              <ul className="philosophy-list">
                <li>Features beautiful, engaging illustrations that bring stories to life</li>
                <li>Celebrates authentic Great Lakes culture, history, and natural beauty</li>
                <li>Teaches age-appropriate lessons about ecology, community, and courage</li>
                <li>Includes educational content that extends learning beyond the story</li>
                <li>Represents diverse characters and perspectives from across the region</li>
              </ul>
            </div>
            <div className="philosophy-visual">
              <div className="book-stack">
                <div className="stack-book" style={{ backgroundColor: 'var(--lake-blue)' }}></div>
                <div className="stack-book" style={{ backgroundColor: 'var(--forest-green)' }}></div>
                <div className="stack-book" style={{ backgroundColor: 'var(--deep-blue)' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="books-gallery section" style={{ backgroundColor: 'var(--sandy-beige)' }}>
        <div className="container">
          <h2>Featured Books in Our Collection</h2>
          <div className="books-grid">
            {books.map((book, index) => (
              <div key={index} className="book-card">
                <div className="book-cover-placeholder">
                  <svg viewBox="0 0 200 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="200" height="280" fill={`hsl(${index * 45}, 60%, 55%)`} rx="4"/>
                    <circle cx="100" cy="100" r="40" fill="white" opacity="0.3"/>
                    <rect x="30" y="160" width="140" height="8" fill="white" opacity="0.5" rx="4"/>
                    <rect x="30" y="180" width="100" height="6" fill="white" opacity="0.4" rx="3"/>
                  </svg>
                </div>
                <div className="book-details">
                  <span className="book-age-tag">{book.ageRange}</span>
                  <h3>{book.title}</h3>
                  <p className="book-creators">
                    <strong>Written by:</strong> {book.author}<br/>
                    <strong>Illustrated by:</strong> {book.illustrator}
                  </p>
                  <p className="book-theme">
                    <strong>Theme:</strong> {book.theme}
                  </p>
                  <p className="book-description">{book.description}</p>
                  <ul className="book-features">
                    {book.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="authors-section section">
        <div className="container">
          <h2>Meet Our Authors & Illustrators</h2>
          <p className="section-intro">
            We partner with talented authors and illustrators from across the Great Lakes region who share our
            passion for quality storytelling and local culture.
          </p>
          <div className="authors-benefits">
            <div className="benefit-item">
              <h3>Regional Expertise</h3>
              <p>Our creators live in or have deep connections to the Great Lakes, bringing authentic perspectives to every story.</p>
            </div>
            <div className="benefit-item">
              <h3>Educational Focus</h3>
              <p>Each book is researched and reviewed to ensure accuracy in historical, scientific, and cultural content.</p>
            </div>
            <div className="benefit-item">
              <h3>Award-Winning Talent</h3>
              <p>We work with authors and illustrators who have received recognition for their contributions to children's literature.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Books;
