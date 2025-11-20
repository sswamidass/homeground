<?php
/* Template Name: About Page */
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
          // Fallback static markup ported from src/pages/About.tsx
          ?>
          <div class="about">
            <section class="about-hero">
              <div class="container">
                <h1>Our Story</h1>
                <p class="about-lead">Homeground was born from a simple love: the Great Lakes and the moments we share with our families.</p>
              </div>
            </section>

            <section class="about-mission section">
              <div class="container">
                <div class="mission-content">
                  <div class="mission-text">
                    <h2>Our Mission</h2>
                    <p>We believe the best family moments happen when we slow down, share stories, and connect over the simple pleasures of life. Homeground brings together two things we love—beautifully crafted children's books and exceptional artisan coffee from the Great Lakes region.</p>
                    <p>Our mission is to inspire curiosity and connection between parents and children through Great Lakes stories and locally roasted coffee. Each month, we curate a box that celebrates the unique culture, natural beauty, and rich history of the Great Lakes.</p>
                  </div>
                  <div class="mission-visual">
                    <img src="https://images.pexels.com/photos/1458694/pexels-photo-1458694.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Great Lakes shoreline at sunset" class="mission-image" />
                  </div>
                </div>
              </div>
            </section>

            <section class="about-story section" style="background-color: var(--sandy-beige);">
              <div class="container">
                <h2>How It All Began</h2>
                <div class="story-timeline">
                  <div class="timeline-item">
                    <div class="timeline-marker"></div>
                    <div class="timeline-content">
                      <h3>The Spark</h3>
                      <p>Growing up along Lake Michigan, our founder spent countless summer days exploring shorelines, discovering lighthouses, and learning about the region's rich maritime history. These experiences sparked a lifelong love for the Great Lakes.</p>
                    </div>
                  </div>

                  <div class="timeline-item">
                    <div class="timeline-marker"></div>
                    <div class="timeline-content">
                      <h3>Family Moments</h3>
                      <p>Years later, as a parent, those cherished memories came flooding back during bedtime stories. The desire to share the wonder of the Great Lakes with the next generation—while savoring a quiet cup of coffee—became the foundation for Homeground.</p>
                    </div>
                  </div>

                  <div class="timeline-item">
                    <div class="timeline-marker"></div>
                    <div class="timeline-content">
                      <h3>Building Community</h3>
                      <p>We connected with talented children's book authors, illustrators, and coffee roasters across the Great Lakes states. Their passion for local storytelling and craft coffee aligned perfectly with our vision of creating meaningful family experiences.</p>
                    </div>
                  </div>

                  <div class="timeline-item">
                    <div class="timeline-marker"></div>
                    <div class="timeline-content">
                      <h3>Today</h3>
                      <p>Homeground now serves hundreds of families across the Great Lakes region and beyond, helping create special moments where education, adventure, and comfort come together in one thoughtfully curated box each month.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section class="about-values section">
              <div class="container">
                <h2>What We Value</h2>
                <div class="values-grid">
                  <div class="value-card">
                    <div class="value-icon">📚</div>
                    <h3>Quality Storytelling</h3>
                    <p>We partner with talented authors and illustrators to bring authentic Great Lakes stories to life.</p>
                  </div>

                  <div class="value-card">
                    <div class="value-icon">☕</div>
                    <h3>Artisan Craft</h3>
                    <p>Every coffee is carefully sourced from small-batch roasters who take pride in their craft.</p>
                  </div>

                  <div class="value-card">
                    <div class="value-icon">🌊</div>
                    <h3>Regional Pride</h3>
                    <p>We celebrate the unique culture, ecology, and history that makes the Great Lakes special.</p>
                  </div>

                  <div class="value-card">
                    <div class="value-icon">👨‍👩‍👧‍👦</div>
                    <h3>Family Connection</h3>
                    <p>We create opportunities for parents and children to learn, explore, and bond together.</p>
                  </div>

                  <div class="value-card">
                    <div class="value-icon">🌱</div>
                    <h3>Sustainability</h3>
                    <p>We use eco-friendly packaging and support roasters committed to sustainable practices.</p>
                  </div>

                  <div class="value-card">
                    <div class="value-icon">🤝</div>
                    <h3>Community Support</h3>
                    <p>We invest in local businesses and creators across the Great Lakes region.</p>
                  </div>
                </div>
              </div>
            </section>

            <section class="about-team section" style="background-color: var(--white);">
              <div class="container">
                <h2>The Great Lakes We Love</h2>
                <div class="lakes-grid">
                  <div class="lake-card">
                    <h3>Lake Superior</h3>
                    <p>The largest and deepest of the Great Lakes, known for its stunning beauty and powerful storms.</p>
                  </div>
                  <div class="lake-card">
                    <h3>Lake Michigan</h3>
                    <p>The only Great Lake entirely within the United States, beloved for its sandy beaches and vibrant cities.</p>
                  </div>
                  <div class="lake-card">
                    <h3>Lake Huron</h3>
                    <p>Home to over 30,000 islands, including the world's largest freshwater island, Manitoulin.</p>
                  </div>
                  <div class="lake-card">
                    <h3>Lake Erie</h3>
                    <p>The shallowest and warmest of the Great Lakes, rich with wildlife and maritime history.</p>
                  </div>
                  <div class="lake-card">
                    <h3>Lake Ontario</h3>
                    <p>The easternmost Great Lake, connecting to the Atlantic Ocean through the St. Lawrence River.</p>
                  </div>
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
