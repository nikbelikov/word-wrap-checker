const _runScript = (tabId, func, args) => {
  chrome.scripting.executeScript(
    {
      target: {tabId: tabId},
      function: func,
      args: [...args],
    }
  );
}

const _getElement = (id) => {
  return document.getElementById(id);
};

const _rattleImages = (width, height) => {
  let img = document.getElementsByTagName('img');

  for (let i = 0; i < img.length; i++) {
    img[i].src = `https://via.placeholder.com/${width}x${height}`;
    img[i].removeAttribute('srcset');
  }
}

const _rattleText = (text) => {
  let a, w = document.createTreeWalker(document, NodeFilter.SHOW_TEXT);

  while (a = w.nextNode()) {
    if (a.parentElement.tagName !== 'STYLE' && a.textContent.trim().length) {
      a.textContent = text;
    }
  }

  w = document.getElementsByTagName('input');

  for (let i = 0; i < w.length; i++) {
    if (w[i].type === 'text' || w[i].type === 'submit') {
      w[i].value = text;
    }
  }
}

const addLargeImages = async (width, height) => {
  let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
  _runScript(tab.id, _rattleImages, [width, height]);
  window.close();
};

const addLongText = async length => {
  let text = '';

  for (let i = 0; i < length / 100 + 1; i++) {
    text = text + 'The longest non-technical word in major dictionaries is floccinaucinihilipilification at 29 letters.';
  }
  text = text.substr(0, length);

  let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
  _runScript(tab.id, _rattleText, [text]);
  window.close();
};

const setImageSize = (width, height) => {
  const widthText = _getElement('images_width');
  const heightText = _getElement('images_height');
  const widthSlider = _getElement('images_width_slider');
  const heightSlider = _getElement('images_height_slider');

  widthText.innerText = width;
  heightText.innerText = height;

  widthSlider.value = width;
  heightSlider.value = height;
};

document.addEventListener('DOMContentLoaded', function () {
  const addTextButton = _getElement('add_text');
  const addImagesButton = _getElement('add_images');
  const textLengthSlider = _getElement('text_length_slider');
  const imagesWidthSlider = _getElement('images_width_slider');
  const imagesHeightSlider = _getElement('images_height_slider');
  const set1024 = _getElement('set1024');
  const set1600 = _getElement('set1600');
  const set1920 = _getElement('set1920');
  const set2000 = _getElement('set2000');
  const textTab = _getElement('text_tab');
  const imageTab = _getElement('image_tab');
  const textSection = _getElement('text_section');
  const imageSection = _getElement('image_section');

  textLengthSlider.addEventListener('input', () => {
    const spanCounter = _getElement('add_text_length');
    spanCounter.innerText = textLengthSlider.value;
  });

  addTextButton.addEventListener('click', () => {
    const length = _getElement('text_length_slider').value;
    addLongText(length);
  });

  imagesWidthSlider.addEventListener('input', () => {
    const spanCounter = _getElement('images_width');
    spanCounter.innerText = imagesWidthSlider.value;
  });

  imagesHeightSlider.addEventListener('input', () => {
    const spanCounter = _getElement('images_height');
    spanCounter.innerText = imagesHeightSlider.value;
  });

  addImagesButton.addEventListener('click', function () {
    const width = _getElement('images_width_slider').value;
    const height = _getElement('images_height_slider').value;

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

  textTab.addEventListener('click', () => {
    textSection.classList.add('visible');
    imageSection.classList.remove('visible');
  });

  imageTab.addEventListener('click', () => {
    textSection.classList.remove('visible');
    imageSection.classList.add('visible');
  })
});
