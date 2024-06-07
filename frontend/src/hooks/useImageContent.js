import { useEffect } from 'react';
import useEditIcons from './useEditIcons';
import useCookie from './useCookie';

const fetchAndSetImageData = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/get-image-content');
        const data = await response.json();

        const updatedElements = [];
        data.forEach(item => {
            const images = document.querySelectorAll(`img[data-page="${item.page}"][data-tag="${item.tag}"]`);
            images.forEach(img => {
                img.src = item.srcContent;
                img.setAttribute('data-id', item.id);
                updatedElements.push(img);
            });
        });
        return updatedElements;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};

const extractAndSendImageData = async () => {
    const images = document.querySelectorAll('img[data-page][data-tag]');
    const data = Array.from(images).map(img => ({
        id: img.getAttribute('data-id') || null,
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
                    extractAndSendImageData();
                }
            });
        }
    });
};

const useImageContent = () => {
    const { hasCookie } = useCookie('simple_cookie');
    
    useEffect(() => {
        let observer;

        const updateContent = async () => {
            const updatedElements = await fetchAndSetImageData();

            observer = new MutationObserver(observeNewImages);
            observer.observe(document.body, { childList: true, subtree: true });

            await extractAndSendImageData();

            if (hasCookie) {
                updatedElements.forEach(img => {
                    const editIcon = document.createElement('span');
                    editIcon.textContent = '✏️';
                    editIcon.style.cursor = 'pointer';
                    editIcon.onclick = () => {
                        const id = img.getAttribute('data-id');
                        if (id) {
                            window.location.href = `http://127.0.0.1:8000/editable-image-content/${id}/edit`;
                        }
                    };
                    img.parentNode.insertBefore(editIcon, img.nextSibling);
                });
            }
        };

        updateContent();

        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    }, [hasCookie]);

    useEditIcons(hasCookie);
};

export default useImageContent;
