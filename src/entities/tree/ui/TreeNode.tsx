import { Checkbox } from '../../../shared';
import { observer } from 'mobx-react';
import { TreeNodeStore } from '../model/TreeNodeStore.ts';

type Props = {
  treeNodeStore: TreeNodeStore;
};

export const TreeNode = observer(({ treeNodeStore }: Props) => {
  return (
    <div>
      <div>
        <Checkbox
          isChecked={treeNodeStore.isChecked}
          isIndeterminate={treeNodeStore.isHalfChecked}
          label={treeNodeStore.name}
          onChange={(isChecked) => treeNodeStore.setIsChecked(isChecked)}
        />
      </div>
      <ul>
        {treeNodeStore.innerNodes.map((node) => {
          return (
            <li key={node.id} className={node.parentNode ? 'pl-[24px]' : ''}>
              <TreeNode treeNodeStore={node} />
            </li>
          );
        })}
      </ul>
    </div>
  );
});
