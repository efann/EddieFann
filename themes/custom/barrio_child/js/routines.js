// Updated on March 12, 2017
//----------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------

var Routines =
  {
    CONTACT_BLOCK: '#contact-message-feedback-form',

    SLOGAN_LINK: '#block-barrio-child-headerblock .slogan a',
    SLOGAN_DIALOG: '#Slogan',

    QUOTES_BLOCK: '#carousel_quotes_block',

    //----------------------------------------------------------------------------------------------------
    initializeRoutines: function ()
    {
      Beo.initializeBrowserFixes();
    },

    //----------------------------------------------------------------------------------------------------
    setupWatermarks: function ()
    {
      var lcForm = Routines.CONTACT_BLOCK;
      if (jQuery(lcForm).length === 0)
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
      var loText = jQuery(Routines.SLOGAN_DIALOG);
      if (loText.length == 0)
      {
        return;
      }

      jQuery(Routines.SLOGAN_LINK).click(function (toEvent)
      {
        toEvent.preventDefault();

        // From https://stackoverflow.com/questions/45621755/add-bootstrap-modal-using-javascript-and-cloned-node
        jQuery(Routines.SLOGAN_DIALOG).modal('show')

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
        loAJAX.fadeOut(750);
      }

    }
    //----------------------------------------------------------------------------------------------------
  };

//----------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------
