const DEFAULT_SETTINGS = {
  activeTabId: 'text_tab',
  textLength: 100,
  imageWidth: 1024,
  imageHeight: 768,
};

const BASE_TEXT =
  'The longest non-technical word in major dictionaries is floccinaucinihilipilification at 29 letters';

const loadSettings = (callback) => {
  chrome.storage?.local?.get(['wordWrapCheckerSettings'], (result) => {
    const settings = result.wordWrapCheckerSettings || DEFAULT_SETTINGS;
    callback(settings);
  });
};

const applySettings = (settings) => {
  const textTab = getElement('text_tab');
  const imageTab = getElement('image_tab');
  const textSection = getElement('text_section');
  const imageSection = getElement('image_section');
  const imagesWidthSlider = getElement('images_width_slider');
  const imagesWidth = getElement('images_width');
  const imagesHeightSlider = getElement('images_height_slider');
  const imagesHeight = getElement('images_height');
  const textLengthSlider = getElement('text_length_slider');
  const addTextLength = getElement('add_text_length');

  if (settings.activeTabId === 'image_tab') {
    imageTab.checked = true;
    textTab.checked = false;
    textSection.classList.remove('visible');
    imageSection.classList.add('visible');
  } else {
    textTab.checked = true;
    imageTab.checked = false;
    textSection.classList.add('visible');
    imageSection.classList.remove('visible');
  }

  textLengthSlider.value = settings.textLength;
  addTextLength.innerText = settings.textLength;
  imagesWidthSlider.value = settings.imageWidth;
  imagesWidth.innerText = settings.imageWidth;
  imagesHeightSlider.value = settings.imageHeight;
  imagesHeight.innerText = settings.imageHeight;
};

const saveSettings = () => {
  const currentSettings = {
    activeTabId: getElement('text_tab').checked ? 'text_tab' : 'image_tab',
    textLength: parseInt(getElement('text_length_slider').value, 10),
    imageWidth: parseInt(getElement('images_width_slider').value, 10),
    imageHeight: parseInt(getElement('images_height_slider').value, 10),
  };

  chrome.storage?.local?.set({ wordWrapCheckerSettings: currentSettings });
};

const runScript = (tabId, func, args) => {
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    function: func,
    args: [...args],
  });
};

const getElement = (id) => {
  return document.getElementById(id);
};

const setPlaceholderImages = (width, height) => {
  let img = document.getElementsByTagName('img');

  for (let i = 0; i < img.length; i++) {
    img[i].src = `https://placehold.co/${width}x${height}`;
    img[i].removeAttribute('srcset');
  }
};

const replaceText = (text) => {
  const shuffleArray = (array) => {
    const shuffledArray = [...array];

    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }

    return shuffledArray;
  };

  const treeWalker = document.createTreeWalker(document, NodeFilter.SHOW_TEXT);

  while (treeWalker.nextNode()) {
    const node = treeWalker.currentNode;

    if (
      node.parentElement.tagName !== 'STYLE' &&
      node.textContent.trim().length
    ) {
      const words = text.split(' ');
      const randomizedWords = shuffleArray(words);
      node.textContent = randomizedWords.join(' ');
    }
  }

  const inputElements = document.querySelectorAll(
    'input[type="text"], input[type="submit"]',
  );

  inputElements.forEach((input) => {
    input.value = text;
  });
};

const processImagesOnPage = async (width, height) => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  runScript(tab.id, setPlaceholderImages, [width, height]);
  window.close();
};

const processTextOnPage = async (length) => {
  const text = BASE_TEXT
    .repeat(Math.ceil(length / BASE_TEXT.length))
    .substr(0, length);

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  runScript(tab.id, replaceText, [text]);
  window.close();
};

const setImageSize = (width, height) => {
  const widthText = getElement('images_width');
  const heightText = getElement('images_height');
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
  const textTab = getElement('text_tab');
  const imageTab = getElement('image_tab');
  const textSection = getElement('text_section');
  const imageSection = getElement('image_section');

  loadSettings(applySettings);

  textLengthSlider.addEventListener('input', () => {
    const spanCounter = getElement('add_text_length');
    spanCounter.innerText = textLengthSlider.value;
    saveSettings();
  });

  addTextButton.addEventListener('click', () => {
    const length = getElement('text_length_slider').value;
    processTextOnPage(length);
  });

  imagesWidthSlider.addEventListener('input', () => {
    const spanCounter = getElement('images_width');
    spanCounter.innerText = imagesWidthSlider.value;
    saveSettings();
  });

  imagesHeightSlider.addEventListener('input', () => {
    const spanCounter = getElement('images_height');
    spanCounter.innerText = imagesHeightSlider.value;
    saveSettings();
  });

  addImagesButton.addEventListener('click', function () {
    const width = getElement('images_width_slider').value;
    const height = getElement('images_height_slider').value;
    processImagesOnPage(width, height);
  });

  set1024.addEventListener('click', () => {
    setImageSize(1024, 768);
    saveSettings();
  });

  set1600.addEventListener('click', () => {
    setImageSize(1600, 1200);
    saveSettings();
  });

  set1920.addEventListener('click', () => {
    setImageSize(1920, 1080);
    saveSettings();
  });

  set2000.addEventListener('click', () => {
    setImageSize(2000, 2000);
    saveSettings();
  });

  textTab.addEventListener('click', () => {
    textSection.classList.add('visible');
    imageSection.classList.remove('visible');
    saveSettings();
  });

  imageTab.addEventListener('click', () => {
    textSection.classList.remove('visible');
    imageSection.classList.add('visible');
    saveSettings();
  });
});
