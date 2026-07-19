<script setup>
import LoanCalculator from '@/components/LoanCalculator.vue'

defineOptions({
  name: 'App',
})
</script>

<template>
  <div class="relative min-h-screen overflow-hidden bg-valiant-charcoal">
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,233,86,0.18)_0%,_transparent_45%),linear-gradient(165deg,_#262C2D_0%,_#1a1f20_55%,_#262C2D_100%)]"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -left-20 top-24 size-80 rounded-full bg-valiant-yellow/10 blur-3xl"
      aria-hidden="true"
    />

    <main class="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-8 px-4 py-10 sm:px-6">
      <p class="text-center font-sans text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
        Business loans.
        <span class="text-valiant-yellow">Sorted.</span>
      </p>
      <LoanCalculator />
    </main>
  </div>
</template>
