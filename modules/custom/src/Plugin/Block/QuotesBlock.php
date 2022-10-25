<?php

// From http://valuebound.com/resources/blog/drupal-8-how-to-create-a-custom-block-programatically

namespace Drupal\custom\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\views\Views;

//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

/**
 * Provides a 'quotes' block.
 *
 * @Block(
 *   id = "quotes_block",
 *   admin_label = @Translation("Quotes Block"),
 *   category = @Translation("Custom block for displaying the quotes.")
 * )
 */
class QuotesBlock extends BlockBase
{

  const VIEW_QUOTES = 'quotes_list';
  const VIEW_QUOTES_BLOCK = 'block_quotes_list';

  const NO_DATA = 'Not much data to show here. . . .';

  //-------------------------------------------------------------------------------------------------

  /**
   * {@inheritdoc}
   */
  public function build()
  {
    $loViewExecutable = Views::getView(self::VIEW_QUOTES);
    if (!is_object($loViewExecutable))
    {
      return array(
          '#type' => 'markup',
          '#markup' => t(self::NO_DATA),
      );
    }


    $loViewExecutable->execute(Self::VIEW_QUOTES_BLOCK);

    $lcContent = '';

    $lcContent .= "<div id='carousel_quotes_block' class='carousel slide' data-ride='carousel'>\n";

    $lcContent .= "<ol class='carousel-indicators'>\n";
    foreach ($loViewExecutable->result as $lnIndex => $loRow)
    {
      $lcContent .= "<li data-target='#carousel_quotes_block' data-slide-to='$lnIndex'" . ($lnIndex == 0 ? " class='active'" : "") . "></li>\n";
    }
    $lcContent .= "</ol>\n";

    $lcContent .= "<div class='carousel-inner'>\n";

    $lcActive = " active";
    foreach ($loViewExecutable->result as $lnIndex => $loRow)
    {
      $loNode = $loRow->_entity;

      $lcBody = $loNode->get('body')->value;
      $lcAuthor = $loNode->get('field_author')->value;
      $lcAuthorURL = $loNode->get('field_author_url')->value;

      // Beo.updateLinksWithExternalURLs now takes care of the target.
      $lcContent .= "<div class='carousel-item$lcActive'>$lcBody<div class='refer'>-&nbsp;<a href='$lcAuthorURL'>$lcAuthor</a></div></div>" . "\n";

      $lcActive = "";
    }

    $lcContent .= "</div>\n";

    $lcContent .= "<a class='carousel-control-prev btn btn-primary' href='#carousel_quotes_block' role='button' data-slide='prev'>\n";
    $lcContent .= "<span class='carousel-control-prev-icon' aria-hidden='true'></span>\n";
    $lcContent .= "<span class='sr-only'>Previous</span>\n";
    $lcContent .= "</a>\n";
    $lcContent .= "<a class='carousel-control-next btn btn-primary' href='#carousel_quotes_block' role='button' data-slide='next'>\n";
    $lcContent .= "<span class='carousel-control-next-icon' aria-hidden='true'></span>\n";
    $lcContent .= "<span class='sr-only'>Next</span>\n";
    $lcContent .= "</a>\n";

    $lcContent .= "</div>\n";

    // From https://drupal.stackexchange.com/questions/199527/how-do-i-correctly-setup-caching-for-my-custom-block-showing-content-depending-o
    return (array(
        '#type' => 'markup',
        '#cache' => array('max-age' => 0),
        '#markup' => $lcContent,
    ));

  }

  //-------------------------------------------------------------------------------------------------

  private function getNodeField($toNode, $tcField)
  {
    $lcValue = '';
    if ($toNode->hasField($tcField))
    {
      $loField = $toNode->get($tcField);

      if ($loField->entity instanceof \Drupal\file\Entity\File)
      {
        $lcPublicValue = $loField->entity->uri->value;
        $lcURL = \Drupal::service('stream_wrapper_manager')->getViaUri($lcPublicValue)->getExternalUrl();

        $laURL = parse_url($lcURL);
        $lcValue = $laURL['path'];
      }
      else
      {
        $lcValue = $loField->value;
      }
    }

    return ($lcValue);
  }

  //-------------------------------------------------------------------------------------------------

}

//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
