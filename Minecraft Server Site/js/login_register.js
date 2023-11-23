function signup() {
    const l = document.getElementById("r_nickname").value;
    const p = document.getElementById("r_password").value;

    if (l == "" || p == "") {
        showSiteMessage("Неправильній логін або пароль!");
        document.getElementById("r_nickname").value = "";
        document.getElementById("r_password").value = "";
    } else {
        databaseExists("users", l, (docs) => {
            showSiteMessage("Такий користувач вже існує!");
            document.getElementById("r_nickname").value = "";
            document.getElementById("r_password").value = "";
        }, (docs) => {
            showSiteMessage("Успішна реєстрація!");
            deleteCookie("login");
            deleteCookie("password");
            addToDatabase("users", l, false, {
                "login": l,
                "password": p,
                "isAdmin": false
            });
            setTimeout(function () {
                window.location.href = "login.html";
            }, 1750);
        });
    };
}

function signin() {
    const l = document.getElementById("l_nickname").value;
    const p = document.getElementById("l_password").value;

    if (l == "" || p == "") {
        showSiteMessage("Неправильний логін або пароль!");
        document.getElementById("l_nickname").value = "";
        document.getElementById("l_password").value = "";
    } else {
        databaseExists("users", l, (docs) => {
            const user = docs.val()[l];
            if (user.login == l && user.password == p) {
                showSiteMessage("Успішний вхід!");
                setCookie("login", l, { secure: true })
                setCookie("password", p, { secure: true })
                setTimeout(function () {
                    window.location.href = "index.html";
                }, 1750);
            } else {
                showSiteMessage("Неправильний логін або пароль!");
                document.getElementById("l_nickname").value = "";
                document.getElementById("l_password").value = "";
            }
        }, (docs) => {
            showSiteMessage("Неправильний логін або пароль!");
            document.getElementById("l_nickname").value = "";
            document.getElementById("l_password").value = "";
        });
    };
}

function logout() {
    executeIfSignedIn((docs) => {
        deleteCookie("login");
        deleteCookie("password");
        showSiteMessage("Успішний вхід!");
        setTimeout(function () {
            location.reload();
        }, 1750);
    });
}