export function showToast(message, type = "success") {
  const oldToast = document.querySelector("#shop-toast");

  if (oldToast) {
    oldToast.remove();
  }

  const toast = document.createElement("div");

  toast.id = "shop-toast";

  toast.className = `
    fixed
    top-24
    right-6
    z-50
    flex
    items-center
    gap-3
    px-6
    py-4
    rounded-2xl
    shadow-2xl
    text-white
    font-semibold
    transform
    translate-x-[120%]
    transition-all
    duration-500
    ${type === "success" ? "bg-green-600" : "bg-red-600"}
  `;

  toast.innerHTML = `
    <span class="text-xl">
      ${type === "success" ? "✓" : "!"}
    </span>

    <span>
      ${message}
    </span>
  `;

  document.body.appendChild(toast);

  // Slide in
  setTimeout(() => {
    toast.classList.remove("translate-x-[120%]");
  }, 50);

  // Slide out
  setTimeout(() => {
    toast.classList.add("translate-x-[120%]");

    setTimeout(() => {
      toast.remove();
    }, 500);
  }, 2500);
}
