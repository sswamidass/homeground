<?php
/* Template Name: Books Page */
get_header();
?>

<main id="site-content">
  <h1><?php the_title(); ?></h1>
  <div class="book-list">
    <?php
      // Query Book CPT
      $books = new WP_Query(array('post_type' => 'book', 'posts_per_page' => 10));
      if ( $books->have_posts() ) :
        while ( $books->have_posts() ) : $books->the_post(); ?>
          <article id="post-<?php the_ID(); ?>">
            <h2><?php the_title(); ?></h2>
            <div class="entry">
              <?php the_excerpt(); ?>
            </div>
          </article>
        <?php endwhile;
        wp_reset_postdata();
      else : ?>
        <p>No books found.</p>
      <?php endif; ?>
  </div>
</main>

<?php get_footer(); ?>
