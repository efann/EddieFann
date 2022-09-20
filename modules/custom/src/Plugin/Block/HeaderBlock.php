<?php

// From http://valuebound.com/resources/blog/drupal-8-how-to-create-a-custom-block-programatically

namespace Drupal\custom\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\views\Views;

//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

/**
 * Provides a header block.
 *
 * @Block(
 *   id = "header_block",
 *   admin_label = @Translation("Header Block"),
 *   category = @Translation("Custom block for displaying the header.")
 * )
 */
class HeaderBlock extends BlockBase
{
  //-------------------------------------------------------------------------------------------------

  /**
   * {@inheritdoc}
   */
  public function build()
  {
    $lcContent = "";

    $lcContent .= "<div class='title'><a href='/'>\n";
    // From https://drupal.stackexchange.com/questions/187400/how-do-i-show-the-site-slogan
    $lcContent .= \Drupal::config('system.site')->get('name') . "\n";
    $lcContent .= "</a></div>\n";

    $lcContent .= "<div class='slogan'>\n";
    // From https://drupal.stackexchange.com/questions/187400/how-do-i-show-the-site-slogan
    $lcContent .= \Drupal::config('system.site')->get('slogan') . "\n";
    $lcContent .= "</div>\n";


    // From https://drupal.stackexchange.com/questions/199527/how-do-i-correctly-setup-caching-for-my-custom-block-showing-content-depending-o
    return (array(
        '#type' => 'markup',
        '#cache' => array('max-age' => 0),
        '#markup' => $lcContent,
    ));

  }

  //-------------------------------------------------------------------------------------------------

}

//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
