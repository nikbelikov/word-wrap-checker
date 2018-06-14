document.addEventListener("DOMContentLoaded", function () {
    var addLongTextButton = document.getElementById("add_long_text");
    var addLargeImagesButton = document.getElementById("add_large_images");

    addLongTextButton.addEventListener("click", function () {
        addLongText(document.getElementById("add_long_text_count").value);
    });
    addLargeImagesButton.addEventListener("click", function () {
        addLargeImages(document.getElementById("add_long_images_size_w").value, document.getElementById("add_long_images_size_h").value)
    });
});

function addLongText(n) {
    var text = '';
    for (var i = 0; i < n / 100 + 1; i++) {
        text = text + 'The longest non-technical word in major dictionaries is floccinaucinihilipilification at 29 letters.';
    }
    text = text.substr(0, n);
    var code = "" +
        "javascript:" +
        "var a,w=document.createTreeWalker(document,NodeFilter.SHOW_TEXT);" +
        "while(a=w.nextNode()) {" +
            "if(a.parentElement.tagName !== 'STYLE' && a.textContent.trim().length) {" +
                "a.textContent='"+text+"'" +
            "};" +
        "}"+
        "w = document.getElementsByTagName('input');" +
        "for(var i=0;i<w.length;i++){" +
            "if(w[i].type ==='text' || w[i].type ==='submit') {" +
                "w[i].value = '"+text +"'"+
            "}" +
        "}";

    chrome.tabs.executeScript(null,
        {code: code});

    window.close();
}

function addLargeImages(w, h) {
    var code = "" +
        "javascript:" +
        "var img=document.getElementsByTagName('img');" +
        "for(var i=0; i<img.length;i++) {" +
            "img[i].src=\"https://via.placeholder.com/"+w+"x"+h+"\";"+
            "img[i].removeAttribute('srcset')" +
        "}";

    chrome.tabs.executeScript(null,
        {code: code});

    window.close();
}
