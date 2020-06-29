function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    
        //tabs

    const tabsParent = document.querySelector(tabsParentSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector),
          tabsButtons = document.querySelectorAll(tabsSelector);

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.style.display = 'none';
        });

        tabsButtons.forEach(btn => {
            btn.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].style.display = "block";

        tabsButtons[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains(tabsSelector.slice(1))) { //удаляю первый символ (точку)
            tabsButtons.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });

        }
    });

}

export default tabs;