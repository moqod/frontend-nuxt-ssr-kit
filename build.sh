#!/usr/bin/env bash

cd src/
npm run build
cd ../
rm -r public/*
rm -r functions/nuxt/
cp -R src/static/* public/
cp -R src/.nuxt/dist/client/ public/dist/
cp -R src/.nuxt/ functions/nuxt/
