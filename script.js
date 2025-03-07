document.addEventListener("DOMContentLoaded", function () {
    function generateOrderNumber() {
        return Math.floor(100000 + Math.random() * 900000);
    }

    function saveSelectedFoods() {
        var selectedFoods = [];
        document.querySelectorAll("input[name='food']:checked").forEach(food => {
            selectedFoods.push(food.value);
        });

        if (selectedFoods.length === 0) {
            alert("Please select at least one item.");
            return;
        }

        sessionStorage.setItem("selectedFoods", JSON.stringify(selectedFoods));
        window.location.href = "Order.html";
    }

    var orderBtn = document.getElementById("orderBtn");
    if (orderBtn) {
        orderBtn.addEventListener("click", saveSelectedFoods);
    }

    function displayFoodImages() {
        var foodImages = {
            "Whopper": "./Menu/Burger.jpeg",
            "Fries": "./Menu/fries.jpeg",
            "Softie": "./Menu/Vanilla.jpeg",
            "Coffee": "./Menu/Coffee.jpeg",
            "Soft Drink": "./Menu/Drinks.jpeg",
            "Meal Combo": "./Menu/Combo.jpeg"
        };

        var selectedFoods = JSON.parse(sessionStorage.getItem("selectedFoods")) || [];
        if (selectedFoods.length === 0) {
            alert("No items selected. Please go back and place an order.");
            return;
        }

        var orderNumber = generateOrderNumber();
        var foodImageContainer = document.getElementById("foodImage");
        var orderID = document.getElementById("orderID");
        var loadingMsg = document.getElementById("loading");
        var orderDetails = document.getElementById("orderDetails");

        foodImageContainer.innerHTML = "";
        loadingMsg.classList.remove("hidden");

        setTimeout(function () {
            loadingMsg.classList.add("hidden");
            orderDetails.classList.remove("hidden");

            selectedFoods.forEach(food => {
                var img = document.createElement("img");
                img.src = foodImages[food];
                img.alt = food;
                foodImageContainer.appendChild(img);
            });

            orderID.textContent = "Order ID: BK" + orderNumber;
        }, 2000);
    }

    if (window.location.pathname.includes("Order.html")) {
        displayFoodImages();
    }
});
