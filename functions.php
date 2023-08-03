<?php

/*
 Charger les scripts et styles.
 */
function mota_scripts()
{
  wp_enqueue_style('mota-style', get_template_directory_uri() . '/style.css');
  wp_enqueue_style('mota-mobile-style', get_template_directory_uri() . '/assets/css/mobile-style.css');
  wp_enqueue_script('mota-modal-scripts', get_template_directory_uri() . '/assets/js/modal.js');
  wp_enqueue_script('mota-burger-scripts', get_template_directory_uri() . '/assets/js/burger.js');
  wp_enqueue_script('mota-gallery-scripts', get_template_directory_uri() . '/assets/js/gallery.js');
  wp_enqueue_script('mota-lightbox-scripts', get_template_directory_uri() . '/assets/js/lightbox.js');

  if (is_single()) {
    wp_enqueue_script('mota-thumbnails-scripts', get_template_directory_uri() . '/assets/js/thumbnails.js');
  }
}

add_action('wp_enqueue_scripts', 'mota_scripts');


/*
 Paramètres du thème Mota
 */
function mota_setup()
{

  /*
		Gestion automatique du balisage <title>
		*/
  add_theme_support('title-tag');


  /*
Image mise en avant pour les articles
		*/
  add_theme_support('post-thumbnails');


  /*
Ajout d'un emplacement de menu
		*/
  register_nav_menus(
    array(
      'menu-1' => esc_html__('Primary', 'mota'),
      'menu-2' => esc_html__('Footer', 'mota'),
    )
  );


  /*
		Activer la prise en charge du balisage HTML5
		*/
  add_theme_support(
    'html5',
    array(
      'search-form',
      'comment-form',
      'comment-list',
      'gallery',
      'caption',
      'style',
      'script',
    )
  );


  /*
	 Permettre l'édition facile du logo
	 */
  add_theme_support(
    'custom-logo',
    array(
      'height'      => 250,
      'width'       => 250,
      'flex-width'  => true,
      'flex-height' => true,
    )
  );
}
add_action('after_setup_theme', 'mota_setup');


/*
 Image aléatoire pour la section hero 
*/
function random_hero_image()
{
  $upload_dir = wp_upload_dir();
  $image_directory = $upload_dir['basedir'] . '/hero';

  $image_files = glob($image_directory . '/*.webp');

  $random_image = $image_files[array_rand($image_files)];

  return $upload_dir['baseurl'] . str_replace($upload_dir['basedir'], '', $random_image);
}





/*
 Bouton charger plus
*/

function load_more_photos()
{
  $args = array(
    'post_type' => 'photos',
    'paged' => $_POST['paged'],
    'posts_per_page' => 8,
  );

  if (isset($_POST['year'])) {
    $args['date_query'] = array(
      array(
        'year' => $_POST['year'],
      )
    );
  }

  if (isset($_POST['category'])) {
    $args['tax_query'][] = array(

      'taxonomy' => 'categorie',
      'field' => "slug",
      "terms" => $_POST['category'],
    );
  }

  if (isset($_POST['format'])) {
    $args['tax_query'][] = array(

      'taxonomy' => 'formats',
      'field' => "slug",
      "terms" => $_POST['format'],
    );
  }

  $photos = new WP_Query($args);
  if ($photos->have_posts()) {
    while ($photos->have_posts()) {
      $photos->the_post();
      get_template_part('template-parts/gallery-card'); // récupération du template gallery-card.php 
    }
    wp_reset_postdata();
  }

  exit;
}


add_action('wp_ajax_load_more_photos', 'load_more_photos');
add_action('wp_ajax_nopriv_load_more_photos', 'load_more_photos');
