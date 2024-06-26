// News API Service

import axios from 'axios';
import {LogoApiService} from "../../shares/services/logo-api.service.js";

const http = axios.create({
    baseURL: 'https://newsapi.org/v2'
});

export class NewsApiService {
    apiKey = 'ccbb56732011402283301c9e5c17dcf4';
    logoApi = new LogoApiService();

    // methods

    getSources() {
        return http.get(`top-headlines/sources?apiKey=${this.apiKey}`);
    }

    getArticlesForSource(sourceId) {
        return http.get(`top-headlines?sources=${sourceId}&apiKey=${this.apiKey}`);
    }

    getUrlToLogo(source) {
        return this.logoApi.getUrlToLogo(source);
    }
}
