# frontend-nuxt-ssr-kit

0. копируем проект 
0.1 npm install в папке src
0.1 npm install в папке functions
1. создаем .env файл из .evn.example
1. Создать проект в firebase https://console.firebase.google.com/u/1/
1.1 Скопировать доступы в .env файл
1.2 Соранить серверные настройки в json файле
2. Создать Realtime Database (НЕ Cloud Firestore!)

3. Пройти инструкции по настройки флеймлинк 
https://app.flamelink.io/dashboard
3.1. Realtime Database
3.2. пройти три шага
3.3. сделать восстановление из файла shema
3.4 вставить расширенные правила для БД

4.1 Установить npm install -g firebase-tools
4.2 firebase login
4.3 В папке проекта firebase init hosting (choose not SPA)

5. Загрузить картинки для слайдера

6. 


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