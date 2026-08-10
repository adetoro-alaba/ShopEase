function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveOrders(orders) {
  localStorage.setItem("orders", JSON.stringify(orders));
}

function getOrders() {
  return JSON.parse(localStorage.getItem("orders")) || [];
}

export function Checkout() {
  const cart = getCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    document.querySelector("#app").innerHTML = `
      <div class="page-enter min-h-screen bg-gray-50 flex items-center justify-center px-6">

        <div class="text-center">

          <div class="text-6xl">
            🛒
          </div>

          <h1 class="text-3xl font-bold mt-5">
            Your cart is empty
          </h1>

          <p class="text-gray-500 mt-3">
            Add some products before checking out.
          </p>

          <a
            href="#"
            class="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl"
          >
            Back to Shop
          </a>

        </div>

      </div>
    `;

    return;
  }

  document.querySelector("#app").innerHTML = `
    <div class="page-enter min-h-screen bg-gray-50 py-12 px-6">

      <div class="max-w-6xl mx-auto">

        <a
          href="#cart"
          class="text-blue-600 hover:underline"
        >
          ← Back to Cart
        </a>

        <h1 class="text-4xl font-bold mt-5 mb-10">
          Checkout 💳
        </h1>


        <div class="grid lg:grid-cols-3 gap-8">


          <!-- CUSTOMER FORM -->

          <div class="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 md:p-8">

            <h2 class="text-2xl font-bold">
              Delivery Information
            </h2>

            <form id="checkout-form" class="mt-8 space-y-6">

              <div class="grid md:grid-cols-2 gap-5">

                <div>

                  <label class="block font-medium mb-2">
                    Full Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="John Doe"
                    class="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />

                </div>


                <div>

                  <label class="block font-medium mb-2">
                    Email
                  </label>

                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    class="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />

                </div>

              </div>


              <div>

                <label class="block font-medium mb-2">
                  Phone Number
                </label>

                <input
                  id="phone"
                  type="tel"
                  required
                  placeholder="08012345678"
                  class="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>


              <div>

                <label class="block font-medium mb-2">
                  Delivery Address
                </label>

                <textarea
                  id="address"
                  required
                  rows="4"
                  placeholder="Enter your delivery address"
                  class="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>

              </div>


              <div class="grid md:grid-cols-2 gap-5">

                <div>

                  <label class="block font-medium mb-2">
                    City
                  </label>

                  <input
                    id="city"
                    type="text"
                    required
                    placeholder="Lagos"
                    class="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />

                </div>


                <div>

                  <label class="block font-medium mb-2">
                    State
                  </label>

                  <input
                    id="state"
                    type="text"
                    required
                    placeholder="Lagos State"
                    class="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />

                </div>

              </div>


              <button
                type="submit"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition"
              >
                Place Order — ₦${total.toLocaleString()}
              </button>

            </form>

          </div>


          <!-- SUMMARY -->

          <div>

            <div class="bg-white rounded-2xl shadow-lg p-6 sticky top-28">

              <h2 class="text-2xl font-bold">
                Your Order
              </h2>

              <div class="border-t my-5"></div>

              <div class="space-y-4">

                ${cart
                  .map(
                    (item) => `
                    <div class="flex justify-between gap-4">

                      <div>

                        <p class="font-semibold">
                          ${item.name}
                        </p>

                        <p class="text-sm text-gray-500">
                          × ${item.quantity}
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

              <div class="flex justify-between text-lg font-bold">

                <span>
                  Total
                </span>

                <span class="text-blue-600">
                  ₦${total.toLocaleString()}
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  `;

  document
    .querySelector("#checkout-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();

      const order = {
        id: "SH-" + Date.now(),
        date: new Date().toISOString(),
        status: "Pending",
        total,
        customer: {
          name: document.querySelector("#name").value,
          email: document.querySelector("#email").value,
          phone: document.querySelector("#phone").value,
          address: document.querySelector("#address").value,
          city: document.querySelector("#city").value,
          state: document.querySelector("#state").value,
        },
        items: cart.map((item) => ({
          ...item,
        })),
      };

      const orders = getOrders();
      orders.push(order);
      saveOrders(orders);
      localStorage.removeItem("cart");
      localStorage.setItem("lastOrder", JSON.stringify(order));
      location.hash = "success";
    });
}
