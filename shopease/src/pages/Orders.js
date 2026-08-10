function getOrders() {
  return JSON.parse(localStorage.getItem("orders")) || [];
}

export function Orders() {
  const orders = getOrders();

  if (orders.length === 0) {
    document.querySelector("#app").innerHTML = `
      <div class="page-enter min-h-screen bg-gray-50 flex items-center justify-center px-6">

        <div class="text-center max-w-md">

          <div class="text-7xl mb-6">
            📦
          </div>

          <h1 class="text-4xl font-bold">
            No Orders Yet
          </h1>

          <p class="text-gray-500 mt-4">
            You haven't placed any orders yet.
            Your completed purchases will appear here.
          </p>

          <a
            href="#"
            class="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition"
          >
            Start Shopping
          </a>

        </div>

      </div>
    `;

    return;
  }

  document.querySelector("#app").innerHTML = `
    <div class="page-enter min-h-screen bg-gray-50 py-12 px-6">

      <div class="max-w-5xl mx-auto">

        <a
          href="#"
          class="text-blue-600 hover:underline"
        >
          ← Continue Shopping
        </a>

        <div class="mt-6 mb-10">

          <h1 class="text-4xl font-bold">
            My Orders 📦
          </h1>

          <p class="text-gray-500 mt-2">
            Track your ShopEase purchases.
          </p>

        </div>


        <div class="space-y-6">

          ${orders
            .slice()
            .reverse()
            .map(
              (order) => `

              <div
                class="bg-white rounded-2xl shadow-md p-6
                transition-all duration-300
                hover:-translate-y-1 hover:shadow-xl"
              >

                <div class="flex flex-col sm:flex-row
                  justify-between gap-4">

                  <div>

                    <p class="text-sm text-gray-500">
                      Order ID
                    </p>

                    <h2 class="font-bold text-lg">
                      ${order.id}
                    </h2>

                  </div>


                  <span
                    class="self-start px-4 py-2 rounded-full
                    bg-yellow-100 text-yellow-700
                    font-semibold text-sm"
                  >
                    ${order.status}
                  </span>

                </div>


                <div class="border-t my-5"></div>


                <div class="space-y-3">

                  ${order.items
                    .map(
                      (item) => `
                        <div class="flex justify-between gap-4">

                          <div>

                            <p class="font-semibold">
                              ${item.name}
                            </p>

                            <p class="text-sm text-gray-500">
                              Quantity: ${item.quantity}
                            </p>

                          </div>

                          <p class="font-semibold">
                            ₦${(item.price * item.quantity).toLocaleString()}
                          </p>

                        </div>
                      `,
                    )
                    .join("")}

                </div>


                <div class="border-t my-5"></div>


                <div class="flex justify-between items-center">

                  <span class="font-semibold">
                    Total
                  </span>

                  <span class="text-xl font-bold text-blue-600">
                    ₦${order.total.toLocaleString()}
                  </span>

                </div>

              </div>

            `,
            )
            .join("")}

        </div>

      </div>

    </div>
  `;
}
