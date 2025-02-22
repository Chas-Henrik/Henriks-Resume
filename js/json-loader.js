const oneDay = 86400000; // 24 hours in milliseconds

export let isCVUpdated = false;

async function fetchData(url) {
    const response = await fetch(url);
    if(!response.ok) {
        throw new Error(`HTTP ERROR status = ${response.status}`);
    }
    const data = await response.json();

    // Attach a timestamp to the object
    data.timeStamp =  Date.now();
    return data;
}

export async function loadCV(url) {
    try {
        let cvDataObj = readFromLocalStorage("cvDataObj");

        // If CV is not in Local Storage, timestamp is missing or timestamp is older than 24 hours, fetch CV from server
        if(!cvDataObj || cvDataObj.timeStamp == null || Date.now() > parseInt(cvDataObj.timeStamp) + oneDay) {
            cvDataObj = await fetchData(url);
            saveToLocalStorage("cvDataObj", cvDataObj);
            isCVUpdated = true;
        }

        return cvDataObj;
    } catch (error) {
        console.error("Error:", error);
    }
}

export async function loadProjects(url) {
    try {
        let projectsObj = readFromLocalStorage("projectsObj");

        // If projects is not in Local Storage, timestamp is missing or timestamp is older than 24 hours, fetch projects from server
        if(!projectsObj || projectsObj.timeStamp == null || Date.now() > parseInt(projectsObj.timeStamp) + oneDay) {
            projectsObj = await fetchData(url);
            saveToLocalStorage("projectsObj", projectsObj);
        }

        return projectsObj;
    } catch (error) {
        console.error("Error:", error);
    }
}

export function saveToLocalStorage(name, dataObj) {
    localStorage.setItem(name, JSON.stringify(dataObj));
}

export function readFromLocalStorage(name) {
    const lsData = localStorage.getItem(name);
    return lsData ? JSON.parse(lsData) : null;
}
