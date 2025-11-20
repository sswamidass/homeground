<?php
/* Front Page Template */
get_header();
?>

<main id="site-content" class="home">
  <?php while ( have_posts() ) : the_post(); ?>
  <section class="hero">
    <?php if ( has_post_thumbnail() ) : ?>
      <?php the_post_thumbnail('full', array('class' => 'hero-background', 'alt' => get_the_title())); ?>
    <?php else : ?>
      <img src="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/pexels-125322096-9990576 copy.jpg' ); ?>" alt="Great Lakes beach and lifeguard tower" class="hero-background" />
    <?php endif; ?>
    <div class="hero-overlay">
      <div class="hero-content">
        <h1><?php the_title(); ?></h1>
        <?php if ( has_excerpt() ) : ?>
          <p class="hero-subtitle"><?php the_excerpt(); ?></p>
        <?php else : ?>
          <p class="hero-subtitle">Great Lakes Stories.</p>
        <?php endif; ?>
        <div class="hero-cta">
          <a href="<?php echo esc_url( home_url('/subscription') ); ?>" class="btn btn-hero">Start Your Adventure</a>
        </div>
      </div>
    </div>
  </section>

  <?php if ( get_the_content() ) : ?>
  <section class="homepage-content section">
    <div class="container">
      <?php the_content(); ?>
    </div>
  </section>
  <?php endif; ?>

  <section class="features section">
    <div class="container">
      <h2>What Makes Homeground Special</h2>
      <div class="features-grid">
        <?php
        $features = new WP_Query( array(
            'post_type' => 'homepage_feature',
            'posts_per_page' => -1,
            'orderby' => 'menu_order',
            'order' => 'ASC'
        ) );
        
        if ( $features->have_posts() ) :
            while ( $features->have_posts() ) : $features->the_post();
                $icon_svg = get_post_meta( get_the_ID(), '_feature_icon_svg', true );
        ?>
        <div class="feature-card">
          <?php if ( $icon_svg ) : ?>
          <div class="feature-icon">
            <?php echo wp_kses_post( $icon_svg ); ?>
          </div>
          <?php endif; ?>
          <h3><?php the_title(); ?></h3>
          <?php the_content(); ?>
        </div>
        <?php
            endwhile;
            wp_reset_postdata();
        endif;
        ?>
      </div>
    </div>
  </section>

  <section class="how-it-works section" style="background-color: var(--white);">
    <div class="container">
      <h2>How It Works</h2>
      <div class="steps-grid">
        <?php
        $steps = new WP_Query( array(
            'post_type' => 'homepage_step',
            'posts_per_page' => -1,
            'orderby' => 'menu_order',
            'order' => 'ASC'
        ) );
        
        if ( $steps->have_posts() ) :
            while ( $steps->have_posts() ) : $steps->the_post();
                $step_number = get_post_meta( get_the_ID(), '_step_number', true );
                if ( ! $step_number ) $step_number = 1;
        ?>
        <div class="step">
          <div class="step-number"><?php echo esc_html( $step_number ); ?></div>
          <h3><?php the_title(); ?></h3>
          <?php the_content(); ?>
        </div>
        <?php
            endwhile;
            wp_reset_postdata();
        endif;
        ?>
      </div>
    </div>
  </section>

  <section class="testimonials section">
    <div class="container">
      <h2>What Families Are Saying</h2>
      <div class="testimonials-grid">
        <?php
        $testimonials = new WP_Query( array(
            'post_type' => 'testimonial',
            'posts_per_page' => -1,
            'orderby' => 'menu_order',
            'order' => 'ASC'
        ) );
        
        if ( $testimonials->have_posts() ) :
            while ( $testimonials->have_posts() ) : $testimonials->the_post();
                $author_name = get_post_meta( get_the_ID(), '_author_name', true );
                $author_location = get_post_meta( get_the_ID(), '_author_location', true );
                $rating = get_post_meta( get_the_ID(), '_rating', true );
                if ( ! $rating ) $rating = 5;
                $stars = str_repeat( '★', $rating );
        ?>
        <div class="testimonial-card">
          <div class="testimonial-stars"><?php echo esc_html( $stars ); ?></div>
          <?php the_content(); ?>
          <div class="testimonial-author">
            <?php if ( $author_name ) : ?>
              <strong><?php echo esc_html( $author_name ); ?></strong>
            <?php endif; ?>
            <?php if ( $author_location ) : ?>
              <span><?php echo esc_html( $author_location ); ?></span>
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

  <section class="cta-section">
    <div class="container">
      <div class="cta-content">
        <h2>Ready to Start Your Adventure?</h2>
        <p>Join families across the Great Lakes region in discovering local stories and flavors.</p>
        <a href="<?php echo esc_url( home_url('/subscription') ); ?>" class="btn btn-primary btn-large">Subscribe Now</a>
      </div>
    </div>
  </section>
  <?php endwhile; ?>
</main>

<?php get_footer(); ?>
