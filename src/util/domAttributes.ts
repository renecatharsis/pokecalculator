const mergeClassList = function (...classes: (string | boolean)[]) {
    return classes.filter(Boolean).join(" ");
};

export { mergeClassList };
