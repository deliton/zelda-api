# Zelda API
![ZELDA-BANNER](https://user-images.githubusercontent.com/47995046/94411820-62689f80-014f-11eb-9e44-cd67a3c2682b.jpg)

## Description
This repository holds the code of the Zelda API, a RESTful API of "The Legend of Zelda" game franchise, which provides you with games, characters, enemies, bosses, dungeons and more! The Zelda API is currently deployed on vercel, and can be accessed with the following url: http://zelda-api.apius.cc/


NextJS never cease to amaze me! So I started this project as some kind of proof of concept application, proving that it is possible to build an API with MongoDB using such a powerful tool. This is an experimental implementation, so some availability problems can be expected.

## Getting Started

Since this API doesn't require you to provide an API key, it's extremely easy to use. Feel free to explore our documentation and test routes!

### Example REQUEST

Let's retrieve a list of all released games with the following route:

- METHOD: **GET**
- URL: http://zelda-api.apius.cc/api/games?limit=2

- RESULT
```javascript
{
    "success": true,
    "count": 2,
    "data": [
        {
            "_id": "5f6ce9d805615a85623ec2b7",
            "name": "The Legend of Zelda",
            "description": "The Legend of Zelda is the first...",
            "developer": "Nintendo R&D 4",
            "publisher": "Nintendo",
            "released_date": " February 21, 1986",
            "__v": 0
        },
        {
            "_id": "5f6ce9d805615a85623ec2b8",
            "name": "The Legend of Zelda: A Link to the Past",
            "description": "One day, a band of evil thieves managed to...",
            "developer": "Nintendo",
            "publisher": "Nintendo",
            "released_date": " April 13, 1992",
            "__v": 0
        }
    ]
}
```

## Documentation

An awesome documentation can be found on https://docs.zelda-api.apius.cc

## Tech Stack
Database: MongoDB

Deployment: Vercel

Engine: NextJS

# Building
In order to build this project just clone this repository and install the dependencies:

```console
user@admin:~$ git clone https://github.com/deliton/zelda-api.git && cd zelda-api
user@admin:~/idt$ npm install && npm run dev

```

# Deploy

You can also quickly deploy a version of this repository using Vercel. Just create an account there, import this repository and that's it, it's done. In order to properly use this API it is necessary to define some ENVIRONMENT VARIABLES:

**MONGODB_URI**= URI TO CONNECT TO A MONGODB DATABASE

**API_URL**= URL TO THE DOMAIN OF YOUR API

## Project
This project is currently being built with NextJS and MongoDB, but still is a work in progress. Stay tuned to the upcoming versions here on Github.
