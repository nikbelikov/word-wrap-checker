document.addEventListener("DOMContentLoaded", function() {
  var addLongTextButton = document.getElementById("add_long_text");
  var addLargeImagesButton = document.getElementById("add_large_images");

  addLongTextButton.addEventListener("click", addLongText);
  addLargeImagesButton.addEventListener("click", addLargeImages);
});

function addLongText() {
  var code = "javascript: var a,w=document.createTreeWalker(document,NodeFilter.SHOW_TEXT);while(a=w.nextNode()){if(a.textContent.trim().length)a.textContent='The longest non-technical word in major dictionaries is floccinaucinihilipilification at 29 letters.'}";

  chrome.tabs.executeScript(null,
  { code: code });

  window.close();
}

function addLargeImages() {
  var code = "javascript: var a,w=document.createTreeWalker(document,NodeFilter.SHOW_ELEMENT);while(a=w.nextNode()){if(a.tagName === 'IMG')a.src='http://lorempixel.com/g/1920/1400'}";

  chrome.tabs.executeScript(null,
  { code: code });

  window.close();
}
