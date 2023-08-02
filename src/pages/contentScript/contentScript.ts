chrome.runtime.sendMessage("Loading the content script...", (response) => {
    console.log(response);
    console.log("This is the content script.");
});

window.onload = (event) => {
    console.log("Page is fully loaded.");
};
