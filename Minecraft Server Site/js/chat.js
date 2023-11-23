function create_message(elementID, user, value, msgID) {
    let chat_scroll_box = document.getElementById(elementID);

    if (chat_scroll_box != null) {
        let message_box = document.createElement("div");
        message_box.className = "message";
        message_box.id = msgID;

        let message_author = document.createElement("a");
        message_author.id = "user";
        message_author.textContent = user + ":";
        message_author.href = "user_profile.html";
        if (user == user_login) {
            message_author.className = "message_author_self";
            let message_childs = message_box.children;
            message_box.addEventListener('mouseenter', e => {
                let message_delete_btn = document.createElement("button");
                message_delete_btn.id = "dlt_msg";
                message_delete_btn.textContent = "ВИДАЛИТИ";
                message_delete_btn.onclick = function () {
                    deleteFromDatabase("messages", msgID + "_" + user_login);
                }
                message_box.appendChild(message_delete_btn);
            });

            message_box.addEventListener('mouseleave', e => {
                message_childs[2].remove();
            });
        } else {
            message_author.className = "message_author";
        }

        message_author.addEventListener('click', function (event) {
            event.preventDefault();
            var url = 'user_profile.html?name=' + encodeURIComponent(user);
            document.location.href = url;
        });

        let message_text = document.createElement("span");
        message_text.textContent = value;
        message_text.className = "message_text";

        message_box.appendChild(message_author);
        message_box.appendChild(message_text);

        chat_scroll_box.appendChild(message_box);
        chat_scroll_box.scrollTo(0, chat_scroll_box.scrollHeight);
    }
}

async function sendmessage() {
    executeIfSignedIn((docs) => {
        let message_text_input = document.getElementById("message_text_input").value;
        addToDatabase("messages", user_login, true, {
            "sender": user_login,
            "content": message_text_input
        });
        document.getElementById("message_text_input").value = "";
    }, function () {
        showSiteMessage("Для цього потрібно увійти в акаунт!");
    })
}