
document.addEventListener('DOMContentLoaded', function() {
    const images = [
      "https://picsum.photos/id/237/200/300",
      "https://picsum.photos/seed/picsum/200/300",
      "https://picsum.photos/200/300?grayscale",
      "https://picsum.photos/200/300/",
      "https://picsum.photos/200/300.jpg"
    ];
  
    const container = document.getElementById('imageContainer');
    const resetButton = document.getElementById('reset');
    const verifyButton = document.getElementById('verify');
    const para = document.getElementById('para');
  
    let selectedImages = [];
    let clicks = 0;
  
    
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  
    function renderImages() {
      container.innerHTML = '';
      selectedImages.forEach((url, index) => {
        const img = document.createElement('img');
        img.src = url;
        img.className = `img${index + 1}`;
        img.onclick = () => selectImage(img, index);
        container.appendChild(img);
      });
    }
  
    function selectImage(img, index) {
      if (clicks >= 2) {
        para.textContent = "You can select a maximum of two images.";
        para.style.color = "red";
        return;
      }
      clicks++;
      img.classList.add('selected');
      selectedImages[index] = '';
      if (clicks === 2) {
        verifyButton.style.display = 'block';
      }
      if (clicks === 1) {
        resetButton.style.display = 'block';
      }
    }
  
    resetButton.onclick = function() {
      clicks = 0;
      selectedImages = [...images];
      renderImages();
      para.textContent = '';
      resetButton.style.display = 'none';
      verifyButton.style.display = 'none';
    }
  

    verifyButton.onclick = function() {
      if (selectedImages.every((val, i, arr) => val === arr[i])) {
        para.textContent = "You are a human. Congratulations!";
      } else {
        para.textContent = "We can't verify you as a human.";
      }
      verifyButton.style.display = 'none';
    }
  
    selectedImages = [...images];
    selectedImages.push(selectedImages[Math.floor(Math.random() * selectedImages.length)]);
    selectedImages = shuffleArray(selectedImages);
    renderImages();
  });




