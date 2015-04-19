chrome.browserAction.onClicked.addListener(function(tab) {
  var action_url = "javascript:var a,w=document.createTreeWalker(document,NodeFilter.SHOW_TEXT);while(a=w.nextNode()){if(a.textContent.trim().length)a.textContent='The longest non-technical word in major dictionaries is floccinaucinihilipilification at 29 letters.'}";
  chrome.tabs.update(tab.id, {url: action_url});
});
