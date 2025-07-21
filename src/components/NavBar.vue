<template>
  <nav class="navbar">
    <div class="nav-content">
      <router-link to="/" class="logo">
        <img src="@/assets/logo.png" alt="Logo" class="logo-img"/>
        <h1>June</h1>
      </router-link>
      
      <div class="nav-right">
        <div class="nav-links">
          <!-- <router-link to="/category" class="nav-link">{{ $t('nav.categories') }}</router-link> -->
          <router-link to="/about" class="nav-link">{{ $t('nav.about') }}</router-link>
        </div>

        <!-- <language-switcher /> -->
      </div>
    </div>
  </nav>
</template>

<script>
// import LanguageSwitcher from './LanguageSwitcher.vue'

export default {
  name: 'NavBar',
  components: {
    // LanguageSwitcher
  }
}
</script>

<style scoped>
.navbar {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 0 20px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-content {
  /* max-width: 1200px; */
  margin: 0 auto;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.logo {
  text-decoration: none;
  color: inherit;
  margin-left: 20px;
}

.logo h1 {
  font-size: 1.4em;
  color: #2c3e50;
  margin: 0;
  display: inline-block;
}
.logo-img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-left: 10px;
  margin-right: 1px;
  position: relative;
  top: 5px;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-link {
  text-decoration: none;
  color: #2c3e50;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
}

@media (max-width: 768px) {
  .nav-content {
    height: auto;
    padding: 15px 0;
    flex-direction: column;
    gap: 15px;
  }

  .nav-right {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }

  .nav-links {
    margin: 0;
  }
}
</style> 