import { useEffect } from 'react';

const fetchAndSetImageData = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/get-image-content');
        const data = await response.json();

        data.forEach(item => {
            const images = document.querySelectorAll(`img[data-page="${item.page}"][data-tag="${item.tag}"]`);
            images.forEach(img => {
                img.src = item.srcContent;
            });
        });
    } catch (error) {
        console.error('Error:', error);
    }
};

const extractAndSendImageData = async () => {
    const images = document.querySelectorAll('img[data-page][data-tag]');
    const data = Array.from(images).map(img => ({
        tag: img.getAttribute('data-tag'),
        page: img.getAttribute('data-page'),
        srcContent: img.getAttribute('src')
    }));

    try {
        const response = await fetch('http://127.0.0.1:8000/api/update-image-content', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log('Success:', result);
    } catch (error) {
        console.error('Error:', error);
    }
};

const observeNewImages = (mutationList) => {
    mutationList.forEach(mutation => {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(node => {
                if (node.tagName === 'IMG' && node.hasAttribute('data-page') && node.hasAttribute('data-tag')) {
                    // Send the new image data to the database
                    extractAndSendImageData();
                }
            });
        }
    });
};

const useImageContent = () => {
    useEffect(() => {
        const updateContent = async () => {
            await fetchAndSetImageData();

            // Create an observer instance linked to the callback function
            const observer = new MutationObserver(observeNewImages);

            // Start observing the target node for configured mutations
            observer.observe(document.body, { childList: true, subtree: true });

            // Send initial image data
            await extractAndSendImageData();
        };

        updateContent();
    }, []);
};

export default useImageContent;
