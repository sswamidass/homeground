<?php
function homeground_enqueue_assets() {
    wp_enqueue_style('homeground-style', get_stylesheet_uri(), array(), filemtime( get_stylesheet_directory() . '/style.css' ));
}
add_action('wp_enqueue_scripts', 'homeground_enqueue_assets');

// Add support for title tag and post thumbnails
add_theme_support('title-tag');
add_theme_support('post-thumbnails');

// Register menus
function homeground_register_menus() {
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'homeground'),
    ));
}
add_action('after_setup_theme', 'homeground_register_menus');

// Register widget area
function homeground_widgets_init() {
    register_sidebar(array(
        'name'          => __('Sidebar', 'homeground'),
        'id'            => 'sidebar-1',
        'description'   => __('Primary sidebar', 'homeground'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ));
}
add_action('widgets_init', 'homeground_widgets_init');

// Register custom post types: Books and Subscription
function homeground_register_cpts() {
    // Books CPT
    $labels = array(
        'name'               => _x( 'Books', 'post type general name', 'homeground' ),
        'singular_name'      => _x( 'Book', 'post type singular name', 'homeground' ),
        'menu_name'          => _x( 'Books', 'admin menu', 'homeground' ),
        'name_admin_bar'     => _x( 'Book', 'add new on admin bar', 'homeground' ),
    );
    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'has_archive'        => true,
        'show_in_rest'       => true,
        'supports'           => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
        'rewrite'            => array('slug' => 'books'),
    );
    register_post_type('book', $args);

    // Subscription CPT
    $labels2 = array(
        'name'               => _x( 'Subscriptions', 'post type general name', 'homeground' ),
        'singular_name'      => _x( 'Subscription', 'post type singular name', 'homeground' ),
        'menu_name'          => _x( 'Subscriptions', 'admin menu', 'homeground' ),
        'name_admin_bar'     => _x( 'Subscription', 'add new on admin bar', 'homeground' ),
    );
    $args2 = array(
        'labels'             => $labels2,
        'public'             => true,
        'has_archive'        => false,
        'show_in_rest'       => true,
        'supports'           => array( 'title', 'editor', 'excerpt' ),
        'rewrite'            => array('slug' => 'subscriptions'),
    );
    register_post_type('subscription', $args2);
}
add_action('init', 'homeground_register_cpts');

?>
