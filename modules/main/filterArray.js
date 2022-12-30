

export const filterArray = async (jobArray, propName) => {
      // Create a new array to store the unique elements
  const uniqueArr = [];

  // Loop through the input array
  for (let i = 0; i < jobArray.length; i++) {
    // Check if the element at the current index has a unique email
    let isUnique = true;
    for (let j = 0; j < uniqueArr.length; j++) {
      if (jobArray[i][propName] === uniqueArr[j][propName]) {
        isUnique = false;
        console.log("Duplicate found: " + jobArray[i][propName] + " deleted ")
        break;
      }
    }

    // If the element has a unique email, add it to the unique array
    if (isUnique) {
      uniqueArr.push(jobArray[i]);
      console.log("Unique data found: " + jobArray[i][propName] + " added ")
    }
  }

  // Return the array of unique elements
  return jobArray = uniqueArr;
}
