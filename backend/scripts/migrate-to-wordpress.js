#!/usr/bin/env node

/**
 * Homeground Content Migration Script
 * Migrates sample content from React app to WordPress via REST API
 */

const http = require('http');

const API_URL = 'http://localhost:8000/wp-json/wp/v2';

// Sample Books
const books = [
  {
    title: "The Lighthouse Keeper's Secret",
    content: "Maya discovers the mysterious history of Split Rock Lighthouse and learns about the brave keepers who saved countless ships from fierce storms.",
    meta: {
      hg_author: "Emily Waters",
      hg_illustrator: "Michael Torres",
      hg_age_range: "6-10 years",
      hg_theme: "Lake Superior History & Bravery",
      hg_features: JSON.stringify(["28 pages", "Full-color illustrations", "Historical facts section"])
    }
  },
  {
    title: "Penny the Piping Plover",
    content: "Join Penny, a brave little piping plover, on her journey along Michigan's sandy shores as she learns about protecting endangered species.",
    meta: {
      hg_author: "Marcus Johnson",
      hg_illustrator: "Sofia Chen",
      hg_age_range: "4-8 years",
      hg_theme: "Michigan Wildlife & Conservation",
      hg_features: JSON.stringify(["24 pages", "Watercolor illustrations", "Wildlife guide included"])
    }
  },
  {
    title: "The Edmund Fitzgerald Mystery",
    content: "An age-appropriate adventure story inspired by the famous Great Lakes shipwreck, teaching about maritime history and nature's power.",
    meta: {
      hg_author: "Sarah Mitchell",
      hg_illustrator: "David Park",
      hg_age_range: "8-12 years",
      hg_theme: "Maritime History & Weather",
      hg_features: JSON.stringify(["32 pages", "Detailed illustrations", "Weather science facts"])
    }
  },
  {
    title: "Mackinac Island Magic",
    content: "Experience the wonder of car-free Mackinac Island through the eyes of twins exploring historic forts, riding horses, and discovering unique ecology.",
    meta: {
      hg_author: "Robert Chen",
      hg_illustrator: "Lisa Anderson",
      hg_age_range: "5-9 years",
      hg_theme: "Island Life & History",
      hg_features: JSON.stringify(["28 pages", "Vibrant illustrations", "Island map included"])
    }
  },
  {
    title: "Sturgeon River Adventure",
    content: "Follow Sammy the sturgeon on an incredible journey through Great Lakes rivers, learning about ancient fish species and water conservation.",
    meta: {
      hg_author: "Jennifer Williams",
      hg_illustrator: "Alex Martinez",
      hg_age_range: "6-10 years",
      hg_theme: "River Ecosystems & Fish",
      hg_features: JSON.stringify(["26 pages", "Educational diagrams", "Ecosystem poster"])
    }
  },
  {
    title: "Winter Waves of Lake Erie",
    content: "Discover how Lake Erie transforms through the seasons and why lake effect snow creates winter wonderlands in nearby communities.",
    meta: {
      hg_author: "Thomas Brown",
      hg_illustrator: "Rachel Kim",
      hg_age_range: "4-8 years",
      hg_theme: "Seasons & Lake Effect Weather",
      hg_features: JSON.stringify(["24 pages", "Seasonal illustrations", "Weather tracking chart"])
    }
  },
  {
    title: "The Ice Breaker's Journey",
    content: "Climb aboard with Captain Kate as her ice breaker clears shipping lanes through frozen Great Lakes, keeping commerce moving all winter long.",
    meta: {
      hg_author: "Patricia Davis",
      hg_illustrator: "James Wilson",
      hg_age_range: "7-11 years",
      hg_theme: "Ships & Winter Navigation",
      hg_features: JSON.stringify(["30 pages", "Technical illustrations", "Ship diagram poster"])
    }
  },
  {
    title: "Dunes of Indiana",
    content: "Explore the magical Indiana Dunes where forests meet beaches, and learn how wind and water sculpted these towering sand mountains.",
    meta: {
      hg_author: "Kevin Martinez",
      hg_illustrator: "Emma Thompson",
      hg_age_range: "5-9 years",
      hg_theme: "Sand Dunes & Geology",
      hg_features: JSON.stringify(["26 pages", "Nature illustrations", "Dune formation guide"])
    }
  }
];

