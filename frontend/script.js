const API_URL = "";

async function loadApplicationData() {

    const statusIndicator = document.getElementById("statusIndicator");
    const backendStatus = document.getElementById("backendStatus");

    try {

        const healthResponse = await fetch(`${API_URL}/health`);

        if (!healthResponse.ok) {
            throw new Error("Backend health check failed");
        }

        const healthData = await healthResponse.json();

        const infoResponse = await fetch(`${API_URL}/api/info`);

        if (!infoResponse.ok) {
            throw new Error("Unable to retrieve application information");
        }

        const infoData = await infoResponse.json();

        document.getElementById("application").textContent =
            infoData.application;

        document.getElementById("environment").textContent =
            infoData.environment;

        document.getElementById("version").textContent =
            infoData.version;

        backendStatus.textContent = healthData.status;

        statusIndicator.textContent = "● Online";
        statusIndicator.classList.remove("offline");
        statusIndicator.classList.add("online");

    } catch (error) {

        console.error("Application error:", error);

        statusIndicator.textContent = "● Offline";
        statusIndicator.classList.remove("online");
        statusIndicator.classList.add("offline");

        backendStatus.textContent = "Unavailable";
    }
}

loadApplicationData();
