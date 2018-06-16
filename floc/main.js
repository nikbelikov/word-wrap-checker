document.addEventListener('DOMContentLoaded', function () {
  var addLongTextButton = document.getElementById('add_long_text');
  var addLargeImagesButton = document.getElementById('add_large_images');
  var addLongTextSlider = document.getElementById('add_long_text_count');
  var addLongImagesWidthSlider = document.getElementById('add_long_images_size_w');
  var addLongImagesHeightSlider = document.getElementById('add_long_images_size_h');

  addLongTextSlider.addEventListener('input', function () {
    var spanCounter = document.getElementById('add_long_text_length');
    var value = addLongTextSlider.value;

    spanCounter.innerText = value;
  });

  addLongTextButton.addEventListener('click', function () {
    var length = document.getElementById('add_long_text_count').value;

    addLongText(length);
  });

  addLongImagesWidthSlider.addEventListener('input', function () {
    var spanCounter = document.getElementById('add_long_images_width_value');
    var value = addLongImagesWidthSlider.value;

    spanCounter.innerText = value;
  });

  addLongImagesHeightSlider.addEventListener('input', function () {
    var spanCounter = document.getElementById('add_long_images_heigth_value');
    var value = addLongImagesHeightSlider.value;

    spanCounter.innerText = value;
  });

  addLargeImagesButton.addEventListener('click', function () {
    var width = document.getElementById('add_long_images_size_w').value;
    var height = document.getElementById('add_long_images_size_h').value;

    addLargeImages(width, height);
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
    "a.textContent='" + text + "'" +
    "};" +
    "}" +
    "w = document.getElementsByTagName('input');" +
    "for(var i=0;i<w.length;i++){" +
    "if(w[i].type ==='text' || w[i].type ==='submit') {" +
    "w[i].value = '" + text + "'" +
    "}" +
    "}";

  chrome.tabs.executeScript(null, {code: code});

  window.close();
}

function addLargeImages(w, h) {
  var code = "" +
    "javascript:" +
    "var img=document.getElementsByTagName('img');" +
    "for(var i=0; i<img.length;i++) {" +
    "img[i].src=\"https://via.placeholder.com/" + w + "x" + h + "\";" +
    "img[i].removeAttribute('srcset')" +
    "}";

  chrome.tabs.executeScript(null,
    {code: code});

  window.close();
}
