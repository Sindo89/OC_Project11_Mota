<!doctype html>
<html <?php language_attributes(); ?>>

<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
  <?php wp_head(); ?>
</head>


<body>
  <div class="menu-mobile">
    <div class="top-mobile">
      <div class="logo-mobile">
        <?php
        the_custom_logo();
        ?>
      </div>
      <div class="menu-toggle-close">
        <span class="cross"></span>
      </div>
    </div>
    <?php
    wp_nav_menu(
      array(
        'theme_location' => 'menu-1',
        'menu_id'        => 'primary-menu',
      )
    );
    ?>
  </div>


  <div class="menu-open">
    <header class="site-header">

      <!-- NAV  -->
      <nav id="site-navigation" class="main-navigation">
        <div class="menu-desktop">

          <div class="top-desktop">
            <div class="logo-desktop">
              <?php
              the_custom_logo();
              ?>
            </div>
            <div class="menu-toggle">
              <span class="burger"></span>
            </div>
            <?php
            wp_nav_menu(
              array(
                'theme_location' => 'menu-1',
                'menu_id'        => 'primary-menu',
              )
            );
            ?>
          </div>
        </div>
      </nav>

    </header>