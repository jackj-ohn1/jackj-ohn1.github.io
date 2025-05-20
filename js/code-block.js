document.addEventListener('DOMContentLoaded', function () {
    const codeBlocks = document.querySelectorAll('pre code');

    codeBlocks.forEach(function (codeBlock) {
        const pre = codeBlock.parentElement;
        const language = codeBlock.className.match(/language-(\w+)/)?.[1] || 'text';

        // 创建头部容器
        const header = document.createElement('div');
        header.className = 'code-block-header';

        // 添加折叠按钮
        const collapseButton = document.createElement('button');
        collapseButton.className = 'collapse-button';
        collapseButton.innerHTML = `
            <svg class="collapse-icon" viewBox="0 0 24 24" width="16" height="16">
                <path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
        collapseButton.onclick = function () {
            const codeContent = pre.querySelector('.code-content');
            const icon = collapseButton.querySelector('.collapse-icon');
            if (codeContent.style.display === 'none') {
                codeContent.style.display = 'block';
                icon.style.transform = 'rotate(0deg)';
            } else {
                codeContent.style.display = 'none';
                icon.style.transform = 'rotate(-90deg)';
            }
        };
        header.appendChild(collapseButton);

        // 添加语言标识
        const languageSpan = document.createElement('span');
        languageSpan.className = 'language';
        languageSpan.textContent = language;
        header.appendChild(languageSpan);

        // 添加复制按钮
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.textContent = '复制';
        copyButton.onclick = function () {
            const code = codeBlock.textContent;
            navigator.clipboard.writeText(code).then(function () {
                copyButton.textContent = '已复制';
                copyButton.classList.add('copied');
                setTimeout(function () {
                    copyButton.textContent = '复制';
                    copyButton.classList.remove('copied');
                }, 2000);
            }).catch(function (err) {
                console.error('复制失败:', err);
                copyButton.textContent = '复制失败';
                setTimeout(function () {
                    copyButton.textContent = '复制';
                }, 2000);
            });
        };
        header.appendChild(copyButton);

        // 创建代码内容容器
        const codeContent = document.createElement('div');
        codeContent.className = 'code-content';
        codeContent.appendChild(codeBlock);

        // 清空pre并添加新的结构
        pre.innerHTML = '';
        pre.appendChild(header);
        pre.appendChild(codeContent);
    });
}); 