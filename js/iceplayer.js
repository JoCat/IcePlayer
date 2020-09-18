/*
 IcePlayer v.3.0.0_dev - Player for Site (Icecast2 Online Radio)
 Copyright (c) 2016-2020 Andrew Molchanov
 https://github.com/JoCat/IcePlayer
*/

"use strict";

class IcePlayer {
    // Player Params
    server_address = 'http://127.0.0.1:8000/' // Default address:port
    stream_mount = 'live' // Default mount
    style = 'fixed' // Player style (fixed or inline)
    template = '<div class="ice-player-el"><i class="ice-play"></i><i class="ice-pause"></i><i class="ice-stop"></i><input class="ice-volume" type="range" min="0" max="100" value="50" step="1"><span class="ice-track"></span></div>'
    // Informer Params
    mounts_list = ['live', 'nonstop'] // Mount point list
    info_link = 'current_track.xsl' // Info file
    time_update = 10 // Time to update information (in seconds)

    // System Params
    audio_object = new Audio()
    current_state = 0
    player_el

    //State const
    STOPPED = 0
    PLAYING = 1
    PAUSED  = 2

    // Functions
    constructor(el, init_params) {
        if (el.length === 0) throw new Error('Player element not found!');
        this.player_el = document.querySelector(el);
        this.audio_object.volume = 0.5;

        // Setting transmitted parameters
        if (typeof init_params === 'object') {
            const init_params_list = Object.keys(init_params).filter(param => ['server_address', 'stream_mount', 'style', 'template', 'mounts_list', 'info_link', 'time_update'].includes(param));
            for (let parameter of init_params_list) {
                this[parameter] = init_params[parameter];
            }
        }

        this.player_el.classList.add('ice-player', this.style);
        this.set_content(this.player_el, this.template);

        // Events
        this.get_element('.ice-play').addEventListener('click', () => {this.play()});
        this.get_element('.ice-pause').addEventListener('click', () => {this.pause()});
        this.get_element('.ice-stop').addEventListener('click', () => {this.stop()});
        this.get_element('.ice-volume').addEventListener('mousemove', () => {this.change_volume()});
        this.audio_object.addEventListener('play', () => {
            this.current_state = this.PLAYING;
            this.play_pause_toggle();
        });
        this.audio_object.addEventListener('pause', () => {
            this.current_state = this.PAUSED;
            this.play_pause_toggle();
        });

        // show current playable track
        this.showinfo();
    }

    play() {
        if (this.current_state === this.STOPPED)
            this.audio_object.setAttribute('src', this.server_address + this.stream_mount + '?cache-ignore=' + Date.now());
        this.audio_object.play();
    }
    pause() {
        this.audio_object.pause();
    }
    stop() {
        this.audio_object.pause();
        this.audio_object.setAttribute('src', '');
        this.current_state = this.STOPPED;
        this.play_pause_toggle();
    }
    change_volume() {
        this.audio_object.volume = this.get_element('.ice-volume').value / 100;
    }

    showinfo() {
        this.request(this.server_address + this.info_link, (data) => {
            for (let mount_name of this.mounts_list) {
                if (data[mount_name]) {
                    this.set_content('.ice-track', data[mount_name].title);
                    break;
                }
            }
        });
        this.timer = setTimeout(() => {this.showinfo()}, this.time_update*1000);
    }

    play_pause_toggle() {
        if (this.current_state === this.PLAYING) {
            this.hide('.ice-play');
            this.show('.ice-pause');
        } else {
            this.hide('.ice-pause');
            this.show('.ice-play');
        }
    }

    // Utils
    get_element(el) {
        return (typeof el == 'object') ? el : this.player_el.querySelector(el);
    }
    set_content(el, content) {
        this.get_element(el).innerHTML = content;
    }
    request(url, callback) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.onload = function() {
            if (this.status >= 200 && this.status < 400) {
            var data = JSON.parse(this.response);
            callback(data);
            }
        };
        request.send();
    }
    hide(el) {
        this.get_element(el).style.display = 'none';
    }
    show(el) {
        this.get_element(el).style.display = 'inline-flex';
    }
};