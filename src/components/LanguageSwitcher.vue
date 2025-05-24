<template>
  <div class="language-switcher">
    <select 
      v-model="selectedLocale" 
      @change="changeLanguage"
      class="language-select"
    >
      <option 
        v-for="locale in supportedLocales" 
        :key="locale.code" 
        :value="locale.code"
      >
        {{ locale.name }}
      </option>
    </select>
  </div>
</template>

<script>
import { supportedLocales, setLocale } from '../i18n';

export default {
  name: 'LanguageSwitcher',
  data() {
    return {
      selectedLocale: this.$i18n.locale,
      supportedLocales
    };
  },
  created() {
    console.log(22, this.$i18n.locale);
    console.log(1111, process.env.VUE_APP_GH_TOKEN);
  },
  methods: {
    changeLanguage() {
      setLocale(this.selectedLocale);
    }
  }
};
</script>

<style scoped>
.language-switcher {
  display: inline-block;
  position: relative;
  min-width: 120px;
}

.language-select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background-color: white;
  font-size: 14px;
  color: #606266;
  cursor: pointer;
  outline: none;
  transition: all 0.2s;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 16px;
  padding-right: 32px;
}

.language-select:hover {
  border-color: #667eea;
}

.language-select:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
}

@media (max-width: 768px) {
  .language-switcher {
    min-width: 150px;
  }
  
  .language-select {
    width: 100%;
    padding: 10px 32px 10px 12px;
  }
}
</style> 