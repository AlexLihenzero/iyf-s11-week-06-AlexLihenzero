// ===================================
// Synchronous Example
// ===================================

console.log("1 - Start");

console.log("2 - Middle");

console.log("3 - End");

// ===================================
// Asynchronous Example
// ===================================

console.log("1 - Start");

setTimeout(() => {

    console.log("2 - This is delayed");

}, 2000);

console.log("3 - End");

console.log("A");

setTimeout(() => {
    console.log("B");
}, 0);

console.log("C");

setTimeout(() => {
    console.log("D");
}, 100);

console.log("E");

// ===================================
// Synchronous Example
// ===================================

console.log("1 - Start");

console.log("2 - Middle");

console.log("3 - End");


// ===================================
// Asynchronous Example
// ===================================

console.log("A");

setTimeout(() => {
    console.log("B");
}, 0);

console.log("C");

setTimeout(() => {
    console.log("D");
}, 100);

console.log("E");

// ===================================
// Callback Example
// ===================================

function loadUser(userId, callback) {

    console.log("Loading user...");

    setTimeout(() => {

        const user = {
            id: userId,
            name: "Alex",
            age: 25
        };

        callback(user);

    }, 1500);

}

loadUser(1, function(user) {

    console.log("User loaded:");
    console.log(user);

});

// ===================================
// Promise Example
// ===================================

function loadUserPromise(userId) {

    return new Promise(function(resolve, reject) {

        console.log("Loading user with Promise...");

        setTimeout(function() {

            const user = {
                id: userId,
                name: "Alex",
                age: 25
            };

            resolve(user);

        }, 1500);

    });

}

loadUserPromise(1)
    .then(function(user) {

        console.log("Promise resolved!");
        console.log(user);

    });

    // ===================================
// Async / Await Example
// ===================================

async function displayUser() {

    console.log("Loading with async/await...");

    const user = await loadUserPromise(2);

    console.log("Async/Await Result:");
    console.log(user);

}

displayUser();

// ===================================
// Task 11.2 Exercise 1
// Callback Hell
// ===================================

function getUserData(userId, callback) {

    setTimeout(() => {

        callback({
            id: userId,
            name: "John"
        });

    }, 1000);

}


function getUserPosts(userId, callback) {

    setTimeout(() => {

        callback([
            {
                id: 1,
                title: "Post 1"
            },
            {
                id: 2,
                title: "Post 2"
            }
        ]);

    }, 1000);

}


function getPostComments(postId, callback) {

    setTimeout(() => {

        callback([
            {
                id: 1,
                text: "Great post!"
            },
            {
                id: 2,
                text: "Thanks for sharing"
            }
        ]);

    }, 1000);

}


// Callback Hell

getUserData(1, function(user) {

    console.log("User:", user);


    getUserPosts(user.id, function(posts) {

        console.log("Posts:", posts);


        getPostComments(posts[0].id, function(comments) {

            console.log("Comments:", comments);

        });

    });

});

// ===================================
// Task 11.2 Exercise 2
// Refactoring Callbacks into Promises
// ===================================


function getUserDataPromise(userId) {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            if (userId > 0) {

                resolve({
                    id: userId,
                    name: "John"
                });

            } else {

                reject("Invalid user ID");

            }

        }, 1000);

    });

}



function getUserPostsPromise(userId) {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            if (userId > 0) {

                resolve([
                    {
                        id: 1,
                        title: "Post 1"
                    },
                    {
                        id: 2,
                        title: "Post 2"
                    }
                ]);

            } else {

                reject("Invalid user ID");

            }

        }, 1000);

    });

}



function getPostCommentsPromise(postId) {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            if (postId > 0) {

                resolve([
                    {
                        id: 1,
                        text: "Great post!"
                    },
                    {
                        id: 2,
                        text: "Thanks for sharing"
                    }
                ]);

            } else {

                reject("Invalid post ID");

            }

        }, 1000);

    });

}

getUserDataPromise(1)

    .then(user => {

        console.log("Promise User:", user);

    })

    .catch(error => {

        console.error("Error:", error);

    });

    // ===================================
// Task 11.3
// Promise Chaining
// ===================================


getUserDataPromise(1)

    .then(user => {

        console.log("User:", user);

        return getUserPostsPromise(user.id);

    })


    .then(posts => {

        console.log("Posts:", posts);

        return getPostCommentsPromise(posts[0].id);

    })


    .then(comments => {

        console.log("Comments:", comments);

    })


    .catch(error => {

        console.error("Error:", error);

    });

    // ===================================
// Task 11.3 Exercise 2
// Promise.all()
// ===================================


const user1 = getUserDataPromise(1);

const user2 = getUserDataPromise(2);

const user3 = getUserDataPromise(3);



Promise.all([user1, user2, user3])

    .then(users => {

        console.log("All Users:");

        console.log(users);

    })


    .catch(error => {

        console.error("One failed:", error);

    });

    // ===================================
// Promise.race()
// ===================================


const fast = new Promise(resolve => {

    setTimeout(() => {

        resolve("Fast!");

    }, 100);

});


const slow = new Promise(resolve => {

    setTimeout(() => {

        resolve("Slow!");

    }, 500);

});


Promise.race([fast, slow])

    .then(result => {

        console.log("Winner:", result);

    });

    // ===================================
// Task 11.4
// Async / Await
// ===================================

async function loadUserData() {

    try {

        const user = await getUserDataPromise(1);

        console.log("User:", user);

        const posts = await getUserPostsPromise(user.id);

        console.log("Posts:", posts);

        const comments = await getPostCommentsPromise(posts[0].id);

        console.log("Comments:", comments);

    } catch (error) {

        console.error("Error:", error);

    }

}

loadUserData();