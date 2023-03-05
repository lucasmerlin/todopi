// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */

/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */

// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: rPHLiaKgVs2doeGeK5nfK5
// Component: xZQZUUFdGP
import * as React from "react";

import * as p from "@plasmicapp/react-web";
import * as ph from "@plasmicapp/host";

import {
  hasVariant,
  classNames,
  wrapWithClassName,
  createPlasmicElementProxy,
  makeFragment,
  MultiChoiceArg,
  SingleBooleanChoiceArg,
  SingleChoiceArg,
  pick,
  omit,
  useTrigger,
  StrictProps,
  deriveRenderOpts,
  ensureGlobalVariants
} from "@plasmicapp/react-web";

import "@plasmicapp/react-web/lib/plasmic.css";

import projectcss from "./plasmic_todo_pi.module.css"; // plasmic-import: rPHLiaKgVs2doeGeK5nfK5/projectcss
import sty from "./PlasmicTodoListItem.module.css"; // plasmic-import: xZQZUUFdGP/css

import CheckBoldIcon from "./icons/PlasmicIcon__CheckBold"; // plasmic-import: 1yK8UbNlI/icon

export type PlasmicTodoListItem__VariantMembers = {
  checked: "checked";
  bg: "light" | "dark";
  isDue: "isDue";
};
export type PlasmicTodoListItem__VariantsArgs = {
  checked?: SingleBooleanChoiceArg<"checked">;
  bg?: SingleChoiceArg<"light" | "dark">;
  isDue?: SingleBooleanChoiceArg<"isDue">;
};
type VariantPropType = keyof PlasmicTodoListItem__VariantsArgs;
export const PlasmicTodoListItem__VariantProps = new Array<VariantPropType>(
  "checked",
  "bg",
  "isDue"
);

export type PlasmicTodoListItem__ArgsType = {
  children?: React.ReactNode;
  due?: React.ReactNode;
};
type ArgPropType = keyof PlasmicTodoListItem__ArgsType;
export const PlasmicTodoListItem__ArgProps = new Array<ArgPropType>(
  "children",
  "due"
);

export type PlasmicTodoListItem__OverridesType = {
  root?: p.Flex<"div">;
  svg?: p.Flex<"svg">;
};

export interface DefaultTodoListItemProps {
  children?: React.ReactNode;
  due?: React.ReactNode;
  checked?: SingleBooleanChoiceArg<"checked">;
  bg?: SingleChoiceArg<"light" | "dark">;
  isDue?: SingleBooleanChoiceArg<"isDue">;
  className?: string;
}

const __wrapUserFunction =
  globalThis.__PlasmicWrapUserFunction ?? ((loc, fn) => fn());
const __wrapUserPromise =
  globalThis.__PlasmicWrapUserPromise ??
  (async (loc, promise) => {
    return await promise;
  });

function PlasmicTodoListItem__RenderFunc(props: {
  variants: PlasmicTodoListItem__VariantsArgs;
  args: PlasmicTodoListItem__ArgsType;
  overrides: PlasmicTodoListItem__OverridesType;

  forNode?: string;
}) {
  const { variants, overrides, forNode } = props;

  const $ctx = ph.useDataEnv?.() || {};
  const args = React.useMemo(() => Object.assign({}, props.args), [props.args]);

  const $props = {
    ...args,
    ...variants
  };
  const refsRef = React.useRef({});
  const $refs = refsRef.current;

  const currentUser = p.useCurrentUser?.() || {};
  const [$queries, setDollarQueries] = React.useState({});
  const stateSpecs = React.useMemo(
    () => [
      {
        path: "checked",
        type: "private",
        variableType: "variant",
        initFunc: true
          ? ({ $props, $state, $queries, $ctx }) => $props.checked
          : undefined
      },
      {
        path: "bg",
        type: "private",
        variableType: "variant",
        initFunc: true
          ? ({ $props, $state, $queries, $ctx }) => $props.bg
          : undefined
      },
      {
        path: "isDue",
        type: "private",
        variableType: "variant",
        initFunc: true
          ? ({ $props, $state, $queries, $ctx }) => $props.isDue
          : undefined
      }
    ],
    [$props, $ctx]
  );
  const $state = p.useDollarState(stateSpecs, { $props, $ctx, $queries });

  return (
    <p.Stack
      as={"div"}
      data-plasmic-name={"root"}
      data-plasmic-override={overrides.root}
      data-plasmic-root={true}
      data-plasmic-for-node={forNode}
      hasGap={true}
      className={classNames(
        projectcss.all,
        projectcss.root_reset,
        projectcss.plasmic_default_styles,
        projectcss.plasmic_mixins,
        projectcss.plasmic_tokens,
        sty.root,
        { [sty.rootbg_light]: hasVariant($state, "bg", "light") }
      )}
    >
      <div
        className={classNames(projectcss.all, sty.freeBox__lIx0I, {
          [sty.freeBoxchecked__lIx0IM5Ql3]: hasVariant(
            $state,
            "checked",
            "checked"
          )
        })}
      >
        {(hasVariant($state, "checked", "checked") ? true : true) ? (
          <CheckBoldIcon
            data-plasmic-name={"svg"}
            data-plasmic-override={overrides.svg}
            className={classNames(projectcss.all, sty.svg, {
              [sty.svgchecked]: hasVariant($state, "checked", "checked")
            })}
            role={"img"}
          />
        ) : null}
      </div>

      <div className={classNames(projectcss.all, sty.freeBox__nsUnT)}>
        {p.renderPlasmicSlot({
          defaultContents: "This is a long to do list item",
          value: args.children,
          className: classNames(sty.slotTargetChildren)
        })}
        {true ? (
          <p.Stack
            as={"div"}
            hasGap={true}
            className={classNames(projectcss.all, sty.freeBox__dkR0E)}
          >
            <div
              className={classNames(projectcss.all, sty.freeBox__xqDs3, {
                [sty.freeBoxisDue__xqDs3YG5DU]: hasVariant(
                  $state,
                  "isDue",
                  "isDue"
                )
              })}
            />

            {p.renderPlasmicSlot({
              defaultContents: "22.02.23",
              value: args.due,
              className: classNames(sty.slotTargetDue, {
                [sty.slotTargetDueisDue]: hasVariant($state, "isDue", "isDue")
              })
            })}
          </p.Stack>
        ) : null}
      </div>
    </p.Stack>
  ) as React.ReactElement | null;
}

