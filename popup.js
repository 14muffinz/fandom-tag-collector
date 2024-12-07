const $ = (selector) => document.querySelectorAll(selector);
var tagList = localStorage.getItem('fandomTagsList') ? localStorage.getItem('fandomTagsList') : null;


/** Check is readtags.js is available */
function enableAddingIfValidPage() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type:"pageIsAo3"}, function(response){
            if (response == true) {
                $("#add-button")[0].disabled = false;
            }
            else {
                $("#add-button")[0].textContent = "Page is not Ao3";
            }
        });
    });
}

/** Query readtags.js for tags on page */
function getTagsOnPage() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type:"getTags"}, function(response){
            console.log(response);
            if (tagList == null) {
                localStorage.setItem('fandomTagsList', `${response}`);
            }
            else {
                localStorage.setItem('fandomTagsList', `${tagList},${response}`);
            }
            $("#add-button")[0].textContent = `Successfully added ${response.length} tags to list`;
            $("#add-button")[0].disabled = true;
            showListLength();
        });
    });
}

/** Update shown number of list items in UI */
function showListLength() {
    tagList = localStorage.getItem('fandomTagsList') ? localStorage.getItem('fandomTagsList') : null;
    console.log(`Items currently in tag list: ${tagList}`);
    if (tagList == null) {
        $("#saved-now")[0].textContent = `0 items currently in list`;
    }
    else {
        let splitTagList = tagList.split(",");
        $("#saved-now")[0].textContent = `${splitTagList.length} items currently in list`;
    }
}

/** Save list as TXT file */
function saveListAsTXT() {
    let content = "";
    for (let tag of tagList.split(",")) {
        content += `${tag}\n`;
    }
    const file = new Blob([content], {type: 'text/plain'});
    const download_link = document.createElement("a");
    download_link.href = window.URL.createObjectURL(file);
    download_link.download = "fandom-tags.txt";
    download_link.click();
}



/** Document ready */
document.addEventListener("DOMContentLoaded", async () => {
    showListLength();
    enableAddingIfValidPage();

    /** Add fandom tags as items to list */
    $("#add-button")[0].addEventListener("click", () => {
        getTagsOnPage();
    });

    /** Save list items to TXT file and clear */
    $("#save-button")[0].addEventListener("click", () => {
        saveListAsTXT();
        localStorage.setItem('fandomTagsList', "");
        $("#save-button")[0].textContent = "Saved!";
        showListLength();
    });

    /** Clear items from list without saving */
    $("#clear-button")[0].addEventListener("click", () => {
        localStorage.setItem('fandomTagsList', "");
        $("#clear-button")[0].textContent = "Cleared!";
        showListLength();
    });
})