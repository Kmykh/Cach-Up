<script>
import {NewsApiService} from "./news/services/news-api.service.js";
import {Article} from "./news/model/article.entity.js";
import ArticleList from "./news/components/article-list.component.vue";
import UnavailableContent from "./news/components/unavailable-content.component.vue";
import SideMenu from "./news/components/side-menu.component.vue";
import LanguageSwitcher from "./public/components/language-switcher.component.vue";
import FooterContent from "./public/components/footer-content.component.vue";

export default {
  name: "app",
  components: {FooterContent, LanguageSwitcher, SideMenu, UnavailableContent, ArticleList},
  data() {
    return {
      sidebarVisible: false,
      articles: [],
      errors: [],
      newsApi: new NewsApiService()
    }
  },
  created() {
    this.getArticlesForSource('bbc-news');
  },
  methods: {
    // Build article list from response data
    buildArticleListFromResponseData(articles) {
      return articles.map(article => new Article(
          article.title,
          article.description,
          article.url,
          article.urlToImage,
          article.source));
    },
    // Get Articles for Source
    getArticlesForSource(sourceId) {
      this.newsApi.getArticlesForSource(sourceId)
          .then(response => {
            let articles = response.data.articles;
            this.articles = this.buildArticleListFromResponseData(articles);
            console.log(response.data.articles);
          }).catch(e => this.errors.push(e));
    },
    // Get Articles for Source with Logo URL
    getArticlesForSourceWithLogo(source) {
      this.newsApi.getArticlesForSource(source.id)
          .then(response => {
            let articles = response.data.articles;
            this.articles = this.buildArticleListFromResponseData(articles);
            this.articles.forEach(article => article.source.urlToLogo = source.urlToLogo);
            console.log(response.data.articles);
          }).catch(e => this.errors.push(e));
    },
    // Toggle Sidebar
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    },
    // Source Selected Event Handler
    setSource(source) {
      this.getArticlesForSourceWithLogo(source);
      this.toggleSidebar();
    },
  }
}
</script>

<template>
  <div class="w-full">
    <div>
      <pv-menubar class="sticky bg-primary">
        <template #start>
          <pv-button icon="pi pi-bars" label="CatchUp" text @click="toggleSidebar"/>
          <side-menu v-model:visible="sidebarVisible" v-on:source-selected="setSource"/>
        </template>
        <template #end>
          <language-switcher/>
        </template>
      </pv-menubar>
    </div>
  </div>
  <div>
    <article-list v-if="errors" :articles="articles"/>
    <unavailable-content v-else :errors="errors"/>
  </div>
  <footer-content/>
</template>