<?php

// arguments pour la requete WP_Query
$args = array(
  'post_type' => 'photos',
  'paged' => 1,
  'posts_per_page' => 8,
);

// requete WP_Query
$photos = new WP_Query($args);

// récupération du header 
get_header();
?>

<main>


  <!-- HERO -->
  <section class="hero">
    <!-- Appel de la fonction random_hero_image() pour récupérer une image aléatoire -->
    <?php $hero_image = random_hero_image(); ?>
    <img class="img-hero" src="<?php echo $hero_image; ?>" alt="Hero Image" />
    <div class="content-hero">
      <h1 class="title-hero">PHOTOGRAPHE EVENT</h1>
    </div>
  </section>


  <!-- GALLERY -->
  <section class="gallery">

    <!-- Filtres -->
    <div class="dropdown">
      <div class="left-dropdown">
        <div class="categories-dropdown custom-select">
          <select id="category-select">
            <option value="">CATÉGORIES</option>
            <?php
            $categories = get_terms('categorie'); // Récupère toutes les catégories
            foreach ($categories as $category) {
              echo '<option value="' . $category->slug . '">' . $category->name . '</option>';
            }
            ?>
          </select>
        </div>
        <div class="formats-dropdown custom-select">
          <select id="format-select">
            <option value="">FORMATS</option>
            <?php
            $formats = get_terms('formats'); // Récupère tous les formats
            foreach ($formats as $format) {
              echo '<option value="' . $format->slug . '">' . $format->name . '</option>';
            }
            ?>
          </select>
        </div>
      </div>
      <div class="right-dropdown">
        <div class="date-dropdown custom-select">
          <select id="date-select">
            <option value="">TRIER PAR</option>
            <?php
            $years = array(); // Tableau pour stocker les années des photos
            if ($photos->have_posts()) {
              while ($photos->have_posts()) {
                $photos->the_post();
                $year = get_the_date('Y'); // Récupère l'année de publication
                if (!in_array($year, $years)) {
                  $years[] = $year; // Ajoute l'année au tableau uniquement si elle n'est pas déjà présente
                }
              }
            }
            rsort($years); // Trie les années par ordre décroissant
            foreach ($years as $year) {
              echo '<option value="' . $year . '">' . $year . '</option>';
            }
            ?>
          </select>
        </div>
      </div>
    </div>

    <!-- Affichage des photos -->
    <div class="items-gallery">
      <?php
      if ($photos->have_posts()) {
        while ($photos->have_posts()) {
          $photos->the_post();
          get_template_part('template-parts/gallery-card'); // récupération du template gallery-card.php 
        }
      }
      ?>
    </div>

    <!-- Bouton charger plus -->
    <div class="load-btn-container">
      <button class="load-btn">Charger plus</button>
    </div>
  </section>
</main>

<?php
get_footer(); // récupération du footer
