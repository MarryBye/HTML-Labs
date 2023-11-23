window.onload = function () {

    var url = document.location.href;
    var params = url.split('?')[1].split('&');
    var data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = tmp[1];
    }

    const profile_nick = decodeURIComponent(data.name);

    let profile_sec = document.getElementById('profile_sec');
    let profile_name = document.createElement("span");

    databaseExists("users", profile_nick, (docs) => {
        profile_name.textContent = profile_nick;
        let profile_avatar = document.createElement("img");
        profile_avatar.src = "src/noavatar.jpg";
        profile_sec.appendChild(profile_avatar);
        profile_sec.appendChild(profile_name);
    }, (docs) => {
        profile_name.textContent = "Такого користувача не існує!";
        profile_sec.appendChild(profile_name);
    });

    docRef.get().then((doc) => {
        if (!doc.exists) {
            profile_name.textContent = "Такого користувача не існує!";
            profile_sec.appendChild(profile_name);
        } else {
            profile_name.textContent = decodeURIComponent(data.name);
            let profile_avatar = document.createElement("img");
            profile_avatar.src = "src/noavatar.jpg";
            profile_sec.appendChild(profile_avatar);
            profile_sec.appendChild(profile_name);
        }
    })

}