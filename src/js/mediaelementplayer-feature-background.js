/**
 * Background
 *
 * Provides an extra layer with a background image (skin)
 */
(function ($) {
    // Feature configuration
    $.extend(mejs.MepDefaults, {
        // Any variable that can be configured by the end user belongs here.
        // Make sure is unique by checking API and Configuration file.
        // Add comments about the nature of each of these variables.
        background: ''
    });

    $.extend(MediaElementPlayer.prototype, {
        /**
         * Feature constructor.
         *
         * Always has to be prefixed with `build` and the name that will be used in MepDefaults.features list
         * @param {MediaElementPlayer} player
         * @param {$} controls
         * @param {$} layers
         * @param {HTMLElement} media
         */
        buildbackground: function (player, controls, layers, media) {
            // This allows us to access options and other useful elements already set.
            // Adding variables to the object is a good idea if you plan to reuse
            // those variables in further operations.
            var t = this,
                background =
                    $('<div class="' + player.options.classPrefix + 'player-background"></div>'),
                backgroundUrl = player.$media.attr('background');

            background
                .css('display', 'block')
                .insertAfter('.' + player.options.classPrefix + 'mediaelement');

            if (player.options.background !== '') {
                backgroundUrl = player.options.background;
            }

            if (backgroundUrl) {
                t.setPlayerBackground(player, backgroundUrl);
            } else {
                background.hide();
            }

            media.addEventListener('play', function () {
                var poster = player.container.find('.' + player.options.classPrefix + 'poster');
                poster.show();
            }, false);
        },

        /**
         * Sets the background image
         *
         * @param {MediaElementPlayer} player
         * @param {String} url
         */
        setPlayerBackground: function (player, url) {
            var t = this,
                posterDiv = player.container.find('.' + t.options.classPrefix + 'player-background'),
                posterImg = posterDiv.find('img');

            if (posterImg.length === 0) {
                posterImg = $('<img class="' + t.options.classPrefix + 'player-background-img" width="100%" height="100%" alt="" />')
                    .appendTo(posterDiv);
            }
            posterImg.attr('src', url);
        },

        // Optionally, each feature can be destroyed setting a `clean` method
        /**
         * Feature destructor.
         *
         * Always has to be prefixed with `clean` and the name that was used in MepDefaults.features list
         *
         * @param {MediaElementPlayer} player
         * @param {$} controls
         * @param {$} layers
         * @param {HTMLElement} media
         */
        cleanbackground: function (player, controls, layers, media) {
            player.container.find('.' + player.options.classPrefix + 'player-background').remove();

            media.addEventListener('play', function () {
                var poster = player.container.find('.' + player.options.classPrefix + 'poster');
                player.poster.hide();
            }, false);
        }
    });
})(mejs.$);
