console.log("Lesson 12 loaded successfully!");

async function getUser(id) {

    try {

        const response = await fetch(
            `https://jsonplaceholder.typicode.com/users/1/posts`
        );

        if (!response.ok) {

            throw new Error(
                `HTTP Error! Status: ${response.status}`
            );

        }

        const data = await response.json();

        return data;

    } catch (error) {

        console.error("Failed to fetch user:", error);

    }

}

async function main() {

    const user = await getUser(1);

    console.log(user);

}

main();
    

then(data => {

    console.log("User data:", data);

    console.log("Name:", data.name);

console.log("Email:", data.email);

console.log("City:", data.address.city);

console.log("Company:", data.company.name);

    })

    .catch(error => {

        console.error("Fetch error:", error);

    });