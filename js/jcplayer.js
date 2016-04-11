/*
 JCat Online Player v.1.0 - Player for Site (Icecast2 Online Radio)
 Copyright (c) 2016 Andrew Molchanov
 https://github.com/JoCat/JCPlayer
*/
$(document).ready(function(){
    $("#jcp-player").html('<i id="jcp-play"></i><i id="jcp-pause" style="display:none;"></i><i id="jcp-stop"></i><i id="jcp-reload"></i><i id="jcp-volume-off" style="display:none;"></i><i id="jcp-volume-down"></i><input id="jcp-volume" type="range" min="0" max="10" value="5" step="0.1" /><i id="jcp-volume-up"></i><span id="jcp-duration"></span><span id="jcp-track"></span>');
    audio = new Audio();
    playReload = true;

    $("#jcp-play").click(function(){
        if (playReload == true) {
            audio.setAttribute("src",src);
            playReload = false;
        }
        audio.play();
        $("#jcp-play").css('display','none');
        $("#jcp-pause").css('display','inline-block');
    });

    $("#jcp-pause").click(function(){
        audio.pause();
        $("#jcp-play").css('display','inline-block');
        $("#jcp-pause").css('display','none');
    });

    $("#jcp-stop").click(function(){
        audio.pause();
        audio.setAttribute("src","");
        playReload = true;
        $("#jcp-play").css('display','inline-block');
        $("#jcp-pause").css('display','none');
    });

    $("#jcp-reload").click(function(){
        playReload = false;
        audio.pause();
        audio.setAttribute("src",src);
        audio.play();
        $("#jcp-play").css('display','none');
        $("#jcp-pause").css('display','inline-block');
    });

    $("#jcp-volume").mousemove(function(){
        audio.volume = parseFloat(this.value / 10);
     });

    $("#jcp-volume-off").click(function(){
        audio.volume = oldVolume;
        $("#jcp-volume-off").css('display','none');
        $("#jcp-volume-down").css('display','inline-block');
        $("#jcp-volume").val(oldVolume * 10);
    });

    $("#jcp-volume-down").click(function(){
        oldVolume = audio.volume;
        audio.volume = 0;
        $("#jcp-volume-down").css('display','none');
        $("#jcp-volume-off").css('display','inline-block');
        $("#jcp-volume").val(0);
    });

    $("#jcp-volume-up").click(function(){
        audio.volume = 1;
        $("#jcp-volume-off").css('display','none');
        $("#jcp-volume-down").css('display','inline-block');
        $("#jcp-volume").val(10);
    });

    setInterval(function ()	{
        s = parseInt(audio.currentTime % 60);
        m = parseInt((audio.currentTime / 60) % 60);
        h = parseInt((audio.currentTime / 60)/ 60);
        s = String(s);
        m = String(m);
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