let active;
let ctrlDown = false;
let shiftDown = false;
let timeout;
let nodeList;
let focusedNode;
window.addEventListener('keydown', e => {
    if (active){
        console.log(e.key);
    }
    if (e.shiftKey && e.ctrlKey) {
        ctrlDown = true;
        shiftDown = true;
        timeout = setTimeout(() => {
            ctrlDown = false;
            shiftDown = false;
            clearTimeout(timeout);
            timeout = null;
        }, 200);
    }
});

window.addEventListener('keyup', e => {
    if (timeout) {
        if (e.key === 'Control') {
            ctrlDown = false;
        }
        if (e.key === 'Shift') {
            shiftDown = false;
        }
        if (e.key === 'Control' || e.key === 'Shift') {
            if (!ctrlDown && !shiftDown) {
                clearTimeout(timeout);
                timeout = null;
                active = !active;
                if (active) {
                    nodeList = Array.from(document.body.querySelectorAll('a, button, input'));
                    nodeList.forEach(node => {
                        let rect = node.getBoundingClientRect();
                        node.x = rect.left + rect.width / 2;
                        node.y = rect.top + rect.height / 2;
                    });
                    if (focusedNode) {
                        focusedNode.classList.remove('bb_keynav_focus');
                    }
                    focusedNode = getStartNode(nodeList);
                    focusedNode.classList.add('bb_keynav_focus');
                } else {
                    console.log('off');
                    if (focusedNode) {
                        focusedNode.classList.remove('bb_keynav_focus');
                    }
                }
            }
        }
    }
});

function getStartNode (arr) {
    let center = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
    };
    arr.sort((a, b) => {
        let adistx = a.x - center.x;
        let adisty = a.y - center.y;
        let bdistx = b.x - center.x;
        let bdisty = b.y - center.y;
        return (adistx * adistx + adisty * adisty) - (bdistx * bdistx + bdisty * bdisty);
    });
    return arr[0];
}