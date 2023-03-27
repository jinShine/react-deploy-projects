import { Popover } from "antd";
import { useState } from "react";

interface IProps {
  content: JSX.Element;
  trigger: "hover" | "focus" | "click" | "contextMenu";
  children: JSX.Element;
}

export const PopoverView = (props: IProps) => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <Popover
      content={props.content}
      trigger={props.trigger}
      open={open}
      onOpenChange={handleOpenChange}
    >
      {props.children}
    </Popover>
  );
};
