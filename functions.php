<?php

/*
 Charger les scripts et styles.
 */
function mota_scripts()
{
  wp_enqueue_style('mota-style', get_template_directory_uri() . '/style.css');
  wp_enqueue_style('mota-mobile-style', get_template_directory_uri() . '/assets/css/mobile-style.css');
  wp_enqueue_script('mota-scripts', get_template_directory_uri() . '/assets/js/scripts.js');
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
