const { db } = require("../util/admin");

exports.createNotificationOnLike = 

    db.doc('likes/{id}')
    .onCreate((snapshot) => {
        return db
            .doc(`/screams/${snapshot.data().screamId}`)
            .get()
            .then((doc) => {
                if (doc.exists) {

                    return db.doc(`/notifications/${snapshot.id}`).set({
                        createdAt: new Date().toISOString(),
                        recipient_nom: doc.data().nom,
                        recipient_prenom: doc.data().prenom,
                        sender_nom: snapshot.data().nom,
                        sender_prenom: snapshot.data().prenom,

                        type: 'like',
                        read: false,
                        screamId: doc.id,
                    })
                }
            })
            .then(() => { return; })
            .catch((err) => {
                console.error(err);
                return;
            })
    })
    exports.deleteNotificationOnUnLike = 
  db.doc('likes/{id}')
  .onDelete((snapshot) => {
    return db
      .doc(`/notifications/${snapshot.id}`)
      .delete()
      .catch((err) => {
        console.error(err);
        return;
      });
  });
    exports.createNotificationOnComment =db.doc('comments/{id}')
    .onCreate((snapshot) => {
        return db
            .doc(`/screams/${snapshot.data().screamId}`)
            .get()
            .then((doc) => {
                if (doc.exists) {

                    return db.doc(`/notifications/${snapshot.id}`).set({
                        createdAt: new Date().toISOString(),
                        recipient_nom: doc.data().nom,
                        recipient_prenom: doc.data().prenom,
                        sender_nom: snapshot.data().nom,
                        sender_prenom: snapshot.data().prenom,

                        type: 'comment',
                        read: false,
                        screamId: doc.id,
                    })
                }
            })
            .then(() => { return; })
            .catch((err) => {
                console.error(err);
                return;
            })
    })

