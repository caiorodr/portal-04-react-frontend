import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://portalhomolog.gpssa.com.br/gps_api/api'
});

export const apiNotification = axios.create({
  baseURL: 'https://nestjs-wsnotify-3spe-dev.fl0.io/gps_new_api/api'
})

