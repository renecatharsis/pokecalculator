const mergeClassList = (...classes: (string | boolean)[]) => classes.filter(Boolean).join(" ");

export { mergeClassList };
