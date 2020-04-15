import {Node} from "gatsby";

export async function getParentNode(node: Node, getNode: Function, type: string): Promise<Node | undefined> {
    let currentNode: Node | undefined = node;
    while (currentNode !== undefined) {
        if (currentNode.internal.type === type) {
            break;
        }

        if (!node.parent) {
            currentNode = undefined;
        } else {
            currentNode = await getNode(currentNode.parent);
        }
    }

    return currentNode;
}

export function formatDate(date: Date) {
    const mm = date.getMonth() + 1;
    const dd = date.getDate();

    return [date.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd
    ].join('-');
}
