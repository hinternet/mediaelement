'use strict';

import document from 'global/document';
import {config} from '../player';
import MediaElementPlayer from '../player';
import {isString} from '../utils/general';


/**
 * Channel details layer.
 *
 * This feature adds the channel and episode titles and broadcaster name
 * as layers.
 */

// Feature configuration
Object.assign(config, {
    /**
     * @type {?String}
     */
    channel: null,
    /**
     * @type {?String}
     */
    episode: null,
    /**
     * @type {?String}
     */
    broadcaster: null,
    /**
     * @type {Boolean}
     */
    useHn: false
});

Object.assign(MediaElementPlayer.prototype, {
    /**
     * @type {?HTMLElement}
     */
    channel: null,

    /**
     * Feature constructor.
     *
     * Always has to be prefixed with `build` and the name that will be used in MepDefaults.features list
     * @param {MediaElementPlayer} player
     * @param {$} controls
     * @param {$} layers
     */
    buildchannel(player, controls, layers) {
        if (player.isVideo) {
            return;
        }

        const
            t = this,
            title = isString(t.options.channel) ? t.options.channel : document.title,
            episode = isString(t.options.episode) ? t.options.episode : null,
            broadcaster = isString(t.options.broadcaster) ? t.options.broadcaster : null
        ;

        let
            titleElement = document.createElement(t.options.useHn ? 'h1' : 'div'),
            episodeElement = document.createElement(t.options.useHn ? 'h2' : 'div'),
            broadcasterElement = document.createElement(t.options.useHn ? 'h3' : 'div')
        ;

        player.channel = document.createElement('div');

        titleElement.className = `${t.options.classPrefix}channel--title`;
        titleElement.innerText = title;

        player.channel.className = `${t.options.classPrefix}layer ${t.options.classPrefix}channel`;
        player.channel.appendChild(titleElement);

        if (episode !== null) {
            episodeElement.className = `${t.options.classPrefix}channel--episode`;
            episodeElement.innerText = episode;
            player.channel.appendChild(episodeElement);
        }

        if (broadcaster !== null) {
            broadcasterElement.className = `${t.options.classPrefix}channel--broadcaster`;
            broadcasterElement.innerText = broadcaster;
            player.channel.appendChild(broadcasterElement);
        }

        layers.insertBefore(player.channel, layers.firstChild);

    },
    cleanchannel(player) {
        player.channel.remove();
    }
});