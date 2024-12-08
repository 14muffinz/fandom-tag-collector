console.log("Ready to read fandom tags on this page");
const $ = (selector) => document.querySelectorAll(selector);

chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        switch(message.type) {
            case "getTags":
                console.log("Getting fandom tags on page");
                sendResponse(readFandomTags());
                break;
            case "pageIsAo3":
                sendResponse(true);
                break;
        }
    }
);

/** Return fandom tags on page as list */
function readFandomTags() {
    //try to read tags
    let tags = $(".tags.commas.li.characters");
    let tags_text = [];
    for (let tag of tags) {
        tags_text.push(tag.textContent);
    }
    console.log(`Found ${tags_text.length} fandom tags on this page!`);
    //undefined if none: https://archiveofourown.org/users/2ManyOCs/bookmarks
    return tags_text;
}

//can I grab css off ao3 so the popup will automatically match?
