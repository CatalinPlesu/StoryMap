document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.tree').forEach(tree => {
        tree.addEventListener('click', function(event) {
            const target = event.target;

            // Handle add button click
            if (target.closest('.btn')) {
                const target = event.target.closest('.btn');
                const parentUl = target.closest('ul');
                
                // Determine tree type from the root text
                const treeRoot = target.closest('li.tree-root') || target.closest('.tree').querySelector('li');
                const rootText = treeRoot.textContent.trim();
                const treeType = ['Maps', 'Chapters', 'Characters'].find(type => rootText.startsWith(type));
                
                // Check if we're adding to a top-level item or the main list
                if (parentUl.querySelector('li:not(:last-child)')) {
                    const parentItem = target.closest('ul').parentElement;
                    const detailsUl = parentItem.querySelector('ul');
                    
                    // Count existing details
                    const existingDetails = detailsUl.querySelectorAll('li:not(.add-button):not(:last-child)');
                    const newDetailNumber = existingDetails.length + 1;

                    // Create new detail
                    const newDetailLi = document.createElement('li');
                    newDetailLi.classList.add("editable");
                    switch(treeType) {
                        case 'Maps':
                            newDetailLi.textContent = `Image ${newDetailNumber}`;
                            break;
                        case 'Chapters':
                            newDetailLi.textContent = `Timeframe ${newDetailNumber}`;
                            break;
                        case 'Characters':
                            newDetailLi.textContent = `Detail ${newDetailNumber}`;
                            break;
                    }

                    // Insert before the add button
                    detailsUl.insertBefore(newDetailLi, detailsUl.lastElementChild);
                }
            }

            if (target.nodeName === 'LI' && target.classList.contains("editable")) {
                // Skip if already in edit mode
                if (target.querySelector('input')) return;

                // Check if this is a top-level item (Map, Chapter, Character)
                const isTopLevelItem = target.querySelector('ul') !== null;
                const originalContent = target.innerHTML;
                
                // Create inline input for just the text
                const textNodes = Array.from(target.childNodes)
                    .filter(node => node.nodeType === Node.TEXT_NODE);
                const originalText = textNodes.map(node => node.textContent.trim()).join(' ');

                // Create inline input
                const input = document.createElement('input');
                input.type = 'text';
                input.value = originalText;
                input.className = 'form-control form-control-sm inline-edit';
                input.style.width = 'auto';
                input.style.display = 'inline-block';
                input.style.margin = '0 5px';

                // If top-level item, preserve child elements
                if (isTopLevelItem) {
                    // Clear text nodes, keep other elements
                    textNodes.forEach(node => node.remove());
                    
                    // Prepend input before other child elements
                    target.insertBefore(input, target.firstChild);
                } else {
                    // Replace text for non-top-level items
                    target.innerHTML = '';
                    target.appendChild(input);
                }
                
                input.focus();

                // Handle input blur (save)
                input.addEventListener('blur', function() {
                    const newText = this.value.trim();
                    
                    if (isTopLevelItem) {
                        // Restore original structure, just update text
                        this.remove();
                        const textNode = document.createTextNode(` ${newText || originalText}`);
                        target.insertBefore(textNode, target.firstElementChild.nextSibling);
                    } else {
                        target.textContent = newText || originalText;
                    }
                });

                // Handle Enter key
                input.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter') {
                        const newText = this.value.trim();
                        
                        if (isTopLevelItem) {
                            // Restore original structure, just update text
                            this.remove();
                            const textNode = document.createTextNode(` ${newText || originalText}`);
                            target.insertBefore(textNode, target.firstElementChild.nextSibling);
                        } else {
                            target.textContent = newText || originalText;
                        }
                    }
                    // Prevent propagation to avoid other event listeners
                    e.stopPropagation();
                });
            }
        });
    });
});
