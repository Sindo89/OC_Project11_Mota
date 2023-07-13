<?php
get_header();
?>

<main>

  <section class="hero">
    <?php $hero_image = random_hero_image(); ?>
    <img class="img-hero" src="<?php echo $hero_image; ?>" />
    <div class="content-hero">
      <h1 class="title-hero">PHOTOGRAPHE EVENT</h1>
    </div>
  </section>



</main>

<?php
get_footer();
