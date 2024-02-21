function reqTemplate(templateSrc) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            if (!xhr.response) {
                reject();
            }
            resolve(xhr.response);
        });
        xhr.responseType = 'document';
        xhr.open('GET', templateSrc);
        xhr.send();
    });
}
export default reqTemplate;
