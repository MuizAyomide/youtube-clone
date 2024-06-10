export const API_KEY = "AIzaSyDu0IYKTmZnFe56Kw2s7EYCn204CyWe7VQ";

export const value_converter = (value) => {
  if (value >= 1000000) {
    return Math.floor(value / 1000000) + "M";
  } else if (value >= 10000) {
    return Math.floor(value / 1000) + "K";
  } else {
    return value;
    
  }
};
