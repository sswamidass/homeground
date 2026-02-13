#!/bin/bash

# Homeground Content Migration Script
# This script uses WP-CLI to populate WordPress with sample content

echo "🚀 Starting Homeground content migration..."

# Create Books
echo "📚 Creating Books..."

docker exec homeground-wp bash -c '
wp post create --post_type=hg_book --post_title="The Lighthouse Keeper'"'"'s Secret" --post_content="Maya discovers the mysterious history of Split Rock Lighthouse and learns about the brave keepers who saved countless ships from fierce storms." --post_status=publish \
  --meta_input='"'"'hg_author=Emily Waters,hg_illustrator=Michael Torres,hg_age_range=6-10 years,hg_theme=Lake Superior History & Bravery,hg_features=["28 pages","Full-color illustrations","Historical facts section"]'"'"' --allow-root 2>/dev/null && echo "✅ Created: The Lighthouse Keeper'"'"'s Secret" || echo "ℹ️ Book creation requires WP-CLI"
'

# Alternative: Use curl to POST to REST API with nonce
echo "📚 Creating Books via REST API..."

API_URL="http://localhost:8000/wp-json/wp/v2"

# Function to create a book
create_book() {
  local title=$1
  local content=$2
  local author=$3
  local illustrator=$4
  local age_range=$5
  local theme=$6
  local features=$7

  curl -X POST "$API_URL/books" \
    -H "Content-Type: application/json" \
    -d "{
      \"title\": \"$title\",
      \"content\": \"$content\",
      \"status\": \"publish\",
      \"meta\": {
        \"hg_author\": \"$author\",
        \"hg_illustrator\": \"$illustrator\",
        \"hg_age_range\": \"$age_range\",
        \"hg_theme\": \"$theme\",
        \"hg_features\": $features
      }
    }" 2>/dev/null && echo "✅ Created: $title" || echo "⚠️ Could not create: $title"
}

# Create Books
create_book "The Lighthouse Keeper's Secret" \
  "Maya discovers the mysterious history of Split Rock Lighthouse and learns about the brave keepers who saved countless ships from fierce storms." \
  "Emily Waters" "Michael Torres" "6-10 years" "Lake Superior History & Bravery" \
  '["28 pages","Full-color illustrations","Historical facts section"]'

create_book "Penny the Piping Plover" \
  "Join Penny, a brave little piping plover, on her journey along Michigan'\''s sandy shores as she learns about protecting endangered species." \
  "Marcus Johnson" "Sofia Chen" "4-8 years" "Michigan Wildlife & Conservation" \
  '["24 pages","Watercolor illustrations","Wildlife guide included"]'

create_book "The Edmund Fitzgerald Mystery" \
  "An age-appropriate adventure story inspired by the famous Great Lakes shipwreck, teaching about maritime history and nature'\''s power." \
  "Sarah Mitchell" "David Park" "8-12 years" "Maritime History & Weather" \
  '["32 pages","Detailed illustrations","Weather science facts"]'

create_book "Mackinac Island Magic" \
  "Experience the wonder of car-free Mackinac Island through the eyes of twins exploring historic forts, riding horses, and discovering unique ecology." \
  "Robert Chen" "Lisa Anderson" "5-9 years" "Island Life & History" \
  '["28 pages","Vibrant illustrations","Island map included"]'

create_book "Sturgeon River Adventure" \
  "Follow Sammy the sturgeon on an incredible journey through Great Lakes rivers, learning about ancient fish species and water conservation." \
  "Jennifer Williams" "Alex Martinez" "6-10 years" "River Ecosystems & Fish" \
  '["26 pages","Educational diagrams","Ecosystem poster"]'

create_book "Winter Waves of Lake Erie" \
  "Discover how Lake Erie transforms through the seasons and why lake effect snow creates winter wonderlands in nearby communities." \
  "Thomas Brown" "Rachel Kim" "4-8 years" "Seasons & Lake Effect Weather" \
  '["24 pages","Seasonal illustrations","Weather tracking chart"]'

create_book "The Ice Breaker'\''s Journey" \
  "Climb aboard with Captain Kate as her ice breaker clears shipping lanes through frozen Great Lakes, keeping commerce moving all winter long." \
  "Patricia Davis" "James Wilson" "7-11 years" "Ships & Winter Navigation" \
  '["30 pages","Technical illustrations","Ship diagram poster"]'

create_book "Dunes of Indiana" \
  "Explore the magical Indiana Dunes where forests meet beaches, and learn how wind and water sculpted these towering sand mountains." \
  "Kevin Martinez" "Emma Thompson" "5-9 years" "Sand Dunes & Geology" \
  '["26 pages","Nature illustrations","Dune formation guide"]'

echo "✨ Migration complete!"
