/* hardware.js */
document.addEventListener('DOMContentLoaded', function () {
    var paragraphs = document.querySelectorAll('p');
    paragraphs.forEach(function (paragraph) {
        paragraph.addEventListener('mouseover', function () {
            this.style.color = '#000';
            this.style.fontWeight = 'bold';
        });

        paragraph.addEventListener('mouseout', function () {
            this.style.color = '#777';
            this.style.fontWeight = 'normal';
        });
    });
});
