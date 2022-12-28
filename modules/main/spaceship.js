let k = 0;
let j = 0;

export const spaceship = async (jobArray, i) => {
  const l = ["🌕", "🛸", "☄️", "🌠", "🌎"];
  if (j === 0) {
    console.log("Loading job " + i + " of " + jobArray + "🚀");
  } else if (j === 1) {
    console.log("Loading job " + i + " of " + jobArray + "🔥🚀");
  } else if (j === 2) {
    console.log("Loading job " + i + " of " + jobArray + "🔥🔥🚀");
    //fire emoji
  } else if (j === 3) {
    console.log("Loading job " + i + " of " + jobArray + "🔥🔥🔥🚀");
  } else {
    console.log(
      "Loading job " + i + " of " + jobArray + "🔥🔥🔥🔥🚀" + `${l[k]}`
    );
  }
  if (j < l.length - 1) {
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
