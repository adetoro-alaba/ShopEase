export function Success() {
  const order = JSON.parse(localStorage.getItem("lastOrder"));

  if (!order) {
    location.hash = "#";
    return;
  }

  document.querySelector("#app").innerHTML = `

    <div class="page-enter min-h-screen bg-gray-50 flex items-center justify-center px-6">

      <div class="bg-white rounded-3xl shadow-xl max-w-lg w-full p-8 md:p-10 text-center">

        <div class="text-7xl mb-6">
          🎉
        </div>

        <h1 class="text-4xl font-bold">
          Order Confirmed!
        </h1>

        <p class="text-gray-500 mt-4 leading-7">
          Thank you for shopping with ShopEase.
          Your order has been received successfully.
        </p>


        <div class="bg-gray-50 rounded-2xl p-5 mt-7 text-left">

          <div class="flex justify-between">

            <span class="text-gray-500">
              Order ID
            </span>

            <span class="font-bold">
              ${order.id}
            </span>

          </div>


          <div class="flex justify-between mt-4">

            <span class="text-gray-500">
              Status
            </span>

            <span class="text-yellow-600 font-semibold">
              ${order.status}
            </span>

          </div>


          <div class="flex justify-between mt-4">

            <span class="text-gray-500">
              Total
            </span>

            <span class="font-bold text-blue-600">
              ₦${order.total.toLocaleString()}
            </span>

          </div>

        </div>


        <div class="grid sm:grid-cols-2 gap-4 mt-7">

          <a
            href="#orders"
            class="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
          >
            View Orders
          </a>

          <a
            href="#"
            class="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-3 rounded-xl font-semibold transition"
          >
            Continue Shopping
          </a>

        </div>

      </div>

    </div>

  `;
}
