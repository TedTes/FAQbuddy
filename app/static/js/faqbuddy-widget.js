(function () {
    console.log("helo world")
    // Create widget container
    const widget = document.createElement("div");
    widget.id = "faqbuddy-widget";
    widget.className = "fixed bottom-4 right-4 w-80 max-w-[90%] h-[500px] max-h-[80%] bg-white rounded-lg shadow-lg flex flex-col hidden";
    widget.innerHTML = `
        <div class="bg-blue-600 text-white p-3 rounded-t-lg flex justify-between items-center">
            <div class="flex items-center">
                <img id="business-logo" class="h-6 mr-2" src="" alt="Logo" style="display: none;" />
                <span>FAQBuddy</span>
            </div>
            <button onclick="toggleWidget()" class="text-white hover:text-gray-200">✖</button>
        </div>
        <div id="chat-container" class="flex-1 p-3 overflow-y-auto"></div>
        <div class="p-3 border-t">
            <div id="typing-indicator" class="hidden text-gray-500 text-sm mb-2">FAQBuddy is typing...</div>
            <div class="flex">
                <input type="text" id="query" placeholder="Ask something..." class="flex-1 p-2 border rounded-l-lg focus:outline-none" />
                <button onclick="sendQuery()" class="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700">➤</button>
            </div>
        </div>
    `;
    document.body.appendChild(widget);


    // Functions
    window.toggleWidget = function () {
        widget.classList.toggle("hidden");
        toggleBtn.classList.toggle("hidden");
    };

    window.sendQuery = async function () {
        console.log("function called")
        const queryInput = document.getElementById("query");
        const query = queryInput.value.trim();
        if (!query) return;

        // Show user message
        chatContainer.innerHTML += `<div class="bg-blue-100 text-right m-2 p-2 rounded-lg">${query}</div>`;
        queryInput.value = "";
        chatContainer.scrollTop = chatContainer.scrollHeight;
        chatHistory.push({ sender: "user", message: query });
        localStorage.setItem("faqbuddy_history", JSON.stringify(chatHistory));

        // Show typing indicator
        const typing = document.getElementById("typing-indicator");
        typing.classList.remove("hidden");

        try {
            const response = await fetch("https://faqbuddy.onrender.com/api/v1/ask", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query })
            });
            const data = await response.json();
            typing.classList.add("hidden");
            chatContainer.innerHTML += `<div class="bg-gray-100 m-2 p-2 rounded-lg">${data.answer}</div>`;
            chatContainer.scrollTop = chatContainer.scrollHeight;
            chatHistory.push({ sender: "bot", message: data.answer });
            localStorage.setItem("faqbuddy_history", JSON.stringify(chatHistory));
        } catch (error) {
            typing.classList.add("hidden");
            chatContainer.innerHTML += `<div class="bg-red-100 m-2 p-2 rounded-lg">Error: Try again!</div>`;
        }
    };
    let touchStartY = 0;
    widget.addEventListener("touchstart", (e) => {
        touchStartY = e.touches[0].clientY;
    });
    widget.addEventListener("touchmove", (e) => {
        const touchY = e.touches[0].clientY;
        if (touchY - touchStartY > 100) toggleWidget(); // Swipe down to close
    });

// Load Tailwind CSS
    const tailwind = document.createElement("link");
    tailwind.rel = "stylesheet";
    tailwind.href = "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css";
    document.head.appendChild(tailwind);

    // Toggle button
    const toggleBtn = document.createElement("button");
    toggleBtn.innerHTML = "💬";
    toggleBtn.className = "fixed bottom-4 right-4 bg-blue-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-blue-700";
    toggleBtn.onclick = toggleWidget;
    document.body.appendChild(toggleBtn);

    // Load chat history
    const chatHistory = JSON.parse(localStorage.getItem("faqbuddy_history") || "[]");
    const chatContainer = document.getElementById("chat-container");
    chatHistory.forEach(({ sender, message }) => {
        chatContainer.innerHTML += `<div class="${sender === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-100'} m-2 p-2 rounded-lg">${message}</div>`;
    });
    chatContainer.scrollTop = chatContainer.scrollHeight;

    fetch("https://faqbuddy.onrender.com/api/v1/config")
    .then(res => res.json())
    .then(config => {
        if (config.logo) {
            document.getElementById("business-logo").src = config.logo;
            document.getElementById("business-logo").style.display = "block";
        }
        if (config.theme && themeStyles[config.theme]) {
            widget.querySelector(".rounded-t-lg").className = `text-white p-3 rounded-t-lg flex justify-between items-center ${themeStyles[config.theme].header}`;
            toggleBtn.className = `fixed bottom-4 right-4 text-white w-12 h-12 rounded-full shadow-lg ${themeStyles[config.theme].button}`;
        }
    }).catch(err => console.error("Failed to load config", err));
    


    // Enter key support
    document.getElementById("query").addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendQuery();
    });

   

    const style = document.createElement("style");
    style.innerHTML = `
    @media (max-width: 400px) {
        #faqbuddy-widget { width: 100%; height: 100%; bottom: 0; right: 0; border-radius: 0; }
    }
   `;
    document.head.appendChild(style);
})();