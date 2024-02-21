function reqTemplate(templateSrc: string): Promise<Document> {

    return new Promise((resolve, reject) => {

        const xhr: XMLHttpRequest = new XMLHttpRequest();

        xhr.addEventListener('load', (): void => {

            if(!xhr.response) {
                reject()
            }

            resolve(xhr.response)
        });

        xhr.responseType = 'document';
        xhr.open('GET', templateSrc);
        xhr.send();
    });
}

export default reqTemplate;