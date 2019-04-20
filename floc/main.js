const addLargeImages = (w, h) => {
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
};

const addLongText = n => {
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
};

const getElement = (id) => {
  return document.getElementById(id);
};

const setImageSize = (width, height) => {
  const widthText = getElement('images_width');
  const heightText = getElement('images_heigth');
  const widthSlider = getElement('images_width_slider');
  const heightSlider = getElement('images_height_slider');

  widthText.innerText = width;
  heightText.innerText = height;

  widthSlider.value = width;
  heightSlider.value = height;
};

document.addEventListener('DOMContentLoaded', function () {
  const addTextButton = getElement('add_text');
  const addImagesButton = getElement('add_images');
  const textLengthSlider = getElement('text_length_slider');
  const imagesWidthSlider = getElement('images_width_slider');
  const imagesHeightSlider = getElement('images_height_slider');
  const set1024 = getElement('set1024');
  const set1600 = getElement('set1600');
  const set1920 = getElement('set1920');
  const set2000 = getElement('set2000');

  textLengthSlider.addEventListener('input', () => {
    const spanCounter = getElement('add_text_length');
    spanCounter.innerText = textLengthSlider.value;
  });

  addTextButton.addEventListener('click', () => {
    const length = getElement('text_length_slider').value;
    addLongText(length);
  });

  imagesWidthSlider.addEventListener('input', () => {
    const spanCounter = getElement('images_width');
    spanCounter.innerText = imagesWidthSlider.value;
  });

  imagesHeightSlider.addEventListener('input', () => {
    const spanCounter = getElement('images_heigth');
    spanCounter.innerText = imagesHeightSlider.value;
  });

  addImagesButton.addEventListener('click', function () {
    const width = getElement('images_width_slider').value;
    const height = getElement('images_height_slider').value;

    addLargeImages(width, height);
  });

  set1024.addEventListener('click', () => {
    setImageSize(1024, 768);
  });

  set1600.addEventListener('click', () => {
    setImageSize(1600, 1200);
  });

  set1920.addEventListener('click', () => {
    setImageSize(1920, 1080);
  });

  set2000.addEventListener('click', () => {
    setImageSize(2000, 2000);
  });
});
