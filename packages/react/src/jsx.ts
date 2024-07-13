import { REACT_ELEMENT_TYPE} from 'shared/ReactSymbols';
import { Type, Ref, Key, Props, ReactElementType, ElementType} from 'shared/ReactTypes';

const ReactElement = function (type: Type, key: Key, ref: Ref, props: Props): ReactElementType {
  const element = {
    // 内部使用字段
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    ref,
    props,
    _mark: 'react.decadez'
  }

  return element;
}

export const jsx = (type: ElementType, config: any, ...children: any) => {
  let key: Key = null;
  let ref: Ref = null;
  const props: Props = {};

  for (const prop in props) {
    const val = config[prop];
    if (prop === 'key') {
      if (val !== undefined) {
        key = '' + val;
      };
      continue;
    }
    if (prop === 'ref') {
      if (val !== undefined) {
        ref = val;
      };
      continue;
    }
    if ({}.hasOwnProperty.call(config, prop)) {
      props[prop] = val;
    }
  }
  const childrenLength = children.length;
  if (childrenLength) {
    if (childrenLength === 1) {
      props.children = children[0];
    } else {
      props.children = children;
    }
  }

  return ReactElement(type, key, ref, props);
}

// dev 环境不处理children参数，方便做一些额外检查
export const jsxDEV = (type: ElementType, config: any) => {
	let key: Key = null;
	let ref: Ref = null;
	const props: Props = {};
	for (const prop in config) {
		const val = config[prop];
		if (prop === 'key') {
			if (val !== undefined) {
				key = '' + val;
			}
			continue;
		}
		if (prop === 'ref') {
			if (val !== undefined) {
				ref = val;
			}
			continue;
		}
		if ({}.hasOwnProperty.call(config, prop)) {
			props[prop] = val;
		}
	}
	return ReactElement(type, key, ref, props);
};