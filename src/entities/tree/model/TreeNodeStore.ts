import { action, computed, makeObservable, observable } from 'mobx';

export class TreeNodeStore {
  id: string;
  name: string;
  isChecked: boolean;
  parentNode: TreeNodeStore | null;
  innerNodes: TreeNodeStore[];

  constructor(name: string, parentNode: TreeNodeStore | null) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.parentNode = parentNode;
    this.innerNodes = [];
    this.isChecked = false;

    if (this.parentNode) {
      this.parentNode.setInnerNodes([...this.parentNode.innerNodes, this]);
    }

    makeObservable(this, {
      isChecked: observable,
      parentNode: observable,
      innerNodes: observable,
      setInnerNodes: action,
      setIsChecked: action,
      checkParentNodesIfNeed: action,
      isHalfChecked: computed,
    });
  }

  setInnerNodes(nodes: TreeNodeStore[]) {
    this.innerNodes = nodes;
  }

  setIsChecked(value: boolean) {
    this.isChecked = value;

    this.innerNodes.forEach((node) => node.setIsChecked(value));

    if (!this.parentNode) {
      return;
    }

    this.checkParentNodesIfNeed(this.parentNode);
  }

  checkParentNodesIfNeed = (node: TreeNodeStore) => {
    node.isChecked = node.innerNodes.every((node) => node.isChecked);

    if (node.parentNode) {
      this.checkParentNodesIfNeed(node.parentNode);
    }
  };

  get isHalfChecked() {
    let isSomeNodeChecked = false;

    const checkNodes = (nodes: TreeNodeStore[]) => {
      nodes.forEach((node) => {
        if (isSomeNodeChecked) {
          return;
        }

        if (node.isChecked) {
          isSomeNodeChecked = true;

          return;
        }

        checkNodes(node.innerNodes);
      });
    };

    checkNodes(this.innerNodes);

    return isSomeNodeChecked;
  }
}
