let k = 0;
let j = 0;

export const spaceship = async (arrayLength, i) => {
  const l = ["🌎", "🌍", "🌏", "🌑", "🌒", "🌓", "🌔", "🌕", "🛸", "☄️", "🌠", "🌌", "🌟", "🌙", "🌚", "🌛", "🌜", "🌞", "🌝"];
  if (j === 0) {
    console.log("Loading job " + (i + 1) + " of " + arrayLength + "🚀");
  } else if (j === 1) {
    console.log("Loading job " + (i + 1) + " of " + arrayLength + "🔥🚀");
  } else if (j === 2) {
    console.log("Loading job " + (i + 1) + " of " + arrayLength + "🔥🔥🚀");
    //fire emoji
  } else if (j === 3) {
    console.log("Loading job " + (i + 1) + " of " + arrayLength + "🔥🔥🔥🚀");
  } else {
    console.log(
      "Loading job " + (i + 1) + " of " + arrayLength + "🔥🔥🔥🔥🚀" + `${l[k]}`
    );
  }
  if (j < 4) {
    j++;
  } else {
    j = 0;
    if (k < l.length - 1) {
      k++;
    } else {
      k = 0;
    }
  }
};
