import { Octokit } from "https://esm.sh/@octokit/core@4.2.2";

// ***Connect to GitHub***
const CACHE_EXPIRATION_TIME = 86400000; // 24 hours in milliseconds
let octokit = null;

export async function connectToGitHub(authenticate=false) {
    try {
        if(authenticate){
            // Authenticate on GitHub
            // Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
            const GITHUB_ACCESS_TOKEN = "GitHub_Access_Token";
            octokit = new Octokit({ auth: GITHUB_ACCESS_TOKEN });
            const {data: { login }} = await octokit.rest.users.getAuthenticated(); 
            console.log("Hello, %s", login);
            return octokit;
        } else {
            octokit = new Octokit({})
        }
    } catch (error) {
        console.error(`Error connecting to GitHub:`, error);  
    }
}

function getCachedEndpoints(repoName, endpointArray) {
    const cachedEndpointArray = [];

    try {
        for(let endpoint of endpointArray) {
            const endpointObj = JSON.parse(localStorage.getItem(`${repoName} : ${endpoint}`));
            if(endpointObj == null || endpointObj.timeStamp == null || Date.now() > parseInt(endpointObj.timeStamp) + CACHE_EXPIRATION_TIME) {
                return null; // Return null if any data is missing or older than 24h
            }
            cachedEndpointArray.push(endpointObj);
        }
        return cachedEndpointArray;
    } catch (error) {
        console.error(`Error reading ${repoName} repository from local storage:`, error);
        return null; 
    }
}

function cacheEndpoints(repoName, endpointArray, endpointObjArr) {
    try {
        // Save endpoint objects to local storage
        for(let i=0; i < endpointObjArr.length;  i++) {
            const endpoint = endpointArray[i];
            const endpointObj = endpointObjArr[i];

            // Attach a timestamp to data object
            endpointObj.timeStamp =  Date.now();

            // Save to local storage
            localStorage.setItem(`${repoName} : ${endpoint}`, JSON.stringify(endpointObj));
        }
    } catch (error) {
        console.error(`Error saving ${repoName} repository to local storage:`, error);
    }
}

export async function getRepoEndpoints(repoName, endpointArray) {
    const cachedEndpointArray = getCachedEndpoints(repoName, endpointArray);

    if(cachedEndpointArray != null) {
        return cachedEndpointArray;
    }

    const endpointPromiseArr = [];
    let endpointObjArr = [];

    try {
        if(octokit == null) {
            await connectToGitHub();
        }
        
        for(let endpoint of endpointArray) {
            const endpointPromise = octokit.request(endpoint, {
                owner: "Chas-Henrik",
                repo: repoName,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            });
            endpointPromiseArr.push(endpointPromise);
        }

        // Send all GitHub API requests in parallel using Promise.all
        endpointObjArr = await Promise.all(endpointPromiseArr);

        if(endpointObjArr.length != endpointArray.length) {
            console.error(`Error fetching ${repoName} repository:`, error);  
            return null;
        }
    
    } catch (error) {
        console.error(`Error fetching ${repoName} repository:`, error);  
    }

    cacheEndpoints(repoName, endpointArray, endpointObjArr);

    return endpointObjArr;
}
