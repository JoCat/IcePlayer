# IcePlayer
[![npm](https://img.shields.io/npm/v/iceplayer?style=flat-square)](https://www.npmjs.com/package/iceplayer)
[![GitHub license](https://img.shields.io/github/license/JoCat/iceplayer?style=flat-square)](https://github.com/JoCat/iceplayer/blob/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/JoCat/iceplayer?style=flat-square)](https://github.com/JoCat/iceplayer/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

Плеер для сайта интенет-радио на платформе Icecast2.

## Установка скрипта
Для начала вам нужно:
1. Загрузить скрипт (`iceplayer.min.js` или `iceplayer.js` из папки `js`) на сайт и подключить его:
```html
<script type="text/javascript" src="/path/to/iceplayer.min.js"></script>
```
Либо использовать jsDelivr CDN
```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/iceplayer@3.0.0/js/iceplayer.min.js"></script>
```
или UNPKG CDN
```html
<script type="text/javascript" src="https://unpkg.com/iceplayer@3.0.0/js/iceplayer.min.js"></script>
```
2. Загрузить файл `current_track.xsl` из папки `to icecast2 web folder` в папку веб части сарвера Icecast.
> По умолчанию `/usr/share/icecast2/web` для Debian (можно посмотреть в конфиге Icecast-a).

Также если вы используете скрипт [IceInfo](https://github.com/JoCat/IceInfo), вы можете использовать уже загруженый файл `info.xsl`.

3. Загрузить остальные файлы (css/fonts) и подключить css стили (`iceplayer.css` или `iceplayer.min.css`)
```html
<link rel="stylesheet" href="/path/to/iceplayer.min.css">
```

## Настройка скрипта
Вся настройка заключается в 2-х пунктах:
1. Добавить после строк подключения плеера следующее:
```html
<script type="text/javascript">
    new IcePlayer('#ice-player', {
        server_address: '*server address*'
    });
</script>
```
Указав вместо `*server address*` свой адрес сервера, например:
```js
server_address: 'http://127.0.0.1:8000/'
```
А также указав дополнительные параметры, если требуется, список которых приведён ниже.

2. Добавить в код вашего сайта, в нужное вам место:
```html
<div id="ice-player"></div>
```
## Параметры скрипта
`server_address`  
По умолчанию: `'http://127.0.0.1:8000/'`  
Адрес сервера Icecast

`stream_mount`  
По умолчанию: `'live'`  
Mount поинт с которого берётся аудио поток

`style`  
По умолчанию: `'fixed'`  
Стиль плеера, также имеется стиль `'inline'`

`template`  
По умолчанию:
```html
<div class="ice-player-el">
    <i class="ice-play"></i>
    <i class="ice-pause"></i>
    <i class="ice-stop"></i>
    <input class="ice-volume" type="range" min="0" max="100" value="50" step="1">
    <span class="ice-track"></span>
</div>
```
Шаблон плеера

`mounts_list`  
По умолчанию: `['live', 'nonstop']`  
Список mount поинтов с которых берётся информация в порядке убывания (первый приоритетнее всех последующих)

`info_link`  
По умолчанию: `'current_track.xsl'`  
Название информационного файла  
Также поддерживается файл `'info.xsl'` со скрипта [IceInfo](https://github.com/JoCat/IceInfo)

`time_update`  
По умолчанию: `10`  
Время периода обновления информации в секундах
