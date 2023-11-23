const firebaseConfig = {
    apiKey: "AIzaSyCDuNciw5aZ6d5OvtZAtgn5Gj-hjt9sFbA",
    authDomain: "gamers-site-338f8.firebaseapp.com",
    projectId: "gamers-site-338f8",
    storageBucket: "gamers-site-338f8.appspot.com",
    messagingSenderId: "179395168650",
    appId: "1:179395168650:web:69b2e138532e99f2286073",
    databaseURL: "https://gamers-site-338f8-default-rtdb.firebaseio.com/"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

function getLastElement(collection, whatToDo) {
    return db.ref(collection).orderByChild("id").limitToLast(1).once('value').then((docs) => {
        if (docs.val() != null) {
            docs.forEach(doc => {
                whatToDo(doc.val().id);
            });
        } else {
            whatToDo(null);
        }
    });
}

function addToDatabase(collection, docname, indexName, vars = {}) {
    getLastElement(collection, function (id) {
        const newID = (id || 0) + 1;
        let docName = "";
        if (indexName) {
            docName = newID + "_" + docname;
        } else {
            docName = docname;
        }
        db.ref(collection + "/" + docName).set({
            "id": newID,
            ...vars
        });
    });
}

function getDatabase(collection, whatToDo) {
    return db.ref(collection).orderByChild("id").once('value').then((docs) => {
        whatToDo(docs);
    });
}

function deleteFromDatabase(collection, doc) {
    db.ref(collection).child(doc).remove();
}

function databaseExists(collection, docname, ifExists, ifNotExists) {
    getDatabase(collection, function (docs) {
        if (docs.child(docname).val() != null) {
            ifExists(docs);
        } else {
            ifNotExists(docs);
        }
    });
}

function executeIfSignedIn(funcToExecute, funcIfNot = null) {
    databaseExists("users", user_login, (docs) => {
        const user_profile = docs.child(user_login).val();
        if (user_login == user_profile.login && user_password == user_profile.password) {
            funcToExecute(docs);
        } else {
            if (funcIfNot != null) {
                funcIfNot();
            };
        };
    }, (docs) => {
        if (funcIfNot != null) {
            funcIfNot();
        };
    });
}

function executeIfAdmin(funcToExecute, funcIfNot = null) {
    executeIfSignedIn((docs) => {
        const user_profile = docs.child(user_login).val();
        if (user_profile.isAdmin) {
            funcToExecute(docs);
        } else {
            if (funcIfNot != null) {
                funcIfNot();
            };
        };
    }, function () {
        showSiteMessage("Для цього потрібно увійти в акаунт!");
    })
}