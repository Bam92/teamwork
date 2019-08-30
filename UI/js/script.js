const modal = document.getElementById('modal')
, bars = document.getElementById('bars')
, closeBtn = document.getElementsByClassName('close')[0]
;

bars.addEventListener('click', () => {
    modal.style.display = "block";
});
    
closeBtn.addEventListener('click', () => {
    modal.style.display = "none";
});

window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = "none";
});