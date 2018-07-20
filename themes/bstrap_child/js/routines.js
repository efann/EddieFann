// Updated on March 12, 2017
//----------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------

var Routines =
  {
    CONTACT_BLOCK: "#contact-message-feedback-form",
    SLOGAN_BLOCK: "#block-slogan",
    TITLE_LINK: "#block-header .title a",
    SLOGAN_DIALOG: "#SloganText",

    QUOTES_BLOCK: "#block-quotesblock",

    //----------------------------------------------------------------------------------------------------
    initializeRoutines: function ()
    {
      Beo.initializeBrowserFixes();

    },


    //----------------------------------------------------------------------------------------------------
    setupQuotesFlexSlider: function ()
    {
      var loSlider = jQuery(Routines.QUOTES_BLOCK);

      if (loSlider.length == 0)
      {
        return;
      }

      // FlexSlide setup should come before Beo.setupImageDialogBox. Otherwise, there appears
      // to be some issues with the first image linking to the image and not Beo.setupImageDialogBox.
      // Strange. . . .
      if (loSlider.find("a.dialogbox-image").length > 0)
      {
        alert("Routines.setupFlexSlider must be run before Beo.setupImageDialogBox.");
        return;
      }

      loSlider.find('.flexslider').flexslider(
        {
          directionNav: (jQuery(window).width() >= 768),
          controlNav: (jQuery(window).width() >= 768),
          prevText: "",
          nextText: "",
          animation: "slide",
          slideshow: false
        });

      loSlider.fadeIn('slow');
    },

    //----------------------------------------------------------------------------------------------------
    loadProjectByAJAX: function (tnNodeID)
    {
      Routines.showAJAX(true);

      // To determine the URL. From http://css-tricks.com/snippets/javascript/get-url-and-url-parts-in-javascript/
      jQuery.ajax({
        url: window.location.protocol + "//" + window.location.host + "/ajax/node/" + tnNodeID
      }).done(function (toData)
      {
        var lcDialog = "#ProjectInformation";
        if (jQuery(lcDialog).length == 0)
        {
          jQuery('body').append('<div id="' + lcDialog.substring(1) + '"></div>');
        }

        var loData = jQuery(toData);
        jQuery(lcDialog).html(loData.find('nodeinfo').find('body').text());

        jQuery(lcDialog).find("a").each(function ()
        {
          jQuery(this).attr("target", "_blank");
          jQuery(this).attr("title", "This link will open in a new browser window");
        });

        jQuery(lcDialog).dialog(
          {
            title: 'Information',
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
              jQuery(this).parent().css("maxWidth", "800px");
            }
          });

        Routines.showAJAX(false);

      });

    },

    //----------------------------------------------------------------------------------------------------
    setupWatermarks: function ()
    {
      var lcForm = Routines.CONTACT_BLOCK;
      if (jQuery(lcForm).length == 0)
      {
        return;
      }

      Beo.setupWatermark(lcForm + " #edit-name", "Your Name");
      Beo.setupWatermark(lcForm + " #edit-mail", "Your@E-mail.com");
      Beo.setupWatermark(lcForm + " #edit-subject-0-value", "Subject");
      Beo.setupWatermark(lcForm + " #edit-message-0-value", "Message");

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
              jQuery(this).parent().css("maxWidth", "800px");
            }
          });
      });
    },

    //----------------------------------------------------------------------------------------------------
    setupTaxonomyTabsForAjax: function (tcTabBlock)
    {
      var loTabs = jQuery(tcTabBlock);

      if (loTabs.length == 0)
      {
        return;
      }

      loTabs.tabs({
        show: {effect: "slide", direction: "up"},
        hide: {effect: "fadeOut", duration: 400},
        beforeLoad: function (event, ui)
        {
          Routines.showAJAX(true);
        },
        load: function (event, ui)
        {
          Routines.showAJAX(false);
        }
      });


      Beo.adjustTabsAlignment(loTabs);
      jQuery(window).resize(function ()
      {
        Beo.adjustTabsAlignment(loTabs);
      });

      loTabs.fadeIn('slow');
    },

    //----------------------------------------------------------------------------------------------------
    getJEquityVersionInfo: function ()
    {
      jQuery("#version-info").load("/ajax/version/2 #jequity-version", function ()
      {
        var lcVersion = jQuery('#app_version').html();
        jQuery('#installation span.version').html(lcVersion);

        var lcFolder = jQuery('#app_folder').html();

        var loLink = jQuery('#installation a.folder');
        loLink.attr('href', lcFolder);
        loLink.html(lcFolder);
      });
    },

    //----------------------------------------------------------------------------------------------------
    showAJAX: function (tlShow)
    {
      var lcAJAX = "#ajax-loading";
      var loAJAX = jQuery(lcAJAX);
      if (loAJAX.length == 0)
      {
        alert("The HTML element " + lcAJAX + " does not exist!");
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
