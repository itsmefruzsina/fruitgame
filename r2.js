document.addEventListener("DOMContentLoaded", function() {
  let allFruits = document.querySelectorAll('.fruits-col img');
  let selectedFruit = null;
  let starDisplayed = false;

  // fruit selection
  function selectFruit(element) {
    if (element === selectedFruit) {
      if (!element.classList.contains('selected')) {
        element.classList.remove('grayscale');
        element.classList.remove('selected');
        selectedFruit = null;
      }
    } else {
      if (selectedFruit && !selectedFruit.classList.contains('grayscale')) {
        selectedFruit.classList.remove('selected');
        selectedFruit.classList.remove('grayscale');
      }
  
      if (!element.classList.contains('grayscale')) {
        element.classList.add('selected');
        selectedFruit = element;
      }
    }
  
    checkGreyscaleFruits();
  }

  // click event listener to all fruits
  allFruits.forEach(function (fruit) {
    fruit.addEventListener('click', function() {
      selectFruit(this);
    });
  });

  // click event listener to everything
  let screenElements = document.querySelectorAll('.click-col img');
  screenElements.forEach(function (screenElement, index) {
    screenElement.addEventListener('click', function() {
      addFruitToTransparent('transparent' + (index * 2 + 1));
    });
  });

  // to add selected fruits to transparent elements
  window.addFruitToTransparent = function(clickId) {
    let transparent = document.getElementById(clickId);
  
    if (transparent) {
      if (selectedFruit && !selectedFruit.classList.contains('grayscale')) {
        // i need only one fruit not the group
        let selectedFruitSrc = selectedFruit.src.replace('_group', '_1');
  
        // the even-numbered transparent elements
        let nextTransparentId = 'transparent' + (parseInt(clickId.replace('transparent', '')) + 1);
        let nextTransparent = document.getElementById(nextTransparentId);
  
        if (!transparent.classList.contains('filled')) {
          // as first fruit
          transparent.src = selectedFruitSrc;
          transparent.classList.add('filled');
        } else if (nextTransparent && !nextTransparent.classList.contains('filled')) {
          // next fruit
          nextTransparent.src = selectedFruitSrc;
          nextTransparent.classList.add('filled');
        }
  
        // eset 
        transparent.classList.remove('selected');
        selectedFruit.classList.add('grayscale');
        selectedFruit.classList.remove('selected');
        selectedFruit = null;
  
        checkGreyscaleFruits();
      }
    } else {
      console.error("Element '" + clickId + "' not found.");
    }
  };
  
  // greyscale fruits mean game over
  function checkGreyscaleFruits() {
    let allGreyscaled = true;
    allFruits.forEach(function (fruit) {
      if (!fruit.classList.contains('grayscale')) {
        allGreyscaled = false;
      }
    });

    if (allGreyscaled && !starDisplayed) {
      showStar();
    }
  }

  // congrats star with darker overlay
  function showStar() {
    if (!starDisplayed) {
      let starElement = document.createElement('img');
      starElement.src = 'images/star.svg';
      starElement.classList.add('star');
      document.body.appendChild(starElement);

    let overlayLayer = document.createElement('div');
    overlayLayer.classList.add('overlay-layer');
    document.body.appendChild(overlayLayer);

    document.body.classList.add('star-displayed');
    }
  }

  // random fruit group images
  let fruitGroups = [
      "images/apple_group.png",
      "images/strawberry_group.png",
      "images/banana_group.png",
      "images/lemon_group.png",
      "images/melon_group.png",
      "images/orange_group.png",
      "images/pineapple_group.png",
      "images/peach_group.png",
      "images/plum_group.png",
      "images/cherry_group.png"
  ];

  // to get random fruit images
  function randomImage() {
    let allFruits = document.querySelectorAll('.fruits-col img');
    let usedIndexes = [];

    allFruits.forEach(function (fruit) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * fruitGroups.length);
      } while (usedIndexes.includes(randomIndex));

      usedIndexes.push(randomIndex);
      fruit.src = fruitGroups[randomIndex];
    });
  }

    randomImage();
  });
