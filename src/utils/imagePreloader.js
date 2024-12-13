// src/utils/imagePreloader.js
export const preloadImages = (images) => {
  const promises = Object.values(images).map((src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  });

  return Promise.all(promises);
};
