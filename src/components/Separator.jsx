import React from "react";
import { Root as SeparatorPrimitiveRoot } from "@radix-ui/react-separator";
import { cn } from "./utils";

const Separator = React.forwardRef((props, ref) => {
  const { className, orientation = "horizontal", decorative = true, ...restProps } = props;

  return (
    <SeparatorPrimitiveRoot
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className)}
      {...restProps}
    />
  );
});

Separator.displayName = SeparatorPrimitiveRoot.displayName;

export { Separator };
