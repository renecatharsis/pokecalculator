function roundSequentiallyFromEnd(value: number, targetDecimals: number): number {
    const numString = value.toString();
    const parts = numString.split(".");
    const decimalPart = parts[1] || "";
    let integerPart = parts[0];

    // no rounding needed
    if (decimalPart.length <= targetDecimals) {
        return parseFloat(value.toFixed(targetDecimals));
    }

    const currentDecimalDigits = decimalPart.split("").map(Number);

    // iterate backwards through the decimal digits until hitting the target number of decimals
    for (let i = currentDecimalDigits.length - 1; i >= targetDecimals; i--) {
        const digitToRound = currentDecimalDigits[i];

        // round up the next digit in line if the current one is greater than 5
        // this changes the entire set of decimals into its final result one by one
        if (digitToRound >= 5) {
            let j = i - 1;
            while (j >= 0) {
                if (currentDecimalDigits[j] === 9) {
                    currentDecimalDigits[j] = 0; // 9 turns into 0 as transfer into the next decimals
                    j--;
                } else {
                    currentDecimalDigits[j]++; // increment current digit
                    break;
                }
            }

            // this means the transfer went into the integer part (e.g., 0.99 -> 1.00)
            if (j < 0) {
                integerPart = (parseInt(integerPart) + 1).toString();
            }
        }
    }

    // build final decimal part
    let finalDecimalPart = "";
    for (let i = 0; i < targetDecimals; i++) {
        if (i < currentDecimalDigits.length) {
            finalDecimalPart += currentDecimalDigits[i];
        } else {
            finalDecimalPart += "0"; // add 0 until the target number of decimals is reached
        }
    }

    // pad with 0 if the integer part is empty due to rounding transfers (e.g., 0.99 -> 1.00), but the original number was 0.xx
    if (integerPart === "" && (currentDecimalDigits.length > 0 || finalDecimalPart.length > 0)) {
        integerPart = "0";
    }

    let finalNumberString = integerPart;
    if (finalDecimalPart.length > 0) {
        finalNumberString += "." + finalDecimalPart;
    }

    return parseFloat(finalNumberString);
}

export { roundSequentiallyFromEnd };
