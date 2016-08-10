/*
 JCat Online Player v.1.2 - Player for Site (Icecast2 Online Radio)
 Copyright (c) 2016 Andrew Molchanov
 https://github.com/JoCat/JCPlayer
*/
$(document).ready(function(){
    $("#jcp-player").html('<i id="jcp-play"></i><i id="jcp-stop"></i><i id="jcp-reload"></i><i id="jcp-volume-down"></i><input id="jcp-volume" type="range" min="0" max="10" value="5" step="0.1" /><i id="jcp-volume-up"></i><span id="jcp-duration"></span><span id="jcp-track"></span>');
    var audio = new Audio();
    var playReload = true;
    audio.volume = 0.5;

    $("#jcp-player").on('click', '#jcp-play', function() {
        if (playReload == true) {
            audio.setAttribute("src",src);
            playReload = false;
        }
        audio.play();
        $(this).attr('id', 'jcp-pause');
    });

    $("#jcp-player").on('click', '#jcp-pause', function() {
        audio.pause();
        $(this).attr('id', 'jcp-play');
    });

    $("#jcp-stop").click(function(){
        audio.pause();
        audio.setAttribute("src","");
        playReload = true;
        $('#jcp-pause').attr('id', 'jcp-play');
    });

    $("#jcp-reload").click(function(){
        playReload = false;
        audio.pause();
        audio.setAttribute("src",src);
        audio.play();
        $("#jcp-play").attr('id', 'jcp-pause');
    });

    $("#jcp-volume").mousemove(function(){
        audio.volume = parseFloat(this.value / 10);
     });
    $("#jcp-volume").click(function(){
        $("#jcp-volume-off").attr('id', 'jcp-volume-down');
    });

    $("#jcp-player").on('click', '#jcp-volume-off', function() {
        audio.volume = oldVolume;
        $(this).attr('id', 'jcp-volume-down');
        $("#jcp-volume").val(oldVolume * 10);
    });

    $("#jcp-player").on('click', '#jcp-volume-down', function() {
        oldVolume = audio.volume;
        audio.volume = 0;
        $(this).attr('id', 'jcp-volume-off');
        $("#jcp-volume").val(0);
    });

    $("#jcp-volume-up").click(function(){
        audio.volume = 1;
        $("#jcp-volume-off").attr('id', 'jcp-volume-down');
        $("#jcp-volume").val(10);
    });

    setInterval(function ()	{
        s = String(parseInt(audio.currentTime % 60));
        m = String(parseInt((audio.currentTime / 60) % 60));
        h = parseInt(audio.currentTime / 3600);
        if (s.length <= 1) {s = '0'+s};
        if (m.length <= 1) {m = '0'+m};
        if (h >= 1) {$("#jcp-duration").html(h+':'+m+':'+s)}
        else {$("#jcp-duration").html(m+':'+s)}
    },1000);

    timer = setTimeout(function showinfo(){
        $.ajax({
          dataType: 'jsonp',
          jsonp: 'callback',
          jsonpCallback: 'info',
          url: info,
          success: function(d){
            try {
                if (d.live.title == '') {einfo = true} else einfo = false;//First Mount (Main)
            } catch(e) {
                einfo = true;
            }
            if (einfo == true)
                $('#jcp-track').html(d.nonstop.title);//Second Mount (Fallback)
            else
                $('#jcp-track').html(d.live.title);//First Mount (Main)
          },
          error: function(){
              $("#jcp-track").html('Ошибка загрузки! Возможно радио сейчас не работает...');
          }
        });
        timer = setTimeout(showinfo,tupd*1000);
    },tupd*1000);
});