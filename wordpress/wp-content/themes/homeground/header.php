<!doctype html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?> >
  <header>
    <nav class="navigation">
      <div class="nav-container">
        <a class="logo" href="<?php echo esc_url( home_url( '/' ) ); ?>">
          <?php if ( function_exists( 'the_custom_logo' ) && has_custom_logo() ) {
            the_custom_logo();
          } else { ?>
            <img src="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/react.svg' ); ?>" alt="<?php bloginfo( 'name' ); ?>" style="height:48px; width:auto;" />
            <span class="logo-text"><?php bloginfo( 'name' ); ?></span>
          <?php } ?>
        </a>

        <button class="menu-toggle" aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <?php
        // Output the primary menu with classes matching the React markup
        $has_primary = has_nav_menu( 'primary' );
        $has_items = false;
        if ( $has_primary ) {
          $locations = get_nav_menu_locations();
          if ( isset( $locations['primary'] ) ) {
            $menu_obj = wp_get_nav_menu_object( $locations['primary'] );
            if ( $menu_obj && ! is_wp_error( $menu_obj ) ) {
              $items = wp_get_nav_menu_items( $menu_obj->term_id );
              if ( ! empty( $items ) ) {
                $has_items = true;
              }
            }
          }
        }

        if ( $has_primary && $has_items ) {
          wp_nav_menu( array(
            'theme_location' => 'primary',
            'container' => false,
            'menu_class' => 'nav-menu',
            'items_wrap' => '<ul id="%1$s" class="nav-menu %2$s">%3$s</ul>',
            'fallback_cb' => false,
          ) );
        } else {
          // Fallback hardcoded links when menu missing or has no items
          ?>
          <ul class="nav-menu">
            <li><a href="<?php echo esc_url( home_url('/about/') ); ?>">About</a></li>
            <li><a href="<?php echo esc_url( home_url('/monthly-box/') ); ?>">Monthly Box</a></li>
            <li><a href="<?php echo esc_url( home_url('/books/') ); ?>">Books</a></li>
            <li><a href="<?php echo esc_url( home_url('/coffee/') ); ?>">Coffee</a></li>
            <li><a href="<?php echo esc_url( home_url('/faq/') ); ?>">FAQ</a></li>
            <li><a href="<?php echo esc_url( home_url('/contact/') ); ?>">Contact</a></li>
            <li class="nav-cta"><a class="btn btn-primary" href="<?php echo esc_url( home_url('/subscription/') ); ?>">Subscribe</a></li>
          </ul>
        <?php } ?>
      </div>
    </nav>
  </header>
