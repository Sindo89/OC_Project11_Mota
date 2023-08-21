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
  wp_enqueue_script('mota-lightbox-scripts', get_template_directory_uri() . '/assets/js/lightbox.js');

  if (is_home()) {
    wp_enqueue_script('mota-gallery-scripts', get_template_directory_uri() . '/assets/js/gallery.js');
  }

  if (is_single()) {
    wp_enqueue_script('mota-thumbnails-scripts', get_template_directory_uri() . '/assets/js/thumbnails.js');
    wp_enqueue_script('mota-gallery-single-scripts', get_template_directory_uri() . '/assets/js/gallery-single.js');
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
  $upload_dir = wp_upload_dir(); // Récupère le dossier d'upload
  $image_directory = $upload_dir['basedir'] . '/hero'; // Récupère le dossier hero

  $image_files = glob($image_directory . '/*.webp'); // Récupère tous les fichiers .webp du dossier hero

  $random_image = $image_files[array_rand($image_files)]; // Récupère une image aléatoire

  return $upload_dir['baseurl'] . str_replace($upload_dir['basedir'], '', $random_image); // Retourne l'url de l'image
}



/*
 Bouton charger plus
*/

function load_more_photos()

{
  $args = array( // Arguments pour la requête
    'post_type' => 'photos', // Type de post "photos"
    'paged' => $_POST['paged'], // Page actuelle (à partir de laquelle on charge les posts)
    'posts_per_page' => 8, // Nombre de posts par page (8 par défaut)
  );

  if (isset($_POST['year'])) { // Si l'année est définie dans les données envoyées par le formulaire
    $args['date_query'] = array( // On ajoute l'année aux arguments
      array(
        'year' => $_POST['year'],
      )
    );
  }

  if (isset($_POST['category'])) { // Si la catégorie est définie dans les données envoyées par le formulaire
    $args['tax_query'][] = array( // On ajoute la catégorie aux arguments

      'taxonomy' => 'categorie',
      'field' => "slug",
      "terms" => $_POST['category'],
    );
  }

  if (isset($_POST['format'])) { // Si le format est défini dans les données envoyées par le formulaire
    $args['tax_query'][] = array( // On ajoute le format aux arguments

      'taxonomy' => 'formats',
      'field' => "slug",
      "terms" => $_POST['format'],
    );
  }

  if (isset($_POST['post__not_in'])) { // Si les posts à exclure sont définis dans les données envoyées par le formulaire
    $args['post__not_in'] = array( // On ajoute les posts à exclure aux arguments
      $_POST['post__not_in'],
    );
  }


  $photos = new WP_Query($args); // Requête WP_Query

  if ($photos->have_posts()) { // Si il y a des posts
    while ($photos->have_posts()) {  // et tant qu'il y a des posts
      $photos->the_post(); // On passe au post suivant
      get_template_part('template-parts/gallery-card'); // En utilisant mon template gallery-card.php 
    }
    wp_reset_postdata(); // On réinitialise la requête
  }

  exit; // On arrête le script
}


add_action('wp_ajax_load_more_photos', 'load_more_photos'); // On ajoute l'action pour les utilisateurs connectés
add_action('wp_ajax_nopriv_load_more_photos', 'load_more_photos'); // On ajoute l'action pour les utilisateurs non connectés
