# Fandom Tag Collector
A small browser extension to grab the fandom tags off of Ao3's history and bookmark pages.  It should work on Chrome and Firefox, untested on other browsers.

## Adding the extension to your browser
### Chrome
Download the files and ensure they are NOT in a .zip archive.  Go to `chrome://extensions/`, make sure that Developer Mode (in the top right) is turned on, and click Load Unpacked (top left).  Locate and select the folder containing the extension files.

### Firefox
Download the files and ensure they ARE in a .zip archive.  Go to `about:debugging#/runtime/this-firefox` and click Load Temporary Add-on.  Locate and select the .zip file.

## Using the extension
* Click the "Add tags on this page to list" button to add any fandom tags found on a history or bookmarks page to a locally saved list.  You can add tags from as many pages as you want before saving.  NOTE: The extension will not prevent you from adding the same page twice.
* Click the "Save list" button whenever you have collected all the tags you want, and a file named "fandom-tags.txt" will be downloaded to your computer.  The list will be automatically cleared after this.
* Click the "Clear list" button to remove all fandom tags from the local list without saving to a file.
