export function getTheme() {
  return localStorage.getItem("theme") || "light";
}

export function saveTheme(theme) {
  localStorage.setItem("theme", theme);
}

export function applyTheme(theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function toggleTheme() {
  const nextTheme = getTheme() === "dark" ? "light" : "dark";
  saveTheme(nextTheme);
  applyTheme(nextTheme);
  return nextTheme;
}

export function bindThemeToggle() {
  const button = document.querySelector("#theme-toggle");
  if (!button) return;

  button.addEventListener("click", () => {
    const nextTheme = toggleTheme();
    button.textContent = nextTheme === "dark" ? "☀️" : "🌙";
  });

  const currentTheme = getTheme();
  button.textContent = currentTheme === "dark" ? "☀️" : "🌙";
}
