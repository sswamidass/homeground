import './Coffee.css';

function Coffee() {
  const roasters = [
    {
      name: 'North Shore Coffee Co.',
      location: 'Duluth, Minnesota',
      description: 'Nestled on the shores of Lake Superior, North Shore Coffee Co. roasts small batches with the same care lighthouse keepers once tended their beacons.',
      specialty: 'Light to medium roasts highlighting origin characteristics',
      featured: 'Superior Sunrise Blend - Bright citrus and caramel notes'
    },
    {
      name: 'Sleeping Bear Coffee',
      location: 'Empire, Michigan',
      description: 'Named after the legendary dunes, this family-owned roastery sources sustainable beans and roasts them with the precision of a master craftsman.',
      specialty: 'Rich dark roasts with complex flavor profiles',
      featured: 'Dunes Dark Roast - Chocolate and toasted nuts'
    },
    {
      name: 'Harbor Lights Roasting',
      location: 'Milwaukee, Wisconsin',
      description: 'Drawing inspiration from Milwaukee\'s brewing heritage, Harbor Lights brings the same attention to detail to specialty coffee roasting.',
      specialty: 'Bold espresso blends and single-origin offerings',
      featured: 'Storm Watch Espresso - Dark berry undertones'
    },
    {
      name: 'Straits Coffee Company',
      location: 'Mackinaw City, Michigan',
      description: 'Positioned where Lakes Huron and Michigan meet, Straits Coffee celebrates the connection between two great waters with every perfectly roasted bean.',
      specialty: 'Seasonal blends reflecting Great Lakes character',
      featured: 'Island Breeze Blend - Floral notes and honey sweetness'
    },
    {
      name: 'Erie Shores Roastery',
      location: 'Cleveland, Ohio',
      description: 'A lakefront roastery committed to direct-trade relationships and bringing exceptional coffee to the Great Lakes community.',
      specialty: 'Ethically sourced single-origin coffees',
      featured: 'Lakefront Medium - Balanced and smooth'
    },
    {
      name: 'Thunder Bay Coffee',
      location: 'Thunder Bay, Ontario',
      description: 'Canada\'s Great Lakes representative, Thunder Bay Coffee combines Canadian hospitality with world-class roasting techniques.',
      specialty: 'Smooth, approachable blends for every palate',
      featured: 'Northern Lights Blend - Smooth chocolate finish'
    }
  ];

  return (
    <div className="coffee">
      <section className="coffee-hero">
        <div className="hero-image-container">
          <img
            src="https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Artisan coffee roasting"
            className="page-hero-image"
          />
          <div className="hero-overlay">
            <div className="container">
              <h1>Artisan Coffee from the Great Lakes</h1>
              <p className="coffee-lead">
                Every month, we feature a different small-batch roaster from around the Great Lakes.
                Discover exceptional coffee while supporting local businesses and sustainable practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="coffee-philosophy section">
        <div className="container">
          <h2>Our Coffee Selection Process</h2>
          <div className="selection-grid">
            <div className="selection-card">
              <div className="selection-number">1</div>
              <h3>Regional Focus</h3>
              <p>We exclusively partner with roasters located in the eight Great Lakes states and Ontario, ensuring every bag tells a local story.</p>
            </div>
            <div className="selection-card">
              <div className="selection-number">2</div>
              <h3>Quality Standards</h3>
              <p>Each roaster must demonstrate commitment to quality, from bean sourcing to roasting techniques, ensuring exceptional flavor in every cup.</p>
            </div>
            <div className="selection-card">
              <div className="selection-number">3</div>
              <h3>Ethical Sourcing</h3>
              <p>We prioritize roasters who maintain direct-trade relationships, support sustainable farming, and pay fair prices to coffee growers.</p>
            </div>
            <div className="selection-card">
              <div className="selection-number">4</div>
              <h3>Perfect Pairing</h3>
              <p>Each coffee is thoughtfully paired with the month's book theme, creating a cohesive sensory experience for your family.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="roasters-section section" style={{ backgroundColor: 'var(--sandy-beige)' }}>
        <div className="container">
          <h2>Featured Roasters</h2>
          <p className="section-intro">
            Meet some of the talented roasters who have been featured in Homeground boxes.
            Each brings their unique perspective and passion to every bag they roast.
          </p>

          <div className="roasters-grid">
            {roasters.map((roaster, index) => (
              <div key={index} className="roaster-card">
                <div className="roaster-icon">
                  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="40" cy="40" r="35" fill="var(--forest-green)" opacity="0.2"/>
                    <rect x="25" y="30" width="30" height="40" rx="3" fill="var(--forest-green)"/>
                    <circle cx="40" cy="45" r="10" fill="var(--sage-green)"/>
                    <path d="M35 40 Q40 35 45 40" stroke="white" strokeWidth="2" fill="none"/>
                  </svg>
                </div>
                <h3>{roaster.name}</h3>
                <p className="roaster-location">{roaster.location}</p>
                <p className="roaster-description">{roaster.description}</p>
                <div className="roaster-details">
                  <div className="roaster-specialty">
                    <strong>Specialty:</strong>
                    <p>{roaster.specialty}</p>
                  </div>
                  <div className="roaster-featured">
                    <strong>Featured in Homeground:</strong>
                    <p>{roaster.featured}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tasting-guide section">
        <div className="container">
          <h2>Your Coffee Tasting Guide</h2>
          <p className="section-intro">
            Get the most out of your Homeground coffee with these simple tasting tips.
            Perfect for both coffee enthusiasts and those just beginning their coffee journey.
          </p>

          <div className="guide-content">
            <div className="guide-section">
              <h3>Brewing Tips</h3>
              <ul>
                <li><strong>Water Temperature:</strong> Use water between 195-205°F for optimal extraction</li>
                <li><strong>Coffee Ratio:</strong> Start with 1:16 ratio (1g coffee to 16g water) and adjust to taste</li>
                <li><strong>Freshness:</strong> Use coffee within 2-4 weeks of roast date for best flavor</li>
                <li><strong>Grind Size:</strong> Match grind to your brewing method (we include recommendations)</li>
              </ul>
            </div>

            <div className="guide-section">
              <h3>Tasting Notes</h3>
              <ul>
                <li><strong>Aroma:</strong> Smell the dry grounds, then the brewed coffee—notice the difference</li>
                <li><strong>Body:</strong> Feel the weight and texture of the coffee in your mouth</li>
                <li><strong>Flavor:</strong> Identify primary flavors: fruity, nutty, chocolatey, floral</li>
                <li><strong>Finish:</strong> Notice how flavors linger after swallowing</li>
              </ul>
            </div>

            <div className="guide-section">
              <h3>Storage Tips</h3>
              <ul>
                <li><strong>Container:</strong> Keep beans in an airtight, opaque container</li>
                <li><strong>Location:</strong> Store in a cool, dry place away from light</li>
                <li><strong>Freshness:</strong> Buy whole beans and grind just before brewing</li>
                <li><strong>Amount:</strong> Only buy what you'll use in 2-3 weeks</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="coffee-values section" style={{ backgroundColor: 'var(--off-white)' }}>
        <div className="container">
          <div className="values-content">
            <h2>Committed to Sustainability</h2>
            <p>
              We believe great coffee should be good for everyone involved—from the farmers who grow it,
              to the roasters who craft it, to the families who enjoy it. That's why we partner exclusively
              with roasters who share our commitment to:
            </p>
            <div className="sustainability-grid">
              <div className="sustainability-item">
                <span className="sustainability-icon">🌱</span>
                <h4>Direct Trade Relationships</h4>
                <p>Supporting fair prices and long-term partnerships with coffee farmers</p>
              </div>
              <div className="sustainability-item">
                <span className="sustainability-icon">♻️</span>
                <h4>Eco-Friendly Practices</h4>
                <p>Using sustainable packaging and minimizing environmental impact</p>
              </div>
              <div className="sustainability-item">
                <span className="sustainability-icon">🤝</span>
                <h4>Community Investment</h4>
                <p>Reinvesting in Great Lakes communities and supporting local economies</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Coffee;
