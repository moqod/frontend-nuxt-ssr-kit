# frontend-nuxt-ssr-kit

1. копируем проект 
1.1 npm install в папке src
1.1 npm install в папке functions
2. создаем .env файл из .evn.example
3. Создать проект в firebase https://console.firebase.google.com/u/1/
3.1 Скопировать доступы в .env файл
3.2 Соранить серверные настройки в json файле
3. Создать Realtime Database (НЕ Cloud Firestore!)
4. Пройти инструкции по настройки флеймлинк 
https://app.flamelink.io/dashboard
4.1. Realtime Database
4.2. пройти три шага
4.3. Создать сделать структуру контента или восстановить из бекапа flamelink_default_schema.json
4.4 вставить расширенные правила для БД 
5.1 Установить npm install -g firebase-tools
5.2 firebase login
5.3 В папке проекта firebase init hosting (choose not SPA)
6. Загрузить картинки для слайдера
7. Сбилдить проект `npm run build` в /src папке
8. in root folder run commands:
8.1 `rm -r public/*`
8.2 `rm -r functions/nuxt/`
8.2 `cp -R src/static/* public/`
8.3 `cp -R src/.nuxt/dist/client/ public/dist/`
8.4 `cp -R src/.nuxt/ functions/nuxt/`
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