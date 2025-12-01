<?php
function homeground_enqueue_assets() {
    wp_enqueue_style('homeground-style', get_stylesheet_uri(), array(), filemtime( get_stylesheet_directory() . '/style.css' ));
    // Navigation script (handles mobile toggle and active link)
    wp_enqueue_script('homeground-nav', get_stylesheet_directory_uri() . '/assets/js/navigation.js', array(), filemtime( get_stylesheet_directory() . '/assets/js/navigation.js' ), true);
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

    // Monthly Box CPT
    $labels3 = array(
        'name'               => _x( 'Monthly Boxes', 'post type general name', 'homeground' ),
        'singular_name'      => _x( 'Monthly Box', 'post type singular name', 'homeground' ),
        'menu_name'          => _x( 'Monthly Boxes', 'admin menu', 'homeground' ),
        'name_admin_bar'     => _x( 'Monthly Box', 'add new on admin bar', 'homeground' ),
    );
    $args3 = array(
        'labels'             => $labels3,
        'public'             => true,
        'has_archive'        => false,
        'show_in_rest'       => true,
        'supports'           => array( 'title', 'editor', 'thumbnail' ),
        'rewrite'            => array('slug' => 'monthly-boxes'),
        'menu_icon'          => 'dashicons-archive',
    );
    register_post_type('monthly_box', $args3);

    // Coffee Roaster CPT
    $labels4 = array(
        'name'               => _x( 'Coffee Roasters', 'post type general name', 'homeground' ),
        'singular_name'      => _x( 'Coffee Roaster', 'post type singular name', 'homeground' ),
        'menu_name'          => _x( 'Coffee Roasters', 'admin menu', 'homeground' ),
        'name_admin_bar'     => _x( 'Coffee Roaster', 'add new on admin bar', 'homeground' ),
    );
    $args4 = array(
        'labels'             => $labels4,
        'public'             => true,
        'has_archive'        => false,
        'show_in_rest'       => true,
        'supports'           => array( 'title', 'editor', 'thumbnail' ),
        'rewrite'            => array('slug' => 'coffee-roasters'),
        'menu_icon'          => 'dashicons-coffee',
    );
    register_post_type('coffee_roaster', $args4);

    // FAQ CPT
    $labels5 = array(
        'name'               => _x( 'FAQs', 'post type general name', 'homeground' ),
        'singular_name'      => _x( 'FAQ', 'post type singular name', 'homeground' ),
        'menu_name'          => _x( 'FAQs', 'admin menu', 'homeground' ),
        'name_admin_bar'     => _x( 'FAQ', 'add new on admin bar', 'homeground' ),
    );
    $args5 = array(
        'labels'             => $labels5,
        'public'             => true,
        'has_archive'        => false,
        'show_in_rest'       => true,
        'supports'           => array( 'title', 'editor' ),
        'rewrite'            => array('slug' => 'faqs'),
        'menu_icon'          => 'dashicons-format-chat',
        'taxonomies'         => array('faq_category'),
    );
    register_post_type('faq', $args5);

    // FAQ Category Taxonomy
    register_taxonomy('faq_category', 'faq', array(
        'hierarchical'      => true,
        'labels'            => array(
            'name'          => 'FAQ Categories',
            'singular_name' => 'FAQ Category',
        ),
        'show_in_rest'      => true,
        'show_admin_column' => true,
    ));
    
    // Homepage Feature CPT
    $labels6 = array(
        'name'               => _x( 'Homepage Features', 'post type general name', 'homeground' ),
        'singular_name'      => _x( 'Homepage Feature', 'post type singular name', 'homeground' ),
        'menu_name'          => _x( 'Homepage Features', 'admin menu', 'homeground' ),
        'name_admin_bar'     => _x( 'Homepage Feature', 'add new on admin bar', 'homeground' ),
    );
    $args6 = array(
        'labels'             => $labels6,
        'public'             => false,
        'show_ui'            => true,
        'has_archive'        => false,
        'show_in_rest'       => true,
        'supports'           => array( 'title', 'editor', 'page-attributes' ),
        'menu_icon'          => 'dashicons-star-filled',
    );
    register_post_type('homepage_feature', $args6);
    
    // Homepage Step CPT
    $labels7 = array(
        'name'               => _x( 'How It Works Steps', 'post type general name', 'homeground' ),
        'singular_name'      => _x( 'Step', 'post type singular name', 'homeground' ),
        'menu_name'          => _x( 'How It Works', 'admin menu', 'homeground' ),
        'name_admin_bar'     => _x( 'Step', 'add new on admin bar', 'homeground' ),
    );
    $args7 = array(
        'labels'             => $labels7,
        'public'             => false,
        'show_ui'            => true,
        'has_archive'        => false,
        'show_in_rest'       => true,
        'supports'           => array( 'title', 'editor', 'page-attributes' ),
        'menu_icon'          => 'dashicons-list-view',
    );
    register_post_type('homepage_step', $args7);
    
    // Testimonial CPT
    $labels8 = array(
        'name'               => _x( 'Testimonials', 'post type general name', 'homeground' ),
        'singular_name'      => _x( 'Testimonial', 'post type singular name', 'homeground' ),
        'menu_name'          => _x( 'Testimonials', 'admin menu', 'homeground' ),
        'name_admin_bar'     => _x( 'Testimonial', 'add new on admin bar', 'homeground' ),
    );
    $args8 = array(
        'labels'             => $labels8,
        'public'             => false,
        'show_ui'            => true,
        'has_archive'        => false,
        'show_in_rest'       => true,
        'supports'           => array( 'title', 'editor', 'page-attributes' ),
        'menu_icon'          => 'dashicons-testimonial',
    );
    register_post_type('testimonial', $args8);
}
add_action('init', 'homeground_register_cpts');

