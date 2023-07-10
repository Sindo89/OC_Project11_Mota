<footer class="site-footer">
  <div class="site-info">
    <?php
    wp_nav_menu(
      array(
        'theme_location' => 'menu-2',
        'menu_id'        => 'footer-menu',
      )
    );
    ?>
  </div>
</footer>
<?php wp_footer(); ?>
</div>
</body>

</html>