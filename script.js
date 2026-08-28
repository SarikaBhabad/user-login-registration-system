const API_URL = "http://localhost:5000/api/auth";


// ========================================
// REGISTRATION
// ========================================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const name = document
            .getElementById("registerName")
            .value
            .trim();

        const email = document
            .getElementById("registerEmail")
            .value
            .trim();

        const password = document
            .getElementById("registerPassword")
            .value;

        const message = document.getElementById(
            "registerMessage"
        );

        const button = document.getElementById(
            "registerButton"
        );


        // Frontend validation
        if (!name || !email || !password) {

            message.textContent =
                "All fields are required";

            message.className = "message error";

            return;
        }


        if (name.length < 2) {

            message.textContent =
                "Name must contain at least 2 characters";

            message.className = "message error";

            return;
        }


        if (password.length < 6) {

            message.textContent =
                "Password must be at least 6 characters";

            message.className = "message error";

            return;
        }


        try {

            button.disabled = true;
            button.textContent = "Registering...";

            const response = await fetch(
                `${API_URL}/register`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name,
                        email,
                        password
                    })
                }
            );


            const data = await response.json();

            message.textContent = data.message;


            if (data.success) {

                message.className =
                    "message success";

                registerForm.reset();

            } else {

                message.className =
                    "message error";
            }


        } catch (error) {

            console.error(
                "Registration request failed:",
                error
            );

            message.textContent =
                "Unable to connect to server";

            message.className =
                "message error";

        } finally {

            button.disabled = false;
            button.textContent = "Register";
        }

    });
}


// ========================================
// LOGIN
// ========================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const email = document
            .getElementById("loginEmail")
            .value
            .trim();

        const password = document
            .getElementById("loginPassword")
            .value;

        const message = document.getElementById(
            "loginMessage"
        );

        const button = document.getElementById(
            "loginButton"
        );


        // Frontend validation
        if (!email || !password) {

            message.textContent =
                "Email and password are required";

            message.className =
                "message error";

            return;
        }


        try {

            button.disabled = true;
            button.textContent = "Logging in...";


            const response = await fetch(
                `${API_URL}/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );


            const data = await response.json();

            message.textContent = data.message;


            if (data.success) {

                message.className =
                    "message success";

                console.log(
                    "Authenticated user:",
                    data.user
                );

            } else {

                message.className =
                    "message error";
            }


        } catch (error) {

            console.error(
                "Login request failed:",
                error
            );

            message.textContent =
                "Unable to connect to server";

            message.className =
                "message error";

        } finally {

            button.disabled = false;
            button.textContent = "Login";
        }

    });
}

