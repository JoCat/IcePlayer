#JCPlayer
###JCat Online Player - Player for Site (Icecast2 Online Radio)
Данный скрипт является плеером для сайта интенет-радио на платформе Icecast2.  
Последняя (на данный момент) рабочая версия скрипта 1.1  
На данный момент для 2-х потоков вещания (mount-ов).  
Работает на JQuery.

Версия Icecast2 < 2.4.0  
В Icecast2 версии 2.4.0 добавили собственный вывод json информации, на замену морально устаревшего "status2"  
Но всё же там он не является рабочим по 2-м причинам:  
  1. CORS доступ закрыт (Вроде поправили в версии 2.4.1)  
  2. Ошибка вывода информации о потоках (вложенность)
  
> На счёт второго пункта точно не уверен, исправили или нет, ибо пока не доводилось работать с версией > 2.4.0)

Поэтому данный скрипт можно использовать и на версиях > 2.4.0 (он там прекрасно работает (тестил на 2.4.0))
