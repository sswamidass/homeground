<?php
/* Template Name: Monthly Box Page */
get_header();
?>

<main id="site-content">
  <h1><?php the_title(); ?></h1>
  <div class="page-content">
    <?php
      while ( have_posts() ) : the_post();
        the_content();
      endwhile;
    ?>
  </div>
</main>

<?php get_footer(); ?>
