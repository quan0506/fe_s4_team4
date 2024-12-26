const convertJsonToFormData = (json) => {
    const formData = new FormData();

    Object.keys(json)?.forEach((key) => {
        if (key === 'photos' && Array.isArray(json[key])) {
            json[key]?.forEach((fileObj) => {
                if (fileObj.originFileObj instanceof File) {
                    formData.append(key, fileObj.originFileObj, fileObj.originFileObj.name);
                }
            });
        } else if (key === 'reviewImageURL') {
            const value = json[key];
            if (Array.isArray(value)) {
                value?.forEach((url) => {
                    if (url instanceof File) {
                        formData.append(key, url, url.name);
                    } else {
                        formData.append(key, url);
                    }
                });
            } else if (typeof value === 'string') {
                formData.append(key, value);
            }
        } else {
            formData.append(key, json[key]);
        }
    });

    for (let pair of formData.entries()) { 
        console.log(pair[0] + ':', pair[1]);
    }

    return formData;
};

export default convertJsonToFormData;
