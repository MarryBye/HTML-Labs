var smsTime = null
var smsTimeHide = null

function showSiteMessage(msgText) {
    const showAnimation = [
        { transform: "scale(0)" },
        { transform: "scale(1)" },
    ];

    const hideAnimation = [
        { transform: "scale(1)" },
        { transform: "scale(0)" },
    ];

    const showAnimationCfg = {
        duration: 150,
        iterations: 1,
    };

    let msg_window = document.getElementById("st_msg");
    msg_window.children[0].textContent = msgText;
    msg_window.style.display = "block";
    msg_window.animate(showAnimation, showAnimationCfg);

    if (smsTimeHide != undefined && smsTime != undefined) {
        clearTimeout(smsTimeHide);
        clearTimeout(smsTime);
    }

    smsTime = window.setTimeout(() => {
        msg_window.animate(hideAnimation, showAnimationCfg);
        smsTimeHide = window.setTimeout(() => {
            msg_window.style.display = "none";
        }, 100);
    }, 1500);
}