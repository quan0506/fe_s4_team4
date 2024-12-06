const convertJsonToFormData = (json) => {
    const formData = new FormData();
    Object.keys(json).forEach((key) => {
        if (key === 'photos' && Array.isArray(json[key])) {
            json[key].forEach((fileObj) => {
                if (fileObj.originFileObj instanceof File) {
                    formData.append(key, fileObj.originFileObj, fileObj.originFileObj.name);
                }
                // formData.append(key, fileObj, fileObj.name);
            });
        } else {
            formData.append(key, json[key]);
        }
    });
    for (let pair of formData.entries()) { // log
        console.log(pair[0] + ':', pair[1]);
    }
    return formData;
};

export default convertJsonToFormData;