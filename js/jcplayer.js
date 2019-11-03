/*
 JCat Online Player v.2.0.0_beta2 - Player for Site (Icecast2 Online Radio)
 Copyright (c) 2016-2019 Andrew Molchanov
 https://github.com/JoCat/JCPlayer
*/

// Player Object
JCPlayer = {
    // Params
    server_address: 'http://127.0.0.1:8000/', // Default address:port
    mounts_list: ['live', 'nonstop'], // Mount point list
    stream_mount: 'live', // Default mount
    info_link: 'current_track.xsl', // Info file
    time_update: 10, // Time to update information (in seconds)
    style: 'fixed', // Player style

    // System Params
    audio_object: {},
    player_stoped: true,

    // Functions
    init(init_params) {
        // Setting transmitted parameters
        if (typeof init_params == 'object') {
            init_params_list = Object.keys(init_params);
            for (let parameter of init_params_list) {
                this[parameter] = init_params[parameter];
            }
        }

        $("#jcp-player").html('<div id="jcp-player" class="'+this.style+'"><div id="player-el"><i id="jcp-play"></i><i id="jcp-stop"></i><input id="jcp-volume" type="range" min="0" max="100" value="50" step="1"></div><span id="jcp-track"></span></div>');

        // Init audio object
        this.audio_object = new Audio();
        this.audio_object.volume = 0.5;

        // Events
        $("#jcp-player").on('click', '#jcp-play', (e) => {this.play(e.target)});
        $("#jcp-player").on('click', '#jcp-pause', (e) => {this.pause(e.target)});
        $("#jcp-player").on('click', '#jcp-stop', (e) => {this.stop(e.target)});
        $("#jcp-player").on('mousemove', '#jcp-volume', (e) => {this.change_volume(e.target)});

        // show current playable track
        let _this = this;
        let timer = setTimeout(function showinfo() {
            $.ajax({
                dataType: 'json',
                url: _this.server_address + _this.info_link,
            }).done((d) => {
                for (let mount_name of _this.mounts_list) {
                    if (d[mount_name]) {
                        $("#jcp-track").html(d[mount_name].title);
                        break;
                    }
                }
            });
            timer = setTimeout(showinfo, _this.time_update*1000);
        }, _this.time_update*1000);
    },

    play(el) {
        if (this.player_stoped === true) {
            this.audio_object.setAttribute("src", this.server_address + this.stream_mount);
            this.player_stoped = false;
        }
        this.audio_object.play();
        $(el).attr('id', 'jcp-pause');
    },
    pause(el) {
        this.audio_object.pause();
        $(el).attr('id', 'jcp-play');
    },
    stop(el) {
        this.audio_object.pause();
        this.audio_object.setAttribute("src", "");
        this.player_stoped = true;
        $(el).attr('id', 'jcp-play');
    },
    change_volume(el) {
        this.audio_object.volume = el.value / 100;
    }
};