let score = 0;
let targetX = Math.random() * 450;
let targetY = Math.random() * 450;

document.getElementById('target').style.left = targetX + 'px';
document.getElementById('target').style.top = targetY + 'px';

document.getElementById('target').onclick = function() {
    score++;
    document.getElementById('score').innerHTML = 'Score: ' + score;

    targetX = Math.random() * 450;
    targetY = Math.random() * 450;

    document.getElementById('target').style.left = targetX + 'px';
    document.getElementById('target').style.top = targetY + 'px';
};