export const spaceship = async (jobArray, i, j, k) => {
  const l = ["🌕", "🛸", "☄️", "🌠", "🌎"];
  //console.log and toggle betwtween three dots to show progress
  if (j === 0) {
    console.log("Loading job " + i + " of " + jobArray.length + "🚀");
  } else if (j === 1) {
    console.log("Loading job " + i + " of " + jobArray.length + "🔥🚀");
  } else if (j === 2) {
    console.log("Loading job " + i + " of " + jobArray.length + "🔥🔥🚀");
    //fire emoji
  } else if (j === 3) {
    console.log("Loading job " + i + " of " + jobArray.length + "🔥🔥🔥🚀");
  } else {
    console.log(
      "Loading job " + i + " of " + jobArray.length + "🔥🔥🔥🔥🚀" + `${l[k]}`
    );
  }
};
