# WordPress Content Editing Guide

All content on your WordPress pages is now editable through the WordPress admin dashboard. Here's how to edit each type of content:

## Pages with Editable Content

### 1. **Monthly Box Page** (`/monthly-box/`)

**Editable via Page Editor:**
- **Title**: Page title becomes the hero heading
- **Excerpt**: Short description under the title (hero section)
- **Content**: The "What's Inside Every Box" section - use the WordPress editor to add your content here

**Editable via Custom Post Type (Monthly Boxes):**
- Go to **Admin → Monthly Boxes → Add New**
- Fill in the box details:
  - Month (e.g., "November 2024")
  - Theme (e.g., "Lake Superior Legends")
  - Book Title, Author, Age Range
  - Book Description (use main content editor)
  - Coffee Name, Roaster, Location, Tasting Notes, Origin
  - Fact Card text
  - Family Activity description
- **Recent boxes automatically appear** on the Monthly Box page

---

### 2. **Coffee Page** (`/coffee/`)

**Editable via Page Editor:**
- **Title**: Page title
- **Excerpt**: Lead text in hero section
- **Featured Image**: Hero background image
- **Content**: Replace "Our Coffee Selection Process" section with your own content

**Editable via Custom Post Type (Coffee Roasters):**
- Go to **Admin → Coffee Roasters → Add New**
- Fill in roaster details:
  - **Title**: Roaster name
  - **Content**: Roaster description
  - **Location**: City and state
  - **Specialty**: Their specialty (e.g., "Light to medium roasts")
  - **Featured**: Featured coffee in Homeground (e.g., "Superior Sunrise Blend - Bright citrus notes")
- **Roasters automatically appear** in the Featured Roasters section

---

### 3. **FAQ Page** (`/faq/`)

**Editable via Page Editor:**
- **Title**: Page title
- **Excerpt**: Lead text under the title

**Editable via Custom Post Type (FAQs):**
- Go to **Admin → FAQs → Add New**
- Fill in:
  - **Title**: The question
  - **Answer**: The answer (in the meta box)
  - **FAQ Category**: Select or create a category (Subscription, Shipping, Products, Gifting, Account)
- **FAQs automatically appear** organized by category on the FAQ page

---

### 4. **Contact Page** (`/contact/`)

**Editable via Page Editor:**
- **Title**: Page title
- **Excerpt**: Lead text under the title
- **Content**: Main content section (appears above contact info cards)

**Static Content** (requires theme file editing):
- Contact information cards (email, phone, address)
- Social media links
- Contact form
- Partnership section

---

### 5. **Subscription Page** (`/subscription/`)

**Editable via Page Editor:**
- **Title**: Page title
- **Excerpt**: Lead text under the title
- **Content**: Intro/description text (appears at top of pricing section)

**Editable via Custom Post Type (Subscriptions):**
- Go to **Admin → Subscriptions** to manage pricing plans
- Note: Currently pricing plans are static in the theme. To make them fully editable, you can add custom fields for:
  - Plan name
  - Price
  - Billing period
  - Features list
  - Savings text

**Static Content**:
- Pricing plans structure
- Value breakdown
- Gift subscription section
- Testimonials
- FAQ preview

---

### 6. **About Page** (`/about/`)

**Editable via Page Editor:**
- **Title**: Page title  
- **Excerpt**: Lead text
- **Content**: Main page content (includes hero, mission, story, values)

---

### 7. **Books Page** (`/books/`)

**Editable via Page Editor:**
- **Title**: Page title
- **Excerpt**: Lead text
- **Content**: Main content sections

**Editable via Custom Post Type (Books):**
- Go to **Admin → Books → Add New**
- **Books automatically display** in a grid on the Books page

---

### 8. **Home Page** (`/`)

**Editable via Page Editor:**
- **Content**: All homepage sections are in the page content

---

## Custom Post Types Reference

### Monthly Boxes
- **Purpose**: Display past box highlights
- **Fields**: Month, Theme, Book details, Coffee details, Fact card, Activity
- **Display**: Automatically shows 4 most recent boxes on Monthly Box page

### Coffee Roasters
- **Purpose**: Featured coffee roasters
- **Fields**: Location, Description, Specialty, Featured coffee
- **Display**: All roasters appear on Coffee page

### FAQs
- **Purpose**: Frequently asked questions
- **Fields**: Question (title), Answer, Category
- **Display**: Grouped by category on FAQ page

### Books
- **Purpose**: Featured books
- **Fields**: Title, Description, Thumbnail, Excerpt
- **Display**: Grid on Books page

### Subscriptions
- **Purpose**: Subscription plans (currently static, can be enhanced)
- **Fields**: Title, Description

---

## How to Edit Content

### Editing a Page:
1. Go to **WordPress Admin** → **Pages**
2. Find the page you want to edit (Monthly Box, Coffee, FAQ, etc.)
3. Click **Edit**
4. Update the **Title**, **Excerpt** (in sidebar), or **Content**
5. Click **Update**

### Adding/Editing Custom Post Types:
1. Go to **WordPress Admin** → **Monthly Boxes** (or Coffee Roasters, FAQs, etc.)
2. Click **Add New** or edit an existing item
3. Fill in the title and content
4. Fill in the custom fields in the meta boxes below
5. Click **Publish** or **Update**

### Adding a Featured Image:
1. While editing a page, find **Featured Image** in the right sidebar
2. Click **Set featured image**
3. Upload or select an image
4. Click **Set featured image**

---

## Quick Tips

1. **Use Excerpts**: The excerpt field is used for lead paragraphs in hero sections
2. **Categories Matter**: For FAQs, assign the correct category so they group properly
3. **Content Editor**: You can use the block editor or HTML in the content field
4. **Custom Fields**: Meta boxes appear below the main content editor when editing custom post types
5. **Order**: Monthly Boxes show newest first. Coffee Roasters show in menu order (drag to reorder)

---

## Static Sections

Some sections remain static in the theme files and require code changes:
- Navigation menu items
- Footer content  
- Contact form functionality
- Social media icon links
- Partnership cards
- Testimonials
- FAQ preview on Subscription page
- Value breakdown on Subscription page

To edit these, you'll need to modify the theme PHP files in:
`/wordpress/wp-content/themes/homeground/`

---

## Need Help?

If you need to make a section editable that's currently static, or want to add more custom fields, you can:
1. Edit `functions.php` to add new meta boxes
2. Update the relevant page template to use those meta boxes
3. Or consider using a plugin like Advanced Custom Fields (ACF) for a visual interface

