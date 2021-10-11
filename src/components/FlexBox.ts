import createElement, { IProps } from "../createElement";

type FlexProps = {
  //Justify Content
  /** Justify Content Start*/
  justifyStart?: boolean,
  /** Justify Content End*/
  justifyEnd?: boolean,
  /** Justify Content Center*/
  justifyCenter?: boolean,
  /** Justify Content Between*/
  justifyBetween?: boolean,
  /** Justify Content Around*/
  justifyAround?: boolean,
  /** Justify Content Evenly*/
  justifyEvenly?: boolean,
  //Justify Items
  /**Justify Items Start */
  justifyItemsStart?: boolean,
  /**Justify Items End */
  justifyItemsEnd?: boolean,
  /**Justify Items Center */
  justifyItemsCenter?: boolean,
  /**Justify Items Stretch */
  justifyItemsStretch?: boolean,
  //Align Content
  /**Align Content Center */
  contentCenter?: boolean,
  /**Align Content Start */
  contentStart?: boolean,
  /**Align Content End */
  contentEnd?: boolean,
  /**Align Content Between */
  contentBetween?: boolean,
  /**Align Content Around */
  contentAround?: boolean,
  /**Align Content Evenly */
  contentEvenly?: boolean,
  // Align Items
  /**Align Items Start */
  itemsStart?: boolean,
  /**Align Items End */
  itemsEnd?: boolean,
  /**Align Items Center */
  itemsCenter?: boolean,
  /**Align Items Baseline */
  itemsBaseline?: boolean,
  /**Align Items Stretch */
  itemsStretch?: boolean,
  //Flex Direction
  flexRow?: boolean,
  flexRowReverse?: boolean,
  flexCol?: boolean,
  flexColReverse?: boolean,
  //Flex Wrap
  flexWrap?: boolean,
  flexWrapReverse?: boolean,
  flexNowrap?: boolean,
}

export default function FlexBox<T extends keyof HTMLElementTagNameMap>(tagName: T, options?: FlexProps, props?: IProps<HTMLElementTagNameMap[T]>, children?: any): HTMLElementTagNameMap[T] {
  let _className = 'flex'

  for (let key in options) {
    _className += ' ' + key.split(/(?=[A-Z])/).join('-').toLocaleLowerCase()
  }

  return createElement(tagName, {
    ...props,
    className: _className + (props?.className ? (' ' + props.className) : '')
  }, children) as any
}
