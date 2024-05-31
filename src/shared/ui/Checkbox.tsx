import { Checkbox as CheckboxAntd } from 'antd';

type Props = {
  isChecked: boolean;
  isIndeterminate?: boolean;
  label?: string;
  onChange: (checked: boolean) => void;
};

export const Checkbox = ({ isChecked, isIndeterminate, label, onChange }: Props) => {
  return (
    <CheckboxAntd
      checked={isChecked}
      indeterminate={!isChecked && isIndeterminate}
      onChange={(e) => onChange(e.target.checked)}>
      {label}
    </CheckboxAntd>
  );
};
