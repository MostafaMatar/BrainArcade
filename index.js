const gameLinks = document.querySelectorAll('.game-link');

gameLinks.forEach(link => {
    link.addEventListener('mouseover', () => {
        let desctiption = link.dataset.descriptionid;
        const descriptionElement = document.getElementById(desctiption);
        descriptionElement.classList.remove('hidden');
    });

    link.addEventListener('mouseout', () => {
        let desctiption = link.dataset.descriptionid;
        const descriptionElement = document.getElementById(desctiption);
        descriptionElement.classList.add('hidden');
    });
});
