import { Link } from 'react-router-dom';
import './MonthlyBox.css';

function MonthlyBox() {
  const sampleBoxes = [
    {
      month: 'November 2024',
      theme: 'Lake Superior Legends',
      book: {
        title: 'The Lighthouse Keeper\'s Secret',
        author: 'Emily Waters',
        ageRange: '6-10 years',
        description: 'Follow young Maya as she discovers the mysterious history of Split Rock Lighthouse and learns about the brave keepers who saved countless ships from Lake Superior\'s fierce storms.'
      },
      coffee: {
        name: 'Superior Sunrise Blend',
        roaster: 'North Shore Coffee Co.',
        location: 'Duluth, Minnesota',
        notes: 'Bright citrus notes with hints of caramel, perfect for crisp autumn mornings',
        origin: 'Ethiopian & Colombian blend'
      },
      factCard: 'Lake Superior: The largest freshwater lake by surface area in the world',
      activity: 'Build your own mini lighthouse model (materials included!)'
    },
    {
      month: 'October 2024',
      theme: 'Michigan Wildlife Adventures',
      book: {
        title: 'Penny the Piping Plover',
        author: 'Marcus Johnson',
        ageRange: '4-8 years',
        description: 'Join Penny, a brave little piping plover, on her journey along Michigan\'s sandy shores as she learns about protecting her endangered species and the importance of beach conservation.'
      },
      coffee: {
        name: 'Dunes Dark Roast',
        roaster: 'Sleeping Bear Coffee',
        location: 'Empire, Michigan',
        notes: 'Rich chocolate and toasted nut flavors with a smooth finish',
        origin: 'Guatemalan single-origin'
      },
      factCard: 'Sleeping Bear Dunes: Towering sand dunes that rise up to 450 feet above Lake Michigan',
      activity: 'Create a beach habitat diorama with included sand and shells'
    },
    {
      month: 'September 2024',
      theme: 'Great Lakes Shipwrecks',
      book: {
        title: 'The Edmund Fitzgerald Mystery',
        author: 'Sarah Mitchell',
        ageRange: '8-12 years',
        description: 'An age-appropriate adventure story inspired by the famous Great Lakes shipwreck, teaching children about maritime history, weather patterns, and the respect for the power of nature.'
      },
      coffee: {
        name: 'Storm Watch Espresso',
        roaster: 'Harbor Lights Roasting',
        location: 'Milwaukee, Wisconsin',
        notes: 'Bold and robust with dark berry undertones',
        origin: 'Sumatran & Brazilian blend'
      },
      factCard: 'Great Lakes Shipwrecks: Over 6,000 ships have been lost in the Great Lakes',
      activity: 'Weather tracking journal with Great Lakes storm facts'
    },
    {
      month: 'August 2024',
      theme: 'Island Adventures',
      book: {
        title: 'Mackinac Island Magic',
        author: 'Robert Chen',
        ageRange: '5-9 years',
        description: 'Experience the wonder of car-free Mackinac Island through the eyes of twins who spend their summer exploring historic forts, riding horses, and discovering the island\'s unique ecology.'
      },
      coffee: {
        name: 'Island Breeze Blend',
        roaster: 'Straits Coffee Company',
        location: 'Mackinaw City, Michigan',
        notes: 'Light and refreshing with floral notes and honey sweetness',
        origin: 'Costa Rican & Kenyan blend'
      },
      factCard: 'Mackinac Island: No cars allowed since 1898, transportation is by horse, bike, or foot',
      activity: 'Design your own horse-drawn carriage with coloring templates'
    }
  ];

  return (
    <div className="monthly-box">
      <section className="monthly-hero">
        <div className="container">
          <h1>Your Monthly Great Lakes Adventure</h1>
          <p className="monthly-lead">
            Each Homeground box is thoughtfully curated to bring the spirit of the Great Lakes into your home.
            Here's what to expect every month.
          </p>
        </div>
      </section>

      <section className="whats-inside section">
        <div className="container">
          <h2>What's Inside Every Box</h2>
          <div className="inside-grid">
            <div className="inside-item">
              <div className="inside-icon">📖</div>
              <h3>A Themed Children's Book</h3>
              <p>Beautifully illustrated stories that celebrate Great Lakes culture, history, wildlife, and adventure. Age-appropriate for 4-12 years.</p>
            </div>

            <div className="inside-item">
              <div className="inside-icon">☕</div>
              <h3>Artisan Coffee (12 oz)</h3>
              <p>Small-batch roasted coffee from a different Great Lakes roaster each month, complete with tasting notes and roaster profile.</p>
            </div>

            <div className="inside-item">
              <div className="inside-icon">🗺️</div>
              <h3>Educational Fact Card</h3>
              <p>Learn fascinating facts about the featured Great Lakes location, including geography, ecology, and local history.</p>
            </div>

            <div className="inside-item">
              <div className="inside-icon">🎨</div>
              <h3>Family Activity</h3>
              <p>A themed activity, craft, or prompt to extend the learning and fun beyond the book (materials sometimes included!).</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sample-boxes section" style={{ backgroundColor: 'var(--sandy-beige)' }}>
        <div className="container">
          <h2>Recent Box Highlights</h2>
          <p className="section-intro">Take a peek at some of our recent monthly adventures:</p>

          <div className="boxes-list">
            {sampleBoxes.map((box, index) => (
              <div key={index} className="box-card">
                <div className="box-header">
                  <span className="box-month">{box.month}</span>
                  <h3>{box.theme}</h3>
                </div>

                <div className="box-content">
                  <div className="box-section">
                    <div className="section-label">
                      <span className="label-icon">📚</span>
                      <h4>Featured Book</h4>
                    </div>
                    <div className="book-info">
                      <p className="book-title">{box.book.title}</p>
                      <p className="book-meta">by {box.book.author} • Ages {box.book.ageRange}</p>
                      <p className="book-description">{box.book.description}</p>
                    </div>
                  </div>

                  <div className="box-section">
                    <div className="section-label">
                      <span className="label-icon">☕</span>
                      <h4>Featured Coffee</h4>
                    </div>
                    <div className="coffee-info">
                      <p className="coffee-name">{box.coffee.name}</p>
                      <p className="coffee-meta">{box.coffee.roaster} • {box.coffee.location}</p>
                      <p className="coffee-notes">{box.coffee.notes}</p>
                      <p className="coffee-origin">Origin: {box.coffee.origin}</p>
                    </div>
                  </div>

                  <div className="box-extras">
                    <div className="extra-item">
                      <strong>Did You Know?</strong>
                      <p>{box.factCard}</p>
                    </div>
                    <div className="extra-item">
                      <strong>Family Activity:</strong>
                      <p>{box.activity}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="box-cta section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Collection?</h2>
            <p>Join us on a year-round journey through the Great Lakes region</p>
            <Link to="/subscription" className="btn btn-primary btn-large">Choose Your Plan</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MonthlyBox;
