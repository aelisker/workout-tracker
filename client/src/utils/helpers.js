// go through an array to add commas between string, and before final word removing duplicates throughout
export function AddCommasAndAnAnd(arr) {
    let newArr = []
    for (let i = 0; i < arr.length; i++) {
        if (!newArr.includes(arr[i])) {
            newArr.push(arr[i])
        } else { }
    }

    let text = []
    if (newArr.length === 1) {
        text = newArr
    } else {
        for (let j = 0; j < newArr.length - 1; j++) {
            text.push(newArr[j])
            if (newArr.length !== 2) {
                text.push(", ")
            } else if (newArr.length === 2) {
                text.push(" ")
            } else if (newArr.length === 1) {

            }
        }
    }
    if (newArr.length > 1) {
        text.push("and ")
        text.push(newArr[newArr.length - 1])
        text = text.join('')
    } else if (newArr.length === 1) { }
    return text
};