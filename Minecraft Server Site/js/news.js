function sendpost(theme, text) {
    executeIfAdmin((docs) => {
        if (theme != "" && text != "") {
            addToDatabase("news", user_login, true, {
                "theme": theme,
                "sender": user_login,
                "content": text
            });
        } else {
            showSiteMessage("Неправильно заповнені поля!");
        }
    }, function () {
        showSiteMessage("Недостатньо прав!");
    });
}

function create_post(theme, text, cid) {
    let page_content = document.getElementById("news_scroll_bar");

    let post_section = document.createElement("div");
    post_section.id = "news_sec";
    post_section.className = "page_content_section";
    post_section.cid = cid;

    let post_theme = document.createElement("p");
    post_theme.textContent = theme;
    let post_text = document.createElement("p");
    post_text.textContent = text;

    post_section.appendChild(post_theme);
    post_section.appendChild(post_text);

    page_content.appendChild(post_section);
}

function post_editor() {
    let page_content = document.getElementById("nws");

    let post_edit_window = document.createElement("div");
    post_edit_window.tagName = "EDITOR";
    post_edit_window.style.position = "fixed";
    post_edit_window.style.height = "fit-content"
    post_edit_window.id = "news_sec";
    post_edit_window.className = "page_content_section";
    post_edit_window.style.top = "15px"

    let post_theme = document.createElement("p");
    post_theme.textContent = "Тема новини: ";
    let post_text = document.createElement("p");
    post_text.textContent = "Текст новини: ";
    let post_theme_input = document.createElement("textarea");
    let post_text_input = document.createElement("textarea");

    let post_edit_close = document.createElement("button");
    post_edit_close.className = "default_button";
    post_edit_close.textContent = "Скасувати";
    post_edit_close.onclick = function () { page_content.removeChild(post_edit_window) };
    let post_edit_send = document.createElement("button");
    post_edit_send.className = "default_button";
    post_edit_send.textContent = "Надіслати";
    post_edit_send.onclick = function () {
        sendpost(post_theme_input.value, post_text_input.value);
        page_content.removeChild(post_edit_window);
    };

    post_edit_window.appendChild(post_edit_close);
    post_edit_window.appendChild(post_theme);
    post_edit_window.appendChild(post_theme_input);
    post_edit_window.appendChild(post_text);
    post_edit_window.appendChild(post_text_input);
    post_edit_window.appendChild(post_edit_send);

    page_content.appendChild(post_edit_window);

}