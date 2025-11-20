<?php
/* Template Name: Monthly Box Page */
get_header();
?>

<main id="site-content" class="monthly-box">
  <?php while ( have_posts() ) : the_post(); ?>
    
  <section class="monthly-hero">
    <div class="container">
      <h1><?php the_title(); ?></h1>
      <?php if ( has_excerpt() ) : ?>
        <p class="monthly-lead"><?php the_excerpt(); ?></p>
      <?php endif; ?>
    </div>
  </section>

  <section class="whats-inside section">
    <div class="container">
      <?php the_content(); ?>
    </div>
  </section>

  <section class="sample-boxes section" style="background-color: var(--sandy-beige);">
    <div class="container">
      <h2>Recent Box Highlights</h2>
      <p class="section-intro">Take a peek at some of our recent monthly adventures:</p>

      <div class="boxes-list">
        <?php
        // Query monthly boxes
        $boxes_query = new WP_Query(array(
          'post_type' => 'monthly_box',
          'posts_per_page' => 4,
          'orderby' => 'date',
          'order' => 'DESC'
        ));

        if ($boxes_query->have_posts()) :
          while ($boxes_query->have_posts()) : $boxes_query->the_post();
            $month = get_post_meta(get_the_ID(), '_month', true);
            $theme = get_post_meta(get_the_ID(), '_theme', true);
            $book_title = get_post_meta(get_the_ID(), '_book_title', true);
            $book_author = get_post_meta(get_the_ID(), '_book_author', true);
            $book_age_range = get_post_meta(get_the_ID(), '_book_age_range', true);
            $coffee_name = get_post_meta(get_the_ID(), '_coffee_name', true);
            $coffee_roaster = get_post_meta(get_the_ID(), '_coffee_roaster', true);
            $coffee_location = get_post_meta(get_the_ID(), '_coffee_location', true);
            $coffee_notes = get_post_meta(get_the_ID(), '_coffee_notes', true);
            $coffee_origin = get_post_meta(get_the_ID(), '_coffee_origin', true);
            $fact_card = get_post_meta(get_the_ID(), '_fact_card', true);
            $activity = get_post_meta(get_the_ID(), '_activity', true);
        ?>
        <div class="box-card">
          <div class="box-header">
            <?php if ($month) : ?>
              <span class="box-month"><?php echo esc_html($month); ?></span>
            <?php endif; ?>
            <h3><?php echo esc_html($theme ? $theme : get_the_title()); ?></h3>
          </div>
          <div class="box-content">
            <?php if ($book_title) : ?>
            <div class="box-section">
              <div class="section-label">
                <span class="label-icon">📚</span>
                <h4>Featured Book</h4>
              </div>
              <div class="book-info">
                <p class="book-title"><?php echo esc_html($book_title); ?></p>
                <?php if ($book_author || $book_age_range) : ?>
                  <p class="book-meta">
                    <?php if ($book_author) echo 'by ' . esc_html($book_author); ?>
                    <?php if ($book_author && $book_age_range) echo ' • '; ?>
                    <?php if ($book_age_range) echo 'Ages ' . esc_html($book_age_range); ?>
                  </p>
                <?php endif; ?>
                <?php if (get_the_content()) : ?>
                  <p class="book-description"><?php echo wp_kses_post(get_the_content()); ?></p>
                <?php endif; ?>
              </div>
            </div>
            <?php endif; ?>

            <?php if ($coffee_name) : ?>
            <div class="box-section">
              <div class="section-label">
                <span class="label-icon">☕</span>
                <h4>Featured Coffee</h4>
              </div>
              <div class="coffee-info">
                <p class="coffee-name"><?php echo esc_html($coffee_name); ?></p>
                <?php if ($coffee_roaster || $coffee_location) : ?>
                  <p class="coffee-meta">
                    <?php if ($coffee_roaster) echo esc_html($coffee_roaster); ?>
                    <?php if ($coffee_roaster && $coffee_location) echo ' • '; ?>
                    <?php if ($coffee_location) echo esc_html($coffee_location); ?>
                  </p>
                <?php endif; ?>
                <?php if ($coffee_notes) : ?>
                  <p class="coffee-notes"><?php echo esc_html($coffee_notes); ?></p>
                <?php endif; ?>
                <?php if ($coffee_origin) : ?>
                  <p class="coffee-origin">Origin: <?php echo esc_html($coffee_origin); ?></p>
                <?php endif; ?>
              </div>
            </div>
            <?php endif; ?>

            <?php if ($fact_card || $activity) : ?>
            <div class="box-extras">
              <?php if ($fact_card) : ?>
              <div class="extra-item">
                <strong>Did You Know?</strong>
                <p><?php echo esc_html($fact_card); ?></p>
              </div>
              <?php endif; ?>
              <?php if ($activity) : ?>
              <div class="extra-item">
                <strong>Family Activity:</strong>
                <p><?php echo esc_html($activity); ?></p>
              </div>
              <?php endif; ?>
            </div>
            <?php endif; ?>
          </div>
        </div>
        <?php
          endwhile;
          wp_reset_postdata();
        endif;
        ?>
      </div>
    </div>
  </section>

  <section class="box-cta section">
    <div class="container">
      <div class="cta-content">
        <h2>Ready to Start Your Collection?</h2>
        <p>Join us on a year-round journey through the Great Lakes region</p>
        <a href="<?php echo esc_url( home_url('/subscription/') ); ?>" class="btn btn-primary btn-large">Choose Your Plan</a>
      </div>
    </div>
  </section>

  <?php endwhile; ?>
</main>

<?php get_footer(); ?>
