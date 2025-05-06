document.addEventListener('DOMContentLoaded', function () {
    const codeBlocks = document.querySelectorAll('pre code');

    codeBlocks.forEach(function (codeBlock) {
        const pre = codeBlock.parentElement;
        const language = codeBlock.className.match(/language-(\w+)/)?.[1] || 'text';

        // 创建头部容器
        const header = document.createElement('div');
        header.className = 'code-block-header';

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

        // 插入头部
        pre.insertBefore(header, codeBlock);
    });
}); 