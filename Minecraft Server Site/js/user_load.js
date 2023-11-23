executeIfSignedIn((docs) => {

    let login_section = document.getElementById("l_sec").children;

    login_section[0].textContent = user_login;
    login_section[1].remove();
    login_section[1].remove();

    let logout_button = document.createElement("button");
    logout_button.className = "nav_button";
    logout_button.id = "LOGOUT";
    logout_button.onclick = logout;
    logout_button.textContent = "Вийти";

    document.getElementById("l_sec").appendChild(logout_button);

});

let chat_scroll_box = document.getElementById("chat_scroll_box") || undefined;
let news_scroll_box = document.getElementById("news_scroll_bar") || undefined

function load_chat_messages() {
    db.ref("messages").orderByChild("id").on("child_added", function (doc) {
        const msg = doc.val();
        create_message("chat_scroll_box", msg.sender, msg.content, msg.id);
    });
}

function delete_chat_messages() {
    db.ref("messages").orderByChild("id").on("child_removed", function (doc) {
        const msg = doc.val();
        if (news_scroll_box != undefined) {
            var message_childs = chat_scroll_box.children;
            for (let i = 1; i < message_childs.length; i++) {
                if (message_childs[i].id == msg.id) {
                    message_childs[i].remove();
                }
            }
        }
    });
}

function load_news() {
    db.ref("news").orderByChild("id").on("child_added", function (doc) {
        const list = doc.val();
        create_post(list.theme, list.content, list.id);
    });
}

function delete_news() {
    db.ref("news").orderByChild("id").on("child_removed", function (doc) {
        const list = doc.val();
        if (news_scroll_box != undefined) {
            var list_childs = news_scroll_box.children;
            for (let i = 1; i < list_childs.length; i++) {
                if (list_childs[i].cid == list.id) {
                    list_childs[i].remove();
                }
            }
        }
    });
}

if (chat_scroll_box != undefined) {
    const message_text_input = document.getElementById("message_text_input");
    message_text_input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("msg_button").click();
        }
    });
}

load_chat_messages();
delete_chat_messages();
load_news();
delete_news();