<?php

// From http://valuebound.com/resources/blog/drupal-8-how-to-create-a-custom-block-programatically

namespace Drupal\custom\Plugin\Block;

use Drupal\Core\Block\BlockBase;

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

    // From https://drupal.stackexchange.com/questions/187400/how-do-i-show-the-site-slogan

    // I was using \Drupal::config('system.site')->get('name') for the title.
    $lcContent .= "<div class='slogan'><a href='/'>" . \Drupal::config('system.site')->get('slogan') . "</a></div>\n";

    return (array(
        '#type' => 'markup',
        '#cache' => array('max-age' => 0),
      // From https://drupal.stackexchange.com/questions/184963/pass-raw-html-to-markup
      // Otherwise, convas tag was being stripped.
        '#markup' => \Drupal\Core\Render\Markup::create($lcContent)
    ));

  }

  //-------------------------------------------------------------------------------------------------

}

//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
