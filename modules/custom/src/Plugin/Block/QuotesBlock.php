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

    $lcContent .= "<div id='quotes_block' style='overflow: hidden; clear: both;'>\n";

    $lcContent .= "<div class='flexslider'>\n";
    $lcContent .= "<ul class='slides'>\n";

    foreach ($loViewExecutable->result as $lnIndex => $loRow)
    {
      $lcContent .= "<li>\n";

      $loNode = $loRow->_entity;

      $lcBody = $loNode->get('body')->value;
      $lcAuthor = $loNode->get('field_author')->value;
      $lcAuthorURL = $loNode->get('field_author_url')->value;

      $lcTarget = (stripos($lcAuthorURL, 'northup-wiley.com') === false) ? " target='_blank'" : '';
      $lcContent .= "<div class='quote'>$lcBody</div><div class='refer'>-&nbsp;<a href='$lcAuthorURL'$lcTarget>$lcAuthor</a></div>" . "\n";

      $lcContent .= "</li>\n";
    }

    $lcContent .= "</ul>\n";
    $lcContent .= "</div>\n";

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
