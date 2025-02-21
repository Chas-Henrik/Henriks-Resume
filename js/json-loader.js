export let isCVUpdated = false;

export async function loadCV(url) {
    try {
        const oneDay = 86400000; // 24 hours in milliseconds
        let cvDataObj = readFromLocalStorage("cvDataObj");

        // If CV is not in Local Storage, timestamp is missing or timestamp is older than 24 hours, fetch CV from server
        if(!cvDataObj || cvDataObj.timeStamp == null || Date.now() > parseInt(cvDataObj.timeStamp) + oneDay) {
            const response = await fetch(url);
            if(!response.ok) {
                throw new Error(`HTTP ERROR status = ${response.status}`);
            }
            cvDataObj = await response.json();

            // Attach a timestamp to the object
            cvDataObj.timeStamp =  Date.now();
            saveToLocalStorage("cvDataObj", cvDataObj);

            isCVUpdated = true;
        }

        return cvDataObj;
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
