document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('.copy-code-button').forEach(button => {
        button.addEventListener('click', () => {
            const container = button.closest('.code-block-container');
            const code = container.querySelector('pre > code');
            navigator.clipboard.writeText(code.textContent).then(() => {
                button.textContent = 'copied!';
                setTimeout(() => {
                    button.textContent = 'copy';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    });
});
