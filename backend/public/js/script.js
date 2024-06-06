document.addEventListener('DOMContentLoaded', function() {
    var sidebar = document.getElementById('sidebar');
    var toggleButton = document.getElementById('sidebar-toggle');

    if (sidebar && toggleButton) {
        toggleButton.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }

    const copyIcons = document.querySelectorAll(".copy-icon");
    copyIcons.forEach((icon) => {
        icon.addEventListener('click', (e) => {
            const parentNode = e.target.closest('div');
            const text = parentNode.querySelector('p').innerText;
            navigator.clipboard.writeText(text);
        });
    });

    const replyBtns = document.querySelectorAll(".reply_btn");
    replyBtns.forEach((replyBtn) => {
        replyBtn.addEventListener('click', (e) => {
            const respondForm = e.target.closest('.question-container').querySelector(".respond-form");
            respondForm.classList.remove("hidden");
        });
    });

    const cancelReplyBtns = document.querySelectorAll(".cancel_reply");
    cancelReplyBtns.forEach((cancelBtn) => {
        cancelBtn.addEventListener('click', (e) => {
            const respondForm = e.target.closest(".respond-form");
            respondForm.classList.add("hidden");
        });
    });
});
