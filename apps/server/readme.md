# Demo Node.js + express server

## Introduction

Node.js express demo server, which calls Apillon API oasis endpoint, to get session token, which is later used in embedded wallet SDK to create signature.

To integrate embedded wallet into the application with Apillon, follow these steps:

- Login or create new account in [Apillon developer console](https://app.apillon.io)
- Go to embedded wallet module and follow steps, to create an API key with required permissions
- Assign this key to `APILLON_API_KEY` and secret to `APILLON_API_SECRET`
- Run this server locally or deploy it to some other environment (cloud, on premise, ...)
- Use server endpoint in the SDK

## Install modules and run server

```sh
npm i
```

```sh
npm run dev
```
