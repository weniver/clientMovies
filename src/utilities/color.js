import ColorThief from "colorthief";

export const convertHexToRGBA = (hexCode, opacity) => {
  let hex = hexCode.replace("#", "");

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r},${g},${b},${opacity})`;
};

export const convertHexToRGB = (hexCode) => {
  let hex = hexCode.replace("#", "");

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgb(${r},${g},${b})`;
};

export const createRedGreenBlueArray = (rgbColor) => {
  return rgbColor.match(/\d{1,3}/g);
};

export const createRedGreenBlueObject = (rgbColor) => {
  let colorArray = createRedGreenBlueArray(rgbColor);
  return { red: colorArray[0], green: colorArray[1], blue: colorArray[2] };
};

export const getConstrastingColorFromRGB = async (rgbColor) => {
  let lumPrimaryColors = {};
  let primaryColorsObject = createRedGreenBlueObject(rgbColor);
  for (var primaryColor in primaryColorsObject) {
    let pColorValue = primaryColorsObject[primaryColor];
    pColorValue = pColorValue / 255;
    if (pColorValue <= 0.03928) {
      pColorValue = pColorValue / 12.92;
    } else {
      pColorValue = Math.pow((pColorValue + 0.055) / 1.055, 2.4);
      lumPrimaryColors[primaryColor] = pColorValue;
    }
  }

  var colorLum =
    0.2126 * lumPrimaryColors.red +
    0.7152 * lumPrimaryColors.green +
    0.0722 * lumPrimaryColors.blue;

  return colorLum > 0.179 ? "#0F0F0F" : "#ffffff";
};

const getImgMainColorRGBUsingRefAsync = async (ref) => {
  try {
    let colorThief = new ColorThief();
    let img = ref.current;
    let color = await colorThief.getColor(img, 50);
    return `rgb(${color[0]},${color[1]},${color[2]})`;
  } catch (e) {
    console.log(e);
  }
};
