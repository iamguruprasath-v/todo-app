function createNewElement(element, classes = [], text = "") {
    let elem = document.createElement(element);
    classes.forEach(cls => {
        elem.classList.add(cls);
    });
    if(element === "input") {
        elem.value = text;
    } else if (element === "img") {
        elem.src = text;
    } else {
        elem.innerText = text;
    }
    return elem;
}


export default {
    createNewElement,
}