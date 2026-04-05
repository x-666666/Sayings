/* 使用一段 js 让指针元素跟随鼠标移动，并在移动到链接上方时自动添加 */
var mouse = document.querySelector('.mouse');
document.addEventListener('mousemove', function(e) {
    mouse.style.left = e.pageX + 'px';
    mouse.style.top = e.pageY + 'px';
});

var links = document.querySelectorAll('a');

links.forEach(function(link) {
    link.addEventListener('mouseover', function() {
        mouse.classList.add('lighter');
    });
    link.addEventListener('mouseout', function() {
        mouse.classList.remove('lighter');
    });
});