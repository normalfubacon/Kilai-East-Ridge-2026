const CACHE_NAME = "kilai-east-ridge-2026-v1";

const CACHE_FILES = [
  "./",
  "./index.html",
  "./assets/styles.css",
  "./Photos/hero-qilai-east-ridge.png",
  "./01_README.md",
  "./02_Water_Plan.md",
  "./03_Gear_Checklist.md",
  "./04_Emergency_Plan.md",
  "./05_Team_Briefing.md",
  "./Kilai-East-Ridge-2026-mobile.html",
  "./manifest.webmanifest"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CACHE_FILES))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).catch(() => caches.match("./index.html"));
    })
  );
});
