function prepareData(formData) {
    let salery = 1_000_000;

    switch (formData.designation.toLowerCase()) {
        case "manager":
            salery /= 1;
            break;
        case "clerk":
            salery /= 20;
            break;
        case "peon":
            salery /= 40;
            break;
        default:
            salery *= 0;
            break;
    }
    formData.salery = salery;
    return formData;
}

export function doSomething(formData) {
    return new Promise((res, rej) => {
        prepareData(formData);
        console.log(formData)

        // Api Logic :)
        //

        res(true)
    })
}