// Sample Coffee Roasters
const coffees = [
  {
    title: "North Shore Coffee Co.",
    content: "Nestled on the shores of Lake Superior, North Shore Coffee Co. roasts small batches with the same care lighthouse keepers once tended their beacons.",
    meta: {
      hg_location: "Duluth, Minnesota",
      hg_specialty: "Light to medium roasts highlighting origin characteristics",
      hg_featured: "Superior Sunrise Blend - Bright citrus and caramel notes"
    }
  },
  {
    title: "Sleeping Bear Coffee",
    content: "Named after the legendary dunes, this family-owned roastery sources sustainable beans and roasts them with the precision of a master craftsman.",
    meta: {
      hg_location: "Empire, Michigan",
      hg_specialty: "Rich dark roasts with complex flavor profiles",
      hg_featured: "Dunes Dark Roast - Chocolate and toasted nuts"
    }
  },
  {
    title: "Harbor Lights Roasting",
    content: "Drawing inspiration from Milwaukee's brewing heritage, Harbor Lights brings the same attention to detail to specialty coffee roasting.",
    meta: {
      hg_location: "Milwaukee, Wisconsin",
      hg_specialty: "Bold espresso blends and single-origin offerings",
      hg_featured: "Storm Watch Espresso - Dark berry undertones"
    }
  },
  {
    title: "Straits Coffee Company",
    content: "Positioned where Lakes Huron and Michigan meet, Straits Coffee celebrates the connection between two great waters with every perfectly roasted bean.",
    meta: {
      hg_location: "Mackinaw City, Michigan",
      hg_specialty: "Seasonal blends reflecting Great Lakes character",
      hg_featured: "Island Breeze Blend - Floral notes and honey sweetness"
    }
  },
  {
    title: "Erie Shores Roastery",
    content: "A lakefront roastery committed to direct-trade relationships and bringing exceptional coffee to the Great Lakes community.",
    meta: {
      hg_location: "Cleveland, Ohio",
      hg_specialty: "Ethically sourced single-origin coffees",
      hg_featured: "Lakefront Medium - Balanced and smooth"
    }
  },
  {
    title: "Thunder Bay Coffee",
    content: "Canada's Great Lakes representative, Thunder Bay Coffee combines Canadian hospitality with world-class roasting techniques.",
    meta: {
      hg_location: "Thunder Bay, Ontario",
      hg_specialty: "Smooth, approachable blends for every palate",
      hg_featured: "Northern Lights Blend - Smooth chocolate finish"
    }
  }
];

// Helper function to make HTTP requests
function makeRequest(method, endpoint, data = null, auth = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(API_URL + endpoint);
    const options = {
      hostname: url.hostname,
      port: url.port || 80,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    // Add basic auth if provided
    if (auth) {
      options.headers['Authorization'] = 'Basic ' + Buffer.from(auth.username + ':' + auth.password).toString('base64');
    }

    const req = http.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: responseData });
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

// Migrate content
async function migrateContent() {
  console.log('🚀 Starting Homeground content migration...\n');

  // Note: WordPress headless installations require authentication
  // For now, we'll show instructions for setting up a user
  const auth = {
    username: 'admin', // Change this to your WordPress user
    password: process.env.WP_PASSWORD || 'wordpress' // Use environment variable or default
  };

  console.log('📚 Migrating Books...');
  for (const book of books) {
    try {
      const response = await makeRequest('POST', '/books', 
        {
          title: book.title,
          content: book.content,
          status: 'publish',
          meta: book.meta
        },
        auth
      );

      if (response.status === 201 || response.status === 200) {
        console.log(`✅ Created: ${book.title}`);
      } else {
        console.log(`⚠️  Status ${response.status}: ${book.title}`);
        console.log('   Response:', response.data);
      }
    } catch (error) {
      console.log(`❌ Error creating ${book.title}:`, error.message);
    }
  }

  console.log('\n☕ Migrating Coffee Roasters...');
  for (const coffee of coffees) {
    try {
      const response = await makeRequest('POST', '/coffee',
        {
          title: coffee.title,
          content: coffee.content,
          status: 'publish',
          meta: coffee.meta
        },
        auth
      );

      if (response.status === 201 || response.status === 200) {
        console.log(`✅ Created: ${coffee.title}`);
      } else {
        console.log(`⚠️  Status ${response.status}: ${coffee.title}`);
      }
    } catch (error) {
      console.log(`❌ Error creating ${coffee.title}:`, error.message);
    }
  }

  console.log('\n✨ Migration complete!');
}

migrateContent().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
