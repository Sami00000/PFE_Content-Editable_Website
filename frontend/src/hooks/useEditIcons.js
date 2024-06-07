import { useEffect } from 'react';

const useEditIcons = (hasCookie) => {
    useEffect(() => {
        if (hasCookie) {
            // Function to create and append an edit icon to an element
            const addEditIcon = (element, type) => {
                const editIcon = document.createElement('span');
                editIcon.textContent = '✏️';
                editIcon.style.cursor = 'pointer';
                editIcon.onclick = () => {
                    const id = element.getAttribute('data-id');
                    if (id) {
                        window.location.href = `http://127.0.0.1:8000/editable-${type}-content/${id}/edit`;
                    }
                };
                element.appendChild(editIcon);
            };

            // Add edit icons to paragraphs
            const paragraphs = document.querySelectorAll('p[data-page][data-tag]');
            paragraphs.forEach(p => addEditIcon(p, 'text'));

            // Add edit icons to images
            const images = document.querySelectorAll('img[data-page][data-tag]');
            images.forEach(img => addEditIcon(img, 'image'));

            // Add edit icons to headings
            const headings = document.querySelectorAll('h1[data-page], h2[data-page], h3[data-page], h4[data-page], h5[data-page], h6[data-page]');
            headings.forEach(heading => addEditIcon(heading, 'heading'));
        }
    }, [hasCookie]);
};

export default useEditIcons;
