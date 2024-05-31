import './index.css';
import { TreeNode } from './entities/tree/ui/TreeNode.tsx';
import { TreeNodeStore } from './entities/tree/model/TreeNodeStore.ts';
import { observer } from 'mobx-react';

const node = new TreeNodeStore('Hotel', null);
const floor_1 = new TreeNodeStore('Floor 1', node);
new TreeNodeStore('Room 1', floor_1);
new TreeNodeStore('Room 2', floor_1);
new TreeNodeStore('Room 3', floor_1);
const floor_2 = new TreeNodeStore('Floor 2', node);
new TreeNodeStore('Room 1', floor_2);

export const App = observer(() => {
  return (
    <main>
      <TreeNode treeNodeStore={node} />
    </main>
  );
});
