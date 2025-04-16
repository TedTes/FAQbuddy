(function () {
    const widget = document.createElement("div");
    widget.id = "faqbuddy-widget";
    widget.style.position = "fixed";
    widget.style.bottom = "20px";
    widget.style.right = "20px";
    // TODO: (chat UI, styles)
    document.body.appendChild(widget);

    const toggleBtn = document.createElement("button");
    toggleBtn.innerHTML = "💬";
    toggleBtn.onclick = toggleWidget;
    document.body.appendChild(toggleBtn);

    window.sendQuery = async function () {
        const query = document.getElementById("query").value.trim();
        if (!query) return;
        const chat = document.getElementById("chat-container");
        chat.innerHTML += `<div class="message user">${query}</div>`;
        const response = await fetch("https://faqbuddy.onrender.com/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query })
        });
        const data = await response.json();
        chat.innerHTML += `<div class="message bot">${data.answer}</div>`;
    };
})();