export class LogoApiService {
    baseUrl = 'https://logo.clearbit.com';

    getUrlToLogo(source) {
        return `${this.baseUrl}/${ new URL(source.url).host }`;
    }
}