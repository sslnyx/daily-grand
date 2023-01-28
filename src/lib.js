export function init(nums, numsMap) {
    nums.reduce((acc, num, i) => {
        for (let j = acc; j < acc + num; j++) {
            numsMap.set(j, i + 1);
        }
        return acc + num;
    }, 0);

    return numsMap;
}

function gcd_two_numbers(x, y) {
    if ((typeof x !== 'number') || (typeof y !== 'number'))
        return false;
    x = Math.abs(x);
    y = Math.abs(y);
    while (y) {
        var t = y;
        y = x % y;
        x = t;
    }
    return x;
}


export function gcd_more_than_two_numbers(input) {
    if (toString.call(input) !== "[object Array]")
        return false;
    var len, a, b;
    len = input.length;
    if (!len) {
        return null;
    }
    a = input[0];
    for (var i = 1; i < len; i++) {
        b = input[i];
        a = gcd_two_numbers(a, b);
    }
    return a;
}

export function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export function allOddsEvens(arr) {
    const resMap = new Map();
    resMap.set(0, false);
    resMap.set(1, false);

    for (const i of arr) {
        resMap.set(i % 2, true)
    }

    if (Array.from(resMap.values()).includes(false))
        return resMap

    return true
}

// function areConsecutive(nums) {
//     if (nums.length !== 6) return false;
//     nums.sort((a, b) => a - b);
//     for (let i = 0; i < nums.length - 1; i++) {
//         if (nums[i + 1] - nums[i] !== 1 || nums[i] % 2 !== 0) return false;
//     }
//     return true;
// }

export function isConsecutive(nums) {
    const cMap = new Map();
    const cNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

    cNums.forEach(cNum => {
        let count = 1;
        for (let i = 0; i < nums.length - 1; i++) {
            if (nums[i + 1] - nums[i] === cNum) {
                count++
            } else if(count <= 2) {
                return false;
            }
        }

        if (count > 2) {
            console.log("cNum: " + cNum)
            return cMap.set(cNum, true)
        } else {
            cMap.set(cNum, false)
        }
    })


    for (const [i, b] of cMap.entries()) {
        if (b) return true
    }

    // return true;


}