// Add meta boxes for custom fields
function homeground_add_meta_boxes() {
    // Monthly Box meta boxes
    add_meta_box(
        'monthly_box_details',
        'Box Details',
        'homeground_monthly_box_meta_callback',
        'monthly_box',
        'normal',
        'high'
    );

    // Coffee Roaster meta boxes
    add_meta_box(
        'coffee_roaster_details',
        'Roaster Details',
        'homeground_coffee_roaster_meta_callback',
        'coffee_roaster',
        'normal',
        'high'
    );

    // FAQ meta boxes
    add_meta_box(
        'faq_answer',
        'Answer',
        'homeground_faq_meta_callback',
        'faq',
        'normal',
        'high'
    );
    
    // Homepage Feature meta box
    add_meta_box(
        'homepage_feature_icon',
        'Feature Icon (SVG)',
        'homeground_homepage_feature_meta_callback',
        'homepage_feature',
        'normal',
        'high'
    );
    
    // Homepage Step meta box
    add_meta_box(
        'homepage_step_number',
        'Step Number',
        'homeground_homepage_step_meta_callback',
        'homepage_step',
        'normal',
        'high'
    );
    
    // Testimonial meta box
    add_meta_box(
        'testimonial_author',
        'Author Details',
        'homeground_testimonial_meta_callback',
        'testimonial',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'homeground_add_meta_boxes');

// Monthly Box meta box callback
function homeground_monthly_box_meta_callback($post) {
    wp_nonce_field('monthly_box_meta', 'monthly_box_meta_nonce');
    $month = get_post_meta($post->ID, '_month', true);
    $theme = get_post_meta($post->ID, '_theme', true);
    $book_title = get_post_meta($post->ID, '_book_title', true);
    $book_author = get_post_meta($post->ID, '_book_author', true);
    $book_age_range = get_post_meta($post->ID, '_book_age_range', true);
    $coffee_name = get_post_meta($post->ID, '_coffee_name', true);
    $coffee_roaster = get_post_meta($post->ID, '_coffee_roaster', true);
    $coffee_location = get_post_meta($post->ID, '_coffee_location', true);
    $coffee_notes = get_post_meta($post->ID, '_coffee_notes', true);
    $coffee_origin = get_post_meta($post->ID, '_coffee_origin', true);
    $fact_card = get_post_meta($post->ID, '_fact_card', true);
    $activity = get_post_meta($post->ID, '_activity', true);
    ?>
    <p><label>Month: <input type="text" name="month" value="<?php echo esc_attr($month); ?>" class="widefat"></label></p>
    <p><label>Theme: <input type="text" name="theme" value="<?php echo esc_attr($theme); ?>" class="widefat"></label></p>
    <h4>Book Details</h4>
    <p><label>Title: <input type="text" name="book_title" value="<?php echo esc_attr($book_title); ?>" class="widefat"></label></p>
    <p><label>Author: <input type="text" name="book_author" value="<?php echo esc_attr($book_author); ?>" class="widefat"></label></p>
    <p><label>Age Range: <input type="text" name="book_age_range" value="<?php echo esc_attr($book_age_range); ?>" class="widefat"></label></p>
    <h4>Coffee Details</h4>
    <p><label>Coffee Name: <input type="text" name="coffee_name" value="<?php echo esc_attr($coffee_name); ?>" class="widefat"></label></p>
    <p><label>Roaster: <input type="text" name="coffee_roaster" value="<?php echo esc_attr($coffee_roaster); ?>" class="widefat"></label></p>
    <p><label>Location: <input type="text" name="coffee_location" value="<?php echo esc_attr($coffee_location); ?>" class="widefat"></label></p>
    <p><label>Tasting Notes: <textarea name="coffee_notes" class="widefat" rows="2"><?php echo esc_textarea($coffee_notes); ?></textarea></label></p>
    <p><label>Origin: <input type="text" name="coffee_origin" value="<?php echo esc_attr($coffee_origin); ?>" class="widefat"></label></p>
    <h4>Extras</h4>
    <p><label>Fact Card: <textarea name="fact_card" class="widefat" rows="2"><?php echo esc_textarea($fact_card); ?></textarea></label></p>
    <p><label>Family Activity: <textarea name="activity" class="widefat" rows="2"><?php echo esc_textarea($activity); ?></textarea></label></p>
    <?php
}

// Coffee Roaster meta box callback
function homeground_coffee_roaster_meta_callback($post) {
    wp_nonce_field('coffee_roaster_meta', 'coffee_roaster_meta_nonce');
    $location = get_post_meta($post->ID, '_location', true);
    $specialty = get_post_meta($post->ID, '_specialty', true);
    $featured = get_post_meta($post->ID, '_featured', true);
    ?>
    <p><label>Location: <input type="text" name="location" value="<?php echo esc_attr($location); ?>" class="widefat"></label></p>
    <p><label>Specialty: <textarea name="specialty" class="widefat" rows="2"><?php echo esc_textarea($specialty); ?></textarea></label></p>
    <p><label>Featured Coffee: <textarea name="featured" class="widefat" rows="2"><?php echo esc_textarea($featured); ?></textarea></label></p>
    <p><em>Use the main content editor for the roaster description.</em></p>
    <?php
}

// FAQ meta box callback
function homeground_faq_meta_callback($post) {
    wp_nonce_field('faq_meta', 'faq_meta_nonce');
    $answer = get_post_meta($post->ID, '_answer', true);
    ?>
    <p><label>Answer: <textarea name="faq_answer" class="widefat" rows="5"><?php echo esc_textarea($answer); ?></textarea></label></p>
    <p><em>The title field above is the question. Use the category taxonomy to organize FAQs.</em></p>
    <?php
}

// Homepage Feature meta box callback
function homeground_homepage_feature_meta_callback($post) {
    wp_nonce_field('homepage_feature_meta', 'homepage_feature_meta_nonce');
    $icon_svg = get_post_meta($post->ID, '_feature_icon_svg', true);
    ?>
    <p><label>SVG Icon Code (optional): <textarea name="feature_icon_svg" class="widefat" rows="8"><?php echo esc_textarea($icon_svg); ?></textarea></label></p>
    <p><em>Paste SVG code here. The title is the feature heading, and the content editor is for the feature description.</em></p>
    <?php
}

// Homepage Step meta box callback
function homeground_homepage_step_meta_callback($post) {
    wp_nonce_field('homepage_step_meta', 'homepage_step_meta_nonce');
    $step_number = get_post_meta($post->ID, '_step_number', true);
    if (!$step_number) $step_number = 1;
    ?>
    <p><label>Step Number: <input type="number" name="step_number" value="<?php echo esc_attr($step_number); ?>" min="1" max="10" class="small-text"></label></p>
    <p><em>The title is the step heading, and the content editor is for the step description. Use the "Order" field in the sidebar to control display order.</em></p>
    <?php
}

// Testimonial meta box callback
function homeground_testimonial_meta_callback($post) {
    wp_nonce_field('testimonial_meta', 'testimonial_meta_nonce');
    $author_name = get_post_meta($post->ID, '_author_name', true);
    $author_location = get_post_meta($post->ID, '_author_location', true);
    $rating = get_post_meta($post->ID, '_rating', true);
    if (!$rating) $rating = 5;
    ?>
    <p><label>Author Name: <input type="text" name="author_name" value="<?php echo esc_attr($author_name); ?>" class="widefat"></label></p>
    <p><label>Author Location: <input type="text" name="author_location" value="<?php echo esc_attr($author_location); ?>" class="widefat"></label></p>
    <p><label>Rating (1-5): <input type="number" name="rating" value="<?php echo esc_attr($rating); ?>" min="1" max="5" class="small-text"></label></p>
    <p><em>The content editor is for the testimonial text.</em></p>
    <?php
}

// Save meta box data
function homeground_save_meta_boxes($post_id) {
    // Monthly Box
    if (isset($_POST['monthly_box_meta_nonce']) && wp_verify_nonce($_POST['monthly_box_meta_nonce'], 'monthly_box_meta')) {
        if (isset($_POST['month'])) update_post_meta($post_id, '_month', sanitize_text_field($_POST['month']));
        if (isset($_POST['theme'])) update_post_meta($post_id, '_theme', sanitize_text_field($_POST['theme']));
        if (isset($_POST['book_title'])) update_post_meta($post_id, '_book_title', sanitize_text_field($_POST['book_title']));
        if (isset($_POST['book_author'])) update_post_meta($post_id, '_book_author', sanitize_text_field($_POST['book_author']));
        if (isset($_POST['book_age_range'])) update_post_meta($post_id, '_book_age_range', sanitize_text_field($_POST['book_age_range']));
        if (isset($_POST['coffee_name'])) update_post_meta($post_id, '_coffee_name', sanitize_text_field($_POST['coffee_name']));
        if (isset($_POST['coffee_roaster'])) update_post_meta($post_id, '_coffee_roaster', sanitize_text_field($_POST['coffee_roaster']));
        if (isset($_POST['coffee_location'])) update_post_meta($post_id, '_coffee_location', sanitize_text_field($_POST['coffee_location']));
        if (isset($_POST['coffee_notes'])) update_post_meta($post_id, '_coffee_notes', sanitize_textarea_field($_POST['coffee_notes']));
        if (isset($_POST['coffee_origin'])) update_post_meta($post_id, '_coffee_origin', sanitize_text_field($_POST['coffee_origin']));
        if (isset($_POST['fact_card'])) update_post_meta($post_id, '_fact_card', sanitize_textarea_field($_POST['fact_card']));
        if (isset($_POST['activity'])) update_post_meta($post_id, '_activity', sanitize_textarea_field($_POST['activity']));
    }

    // Coffee Roaster
    if (isset($_POST['coffee_roaster_meta_nonce']) && wp_verify_nonce($_POST['coffee_roaster_meta_nonce'], 'coffee_roaster_meta')) {
        if (isset($_POST['location'])) update_post_meta($post_id, '_location', sanitize_text_field($_POST['location']));
        if (isset($_POST['specialty'])) update_post_meta($post_id, '_specialty', sanitize_textarea_field($_POST['specialty']));
        if (isset($_POST['featured'])) update_post_meta($post_id, '_featured', sanitize_textarea_field($_POST['featured']));
    }

    // FAQ
    if (isset($_POST['faq_meta_nonce']) && wp_verify_nonce($_POST['faq_meta_nonce'], 'faq_meta')) {
        if (isset($_POST['faq_answer'])) update_post_meta($post_id, '_answer', sanitize_textarea_field($_POST['faq_answer']));
    }
    
    // Homepage Feature
    if (isset($_POST['homepage_feature_meta_nonce']) && wp_verify_nonce($_POST['homepage_feature_meta_nonce'], 'homepage_feature_meta')) {
        if (isset($_POST['feature_icon_svg'])) update_post_meta($post_id, '_feature_icon_svg', wp_kses_post($_POST['feature_icon_svg']));
    }
    
    // Homepage Step
    if (isset($_POST['homepage_step_meta_nonce']) && wp_verify_nonce($_POST['homepage_step_meta_nonce'], 'homepage_step_meta')) {
        if (isset($_POST['step_number'])) update_post_meta($post_id, '_step_number', absint($_POST['step_number']));
    }
    
    // Testimonial
    if (isset($_POST['testimonial_meta_nonce']) && wp_verify_nonce($_POST['testimonial_meta_nonce'], 'testimonial_meta')) {
        if (isset($_POST['author_name'])) update_post_meta($post_id, '_author_name', sanitize_text_field($_POST['author_name']));
        if (isset($_POST['author_location'])) update_post_meta($post_id, '_author_location', sanitize_text_field($_POST['author_location']));
        if (isset($_POST['rating'])) update_post_meta($post_id, '_rating', absint($_POST['rating']));
    }
}
add_action('save_post', 'homeground_save_meta_boxes');

// Increase upload size limit
@ini_set('upload_max_filesize', '64M');
@ini_set('post_max_size', '64M');
@ini_set('memory_limit', '256M');
@ini_set('max_execution_time', '600');

// Add filter to increase WordPress upload limit
add_filter('upload_size_limit', 'homeground_increase_upload');
function homeground_increase_upload( $bytes ) {
    return 67108864; // 64 MB in bytes
}

?>