const PlasmicDescendants = {
  root: ["root", "svg"],
  svg: ["svg"]
} as const;
type NodeNameType = keyof typeof PlasmicDescendants;
type DescendantsType<T extends NodeNameType> =
  (typeof PlasmicDescendants)[T][number];
type NodeDefaultElementType = {
  root: "div";
  svg: "svg";
};

type ReservedPropsType = "variants" | "args" | "overrides";
type NodeOverridesType<T extends NodeNameType> = Pick<
  PlasmicTodoListItem__OverridesType,
  DescendantsType<T>
>;
type NodeComponentProps<T extends NodeNameType> =
  // Explicitly specify variants, args, and overrides as objects
  {
    variants?: PlasmicTodoListItem__VariantsArgs;
    args?: PlasmicTodoListItem__ArgsType;
    overrides?: NodeOverridesType<T>;
  } & Omit<PlasmicTodoListItem__VariantsArgs, ReservedPropsType> & // Specify variants directly as props
    /* Specify args directly as props*/ Omit<
      PlasmicTodoListItem__ArgsType,
      ReservedPropsType
    > &
    /* Specify overrides for each element directly as props*/ Omit<
      NodeOverridesType<T>,
      ReservedPropsType | VariantPropType | ArgPropType
    > &
    /* Specify props for the root element*/ Omit<
      Partial<React.ComponentProps<NodeDefaultElementType[T]>>,
      ReservedPropsType | VariantPropType | ArgPropType | DescendantsType<T>
    >;

function makeNodeComponent<NodeName extends NodeNameType>(nodeName: NodeName) {
  type PropsType = NodeComponentProps<NodeName> & { key?: React.Key };
  const func = function <T extends PropsType>(
    props: T & StrictProps<T, PropsType>
  ) {
    const { variants, args, overrides } = React.useMemo(
      () =>
        deriveRenderOpts(props, {
          name: nodeName,
          descendantNames: [...PlasmicDescendants[nodeName]],
          internalArgPropNames: PlasmicTodoListItem__ArgProps,
          internalVariantPropNames: PlasmicTodoListItem__VariantProps
        }),
      [props, nodeName]
    );

    return PlasmicTodoListItem__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName
    });
  };
  if (nodeName === "root") {
    func.displayName = "PlasmicTodoListItem";
  } else {
    func.displayName = `PlasmicTodoListItem.${nodeName}`;
  }
  return func;
}

export const PlasmicTodoListItem = Object.assign(
  // Top-level PlasmicTodoListItem renders the root element
  makeNodeComponent("root"),
  {
    // Helper components rendering sub-elements
    svg: makeNodeComponent("svg"),

    // Metadata about props expected for PlasmicTodoListItem
    internalVariantProps: PlasmicTodoListItem__VariantProps,
    internalArgProps: PlasmicTodoListItem__ArgProps
  }
);

export default PlasmicTodoListItem;
/* prettier-ignore-end */