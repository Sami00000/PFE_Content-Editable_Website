import { useEffect } from 'react';

const useEditIcons = (hasCookie) => {
    useEffect(() => {
        if (hasCookie) {
            const paragraphs = document.querySelectorAll('p[data-page][data-tag]');
            paragraphs.forEach(p => {
                const editIcon = document.createElement('span');
                editIcon.textContent = '✏️'; // Use an icon or text for edit
                editIcon.style.cursor = 'pointer';
                editIcon.onclick = () => {
                    const id = p.getAttribute('data-id');
                    if (id) {
                        window.location.href = `http://127.0.0.1:8000/editable-text-content/${id}/edit`;
                    }
                };
                p.appendChild(editIcon);
            });
        }
    }, [hasCookie]);
};

export default useEditIcons;
