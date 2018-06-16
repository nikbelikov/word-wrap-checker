document.addEventListener('DOMContentLoaded', function () {
  const addTextButton = document.getElementById('add_text');
  const addImagesButton = document.getElementById('add_images');
  const textLengthSlider = document.getElementById('text_length_slider');
  const imagesWidthSlider = document.getElementById('images_width_slider');
  const imagesHeightSlider = document.getElementById('images_height_slider');

  textLengthSlider.addEventListener('input', function () {
    const spanCounter = document.getElementById('add_text_length');
    spanCounter.innerText = textLengthSlider.value;
  });

  addTextButton.addEventListener('click', function () {
    const length = document.getElementById('text_length_slider').value;
    addLongText(length);
  });

  imagesWidthSlider.addEventListener('input', function () {
    const spanCounter = document.getElementById('images_width');
    spanCounter.innerText = imagesWidthSlider.value;
  });

  imagesHeightSlider.addEventListener('input', function () {
    let spanCounter = document.getElementById('images_heigth');
    spanCounter.innerText = imagesHeightSlider.value;
  });

  addImagesButton.addEventListener('click', function () {
    const width = document.getElementById('images_width_slider').value;
    const height = document.getElementById('images_height_slider').value;

    addLargeImages(width, height);
  });
});

function addLongText(n) {
  let text = '';

  for (let i = 0; i < n / 100 + 1; i++) {
    text = text + 'The longest non-technical word in major dictionaries is floccinaucinihilipilification at 29 letters.';
  }
  text = text.substr(0, n);

  const code = "" +
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
  const code = "" +
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
