
// This function accepts array of zip numbers
// and returs the closest zip number to the one searched
// This function uses bianry search. O(log N)
var getClosestZip = function(zip_array: Array<number>, target: number) {
    
    // Declare low and high location
    var low = -1, high = zip_array.length;

    // if zip array is empty
    // return -1 as output
    if(zip_array.length == 0){
        return -1;
    }

    // if zip array element is 1
    // return the only variable
    if(zip_array.length == 1){
        return zip_array[0];
    }

    // if the target is less than the first element in array
    // return the first element as the closest element
    if(target < zip_array[0]){
        return [zip_array[0], 0];
    }

    // if the target is greater than the last element in the zip array
    // return the last element in the zip array as the closest
    if(target > zip_array[zip_array.length-1]){
        return [zip_array[zip_array.length-1], zip_array.length-1];
    }


    // perfom a while loop to continously divide the length array
    // until a closest value is found
    while (high - low > 1) {

        // we need a mipoint variable to divide
        // the array into 2 equal half
        var midpoint = Math.round((low + high)/2);


        // if the target is greater than the value of the midpoint
        // then set the low value to the midpoint
        // else set the high to the midpoint
        if (zip_array[midpoint] <= target) {
            low = midpoint;
        } else {
            high = midpoint;
        }
    }// end the while loop


    // if the exact target is found the zip array
    // set the the high as the low
    if (zip_array[low] == target) {
        high = low;
    }

    // get the difference betwwen the high and the 
    // low value against the target
    let low_diff = Math.abs(zip_array[low] - target)
    let high_diff = Math.abs(zip_array[high] - target)


    // if the value of low difference is lesser than high difference
    // return the value and the index location if the low difference
    if(low_diff < high_diff){
        return [zip_array[low], low];
    }

    // if the value of high difference is greater than low difference
    // return the value and the index location if the high difference
    return [zip_array[high], high]


    // return [a[lo], a[hi]];
}

module.exports = getClosestZip
export default getClosestZip