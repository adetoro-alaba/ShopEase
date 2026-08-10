export function Pagination(currentPage, totalPages) {
  const pages = Array.from({ length: totalPages }, (_, index) => {
    const page = index + 1;
    return `
      <button
        data-page="${page}"
        class="px-4 py-2 rounded-xl border transition ${
          currentPage === page
            ? "bg-blue-600 text-white border-blue-600"
            : "bg-white text-gray-700 border-gray-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-slate-700"
        }"
      >
        ${page}
      </button>
    `;
  }).join("");

  return `
    <div class="flex flex-wrap justify-center items-center gap-2 mt-10">
      ${pages}
      <button
        id="next-page"
        class="px-4 py-2 rounded-xl border border-gray-300 bg-white text-gray-700 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-slate-700 transition"
        ${currentPage >= totalPages ? "disabled" : ""}
      >
        Next →
      </button>
    </div>
  `;
}
