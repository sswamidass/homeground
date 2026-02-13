// Script to populate WordPress with sample Homeground content via REST API
// Run this in your browser console while WordPress admin is open

const sampleBooks = [
  {
    title: "The Lighthouse Keeper's Secret",
    content: "Maya discovers the mysterious history of Split Rock Lighthouse and learns about the brave keepers who saved countless ships from fierce storms.",
    meta: {
      hg_author: "Emily Waters",
      hg_illustrator: "Michael Torres",
      hg_age_range: "6-10 years",
      hg_theme: "Lake Superior History & Bravery",
      hg_features: ["28 pages", "Full-color illustrations", "Historical facts section"]
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
      hg_features: ["24 pages", "Watercolor illustrations", "Wildlife guide included"]
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
      hg_features: ["32 pages", "Detailed illustrations", "Weather science facts"]
    }
  }
];

async function createBooks() {
  for (const book of sampleBooks) {
    const response = await fetch('/wp-json/wp/v2/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': wpApiSettings.nonce || document.querySelector('meta[name="wp-json-nonce"]')?.content
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        title: book.title,
        content: book.content,
        status: 'publish',
        meta: book.meta
      })
    });

    const data = await response.json();
    console.log(`Created book: ${data.title || book.title}`);
  }

  console.log('Books creation complete!');
}

// Run this
createBooks().catch(err => console.error('Error:', err));
