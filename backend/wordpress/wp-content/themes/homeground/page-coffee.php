<?php
/* Template Name: Coffee Page */
get_header();
?>

<main id="site-content" class="coffee">
  <?php while ( have_posts() ) : the_post(); ?>
    <section class="coffee-hero">
        <div class="hero-image-container">
            <?php if ( has_post_thumbnail() ) : ?>
                <?php the_post_thumbnail('full', array('class' => 'page-hero-image', 'alt' => get_the_title())); ?>
            <?php else : ?>
                <img src="https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="<?php the_title(); ?>" class="page-hero-image" />
            <?php endif; ?>
            <div class="hero-overlay">
                <div class="container">
                    <h1><?php the_title(); ?></h1>
                    <?php if ( has_excerpt() ) : ?>
                        <p class="coffee-lead"><?php the_excerpt(); ?></p>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </section>

    <section class="coffee-philosophy section">
        <div class="container">
            <?php the_content(); ?>
        </div>
    </section>

    <section class="roasters-section section" style="background-color: var(--sandy-beige);">
        <div class="container">
            <h2>Featured Roasters</h2>
            <p class="section-intro">
                Meet some of the talented roasters who have been featured in Homeground boxes.
                Each brings their unique perspective and passion to every bag they roast.
            </p>

            <div class="roasters-grid">
                <?php
                $roasters = new WP_Query( array(
                    'post_type' => 'coffee_roaster',
                    'posts_per_page' => -1,
                    'orderby' => 'menu_order',
                    'order' => 'ASC'
                ) );
                
                if ( $roasters->have_posts() ) :
                    while ( $roasters->have_posts() ) : $roasters->the_post();
                        $location = get_post_meta( get_the_ID(), '_roaster_location', true );
                        $specialty = get_post_meta( get_the_ID(), '_roaster_specialty', true );
                        $featured = get_post_meta( get_the_ID(), '_roaster_featured', true );
                ?>
                <div class="roaster-card">
                    <div class="roaster-icon">
                        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="40" cy="40" r="35" fill="var(--forest-green)" opacity="0.2"/>
                            <rect x="25" y="30" width="30" height="40" rx="3" fill="var(--forest-green)"/>
                            <circle cx="40" cy="45" r="10" fill="var(--sage-green)"/>
                            <path d="M35 40 Q40 35 45 40" stroke="white" stroke-width="2" fill="none"/>
                        </svg>
                    </div>
                    <h3><?php the_title(); ?></h3>
                    <?php if ( $location ) : ?>
                        <p class="roaster-location"><?php echo esc_html( $location ); ?></p>
                    <?php endif; ?>
                    <p class="roaster-description"><?php the_content(); ?></p>
                    <div class="roaster-details">
                        <?php if ( $specialty ) : ?>
                            <div class="roaster-specialty">
                                <strong>Specialty:</strong>
                                <p><?php echo esc_html( $specialty ); ?></p>
                            </div>
                        <?php endif; ?>
                        <?php if ( $featured ) : ?>
                            <div class="roaster-featured">
                                <strong>Featured in Homeground:</strong>
                                <p><?php echo esc_html( $featured ); ?></p>
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

    <section class="tasting-guide section">
        <div class="container">
            <h2>Your Coffee Tasting Guide</h2>
            <p class="section-intro">
                Get the most out of your Homeground coffee with these simple tasting tips.
                Perfect for both coffee enthusiasts and those just beginning their coffee journey.
            </p>

            <div class="guide-content">
                <div class="guide-section">
                    <h3>Brewing Tips</h3>
                    <ul>
                        <li><strong>Water Temperature:</strong> Use water between 195-205°F for optimal extraction</li>
                        <li><strong>Coffee Ratio:</strong> Start with 1:16 ratio (1g coffee to 16g water) and adjust to taste</li>
                        <li><strong>Freshness:</strong> Use coffee within 2-4 weeks of roast date for best flavor</li>
                        <li><strong>Grind Size:</strong> Match grind to your brewing method (we include recommendations)</li>
                    </ul>
                </div>

                <div class="guide-section">
                    <h3>Tasting Notes</h3>
                    <ul>
                        <li><strong>Aroma:</strong> Smell the dry grounds, then the brewed coffee—notice the difference</li>
                        <li><strong>Body:</strong> Feel the weight and texture of the coffee in your mouth</li>
                        <li><strong>Flavor:</strong> Identify primary flavors: fruity, nutty, chocolatey, floral</li>
                        <li><strong>Finish:</strong> Notice how flavors linger after swallowing</li>
                    </ul>
                </div>

                <div class="guide-section">
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

    <section class="coffee-values section" style="background-color: var(--off-white);">
        <div class="container">
            <div class="values-content">
                <h2>Committed to Sustainability</h2>
                <p>
                    We believe great coffee should be good for everyone involved—from the farmers who grow it,
                    to the roasters who craft it, to the families who enjoy it. That's why we partner exclusively
                    with roasters who share our commitment to:
                </p>
                <div class="sustainability-grid">
                    <div class="sustainability-item">
                        <span class="sustainability-icon">🌱</span>
                        <h4>Direct Trade Relationships</h4>
                        <p>Supporting fair prices and long-term partnerships with coffee farmers</p>
                    </div>
                    <div class="sustainability-item">
                        <span class="sustainability-icon">♻️</span>
                        <h4>Eco-Friendly Practices</h4>
                        <p>Using sustainable packaging and minimizing environmental impact</p>
                    </div>
                    <div class="sustainability-item">
                        <span class="sustainability-icon">🤝</span>
                        <h4>Community Investment</h4>
                        <p>Reinvesting in Great Lakes communities and supporting local economies</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  <?php endwhile; ?>
</main>

<?php get_footer(); ?>
