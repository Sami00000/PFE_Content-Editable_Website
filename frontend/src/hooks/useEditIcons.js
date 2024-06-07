import { useEffect } from 'react';

const useEditIcons = (hasCookie) => {
    useEffect(() => {
        if (hasCookie) {
            // Function to create and insert an edit icon as a sibling next to the element
            const addEditIcon = (element, type) => {
                // Check if the edit icon already exists next to the element
                const nextSibling = element.nextSibling;
                if (nextSibling && nextSibling.classList && nextSibling.classList.contains('edit-icon')) {
                    return;
                }

                const editIcon = document.createElement('span');
                editIcon.textContent = '✏️';
                editIcon.style.cursor = 'pointer';
                editIcon.classList.add('edit-icon'); // Adding a class for identification
                editIcon.onclick = () => {
                    const id = element.getAttribute('data-id');
                    if (id) {
                        window.location.href = `http://127.0.0.1:8000/editable-${type}-content/${id}/edit`;
                    }
                };

                // Insert the edit icon after the element
                element.parentNode.insertBefore(editIcon, element.nextSibling);
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
