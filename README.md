# Lama

**Lama** — це сервіс, який призначений для зберігання, організації та редагування фотографій.

<p align="center">
 <img alt="Codacy grade" src="https://img.shields.io/codacy/grade/843784525b1f4e669420381fe8dbb9ee">
 <img alt="GitHub issues" src="https://img.shields.io/github/issues/iamprovidence/Lama.svg">
 <img alt="GitHub closed issues" src="https://img.shields.io/github/issues-closed/iamprovidence/Lama.svg?color=blue">
 <img alt="GitHub closed pull requests" src="https://img.shields.io/github/issues-pr-closed/iamprovidence/Lama.svg?color=MediumOrchid"> 
 <img alt="GitHub" src="https://img.shields.io/github/license/iamprovidence/Lama.svg?color=Teal">
</p>

# Зміст
* [Проекти](#Сервіси)
* [Технології](#Технології)
   * [Backend](#Backend)
   * [Frontend](#Frontend)
* [Запуск](#Запуск)
   * [Запуск сервісів](#Запуск-сервісів)
     * [Backend](#Backend-1)
       * [Azure Storage](#Azure-Storage)
       * [Redis](#Redis)
       * [ELK](#ELK)
         * [Elasticsearch](#Elasticsearch)
         * [Kibana](#Kibana-optional)
       * [RabbitMQ](#RabbitMQ)
       * [LamaAPI](#LamaAPI)
       * [PhotoAPI](#PhotoAPI)
       * [Aggregator](#Aggregator)
       * [APIGateway](#APIGateway)
     * [Frontend](#Frontend-1)
       * [Angular](#Angular)
    * [Запуск за допомогою Docker](#Запуск-за-допомогою-Docker)

## Проекти

|    | Назва | Статус | Опис |
|----| :---: | :---: | ----- |
|**Backend**|||||
||Events |<img alt="AppVeyor" src="https://img.shields.io/appveyor/ci/iamprovidence/lama-egi6l">| Моделі подій, які виникають у сервісах |
||EventBus |<img alt="AppVeyor" src="https://img.shields.io/appveyor/ci/iamprovidence/lama-mikv2">| Реалізація шини для обміну повідомлень |
||APIGateway |<img alt="AppVeyor" src="https://img.shields.io/appveyor/ci/iamprovidence/lama-e7mpq">| Фасад над сервісами у вигляді API шлюзу |
||Aggregator|<img alt="AppVeyor" src="https://img.shields.io/appveyor/ci/iamprovidence/lama-dmb1t">| Сервіс для об'єднання даних з інших сервісів  |
|| LamaAPI |<img alt="AppVeyor" src="https://img.shields.io/appveyor/ci/iamprovidence/lama">| Основний сервіс системи  |
||PhotoAPI |<img alt="AppVeyor" src="https://img.shields.io/appveyor/ci/iamprovidence/lama-dg5ix">| Сервіс для роботи із фотографіями |
|**Frontend**|||||
||Angular |<img alt="AppVeyor" src="https://img.shields.io/appveyor/ci/iamprovidence/lama-686q0">| SPA веб-клієнт |


<p align="center">
  <img src="/docs/images/microservices.png">
</p>

## Технології

- [Docker](https://www.docker.com/get-started)
- [Firebase](https://firebase.google.com/)

### Backend

- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
- [.NET Core](https://dotnet.microsoft.com/download)
- [SignalR](https://dotnet.microsoft.com/apps/aspnet/real-time)
- [RabbitMQ](https://www.rabbitmq.com/download.html)
- [ELK Stack](https://www.elastic.co/what-is/elk-stack)
- [Azure Storage Emulator](https://docs.microsoft.com/en-us/azure/storage/common/storage-use-emulator)
- [Hangfire](https://www.hangfire.io/)
- [Redis](https://redis.io/)

### Frontend

- [Node.js](https://nodejs.org/en/)
- [Angular](https://angular.io)
- [Angular CLI](https://angular.io/cli)
- [Bulma](https://bulma.io/)
- [Less](http://lesscss.org/)

## Запуск

### Запуск сервісів

#### Backend

##### Azure Storage

* перейдіть в папку з AzureStorageEmulator ``C:\Program Files\Microsoft SDKs\Azure\Storage Emulator``
* запускаємо сервіс ``AzureStorageEmulator.exe start``

##### Redis

* перейдіть в папку з Elasticsearch ``C:\Program Files\Redis``
* запускаємо файл ``redis-server.exe``

##### ELK 

###### Elasticsearch

* перейдіть в папку з Elasticsearch ``C:\Program Files\elasticsearch-7.3.0\bin``
* запускаємо файл ``elasticsearch.bat``
* АРІ:
  * http://localhost:5601/

###### Kibana (*optional)

* перейдіть в папку з Elasticsearch ``C:\Program Files\kibana-7.5.1-windows-x86_64\bin``
* запускаємо файл ``kibana.bat``
* management сторінка:
  * http://localhost:5601/

##### RabbitMQ

* відкрийте діалогове вікно виконання команд ``win + R`` 
* відкрийте термінал, введіть ``cmd`` 
* перейдіть в папку з RabbitMQ ``cd C:\Program Files\RabbitMQ Server\rabbitmq_server-***\sbin``
* запускаємо сервіс ``rabbitmq-service.bat start``
* management сторінка:
  * http://localhost:15672, 
    * логін — **guest**
    * пароль — **guest**

##### LamaAPI

* відкрийте діалогове вікно виконання команд ``win + R`` 
* відкрийте термінал, введіть ``cmd`` 
* перейдіть в папку проекту ``cd \src\backend\LamaAPI``
* створіть БД, виконавши команду ``dotnet ef database update --project API``

> За замовчуванням, рядок з'єднання до SQL Server буде **(localdb)**. Якщо ви використовуєте інший псевдонім, то оновіть **ConnectionStrings:LamaDatabase** у файлі **appsettings.json**, який знаходиться в папці **backend/LamaAPI/API**.

------

* перейдіть в папку з проектом ``cd \src\backend\LamaAPI``
* запустіть ``run.bat`` файл

------

* відкрийте діалогове вікно виконання команд ``win + R`` 
* відкрийте термінал, введіть ``cmd`` 
* перейдіть в папку проекту ``cd \src\backend\LamaAPI``
* будуємо проект ``dotnet build``
* запускаємо сервіс ``dotnet run --project API``
* документація:
  * http://localhost:2700/swagger/index.html
  * https://localhost:2701/swagger/index.html

##### PhotoAPI

* перейдіть в папку з проектом ``cd \src\backend\PhotoAPI``
* запустіть ``run.bat`` файл

------

* відкрийте діалогове вікно виконання команд ``win + R`` 
* відкрийте термінал, введіть ``cmd`` 
* перейдіть в папку проекту ``cd \src\backend\PhotoAPI``
* будуємо проект ``dotnet build``
* запускаємо сервіс ``dotnet run --project API``
* документація:
  * http://localhost:2710/swagger/index.html
  * https://localhost:2711/swagger/index.html
* фонові задачі:
  * http://localhost:2710/hangfire
  * https://localhost:2711/hangfire
  
##### Aggregator

* перейдіть в папку з проектом ``cd \src\backend\Aggregator``
* запустіть ``run.bat`` файл

------

* відкрийте діалогове вікно виконання команд ``win + R`` 
* відкрийте термінал, введіть ``cmd`` 
* перейдіть в папку проекту ``cd \src\backend\Aggregator``
* будуємо проект ``dotnet build``
* запускаємо сервіс ``dotnet run --project Aggregator``
* документація:
  * http://localhost:1710/swagger/index.html
  * https://localhost:1711/swagger/index.html

##### APIGateway

* перейдіть в папку з проектом ``cd \src\backend\APIGateway``
* запустіть ``run.bat`` файл

------

* відкрийте діалогове вікно виконання команд ``win + R`` 
* відкрийте термінал, введіть ``cmd`` 
* перейдіть в папку з проектом ``cd \src\backend\APIGateway``
* будуємо проект ``dotnet build``
* запускаємо сервіс ``dotnet run --project APIGateway``
* документація:
  * http://localhost:5000/swagger/index.html
  * https://localhost:5001/swagger/index.html

#### Frontend

##### Angular

* перейдіть в папку з проектом ``cd \src\frontend\Angular``
* запустіть ``run.bat`` файл

------

* відкрийте діалогове вікно виконання команд ``win + R`` 
* відкрийте термінал, введіть ``cmd`` 
* перейдіть в папку з проектом ``cd \src\frontend\Angular``
* встановлюємо пакети ``npm install``
* запускаємо сервіс ``ng serve``
* аплікація: 
 * http://localhost:4200

### Запуск за допомогою Docker

* відкривйте Docker Terminal
* перейдіть в папку проекту ``cd \src``
* будуємо проект ``docker-compose build``
* запускаємо сервіси ``docker-compose up -d``

> **На Windows сервіси можуть бути доступні за іншою адресою. Щоб її дізнатись введіть ``docker-machine ip`` (http://192.168.99.100)**

