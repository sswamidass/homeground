<?php
/* Template Name: Books Page */
get_header();
?>

<main id="site-content">
  <h1><?php the_title(); ?></h1>
  <div class="page-content">
    <?php
      while ( have_posts() ) : the_post();
        $content = get_the_content();
        if ( trim( $content ) ) {
          the_content();
        } else {
          // Fallback static markup ported from src/pages/Books.tsx
          ?>
          <div class="books">
            <section class="books-hero">
              <div class="container">
                <h1>Great Lakes Stories for Young Explorers</h1>
                <p class="books-lead">Every Homeground book is carefully crafted to inspire curiosity, celebrate the Great Lakes region, and create meaningful moments between parents and children.</p>
              </div>
            </section>

            <section class="books-philosophy section">
              <div class="container">
                <div class="philosophy-content">
                  <div class="philosophy-text">
                    <h2>Our Book Philosophy</h2>
                    <p>We believe children's books should do more than entertain—they should educate, inspire, and connect young readers to the world around them. Each Homeground book:</p>
                    <ul class="philosophy-list">
                      <li>Features beautiful, engaging illustrations that bring stories to life</li>
                      <li>Celebrates authentic Great Lakes culture, history, and natural beauty</li>
                      <li>Teaches age-appropriate lessons about ecology, community, and courage</li>
                      <li>Includes educational content that extends learning beyond the story</li>
                      <li>Represents diverse characters and perspectives from across the region</li>
                    </ul>
                  </div>
                  <div class="philosophy-visual">
                    <div class="book-stack">
                      <div class="stack-book" style="background-color: var(--lake-blue);"></div>
                      <div class="stack-book" style="background-color: var(--forest-green);"></div>
                      <div class="stack-book" style="background-color: var(--deep-blue);"></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section class="books-gallery section" style="background-color: var(--sandy-beige);">
              <div class="container">
                <h2>Featured Books in Our Collection</h2>
                <div class="books-grid">
                  <!-- Static fallback cards (mirrors React sample data) -->
                  <div class="book-card">
                    <div class="book-cover-placeholder">
                      <svg viewBox="0 0 200 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="200" height="280" fill="hsl(0, 60%, 55%)" rx="4"/>
                        <circle cx="100" cy="100" r="40" fill="white" opacity="0.3"/>
                        <rect x="30" y="160" width="140" height="8" fill="white" opacity="0.5" rx="4"/>
                        <rect x="30" y="180" width="100" height="6" fill="white" opacity="0.4" rx="3"/>
                      </svg>
                    </div>
                    <div class="book-details">
                      <span class="book-age-tag">6-10 years</span>
                      <h3>The Lighthouse Keeper's Secret</h3>
                      <p class="book-creators"><strong>Written by:</strong> Emily Waters<br/><strong>Illustrated by:</strong> Michael Torres</p>
                      <p class="book-theme"><strong>Theme:</strong> Lake Superior History & Bravery</p>
                      <p class="book-description">Maya discovers the mysterious history of Split Rock Lighthouse and learns about the brave keepers who saved countless ships from fierce storms.</p>
                      <ul class="book-features"><li>28 pages</li><li>Full-color illustrations</li><li>Historical facts section</li></ul>
                    </div>
                  </div>
                  <!-- Additional static cards omitted for brevity (can be added similarly) -->
                </div>
              </div>
            </section>

            <section class="authors-section section">
              <div class="container">
                <h2>Meet Our Authors & Illustrators</h2>
                <p class="section-intro">We partner with talented authors and illustrators from across the Great Lakes region who share our passion for quality storytelling and local culture.</p>
                <div class="authors-benefits">
                  <div class="benefit-item"><h3>Regional Expertise</h3><p>Our creators live in or have deep connections to the Great Lakes, bringing authentic perspectives to every story.</p></div>
                  <div class="benefit-item"><h3>Educational Focus</h3><p>Each book is researched and reviewed to ensure accuracy in historical, scientific, and cultural content.</p></div>
                  <div class="benefit-item"><h3>Award-Winning Talent</h3><p>We work with authors and illustrators who have received recognition for their contributions to children's literature.</p></div>
                </div>
              </div>
            </section>
          </div>
          <?php
        }
      endwhile;
    ?>
  </div>
</main>

<?php get_footer(); ?>
