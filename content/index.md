---
seo:
  title: Profit-Taker Guide
  description: a community effort by uumm, Mebius, Iterniam, Kalaay and others
---

::div{class="landing-shell"}
::u-page-hero
---
class: landing-hero
orientation: horizontal
ui:
  container: pt-10 pb-0 sm:pt-12 sm:pb-2 lg:pt-14 lg:pb-2 gap-8 sm:gap-y-8 lg:gap-8
---
#title
Profit-Taker Guide

#description
a community effort by uumm, Mebius, Iterniam, Kalaay and others

#links
  :::u-button
  ---
  color: neutral
  size: xl
  to: /tldr
  trailing-icon: i-lucide-arrow-right
  ---
  Quick Start Guide
  :::

  :::search-hint-button
  ---
  label: Check out the search function as well!
  ---
  :::

#default
<div class="hero-orb-wrap hidden lg:grid place-items-center">
  <img class="image-src h-72 w-72 xl:h-80 xl:w-80 2xl:h-96 2xl:w-96 object-contain" src="https://cdn.profit-taker.com/u/pt-orb.webp" alt="ProfitTakerOrb">
</div>
::

::u-page-section
---
class: landing-features
ui:
  container: pt-0 sm:pt-1 lg:pt-2
---
#title
What this guide covers

#features
  :::u-page-feature
  ---
  icon: i-lucide-orbit
  ---
  #title
  Seven years of Profit-Taker
  
  #description
  Profit-Taker has been out for a bit over seven years now; collectively, we have been active in the community for most of this time. This guide is our attempt to compile most of our knowledge in one place. It is impossible to cover everything, but there should be information useful to everyone.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-users
  to: /guide/welcome
  ---
  #title
  For every stage
  
  #description
  Learn the fight from the ground up, then keep refining your route with faster clears, stronger builds, and more efficient credit farming.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-timer
  ---
  #title
  By Speedrunners
  
  #description
  This guide was made by speedrunners, there's no getting around it, but we've done our best to provide everything you need to do the fight at any level, even if you've never done the fight before.
  :::
::
::

<style>
.landing-shell {
  position: relative;
  isolation: isolate;
  --landing-backdrop:
    linear-gradient(180deg, rgba(12, 43, 55, 0.62) 0%, rgba(24, 82, 103, 0.4) 22%, rgba(194, 236, 241, 0.5) 52%, rgba(248, 251, 252, 0.86) 76%, #ffffff 100%),
    url("/vallis_dew.webp") center top / cover no-repeat;
  --landing-backdrop-opacity: 0.97;
  --landing-title-gradient: linear-gradient(90deg, #060b0d 0%, #143944 24%, #22687a 48%, #38468b 76%, #2e2477 100%);
  --landing-description-color: rgba(17, 28, 36, 0.86);
}

.dark .landing-shell {
  --landing-backdrop:
    linear-gradient(180deg, rgba(24, 24, 27, 0.24) 0%, rgba(24, 24, 27, 0.5) 22%, rgba(24, 24, 27, 0.78) 52%, rgba(24, 24, 27, 0.96) 76%, #18181b 100%),
    url("/vallis_midnight.webp") center top / cover no-repeat;
  --landing-backdrop-opacity: 0.95;
  --landing-title-gradient: linear-gradient(90deg, #b8fbff 0%, #95f5ff 24%, #68e5ff 48%, #7f78ff 76%, #322a6f 100%);
  --landing-description-color: #9f9f9c;
}

.landing-shell::before {
  content: "";
  position: absolute;
  top: calc(var(--ui-header-height) * -1);
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -2;
  pointer-events: none;
  background: var(--landing-backdrop);
  opacity: var(--landing-backdrop-opacity);
}

.landing-hero [data-slot="title"] {
  display: inline-block;
  background: var(--landing-title-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.landing-hero [data-slot="description"] {
  color: var(--landing-description-color);
}

.landing-features {
  margin-top: -0.75rem;
}

.hero-orb-wrap {
  position: relative;
  isolation: isolate;
}

.dark .hero-orb-wrap::before {
  content: "";
  position: absolute;
  inset: 18%;
  z-index: -1;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.52) 0%, rgba(255, 255, 255, 0.18) 30%, rgba(255, 255, 255, 0) 72%);
  filter: blur(34px);
}

.image-src {
  filter: drop-shadow(0 0 24px rgba(255, 255, 255, 0.18));
}

.image-src:hover {
  transform: rotate(666turn);
  transition: transform 59s 1s cubic-bezier(0.3, 0, 0.8, 1);
}
</style>
