# frontend-nuxt-ssr-kit

1. Копируем проект c git
+ `rm -r .git -force` удаляем .git файлы
+ `npm install` в папке src
+ `npm install` в папке functions
2. Копируем `.env` файл из `.evn.example`
3. Создать проект в firebase https://console.firebase.google.com/u/1/
+ Скопировать доступы в .env файл из firebase
+ Соранить серверные настройки в json файле (детальнее в .env файле)
3. Создать Realtime Database (НЕ Cloud Firestore!)
5. Пройти инструкции по настройки флеймлинк 
https://app.flamelink.io/dashboard
+ Realtime Database
+ Пройти три шага
+ Создать структуру контента или восстановить пример из бекапа flamelink_default_schema.json
+ Вставить расширенные правила для БД 
6. Установка firebase
+ Установить `npm install -g firebase-tools`
+ `firebase login`
+ В папке проекта `firebase init hosting` (choose not SPA, folder `public`)
+ Файл /firebase.json взять из репозитория
7. Сбилдить проект `npm run build` в /src папке
8. in root folder run commands:
+ `rm -r public/*`
+ `rm -r functions/nuxt/`
+ `cp -R src/static/* public/`
+ `cp -R src/.nuxt/dist/client/ public/dist/`
+ `cp -R src/.nuxt/ functions/nuxt/`
9. (optional) Check on local environment `firebase serve --only hosting,functions`
10. Deploy on firebase server `firebase deploy`


Пример правил Realtime Database которые открывают доступ на чтение flamelink без авторизации без раздела settings
```
{
  "rules": {
    "users": {
      "$user_id": {
        ".read": "$user_id === auth.uid",
        ".write": "$user_id === auth.uid"
      }
    },
    "flamelink": {
        ".read": "auth != null",
      	".write": "auth != null",
        "$module": {
          ".read": "auth != null || $module == 'environments' || $module == 'media' || $module == 'settings'",
          ".write": "auth != null",
					"$environment": {              
              "content": {
                  "$block": {
                      "$lang": {
                        ".indexOn": ["slug"]
                      }
                  }
              }               
          }
        },
        "users": {
        	".indexOn": ["id", "email"]
        }
      
    }     
  }
}
```
