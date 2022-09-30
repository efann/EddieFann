// Updated on March 12, 2017
//----------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------

var Routines =
  {
    CONTACT_BLOCK: '#contact-message-feedback-form',
    SLOGAN_BLOCK: '#block-slogan-2',
    TITLE_LINK: '#block-barrio-child-headerblock .title a',
    SLOGAN_DIALOG: '#SloganText',

    QUOTES_BLOCK: '#carousel_quotes_block',

    //----------------------------------------------------------------------------------------------------
    initializeRoutines: function ()
    {
      Beo.initializeBrowserFixes();
    },

    //----------------------------------------------------------------------------------------------------
    setupQuotesCarousel: function ()
    {
      var loCarousel = jQuery(Routines.QUOTES_BLOCK);

      if (loCarousel.length == 0)
      {
        return;
      }

      // FlexSlide setup should come before Beo.setupImageDialogBox. Otherwise, there appears
      // to be some issues with the first image linking to the image and not Beo.setupImageDialogBox.
      // Strange. . . .
      if (loCarousel.find('a.dialogbox-image').length > 0)
      {
        alert('Routines.setupFlexSlider must be run before Beo.setupImageDialogBox.');
        return;
      }

      loCarousel.carousel()
    },

    //----------------------------------------------------------------------------------------------------
    setupWatermarks: function ()
    {
      var lcForm = Routines.CONTACT_BLOCK;
      if (jQuery(lcForm).length == 0)
      {
        return;
      }

      Beo.setupWatermark(lcForm + ' #edit-name', 'Your Name');
      Beo.setupWatermark(lcForm + ' #edit-mail', 'Your@E-mail.com');
      Beo.setupWatermark(lcForm + ' #edit-subject-0-value', 'Subject');
      Beo.setupWatermark(lcForm + ' #edit-message-0-value', 'Message');

    },

    //----------------------------------------------------------------------------------------------------
    // Only change the default behaviour of the logo if on the front page where you
    // should find the slogan.
    setupSloganDialog: function ()
    {
      // Should only exist on the front page.
      var loText = jQuery(Routines.SLOGAN_BLOCK);
      if (loText.length == 0)
      {
        return;
      }

      jQuery(Routines.TITLE_LINK).click(function (toEvent)
      {
        toEvent.preventDefault();

        var lcDialog = Routines.SLOGAN_DIALOG;
        if (jQuery(lcDialog).length == 0)
        {
          jQuery('body').append('<div id="' + lcDialog.substring(1) + '">' + loText.html() + '</div>');
        }

        jQuery(lcDialog).dialog(
          {
            title: 'Slogan',
            width: '90%',
            height: 'auto',
            modal: true,
            autoOpen: true,
            show: {
              effect: 'fade',
              duration: 300
            },
            hide: {
              effect: 'fade',
              duration: 300
            },
            create: function (toEvent, toUI)
            {
              // The maxWidth property doesn't really work.
              // From http://stackoverflow.com/questions/16471890/responsive-jquery-ui-dialog-and-a-fix-for-maxwidth-bug
              // And id="ShowTellQuote" gets enclosed in a ui-dialog wrapper. So. . . .
              jQuery(this).parent().css('maxWidth', '800px');
            }
          });
      });
    },

    //----------------------------------------------------------------------------------------------------
    showAJAX: function (tlShow)
    {
      var lcAJAX = '#ajax-loading';
      var loAJAX = jQuery(lcAJAX);
      if (loAJAX.length == 0)
      {
        alert('The HTML element ' + lcAJAX + ' does not exist!');
        return;
      }

      if (tlShow)
      {
        loAJAX.show();
      }
      else
      {
        loAJAX.hide();
      }

    }
    //----------------------------------------------------------------------------------------------------
  };

//----------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------
