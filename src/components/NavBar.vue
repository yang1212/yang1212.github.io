<template>
  <nav class="navbar">
    <div class="nav-content">
      <router-link to="/" class="logo">
        <img src="@/assets/logo.png" alt="Logo" class="logo-img" />
        <h1 class="logo-text">June</h1>
      </router-link>

      <button class="hamburger" @click="toggleMobileMenu">
        <span :class="{ 'open': mobileMenuOpen }"></span>
        <span :class="{ 'open': mobileMenuOpen }"></span>
        <span :class="{ 'open': mobileMenuOpen }"></span>
      </button>

      <div class="nav-right" :class="{ open: mobileMenuOpen }">
        <div class="nav-links">
          <router-link to="/about" class="nav-link" @click.native="closeMobileMenu">
            {{ $t('nav.about') }}
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'NavBar',
  data() {
    return {
      mobileMenuOpen: false
    }
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false
    }
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
  margin: 0 auto;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
}

.logo h1 {
  font-size: 1.4em;
  color: #2c3e50;
  margin-left: 10px;
}

.logo-img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  position: relative;
  top: 2px;
}
.logo-text {
  font-weight: bold;
  color: #2c3e50;
  position: relative;
  top: 6px;
  left: -10px;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 20px;
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

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  height: 20px;
  width: 25px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.hamburger span {
  display: block;
  height: 3px;
  background: #333;
  border-radius: 2px;
  transition: 0.3s;
}

.hamburger span.open:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}
.hamburger span.open:nth-child(2) {
  opacity: 0;
}
.hamburger span.open:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* Responsive */
@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }

  .nav-right {
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    display: none;
  }

  .nav-right.open {
    display: flex;
  }

  .nav-links {
    flex-direction: column;
    gap: 15px;
  }
}
</style>  