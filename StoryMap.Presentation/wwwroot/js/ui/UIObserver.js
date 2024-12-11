// /src/ui/UIObserver.js
class UIObserver {
    constructor(observable, element) {
        this.observable = observable;
        this.element = element;
        this.observable.addObserver(this); // Register as observer
    }

    update() {
        this.render();
    }

    render() {
        // Clear previous content
        this.element.innerHTML = '';

        // Get all items from the observable
        const items = this.observable.getItems();

        // Loop through items and create DOM structure
        items.forEach(item => {
            const itemElement = this.createTreeItem(item);
            this.element.appendChild(itemElement);
        });
    }

    // Helper function to create a tree structure for each item
    createTreeItem(item) {
        const li = document.createElement('li');
        li.classList.add('editable');
        
        const span = document.createElement('span');
        span.classList.add('toggle');
        span.innerHTML = `<i class="bi bi-chevron-right"></i>`;
        
        const itemContent = document.createElement('span');
        itemContent.innerText = item.title || `Map ${item.id}`; // Dynamically set the title

        const ul = document.createElement('ul');
        if (item.details) {
            item.details.forEach(detail => {
                const detailLi = document.createElement('li');
                detailLi.classList.add('editable');
                detailLi.innerText = detail;
                ul.appendChild(detailLi);
            });
        }

        // Add the "Add" button for new items
        const addBtn = document.createElement('li');
        addBtn.innerHTML = `<button type="button" class="btn btn-outline-primary"><i class="bi bi-plus"></i></button>`;
        ul.appendChild(addBtn);

        li.appendChild(span);
        li.appendChild(itemContent);
        li.appendChild(ul);

        return li;
    }
}

export default UIObserver;
