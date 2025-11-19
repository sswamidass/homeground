<?php
/* Front Page Template */
get_header();
?>

<main id="site-content">
  <section class="hero">
    <h1><?php bloginfo('name'); ?></h1>
    <p><?php bloginfo('description'); ?></p>
  </section>

  <section class="latest-posts">
    <h2>Latest</h2>
    <?php
      $recent = new WP_Query(array('post_type' => 'post', 'posts_per_page' => 5));
      if ( $recent->have_posts() ) :
        while ( $recent->have_posts() ) : $recent->the_post(); ?>
          <article>
            <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
            <?php the_excerpt(); ?>
          </article>
        <?php endwhile;
        wp_reset_postdata();
      else: ?>
        <p>No recent posts.</p>
      <?php endif; ?>
  </section>
</main>

<?php get_footer(); ?>
