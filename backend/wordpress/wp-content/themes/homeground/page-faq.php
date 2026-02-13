<?php
/* Template Name: FAQ Page */
get_header();
?>

<main id="site-content" class="faq">
  <?php while ( have_posts() ) : the_post(); ?>
    <section class="faq-hero">
        <div class="container">
            <h1><?php the_title(); ?></h1>
            <?php if ( has_excerpt() ) : ?>
                <p class="faq-lead"><?php the_excerpt(); ?></p>
            <?php endif; ?>
        </div>
    </section>

    <section class="faq-content section">
        <div class="container">
            <div class="faq-categories">
                <button class="category-button active" data-category="all">All Questions</button>
                <?php
                $categories = get_terms( array(
                    'taxonomy' => 'faq_category',
                    'hide_empty' => true,
                ) );
                
                if ( ! is_wp_error( $categories ) && ! empty( $categories ) ) :
                    foreach ( $categories as $category ) :
                ?>
                    <button class="category-button" data-category="<?php echo esc_attr( $category->slug ); ?>">
                        <?php echo esc_html( $category->name ); ?>
                    </button>
                <?php
                    endforeach;
                endif;
                ?>
            </div>

            <div class="faq-list">
                <?php
                $faqs = new WP_Query( array(
                    'post_type' => 'faq',
                    'posts_per_page' => -1,
                    'orderby' => 'menu_order',
                    'order' => 'ASC'
                ) );
                
                if ( $faqs->have_posts() ) :
                    while ( $faqs->have_posts() ) : $faqs->the_post();
                        $answer = get_post_meta( get_the_ID(), '_faq_answer', true );
                        $faq_categories = wp_get_post_terms( get_the_ID(), 'faq_category', array( 'fields' => 'slugs' ) );
                        $category_classes = ! empty( $faq_categories ) ? implode( ' ', array_map( 'esc_attr', $faq_categories ) ) : '';
                ?>
                <div class="faq-item" data-categories="<?php echo esc_attr( $category_classes ); ?>">
                    <div class="faq-question">
                        <h3><?php the_title(); ?></h3>
                        <span class="faq-icon">+</span>
                    </div>
                    <?php if ( $answer ) : ?>
                        <div class="faq-answer">
                            <?php echo wpautop( wp_kses_post( $answer ) ); ?>
                        </div>
                    <?php endif; ?>
                </div>
                <?php
                    endwhile;
                    wp_reset_postdata();
                endif;
                ?>
            </div>
        </div>
    </section>

    <section class="faq-contact section" style="background-color: var(--sandy-beige);">
        <div class="container">
            <div class="contact-box">
                <h2>Still Have Questions?</h2>
                <p>
                    Our friendly customer support team is here to help! We typically respond within 24 hours
                    on business days.
                </p>
                <div class="contact-methods">
                    <div class="contact-method">
                        <div class="method-icon">📧</div>
                        <h3>Email Us</h3>
                        <p>hello@homeground.com</p>
                    </div>
                    <div class="contact-method">
                        <div class="method-icon">💬</div>
                        <h3>Live Chat</h3>
                        <p>Available Mon-Fri, 9am-5pm EST</p>
                    </div>
                    <div class="contact-method">
                        <div class="method-icon">📞</div>
                        <h3>Call Us</h3>
                        <p>(555) 123-4567</p>
                    </div>
                </div>
                <a href="<?php echo esc_url( home_url('/contact/') ); ?>" class="btn btn-primary">Contact Support</a>
            </div>
        </div>
    </section>
  <?php endwhile; ?>
</main>

<?php get_footer(); ?>
