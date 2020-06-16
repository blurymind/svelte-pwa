<script>
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js");
  }

  const foo = ["bar", 1, "test"];
</script>

<main>
  {#each foo as f}{f}{/each}
</main>
