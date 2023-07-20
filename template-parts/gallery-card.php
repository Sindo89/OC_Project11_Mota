<?php
// Récupérer les champs ACF
$reference = get_field('reference');

// Récupérer les taxonomies
$formats = get_the_terms(get_the_ID(), 'formats');
$categories = get_the_terms(get_the_ID(), 'categorie');

// Initialisation des variables
$categorySlug = '';
$formatSlug = '';
$photoYear = '';

if ($categories && !is_wp_error($categories)) {
  $category = reset($categories);
  $categorySlug = $category->slug; // récupère le slug de la catégorie
}
if ($formats && !is_wp_error($formats)) {
  $format = reset($formats);
  $formatSlug = $format->slug; // récupère le slug du format
}
if (get_the_date()) {
  $photoYear = get_the_date('Y'); // récupère l'année de publication
}
?>

<div class="item-gallery" data-category="<?php echo $categorySlug; ?>" data-format="<?php echo $formatSlug; ?>" data-year="<?php echo $photoYear; ?>">
  <!-- ajouter les attributs data-category, data-format et data-year à .item-gallery -->

  <?php the_post_thumbnail('full'); ?> <!-- afficher l'image -->
  <a href="<?php echo get_permalink(); ?>"> <!-- lien vers la page de la photo -->

    <div class="item-overlay-gallery">
      <span class="icon-fullscreen"></span>
      <span class="icon-eye"></span>
      <span class="photo-reference"><?php echo $reference; ?></span> <!-- afficher la référence de la photo -->
      <span class="photo-category">
        <?php
        if ($categories && !is_wp_error($categories)) {
          foreach ($categories as $category) {
            echo $category->slug; // afficher le slug de la catégorie
          }
        }
        ?>
      </span>
    </div>
  </a>
</div>